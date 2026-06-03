
-- 1) Prevent email overwrite via UPDATE on profiles
CREATE OR REPLACE FUNCTION public.tg_profiles_protect_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IS DISTINCT FROM OLD.email THEN
    NEW.email := OLD.email;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_email ON public.profiles;
CREATE TRIGGER profiles_protect_email
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.tg_profiles_protect_email();

-- Also revoke email column from anon/authenticated; keep via security definer function only
REVOKE SELECT (email) ON public.profiles FROM anon, authenticated;

-- 2) Tighten conversation_members INSERT: only self, only into conversations user already belongs to,
--    OR into a brand-new conversation they just created (i.e., no existing members yet).
DROP POLICY IF EXISTS cmembers_insert ON public.conversation_members;
CREATE POLICY cmembers_insert ON public.conversation_members
FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (
    NOT EXISTS (SELECT 1 FROM public.conversation_members m WHERE m.conversation_id = conversation_members.conversation_id)
    OR EXISTS (
      SELECT 1 FROM public.conversation_members m
      WHERE m.conversation_id = conversation_members.conversation_id AND m.user_id = auth.uid()
    )
  )
);

-- Also tighten members SELECT: only members can see other members
DROP POLICY IF EXISTS cmembers_view ON public.conversation_members;
CREATE POLICY cmembers_view ON public.conversation_members
FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR conversation_id IN (
    SELECT m.conversation_id FROM public.conversation_members m WHERE m.user_id = auth.uid()
  )
);

-- 3) group_members SELECT: only public groups or member of the group
DROP POLICY IF EXISTS group_members_view ON public.group_members;
CREATE POLICY group_members_view ON public.group_members
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.groups g
    WHERE g.id = group_members.group_id
      AND (NOT g.is_private OR g.owner_id = auth.uid())
  )
  OR user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.group_members m
    WHERE m.group_id = group_members.group_id AND m.user_id = auth.uid()
  )
);

-- 4) taggables DELETE/INSERT: restrict to author of the entity or admin/moderator
DROP POLICY IF EXISTS taggables_auth_delete ON public.taggables;
DROP POLICY IF EXISTS taggables_auth_write ON public.taggables;

CREATE POLICY taggables_owner_insert ON public.taggables
FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')
  OR (entity_type = 'article'     AND EXISTS (SELECT 1 FROM public.articles a     WHERE a.id = entity_id AND a.author_id = auth.uid()))
  OR (entity_type = 'question'    AND EXISTS (SELECT 1 FROM public.questions q    WHERE q.id = entity_id AND q.author_id = auth.uid()))
  OR (entity_type = 'forum_topic' AND EXISTS (SELECT 1 FROM public.forum_topics t WHERE t.id = entity_id AND t.author_id = auth.uid()))
  OR (entity_type = 'video'       AND EXISTS (SELECT 1 FROM public.videos v       WHERE v.id = entity_id AND v.author_id = auth.uid()))
);

CREATE POLICY taggables_owner_delete ON public.taggables
FOR DELETE TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')
  OR (entity_type = 'article'     AND EXISTS (SELECT 1 FROM public.articles a     WHERE a.id = entity_id AND a.author_id = auth.uid()))
  OR (entity_type = 'question'    AND EXISTS (SELECT 1 FROM public.questions q    WHERE q.id = entity_id AND q.author_id = auth.uid()))
  OR (entity_type = 'forum_topic' AND EXISTS (SELECT 1 FROM public.forum_topics t WHERE t.id = entity_id AND t.author_id = auth.uid()))
  OR (entity_type = 'video'       AND EXISTS (SELECT 1 FROM public.videos v       WHERE v.id = entity_id AND v.author_id = auth.uid()))
);

-- 5) Realtime authorization for messages and notifications channels
-- Enable RLS on realtime.messages and add topic-scoped policies
ALTER TABLE IF EXISTS realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated can read own topics" ON realtime.messages;
CREATE POLICY "Authenticated can read own topics" ON realtime.messages
FOR SELECT TO authenticated
USING (
  -- conversation:<id> topic — member of conversation
  (
    (realtime.topic() LIKE 'conversation:%')
    AND EXISTS (
      SELECT 1 FROM public.conversation_members m
      WHERE m.user_id = auth.uid()
        AND m.conversation_id::text = split_part(realtime.topic(), ':', 2)
    )
  )
  OR
  -- notifications:<user_id> — only own
  (
    (realtime.topic() LIKE 'notifications:%')
    AND split_part(realtime.topic(), ':', 2) = auth.uid()::text
  )
  OR
  -- public broadcast channels prefixed with public:
  (realtime.topic() LIKE 'public:%')
);
