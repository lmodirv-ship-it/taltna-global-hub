// Realistic seed content used across pages.
export const articlesMock = [
  { id: "ai-tools-2026", title: "أدوات الذكاء الاصطناعي التي ستغير حياتك اليومية في 2026", author: "محمد حسن", reads: "12.4K", time: "6د", tag: "تكنولوجيا", emoji: "🤖", gradient: "from-indigo-600 to-blue-700", excerpt: "استعراض شامل لأقوى 25 أداة ذكاء اصطناعي يمكنك استخدامها مجاناً اليوم." },
  { id: "digital-marketing", title: "استراتيجيات التسويق الرقمي لزيادة المبيعات بـ 300%", author: "نور الدين", reads: "8.9K", time: "8د", tag: "أعمال", emoji: "📈", gradient: "from-emerald-600 to-teal-700", excerpt: "دليل عملي يعتمد على دراسات حالة حقيقية من شركات ناشئة عربية." },
  { id: "7-habits", title: "7 عادات يومية ستغير حياتك للأفضل خلال 30 يوماً", author: "زينب محمد", reads: "15.2K", time: "7د", tag: "تطوير الذات", emoji: "✨", gradient: "from-rose-600 to-pink-700", excerpt: "بحث مدعوم بعلم الأعصاب حول بناء العادات وتفكيك السلبية منها." },
  { id: "react-19", title: "ما الجديد فعلياً في React 19 وكيف يغير طريقة بنائنا للتطبيقات", author: "أحمد العلي", reads: "6.7K", time: "10د", tag: "برمجة", emoji: "⚛️", gradient: "from-sky-600 to-cyan-700", excerpt: "Server Components، Actions، useOptimistic — كل ما تحتاج معرفته." },
  { id: "startup-funding", title: "كيف جمعت شركتي 5 مليون دولار بدون شبكة علاقات", author: "ليلى صباح", reads: "21.1K", time: "12د", tag: "ريادة أعمال", emoji: "💼", gradient: "from-amber-600 to-orange-700", excerpt: "قصة رحلة من غرفة نوم إلى Series A." },
  { id: "remote-work", title: "العمل عن بُعد: كيف تبني وظيفة عالمية من بيتك", author: "كريم الزياني", reads: "4.3K", time: "9د", tag: "مهنة", emoji: "🌍", gradient: "from-violet-600 to-purple-700", excerpt: "دليل من 5 سنوات خبرة في شركات أمريكية وأوروبية." },
];

export const videosMock = [
  { id: "v1", title: "كيف تبني تطبيق SaaS من الصفر في 7 أيام", channel: "تقنيات", views: "184K", duration: "23:14", emoji: "🚀", gradient: "from-violet-600 to-indigo-700" },
  { id: "v2", title: "أسرار التصميم التي يخفيها كبار المصممين", channel: "ديزاين برو", views: "98K", duration: "15:42", emoji: "🎨", gradient: "from-pink-600 to-rose-700" },
  { id: "v3", title: "تعلم Python في ساعة كاملة - من الصفر للاحتراف", channel: "أكاديمية الكود", views: "1.2M", duration: "1:02:33", emoji: "🐍", gradient: "from-yellow-600 to-amber-700" },
  { id: "v4", title: "5 أخطاء كارثية يقع بها رواد الأعمال", channel: "Business AR", views: "67K", duration: "18:09", emoji: "💼", gradient: "from-emerald-600 to-teal-700" },
  { id: "v5", title: "أفضل أدوات الإنتاجية لعام 2026", channel: "Productivity", views: "203K", duration: "12:55", emoji: "⚡", gradient: "from-cyan-600 to-sky-700" },
  { id: "v6", title: "كيف تستثمر أول 1000 دولار بذكاء", channel: "ماليات", views: "445K", duration: "20:11", emoji: "💰", gradient: "from-amber-600 to-orange-700" },
];

export const forumsMock = [
  { slug: "tech", name: "التكنولوجيا", desc: "كل ما يتعلق بالبرمجة، الذكاء الاصطناعي، والأجهزة", topics: 8420, members: "124K", color: "from-blue-600 to-indigo-700", emoji: "💻" },
  { slug: "business", name: "ريادة الأعمال", desc: "نقاشات حول الشركات الناشئة، الاستثمار، والإدارة", topics: 4210, members: "67K", color: "from-emerald-600 to-teal-700", emoji: "📊" },
  { slug: "design", name: "التصميم والإبداع", desc: "UI/UX، الجرافيك، والهوية البصرية", topics: 2980, members: "42K", color: "from-pink-600 to-rose-700", emoji: "🎨" },
  { slug: "marketing", name: "التسويق الرقمي", desc: "SEO، إعلانات، نمو، وكتابة محتوى", topics: 3140, members: "51K", color: "from-amber-600 to-orange-700", emoji: "📣" },
  { slug: "learning", name: "التعليم الذاتي", desc: "كورسات، كتب، ومسارات تعلم", topics: 5670, members: "98K", color: "from-violet-600 to-purple-700", emoji: "🎓" },
  { slug: "health", name: "الصحة واللياقة", desc: "تغذية، رياضة، صحة نفسية", topics: 1820, members: "29K", color: "from-rose-600 to-red-700", emoji: "💪" },
];

export const topicsMock = [
  { id: "t1", title: "ما رأيكم بـ Cursor مقابل Copilot؟ تجربة 6 أشهر", author: "محمد علي", replies: 84, views: "12K", forum: "tech", time: "منذ ساعة" },
  { id: "t2", title: "كيف رفعت ترتيب موقعي من #50 إلى #1 في 90 يوماً", author: "هدى الشمري", replies: 142, views: "34K", forum: "marketing", time: "منذ 3 ساعات" },
  { id: "t3", title: "نصيحة: لا تطلق منتجك قبل أن تقرأ هذا", author: "كريم زياني", replies: 56, views: "8K", forum: "business", time: "منذ 5 ساعات" },
  { id: "t4", title: "أفضل كورس Frontend في 2026 — استطلاع", author: "سارة العتيبي", replies: 211, views: "18K", forum: "learning", time: "أمس" },
  { id: "t5", title: "كيف تصمم Dashboard لا يكره مستخدموه", author: "يوسف لحسن", replies: 73, views: "9.2K", forum: "design", time: "أمس" },
];

export const questionsMock = [
  { id: "q1", title: "ما الفرق العملي بين useEffect و useLayoutEffect؟", author: "Ali D", votes: 42, answers: 12, views: "3.4K", tags: ["react", "hooks"], time: "منذ ساعتين" },
  { id: "q2", title: "كيف أبدأ في تعلم Machine Learning بدون رياضيات قوية؟", author: "Mariam K", votes: 87, answers: 24, views: "9.1K", tags: ["ml", "تعلم"], time: "أمس" },
  { id: "q3", title: "ما أفضل طريقة لتنظيم قاعدة بيانات متعددة المستأجرين؟", author: "Tarek B", votes: 31, answers: 8, views: "1.8K", tags: ["postgres", "saas"], time: "منذ 3 أيام" },
  { id: "q4", title: "هل يستحق Next.js التحول من React الكلاسيكي؟", author: "Nour H", votes: 54, answers: 19, views: "6.7K", tags: ["nextjs"], time: "أسبوع" },
  { id: "q5", title: "كيف أبني Personal Brand بدون أن أكون متفاخراً؟", author: "Lina F", votes: 96, answers: 33, views: "14K", tags: ["مهنة", "تسويق"], time: "أسبوع" },
];

export const usersMock = [
  { username: "mohamed_h", name: "محمد حسن", role: "Admin", reputation: "12.4K", articles: 87, status: "نشط" },
  { username: "nour_eddine", name: "نور الدين", role: "Moderator", reputation: "8.9K", articles: 54, status: "نشط" },
  { username: "zaynab_m", name: "زينب محمد", role: "Creator", reputation: "15.2K", articles: 112, status: "نشط" },
  { username: "ahmed_ali", name: "أحمد العلي", role: "User", reputation: "6.7K", articles: 32, status: "نشط" },
  { username: "layla_s", name: "ليلى صباح", role: "Creator", reputation: "21K", articles: 78, status: "موقوف" },
  { username: "karim_z", name: "كريم الزياني", role: "User", reputation: "4.3K", articles: 19, status: "نشط" },
];

export const toolsMock = [
  { slug: "ai-writer", name: "كاتب الذكاء الاصطناعي", category: "ai", desc: "اكتب مقالات احترافية بثوانٍ", icon: "✍️", uses: "240K" },
  { slug: "image-upscale", name: "تكبير الصور بدون فقد", category: "image", desc: "ارفع جودة صورك حتى 4K", icon: "🖼️", uses: "180K" },
  { slug: "bg-remove", name: "إزالة خلفية الصور", category: "image", desc: "خلفية شفافة في ثانية", icon: "✂️", uses: "560K" },
  { slug: "pdf-merge", name: "دمج ملفات PDF", category: "pdf", desc: "ادمج عدة ملفات في ملف واحد", icon: "📑", uses: "98K" },
  { slug: "pdf-split", name: "تقسيم PDF", category: "pdf", desc: "استخرج صفحات محددة", icon: "📄", uses: "67K" },
  { slug: "pdf-to-word", name: "PDF إلى Word", category: "pdf", desc: "تحويل دقيق يحافظ على التنسيق", icon: "📝", uses: "302K" },
  { slug: "text-summarizer", name: "تلخيص النصوص", category: "text", desc: "لخّص أي نص بضغطة زر", icon: "📚", uses: "144K" },
  { slug: "grammar-check", name: "تدقيق نحوي عربي", category: "text", desc: "صحّح أخطاءك تلقائياً", icon: "✅", uses: "89K" },
  { slug: "seo-analyzer", name: "تحليل SEO", category: "seo", desc: "افحص موقعك واحصل على تقرير", icon: "🔍", uses: "212K" },
  { slug: "keyword-research", name: "بحث الكلمات المفتاحية", category: "seo", desc: "اكتشف ما يبحث عنه جمهورك", icon: "🎯", uses: "176K" },
  { slug: "ai-chat", name: "مساعد الدردشة الذكي", category: "ai", desc: "مساعد عربي يفهمك", icon: "💬", uses: "1.2M" },
  { slug: "ai-translate", name: "ترجمة احترافية AI", category: "ai", desc: "ترجمة سياقية بـ 100 لغة", icon: "🌐", uses: "445K" },
];

export const notificationsMock = [
  { id: 1, type: "like", text: "أعجب محمد علي بمقالك \"أدوات الذكاء الاصطناعي\"", time: "منذ 5 د", read: false },
  { id: 2, type: "comment", text: "علقت سارة على موضوعك في المنتدى", time: "منذ 30 د", read: false },
  { id: 3, type: "follow", text: "بدأ نور بمتابعتك", time: "منذ ساعة", read: false },
  { id: 4, type: "mention", text: "@أنت تم ذكرك في نقاش حول React 19", time: "منذ 3 ساعات", read: true },
  { id: 5, type: "system", text: "تم قبول مقالك \"7 عادات\" للنشر في الواجهة", time: "أمس", read: true },
];

export const messagesMock = [
  { id: 1, name: "محمد حسن", last: "تمام، نشتغل عليها بكرة 👌", time: "10:42", unread: 2, online: true },
  { id: 2, name: "زينب محمد", last: "شكراً جزيلاً على المقال!", time: "أمس", unread: 0, online: true },
  { id: 3, name: "ليلى صباح", last: "أرسلت لك ملف الـ pitch deck", time: "أمس", unread: 1, online: false },
  { id: 4, name: "Group: فريق التحرير", last: "نور: نشر المقال غداً ٩ ص", time: "الإثنين", unread: 0, online: false },
];
