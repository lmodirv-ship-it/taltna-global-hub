
# خطة التنفيذ الشاملة — تحويل Taltna Global إلى منصة حقيقية

سأنفذها على **6 مراحل متسلسلة**. كل مرحلة قابلة للنشر والاختبار قبل الانتقال للتالية.

---

## المرحلة 1 — أساس قاعدة البيانات (Migration واحد كبير)

**جدول واحد لكل كيان + RLS + GRANT + Storage Buckets:**

### الجداول
- `categories` (id, slug, name_ar, name_fr, name_en, parent_id, icon, color, kind) — موحّد للمقالات/المنتدى/الفيديو/الأسئلة (~60 تصنيف فرعي seed)
- `tags` (id, slug, name) + `taggables` (tag_id, entity_type, entity_id) polymorphic
- `articles` (id, author_id, category_id, slug, title, excerpt, content, cover_url, status: draft/published, reads, created_at)
- `forum_topics` (id, author_id, category_id, title, body, is_pinned, is_locked, views, last_reply_at)
- `forum_replies` (id, topic_id, author_id, body, parent_id)
- `videos` (id, author_id, category_id, title, description, video_url, thumbnail_url, duration, views)
- `questions` (id, author_id, category_id, title, body, best_answer_id, views)
- `answers` (id, question_id, author_id, body, score)
- `groups` (id, owner_id, name, description, avatar_url, is_private)
- `group_members` (group_id, user_id, role)
- `comments` (id, author_id, entity_type, entity_id, parent_id, body) — polymorphic
- `reactions` (id, user_id, entity_type, entity_id, kind: like/upvote/downvote/bookmark) — polymorphic موحّد
- `follows` (follower_id, following_id)
- `notifications` (id, user_id, type, actor_id, entity_type, entity_id, read_at)
- `messages` + `conversations` + `conversation_members`
- `reports` (id, reporter_id, entity_type, entity_id, reason, status)
- `ads` (id, title, image_url, target_url, placement, active, impressions, clicks)
- `verifications` (user_id, status, document_url, reviewed_by)
- إضافة `is_verified` على `profiles`

### Storage Buckets
- `avatars` (public)
- `covers` (public)
- `articles` (public — للصور داخل المقالات)
- `videos` (public) + `thumbnails` (public)
- `attachments` (private — للرسائل والوثائق)

### RLS Policies
- قراءة عامة للمحتوى المنشور (`status='published'`)
- الكتابة فقط للـ `author_id = auth.uid()`
- Admin/Moderator يستطيعون كل شيء عبر `has_role()`
- Notifications/Messages: المالك فقط

### Triggers
- `update_updated_at_column()` لكل الجداول
- زيادة `reads` / `views` تلقائياً
- إنشاء notification عند: رد/تعليق/إعجاب/متابعة/أفضل إجابة
- تحديث `reputation` في `profiles` تلقائياً (+10 لمقال، +5 لإجابة مقبولة، +2 upvote…)
- `last_reply_at` على forum_topics

### Realtime
تفعيل `supabase_realtime` على: `messages`, `notifications`, `forum_replies`, `comments`

---

## المرحلة 2 — Server Functions + ربط CRUD

إنشاء `src/lib/*.functions.ts` لكل كيان (TanStack `createServerFn` مع `requireSupabaseAuth`):

- `articles.functions.ts` — list/get/create/update/publish/delete
- `forums.functions.ts` — topics + replies
- `videos.functions.ts` — مع upload signed URL
- `questions.functions.ts` — مع vote/markBestAnswer
- `comments.functions.ts` + `reactions.functions.ts` (polymorphic)
- `notifications.functions.ts` + Realtime hook
- `messages.functions.ts` + Realtime
- `groups.functions.ts`
- `follows.functions.ts`
- `search.functions.ts` — بحث موحّد عبر `ilike`/full-text
- `admin.functions.ts` — إحصائيات حقيقية + إدارة تصنيفات + بلاغات + توثيق + ads
- `upload.functions.ts` — رفع للـ Storage

### ربط الواجهات الموجودة
استبدال `mock-data.ts` تدريجياً بـ TanStack Query + `useSuspenseQuery`:
- `/`, `/articles`, `/articles/$slug`, `/articles/new`
- `/forums/*`, `/questions/*`, `/videos/*`, `/groups/*`
- `/messages`, `/notifications` (Realtime)
- `/search`, `/profile`
- كل صفحات `/admin/*` بأرقام وبيانات حقيقية

---

## المرحلة 3 — التصنيفات الفرعية (~60 قسم)

- Seed كامل في migration للتصنيفات (تكنولوجيا، أعمال، تعليم، صحة، سيارات، ألعاب، إعلام، سفر، أخبار…) مع التصنيفات الفرعية
- صفحة ديناميكية واحدة `/c/$slug` تعرض المحتوى المرتبط بأي تصنيف (مقالات + مواضيع + فيديو + أسئلة)
- شجرة تصنيفات في `Sidebar`
- صفحة `/admin/categories` لإدارة الإضافة/الحذف/التعديل

---

## المرحلة 4 — i18n (عربي/فرنسي/إنجليزي)

- إضافة `i18next` + `react-i18next` + `i18next-browser-languagedetector`
- ملفات `src/locales/{ar,fr,en}/common.json`
- مبدّل لغة في الـ Header مع حفظ في localStorage + cookie
- `dir="rtl"` يتبدّل تلقائياً حسب اللغة
- الحقول متعددة اللغات في DB (`title_ar/fr/en` للتصنيفات فقط؛ المحتوى يبقى بلغة الكاتب مع حقل `language`)

---

## المرحلة 5 — ميزات متقدمة

- **نظام النقاط/السمعة**: leaderboard + شارات (badges table) + عرضها على البروفايل
- **التوثيق**: تقديم طلب + مراجعة admin + شارة زرقاء
- **مراقبة المحتوى بـ AI**: Lovable AI Gateway (`google/gemini-2.5-flash`) عبر server function تفحص المحتوى عند النشر وتعلّمه `flagged` تلقائياً
- **البحث المتقدم**: Postgres full-text search مع GIN index
- **الإعلانات**: عرض حقيقي + تتبع impressions/clicks

---

## المرحلة 6 — التوسعات (اختياري حسب الأولوية)

- **عضويات مدفوعة**: Stripe (`recommend_payment_provider` → enable) + جدول `subscriptions` + بوابات محتوى
- **دورات تعليمية**: جداول `courses` + `lessons` + `enrollments` + `progress`
- **متجر رقمي**: `products` + `orders` + Stripe checkout
- **بودكاست/بث مباشر**: قسم مخصص + تكامل مشغّل صوت
- **تطبيق Android/iOS**: PWA كامل (manifest + service worker + installable) — أسرع طريق للموبايل دون Native

---

## ملاحظات تقنية

- **عدم تغيير التصميم**: كل الواجهات الحالية تبقى — فقط `useQuery` بدل `mock-data`
- **سرعة الإنجاز**: المرحلة 1 = migration واحد كبير، المرحلة 2 = ملفات server-fn متوازية
- **الأمان**: كل جدول له RLS + GRANT صحيح + `auth.uid()` على كل INSERT
- **Realtime**: notifications + messages + forum_replies فقط (لتقليل التكلفة)
- **AI Moderation**: عبر Lovable AI Gateway بدون API key

---

## الترتيب الموصى به للتنفيذ الفوري

1. **الآن**: المرحلة 1 (migration الكبير) + المرحلة 3 (seed التصنيفات) معاً
2. **بعدها**: المرحلة 2 (server functions + ربط 4 وحدات أساسية: مقالات/منتدى/أسئلة/فيديو)
3. **بعدها**: التعليقات/الإعجابات/الإشعارات/الرسائل
4. **بعدها**: لوحة الإدارة بأرقام حقيقية
5. **بعدها**: i18n
6. **أخيراً**: المرحلة 5 و6 حسب أولوياتك

هل أبدأ بالمرحلة 1 (إنشاء كل الجداول + Storage + RLS + Seed التصنيفات) في migration واحد؟
