-- Restrict column-level SELECT on profiles.email
REVOKE SELECT ON public.profiles FROM anon, authenticated;

-- Re-grant SELECT only on non-email columns to anon and authenticated
GRANT SELECT (id, username, display_name, avatar_url, cover_url, bio, level, reputation, created_at, updated_at)
  ON public.profiles TO anon, authenticated;

-- Allow authenticated users to also read email (RLS still restricts which rows via a new policy below)
GRANT SELECT (email) ON public.profiles TO authenticated;

-- Keep full write privileges already implied by previous grants
GRANT INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Replace the permissive public SELECT policy with split policies:
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Anyone (including anon) can view profiles, but column grants above hide email from anon
-- and email column is only granted to authenticated for their own row via a separate policy.
CREATE POLICY "Public profiles are viewable"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow users to read their own full row (email included) — works because they have the email column grant
-- Already covered by the above policy + column grants. Restrict email to self via a column privilege guard:
-- Postgres column-level grants combined with a row policy mean authenticated users could read others' emails.
-- To truly restrict email to self/admin, revoke the column grant from authenticated and use a SECURITY DEFINER
-- helper for self/admin access instead.
REVOKE SELECT (email) ON public.profiles FROM authenticated;

-- Provide a safe helper to fetch the current user's email (or admin lookup)
CREATE OR REPLACE FUNCTION public.get_profile_email(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email
  FROM public.profiles
  WHERE id = _user_id
    AND (auth.uid() = _user_id OR public.has_role(auth.uid(), 'admin'));
$$;

REVOKE EXECUTE ON FUNCTION public.get_profile_email(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_profile_email(uuid) TO authenticated;
