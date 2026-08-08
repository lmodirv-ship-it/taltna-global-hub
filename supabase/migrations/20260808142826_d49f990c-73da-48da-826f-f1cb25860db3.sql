
-- ============ APPS ============
CREATE TABLE IF NOT EXISTS public.hn_apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  base_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hn_apps TO anon, authenticated;
GRANT ALL ON public.hn_apps TO service_role;
ALTER TABLE public.hn_apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hn_apps_read_all" ON public.hn_apps FOR SELECT USING (true);
CREATE POLICY "hn_apps_admin_write" ON public.hn_apps FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ ROLES ============
CREATE TABLE IF NOT EXISTS public.hn_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  name_ar text NOT NULL,
  name_fr text,
  name_en text,
  level int NOT NULL DEFAULT 10,
  dashboard_path text NOT NULL DEFAULT '/user/dashboard',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hn_roles TO anon, authenticated;
GRANT ALL ON public.hn_roles TO service_role;
ALTER TABLE public.hn_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hn_roles_read_all" ON public.hn_roles FOR SELECT USING (true);
CREATE POLICY "hn_roles_admin_write" ON public.hn_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ CENTRAL USERS ============
CREATE TABLE IF NOT EXISTS public.hn_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  origin_app text NOT NULL DEFAULT 'hn-global',
  full_name text,
  is_active boolean NOT NULL DEFAULT true,
  last_seen_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.hn_users TO authenticated;
GRANT ALL ON public.hn_users TO service_role;
ALTER TABLE public.hn_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hn_users_self_read" ON public.hn_users FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "hn_users_self_update" ON public.hn_users FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "hn_users_self_insert" ON public.hn_users FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_hn_users_updated BEFORE UPDATE ON public.hn_users
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ USER x ROLE x APP ============
CREATE TABLE IF NOT EXISTS public.hn_user_roles_apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  app_key text NOT NULL DEFAULT 'hn-global',
  role_key text NOT NULL DEFAULT 'subscriber',
  granted_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, app_key, role_key)
);
GRANT SELECT ON public.hn_user_roles_apps TO authenticated;
GRANT ALL ON public.hn_user_roles_apps TO service_role;
ALTER TABLE public.hn_user_roles_apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hn_ura_self_read" ON public.hn_user_roles_apps FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "hn_ura_admin_write" ON public.hn_user_roles_apps FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ VISITS COUNTER ============
CREATE TABLE IF NOT EXISTS public.hn_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  path text,
  app_key text NOT NULL DEFAULT 'hn-global',
  is_member boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_hn_visits_created ON public.hn_visits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hn_visits_session ON public.hn_visits (session_id);
GRANT INSERT ON public.hn_visits TO anon, authenticated;
GRANT SELECT ON public.hn_visits TO authenticated;
GRANT ALL ON public.hn_visits TO service_role;
ALTER TABLE public.hn_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hn_visits_anyone_insert" ON public.hn_visits FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "hn_visits_admin_read" ON public.hn_visits FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'moderator'));

-- ============ FUNCTIONS ============
CREATE OR REPLACE FUNCTION public.hn_track_visit(_session_id text, _path text DEFAULT NULL, _app_key text DEFAULT 'hn-global')
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.hn_visits (session_id, path, app_key, is_member)
  VALUES (_session_id, _path, coalesce(_app_key,'hn-global'), auth.uid() IS NOT NULL);
END $$;
GRANT EXECUTE ON FUNCTION public.hn_track_visit(text, text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.hn_public_stats()
RETURNS json LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT json_build_object(
    'visitors_total', (SELECT count(DISTINCT session_id) FROM public.hn_visits),
    'visits_total', (SELECT count(*) FROM public.hn_visits),
    'visitors_today', (SELECT count(DISTINCT session_id) FROM public.hn_visits WHERE created_at >= date_trunc('day', now())),
    'online_now', (SELECT count(DISTINCT session_id) FROM public.hn_visits WHERE created_at >= now() - interval '5 minutes'),
    'members_total', (SELECT count(*) FROM public.profiles),
    'members_today', (SELECT count(*) FROM public.profiles WHERE created_at >= date_trunc('day', now())),
    'server_time', now()
  )
$$;
GRANT EXECUTE ON FUNCTION public.hn_public_stats() TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.hn_my_dashboard(_app_key text DEFAULT 'hn-global')
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT coalesce(
    (SELECT r.dashboard_path
       FROM public.hn_user_roles_apps ura
       JOIN public.hn_roles r ON r.key = ura.role_key
      WHERE ura.user_id = auth.uid() AND ura.app_key = coalesce(_app_key,'hn-global')
      ORDER BY r.level DESC LIMIT 1),
    CASE WHEN public.has_role(auth.uid(),'admin') THEN '/owner/dashboard' ELSE '/user/dashboard' END
  )
$$;
GRANT EXECUTE ON FUNCTION public.hn_my_dashboard(text) TO authenticated;

-- sync central user row on signup
CREATE OR REPLACE FUNCTION public.tg_hn_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.hn_users (user_id, email, origin_app, full_name)
  VALUES (NEW.id, NEW.email, coalesce(NEW.raw_user_meta_data->>'origin_app','hn-global'), NEW.raw_user_meta_data->>'display_name')
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.hn_user_roles_apps (user_id, app_key, role_key)
  VALUES (NEW.id, 'hn-global', CASE WHEN NEW.email = 'lmodirv@gmail.com' THEN 'owner' ELSE 'subscriber' END)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS on_auth_user_created_hn ON auth.users;
CREATE TRIGGER on_auth_user_created_hn AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.tg_hn_new_user();

-- ============ SEED ============
INSERT INTO public.hn_roles (key, name_ar, name_fr, name_en, level, dashboard_path) VALUES
  ('owner','المالك','Propriétaire','Owner',100,'/owner/dashboard'),
  ('admin','مدير','Administrateur','Admin',90,'/admin'),
  ('moderator','مشرف','Modérateur','Moderator',70,'/admin'),
  ('creator','ناشر','Créateur','Creator',40,'/user/dashboard'),
  ('subscriber','مشترك','Abonné','Subscriber',10,'/user/dashboard')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.hn_apps (key, name, base_url) VALUES
  ('hn-global','HN-global','https://taltna-global-hub.lovable.app')
ON CONFLICT (key) DO NOTHING;

-- backfill existing users
INSERT INTO public.hn_users (user_id, email, full_name)
SELECT p.id, p.email, p.display_name FROM public.profiles p
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.hn_user_roles_apps (user_id, app_key, role_key)
SELECT p.id, 'hn-global', CASE WHEN p.email = 'lmodirv@gmail.com' THEN 'owner' ELSE 'subscriber' END
FROM public.profiles p
ON CONFLICT DO NOTHING;

-- ensure owner has admin app_role too
INSERT INTO public.user_roles (user_id, role)
SELECT p.id, 'admin'::app_role FROM public.profiles p WHERE p.email = 'lmodirv@gmail.com'
ON CONFLICT DO NOTHING;
