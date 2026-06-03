
-- 1. profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'ar',
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT;

-- 2. ENUMS
DO $$ BEGIN CREATE TYPE public.content_status AS ENUM ('draft','published','archived','flagged'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE public.entity_kind AS ENUM ('article','forum_topic','video','question','answer','comment','group'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE public.reaction_kind AS ENUM ('like','upvote','downvote','bookmark'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE public.notification_type AS ENUM ('reply','comment','like','follow','mention','best_answer','message','verification','system'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE public.verification_status AS ENUM ('pending','approved','rejected'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE public.report_status AS ENUM ('open','reviewing','resolved','dismissed'); EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. helper
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- 4. CATEGORIES
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_ar TEXT NOT NULL, name_fr TEXT, name_en TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  icon TEXT, color TEXT, emoji TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_categories_parent ON public.categories(parent_id);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_write" ON public.categories FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- 5. TAGS
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  usage_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tags TO anon, authenticated;
GRANT INSERT ON public.tags TO authenticated;
GRANT ALL ON public.tags TO service_role;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tags_public_read" ON public.tags FOR SELECT USING (true);
CREATE POLICY "tags_auth_insert" ON public.tags FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "tags_admin_modify" ON public.tags FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "tags_admin_delete" ON public.tags FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.taggables (
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  entity_type public.entity_kind NOT NULL,
  entity_id UUID NOT NULL,
  PRIMARY KEY (tag_id, entity_type, entity_id)
);
CREATE INDEX idx_taggables_entity ON public.taggables(entity_type, entity_id);
GRANT SELECT ON public.taggables TO anon, authenticated;
GRANT INSERT, DELETE ON public.taggables TO authenticated;
GRANT ALL ON public.taggables TO service_role;
ALTER TABLE public.taggables ENABLE ROW LEVEL SECURITY;
CREATE POLICY "taggables_public_read" ON public.taggables FOR SELECT USING (true);
CREATE POLICY "taggables_auth_write" ON public.taggables FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "taggables_auth_delete" ON public.taggables FOR DELETE TO authenticated USING (true);

-- 6. ARTICLES
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, excerpt TEXT,
  content TEXT NOT NULL, cover_url TEXT,
  language TEXT NOT NULL DEFAULT 'ar',
  status public.content_status NOT NULL DEFAULT 'draft',
  reads INT NOT NULL DEFAULT 0, reading_minutes INT NOT NULL DEFAULT 1,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_articles_author ON public.articles(author_id);
CREATE INDEX idx_articles_category ON public.articles(category_id);
CREATE INDEX idx_articles_status_pub ON public.articles(status, published_at DESC);
GRANT SELECT ON public.articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "articles_public_published" ON public.articles FOR SELECT USING (status = 'published' OR auth.uid() = author_id OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'moderator'));
CREATE POLICY "articles_author_insert" ON public.articles FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "articles_author_update" ON public.articles FOR UPDATE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'moderator'));
CREATE POLICY "articles_author_delete" ON public.articles FOR DELETE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_articles_updated BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 7. FORUM
CREATE TABLE public.forum_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL, body TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  views INT NOT NULL DEFAULT 0, reply_count INT NOT NULL DEFAULT 0,
  last_reply_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_reply_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_topics_category ON public.forum_topics(category_id);
CREATE INDEX idx_topics_last_reply ON public.forum_topics(last_reply_at DESC);
GRANT SELECT ON public.forum_topics TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.forum_topics TO authenticated;
GRANT ALL ON public.forum_topics TO service_role;
ALTER TABLE public.forum_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "topics_public_read" ON public.forum_topics FOR SELECT USING (true);
CREATE POLICY "topics_author_insert" ON public.forum_topics FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "topics_author_update" ON public.forum_topics FOR UPDATE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'moderator') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "topics_author_delete" ON public.forum_topics FOR DELETE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_topics_updated BEFORE UPDATE ON public.forum_topics FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES public.forum_topics(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.forum_replies(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_replies_topic ON public.forum_replies(topic_id);
GRANT SELECT ON public.forum_replies TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.forum_replies TO authenticated;
GRANT ALL ON public.forum_replies TO service_role;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "replies_public_read" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "replies_author_insert" ON public.forum_replies FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "replies_author_update" ON public.forum_replies FOR UPDATE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'moderator'));
CREATE POLICY "replies_author_delete" ON public.forum_replies FOR DELETE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_replies_updated BEFORE UPDATE ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE OR REPLACE FUNCTION public.tg_forum_reply_added()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.forum_topics SET reply_count = reply_count + 1, last_reply_at = now(), last_reply_by = NEW.author_id WHERE id = NEW.topic_id;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_reply_added AFTER INSERT ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION public.tg_forum_reply_added();

-- 8. VIDEOS
CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL, description TEXT,
  video_url TEXT NOT NULL, thumbnail_url TEXT,
  duration_sec INT NOT NULL DEFAULT 0, views INT NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  language TEXT NOT NULL DEFAULT 'ar',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_videos_category ON public.videos(category_id);
CREATE INDEX idx_videos_author ON public.videos(author_id);
GRANT SELECT ON public.videos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.videos TO authenticated;
GRANT ALL ON public.videos TO service_role;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "videos_public_read" ON public.videos FOR SELECT USING (status = 'published' OR auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "videos_author_insert" ON public.videos FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "videos_author_update" ON public.videos FOR UPDATE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "videos_author_delete" ON public.videos FOR DELETE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_videos_updated BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 9. Q&A
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL, body TEXT NOT NULL,
  views INT NOT NULL DEFAULT 0, answer_count INT NOT NULL DEFAULT 0,
  best_answer_id UUID,
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_questions_category ON public.questions(category_id);
GRANT SELECT ON public.questions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.questions TO authenticated;
GRANT ALL ON public.questions TO service_role;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "questions_public_read" ON public.questions FOR SELECT USING (true);
CREATE POLICY "questions_author_insert" ON public.questions FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "questions_author_update" ON public.questions FOR UPDATE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'moderator'));
CREATE POLICY "questions_author_delete" ON public.questions FOR DELETE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_questions_updated BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  body TEXT NOT NULL, score INT NOT NULL DEFAULT 0,
  is_best BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_answers_question ON public.answers(question_id);
GRANT SELECT ON public.answers TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.answers TO authenticated;
GRANT ALL ON public.answers TO service_role;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "answers_public_read" ON public.answers FOR SELECT USING (true);
CREATE POLICY "answers_author_insert" ON public.answers FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "answers_author_update" ON public.answers FOR UPDATE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'moderator'));
CREATE POLICY "answers_author_delete" ON public.answers FOR DELETE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_answers_updated BEFORE UPDATE ON public.answers FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

ALTER TABLE public.questions ADD CONSTRAINT fk_best_answer FOREIGN KEY (best_answer_id) REFERENCES public.answers(id) ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION public.tg_answer_added()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN UPDATE public.questions SET answer_count = answer_count + 1 WHERE id = NEW.question_id; RETURN NEW; END $$;
CREATE TRIGGER trg_answer_added AFTER INSERT ON public.answers FOR EACH ROW EXECUTE FUNCTION public.tg_answer_added();

-- 10. GROUPS  — create both tables BEFORE policies that cross-reference
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, description TEXT,
  avatar_url TEXT, cover_url TEXT,
  is_private BOOLEAN NOT NULL DEFAULT false,
  member_count INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.groups TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.groups TO authenticated;
GRANT ALL ON public.groups TO service_role;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_groups_updated BEFORE UPDATE ON public.groups FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.group_members (
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.group_members TO authenticated;
GRANT ALL ON public.group_members TO service_role;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "group_members_view" ON public.group_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "group_members_self_join" ON public.group_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "group_members_self_leave" ON public.group_members FOR DELETE TO authenticated USING (auth.uid() = user_id OR auth.uid() IN (SELECT owner_id FROM public.groups WHERE id = group_id));

-- Now safe to add cross-ref policy on groups
CREATE POLICY "groups_public_read" ON public.groups FOR SELECT USING (NOT is_private OR auth.uid() IN (SELECT user_id FROM public.group_members WHERE group_id = groups.id));
CREATE POLICY "groups_owner_insert" ON public.groups FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "groups_owner_update" ON public.groups FOR UPDATE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "groups_owner_delete" ON public.groups FOR DELETE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(),'admin'));

-- 11. COMMENTS
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entity_type public.entity_kind NOT NULL,
  entity_id UUID NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_comments_entity ON public.comments(entity_type, entity_id);
GRANT SELECT ON public.comments TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.comments TO authenticated;
GRANT ALL ON public.comments TO service_role;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comments_public_read" ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments_author_insert" ON public.comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments_author_update" ON public.comments FOR UPDATE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'moderator'));
CREATE POLICY "comments_author_delete" ON public.comments FOR DELETE TO authenticated USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_comments_updated BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 12. REACTIONS
CREATE TABLE public.reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entity_type public.entity_kind NOT NULL,
  entity_id UUID NOT NULL,
  kind public.reaction_kind NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, entity_type, entity_id, kind)
);
CREATE INDEX idx_reactions_entity ON public.reactions(entity_type, entity_id, kind);
GRANT SELECT ON public.reactions TO anon, authenticated;
GRANT INSERT, DELETE ON public.reactions TO authenticated;
GRANT ALL ON public.reactions TO service_role;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reactions_public_read" ON public.reactions FOR SELECT USING (true);
CREATE POLICY "reactions_self_insert" ON public.reactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reactions_self_delete" ON public.reactions FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.tg_reaction_score()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE delta INT; eid UUID; ek public.entity_kind; ekind public.reaction_kind;
BEGIN
  IF TG_OP = 'INSERT' THEN delta := 1; eid := NEW.entity_id; ek := NEW.entity_type; ekind := NEW.kind;
  ELSE delta := -1; eid := OLD.entity_id; ek := OLD.entity_type; ekind := OLD.kind; END IF;
  IF ek = 'answer' AND ekind = 'upvote' THEN UPDATE public.answers SET score = score + delta WHERE id = eid;
  ELSIF ek = 'answer' AND ekind = 'downvote' THEN UPDATE public.answers SET score = score - delta WHERE id = eid;
  END IF;
  RETURN COALESCE(NEW, OLD);
END $$;
CREATE TRIGGER trg_reaction_score AFTER INSERT OR DELETE ON public.reactions FOR EACH ROW EXECUTE FUNCTION public.tg_reaction_score();

-- 13. FOLLOWS
CREATE TABLE public.follows (
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id <> following_id)
);
CREATE INDEX idx_follows_following ON public.follows(following_id);
GRANT SELECT ON public.follows TO anon, authenticated;
GRANT INSERT, DELETE ON public.follows TO authenticated;
GRANT ALL ON public.follows TO service_role;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "follows_public_read" ON public.follows FOR SELECT USING (true);
CREATE POLICY "follows_self_insert" ON public.follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "follows_self_delete" ON public.follows FOR DELETE TO authenticated USING (auth.uid() = follower_id);

-- 14. NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  type public.notification_type NOT NULL,
  entity_type public.entity_kind,
  entity_id UUID, title TEXT, body TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, created_at DESC);
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_self_read" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notifications_self_update" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notifications_self_delete" ON public.notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 15. MESSAGES — create all 3 then add cross-ref policies
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT, is_group BOOLEAN NOT NULL DEFAULT false,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.conversations TO authenticated;
GRANT ALL ON public.conversations TO service_role;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.conversation_members (
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_read_at TIMESTAMPTZ,
  PRIMARY KEY (conversation_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_members TO authenticated;
GRANT ALL ON public.conversation_members TO service_role;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cmembers_view" ON public.conversation_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "cmembers_insert" ON public.conversation_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "cmembers_update" ON public.conversation_members FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "cmembers_delete" ON public.conversation_members FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "conversations_member_read" ON public.conversations FOR SELECT TO authenticated USING (id IN (SELECT conversation_id FROM public.conversation_members WHERE user_id = auth.uid()));
CREATE POLICY "conversations_auth_create" ON public.conversations FOR INSERT TO authenticated WITH CHECK (true);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  body TEXT NOT NULL, attachment_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_messages_conv ON public.messages(conversation_id, created_at);
GRANT SELECT, INSERT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_member_read" ON public.messages FOR SELECT TO authenticated USING (conversation_id IN (SELECT conversation_id FROM public.conversation_members WHERE user_id = auth.uid()));
CREATE POLICY "messages_member_send" ON public.messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id AND conversation_id IN (SELECT conversation_id FROM public.conversation_members WHERE user_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.tg_message_sent()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN UPDATE public.conversations SET last_message_at = now() WHERE id = NEW.conversation_id; RETURN NEW; END $$;
CREATE TRIGGER trg_message_sent AFTER INSERT ON public.messages FOR EACH ROW EXECUTE FUNCTION public.tg_message_sent();

-- 16. REPORTS
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entity_type public.entity_kind NOT NULL,
  entity_id UUID NOT NULL,
  reason TEXT NOT NULL, details TEXT,
  status public.report_status NOT NULL DEFAULT 'open',
  resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reports TO authenticated;
GRANT ALL ON public.reports TO service_role;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reports_self_view" ON public.reports FOR SELECT TO authenticated USING (auth.uid() = reporter_id OR public.has_role(auth.uid(),'moderator') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "reports_auth_insert" ON public.reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "reports_admin_update" ON public.reports FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'moderator') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "reports_admin_delete" ON public.reports FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_reports_updated BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 17. ADS
CREATE TABLE public.ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, image_url TEXT, target_url TEXT NOT NULL,
  placement TEXT NOT NULL DEFAULT 'sidebar',
  active BOOLEAN NOT NULL DEFAULT true,
  impressions INT NOT NULL DEFAULT 0, clicks INT NOT NULL DEFAULT 0,
  starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.ads TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.ads TO authenticated;
GRANT ALL ON public.ads TO service_role;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ads_public_active" ON public.ads FOR SELECT USING (active = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "ads_admin_write" ON public.ads FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_ads_updated BEFORE UPDATE ON public.ads FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 18. VERIFICATIONS
CREATE TABLE public.verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL, document_url TEXT, reason TEXT,
  status public.verification_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.verifications TO authenticated;
GRANT ALL ON public.verifications TO service_role;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "verif_self_view" ON public.verifications FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "verif_self_insert" ON public.verifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "verif_admin_update" ON public.verifications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_verif_updated BEFORE UPDATE ON public.verifications FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 19. BADGES
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, description TEXT,
  icon TEXT, color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.badges TO anon, authenticated;
GRANT ALL ON public.badges TO service_role;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "badges_public_read" ON public.badges FOR SELECT USING (true);
CREATE POLICY "badges_admin_write" ON public.badges FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.user_badges (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);
GRANT SELECT ON public.user_badges TO anon, authenticated;
GRANT ALL ON public.user_badges TO service_role;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_badges_public_read" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "user_badges_admin_write" ON public.user_badges FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- 20. NOTIFICATION triggers
CREATE OR REPLACE FUNCTION public.tg_notify_follow()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN INSERT INTO public.notifications(user_id, actor_id, type, body) VALUES (NEW.following_id, NEW.follower_id, 'follow', 'بدأ بمتابعتك'); RETURN NEW; END $$;
CREATE TRIGGER trg_notify_follow AFTER INSERT ON public.follows FOR EACH ROW EXECUTE FUNCTION public.tg_notify_follow();

CREATE OR REPLACE FUNCTION public.tg_notify_forum_reply()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE topic_author UUID;
BEGIN
  SELECT author_id INTO topic_author FROM public.forum_topics WHERE id = NEW.topic_id;
  IF topic_author IS NOT NULL AND topic_author <> NEW.author_id THEN
    INSERT INTO public.notifications(user_id, actor_id, type, entity_type, entity_id, body) VALUES (topic_author, NEW.author_id, 'reply', 'forum_topic', NEW.topic_id, 'رد جديد على موضوعك');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_notify_forum_reply AFTER INSERT ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION public.tg_notify_forum_reply();

CREATE OR REPLACE FUNCTION public.tg_notify_answer()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE q_author UUID;
BEGIN
  SELECT author_id INTO q_author FROM public.questions WHERE id = NEW.question_id;
  IF q_author IS NOT NULL AND q_author <> NEW.author_id THEN
    INSERT INTO public.notifications(user_id, actor_id, type, entity_type, entity_id, body) VALUES (q_author, NEW.author_id, 'reply', 'question', NEW.question_id, 'إجابة جديدة على سؤالك');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_notify_answer AFTER INSERT ON public.answers FOR EACH ROW EXECUTE FUNCTION public.tg_notify_answer();

-- 21. REPUTATION
CREATE OR REPLACE FUNCTION public.tg_rep_on_article()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status = 'published' AND (TG_OP = 'INSERT' OR OLD.status <> 'published') THEN
    UPDATE public.profiles SET reputation = reputation + 10 WHERE id = NEW.author_id;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_rep_article AFTER INSERT OR UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.tg_rep_on_article();

CREATE OR REPLACE FUNCTION public.tg_rep_on_answer()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.is_best = true AND OLD.is_best = false THEN
    UPDATE public.profiles SET reputation = reputation + 15 WHERE id = NEW.author_id;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_rep_answer AFTER UPDATE ON public.answers FOR EACH ROW EXECUTE FUNCTION public.tg_rep_on_answer();

-- 22. REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_replies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;

-- 23. SEED CATEGORIES
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,emoji,color,sort_order) VALUES
('tech','التكنولوجيا والذكاء الاصطناعي','Technologie','Technology','💻','from-blue-500 to-cyan-500',1),
('business','الأعمال والاستثمار','Affaires','Business','💰','from-emerald-500 to-teal-500',2),
('education','التعليم والمعرفة','Éducation','Education','🎓','from-violet-500 to-purple-500',3),
('health','الصحة واللياقة','Santé','Health','🏥','from-red-500 to-pink-500',4),
('cars','السيارات والنقل','Automobiles','Cars','🚗','from-orange-500 to-amber-500',5),
('gaming','الألعاب والترفيه','Jeux','Gaming','🎮','from-fuchsia-500 to-pink-500',6),
('media','الإعلام والفنون','Médias','Media','🎬','from-rose-500 to-red-500',7),
('travel','السفر والسياحة','Voyage','Travel','🌍','from-sky-500 to-blue-500',8),
('news','الأخبار العالمية','Actualités','News','📰','from-slate-500 to-gray-500',9),
('community','المجتمع','Communauté','Community','👥','from-yellow-500 to-orange-500',10);

WITH p AS (SELECT id FROM public.categories WHERE slug='tech')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('ai','الذكاء الاصطناعي','IA','AI',(SELECT id FROM p),'🤖',1),
('webdev','البرمجة وتطوير الويب','Développement Web','Web Dev',(SELECT id FROM p),'⚡',2),
('cybersec','الأمن السيبراني','Cybersécurité','Cybersecurity',(SELECT id FROM p),'🔒',3),
('mobile','الهواتف الذكية','Mobiles','Smartphones',(SELECT id FROM p),'📱',4),
('hardware','الحواسيب والشبكات','Matériel','Hardware',(SELECT id FROM p),'🖥️',5),
('tech-news','الأخبار التقنية','Actu Tech','Tech News',(SELECT id FROM p),'📡',6);

WITH p AS (SELECT id FROM public.categories WHERE slug='business')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('startups','ريادة الأعمال','Startups','Startups',(SELECT id FROM p),'🚀',1),
('ecommerce','التجارة الإلكترونية','E-commerce','E-commerce',(SELECT id FROM p),'🛒',2),
('marketing','التسويق الرقمي','Marketing','Marketing',(SELECT id FROM p),'📈',3),
('crypto','العملات الرقمية','Crypto','Crypto',(SELECT id FROM p),'₿',4),
('stocks','سوق الأسهم','Bourse','Stocks',(SELECT id FROM p),'📊',5),
('small-biz','المشاريع الصغيرة','Petites entreprises','Small Business',(SELECT id FROM p),'🏪',6);

WITH p AS (SELECT id FROM public.categories WHERE slug='education')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('elearning','التعليم الإلكتروني','E-learning','E-learning',(SELECT id FROM p),'💡',1),
('languages','اللغات الأجنبية','Langues','Languages',(SELECT id FROM p),'🗣️',2),
('books','الكتب والمراجعات','Livres','Books',(SELECT id FROM p),'📚',3),
('research','الأبحاث العلمية','Recherche','Research',(SELECT id FROM p),'🔬',4),
('skills','تطوير المهارات','Compétences','Skills',(SELECT id FROM p),'🎯',5);

WITH p AS (SELECT id FROM public.categories WHERE slug='health')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('nutrition','التغذية','Nutrition','Nutrition',(SELECT id FROM p),'🥗',1),
('fitness','الرياضة والتمارين','Fitness','Fitness',(SELECT id FROM p),'💪',2),
('mental','الصحة النفسية','Santé mentale','Mental Health',(SELECT id FROM p),'🧠',3),
('medical','الطب والصحة العامة','Médecine','Medical',(SELECT id FROM p),'⚕️',4);

WITH p AS (SELECT id FROM public.categories WHERE slug='cars')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('car-news','أخبار السيارات','Actu Auto','Car News',(SELECT id FROM p),'📰',1),
('car-reviews','مراجعات السيارات','Avis Auto','Car Reviews',(SELECT id FROM p),'⭐',2),
('car-maintenance','الصيانة والإصلاح','Entretien','Maintenance',(SELECT id FROM p),'🔧',3),
('ev','السيارات الكهربائية','VE','EVs',(SELECT id FROM p),'⚡',4);

WITH p AS (SELECT id FROM public.categories WHERE slug='gaming')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('pc-games','ألعاب الكمبيوتر','Jeux PC','PC Games',(SELECT id FROM p),'🖱️',1),
('mobile-games','ألعاب الهواتف','Jeux Mobiles','Mobile Games',(SELECT id FROM p),'📱',2),
('console','البلايستيشن والإكس بوكس','Consoles','Consoles',(SELECT id FROM p),'🎮',3),
('game-reviews','مراجعات الألعاب','Avis Jeux','Game Reviews',(SELECT id FROM p),'⭐',4);

WITH p AS (SELECT id FROM public.categories WHERE slug='media')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('movies','الأفلام والمسلسلات','Films','Movies',(SELECT id FROM p),'🎬',1),
('photo','التصوير الفوتوغرافي','Photographie','Photography',(SELECT id FROM p),'📷',2),
('design','التصميم والجرافيك','Design','Design',(SELECT id FROM p),'🎨',3),
('content','صناعة المحتوى','Contenu','Content Creation',(SELECT id FROM p),'🎥',4);

WITH p AS (SELECT id FROM public.categories WHERE slug='travel')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('destinations','الوجهات السياحية','Destinations','Destinations',(SELECT id FROM p),'🗺️',1),
('travel-exp','تجارب السفر','Expériences','Travel Stories',(SELECT id FROM p),'✈️',2),
('hotels','الفنادق والطيران','Hôtels','Hotels & Flights',(SELECT id FROM p),'🏨',3);

WITH p AS (SELECT id FROM public.categories WHERE slug='news')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('intl','الأخبار الدولية','International','International',(SELECT id FROM p),'🌐',1),
('econ','الاقتصاد العالمي','Économie','Economy',(SELECT id FROM p),'💱',2),
('science','العلوم والاكتشافات','Sciences','Science',(SELECT id FROM p),'🔭',3);

WITH p AS (SELECT id FROM public.categories WHERE slug='community')
INSERT INTO public.categories (slug,name_ar,name_fr,name_en,parent_id,emoji,sort_order) VALUES
('welcome','التعارف والترحيب','Bienvenue','Welcome',(SELECT id FROM p),'👋',1),
('suggestions','الاقتراحات والشكاوى','Suggestions','Suggestions',(SELECT id FROM p),'💬',2),
('contests','مسابقات المنتدى','Concours','Contests',(SELECT id FROM p),'🏆',3),
('announcements','إعلانات الإدارة','Annonces','Announcements',(SELECT id FROM p),'📢',4);

-- 24. SEED BADGES
INSERT INTO public.badges (slug,name,description,icon,color) VALUES
('newcomer','عضو جديد','أهلاً بك في المنصة','🌱','from-green-500 to-emerald-500'),
('first-article','أول مقال','نشرت أول مقال لك','📝','from-blue-500 to-cyan-500'),
('first-question','أول سؤال','طرحت أول سؤال','❓','from-violet-500 to-purple-500'),
('first-answer','أول إجابة','قدمت أول إجابة','💡','from-amber-500 to-orange-500'),
('best-answer','إجابة مميزة','حصلت على أفضل إجابة','⭐','from-yellow-500 to-amber-500'),
('popular','محتوى رائج','حصلت على 100 إعجاب','🔥','from-red-500 to-pink-500'),
('verified','عضو موثق','تم توثيق حسابك','✓','from-blue-500 to-indigo-500'),
('top-writer','كاتب مميز','نشرت 50 مقالاً','✍️','from-fuchsia-500 to-pink-500'),
('mentor','مرشد المجتمع','ساعدت 100 عضو','🎓','from-teal-500 to-cyan-500'),
('expert','خبير معتمد','أكثر من 1000 سمعة','👑','from-amber-500 to-yellow-500'),
('moderator-badge','مشرف','عضو في فريق الإشراف','🛡️','from-slate-500 to-gray-500'),
('founder','المؤسس','مؤسس المنصة','💎','from-indigo-500 to-purple-500');
