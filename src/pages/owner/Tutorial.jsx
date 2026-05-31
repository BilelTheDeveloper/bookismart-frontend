import React, { useState, useEffect, useCallback } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  LayoutDashboard, CalendarCheck, MonitorPlay, Users, Briefcase, MessageSquare,
  Wallet, FileText, Star, Sparkles, BarChart3, Palette, CreditCard, Settings,
  Power, ShieldCheck, ChevronRight, ChevronLeft, CheckCircle2, Search,
  Target, Zap, ArrowRight, X, Lightbulb, Play, GraduationCap,
  Globe, Award, TrendingUp, ExternalLink, BookOpen,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   TUTORIAL CONTENT — 16 dashboard pages × 3 languages
   ───────────────────────────────────────────────────────────────────────────── */
const PAGES = [
  /* ─── MAIN ─── */
  {
    id: "overview", icon: LayoutDashboard, color: "indigo", section: "main",
    path: "/owner/dashboard",
    en: {
      name: "Dashboard Overview", goal: "Your business command center — see all key metrics instantly.",
      desc: "The Overview is your daily starting point. It consolidates today's schedule, pending confirmations, revenue KPIs, and recent activity into one powerful view so you never miss a beat.",
      features: [
        { t: "Today's Schedule", d: "All upcoming appointments in a clear, interactive timeline." },
        { t: "KPI Cards", d: "Revenue, bookings, completion rate and new customers at a glance." },
        { t: "Pending Confirmations", d: "Confirm or decline new booking requests in one click." },
        { t: "Quick Actions", d: "Jump to the most common tasks without navigating menus." },
      ],
      steps: ["Check the top KPI cards for a quick business health snapshot.", "Review pending booking requests and act immediately.", "Scroll through today's timeline to prepare for your day.", "Click any card to jump directly to its full detail page."],
      tips: ["Complete KYC first to unlock all features.", "Set up your website before sharing your booking link.", "Use Ctrl+K to open the command palette and jump anywhere instantly."],
    },
    fr: {
      name: "Vue d'ensemble", goal: "Votre centre de contrôle business — tous les indicateurs en un coup d'œil.",
      desc: "La page d'accueil est votre point de départ quotidien. Elle regroupe l'agenda du jour, les confirmations en attente et les KPIs dans une vue puissante.",
      features: [
        { t: "Agenda du jour", d: "Tous vos rendez-vous dans un planning interactif." },
        { t: "Cartes KPI", d: "Revenus, réservations, taux de complétion et nouveaux clients." },
        { t: "Confirmations en attente", d: "Confirmez ou refusez les nouvelles demandes en un clic." },
        { t: "Actions rapides", d: "Accédez aux tâches les plus courantes sans naviguer dans les menus." },
      ],
      steps: ["Vérifiez les cartes KPI pour une vue rapide sur la santé de votre business.", "Consultez les confirmations en attente et agissez immédiatement.", "Parcourez le planning du jour pour vous préparer.", "Cliquez sur n'importe quelle carte pour accéder à sa page complète."],
      tips: ["Complétez votre KYC en premier pour débloquer toutes les fonctionnalités.", "Configurez votre site avant de partager votre lien de réservation.", "Utilisez Ctrl+K pour ouvrir la palette de commandes et naviguer rapidement."],
    },
    ar: {
      name: "نظرة عامة", goal: "مركز قيادة عملك — رؤية جميع المقاييس الرئيسية دفعة واحدة.",
      desc: "صفحة النظرة العامة هي نقطة انطلاقك اليومية. تجمع جدول اليوم والتأكيدات المعلقة ومؤشرات الأداء في عرض واحد قوي.",
      features: [
        { t: "جدول اليوم", d: "جميع مواعيدك في جدول زمني تفاعلي وواضح." },
        { t: "بطاقات المؤشرات", d: "الإيرادات والحجوزات ومعدل الإتمام والعملاء الجدد." },
        { t: "التأكيدات المعلقة", d: "تأكيد أو رفض طلبات الحجز الجديدة بنقرة واحدة." },
        { t: "الإجراءات السريعة", d: "الوصول للمهام الأكثر شيوعاً مباشرة." },
      ],
      steps: ["تحقق من بطاقات المؤشرات للحصول على صورة سريعة عن عملك.", "راجع التأكيدات المعلقة وتصرف فوراً.", "تصفح جدول اليوم للتحضير.", "انقر على أي بطاقة للانتقال إلى صفحتها التفصيلية."],
      tips: ["أكمل التحقق من الهوية أولاً لفتح جميع الميزات.", "أعد موقعك قبل مشاركة رابط الحجز.", "استخدم Ctrl+K لفتح لوحة الأوامر والتنقل بسرعة."],
    },
  },
  /* ─── MANAGEMENT ─── */
  {
    id: "appointments", icon: CalendarCheck, color: "blue", section: "management",
    path: "/owner/dashboard/bookings",
    en: {
      name: "Appointments", goal: "Manage every booking from request to completion.",
      desc: "The Appointments page is your full booking management hub. View, filter, confirm, reschedule, and track every appointment in a powerful dashboard with real-time search and status tracking.",
      features: [
        { t: "Status Pipeline", d: "Filter bookings by Pending, Confirmed, Completed, Cancelled or No-show." },
        { t: "Real-time Search", d: "Instantly find any booking by customer name, email, phone or service." },
        { t: "Reschedule", d: "Drag bookings to a new slot with conflict detection built in." },
        { t: "Review Requests", d: "Send a review invite email to customers after service completion." },
        { t: "Completion Flow", d: "Mark as done and trigger loyalty points + auto-invoice in one click." },
      ],
      steps: ["Use the status filter tabs to find bookings needing action.", "Click a booking card to open full details.", "Confirm, reschedule, cancel or mark complete using the action buttons.", "Use the review request button to collect customer feedback after the appointment."],
      tips: ["Confirm bookings quickly — customers appreciate fast responses.", "Use the date filter to plan your week ahead.", "Send review requests within 24h while the experience is fresh."],
    },
    fr: {
      name: "Rendez-vous", goal: "Gérez chaque réservation de la demande à la complétion.",
      desc: "La page Rendez-vous est votre hub complet de gestion des réservations. Consultez, filtrez, confirmez, reprogrammez et suivez chaque rendez-vous.",
      features: [
        { t: "Pipeline de statuts", d: "Filtrez par En attente, Confirmé, Terminé, Annulé ou Absent." },
        { t: "Recherche instantanée", d: "Trouvez une réservation par nom, email, téléphone ou service." },
        { t: "Reprogrammation", d: "Déplacez les réservations vers un nouveau créneau avec détection des conflits." },
        { t: "Demande d'avis", d: "Envoyez un email d'invitation à laisser un avis après le service." },
        { t: "Flux de complétion", d: "Marquez comme terminé et déclenchez les points fidélité + facture auto." },
      ],
      steps: ["Utilisez les filtres de statut pour trouver les réservations nécessitant une action.", "Cliquez sur une carte de réservation pour voir les détails complets.", "Confirmez, reprogrammez, annulez ou marquez comme terminé.", "Envoyez des demandes d'avis dans les 24h après le rendez-vous."],
      tips: ["Confirmez rapidement — les clients apprécient les réponses rapides.", "Utilisez le filtre par date pour planifier votre semaine.", "Envoyez les demandes d'avis dans les 24h tant que l'expérience est fraîche."],
    },
    ar: {
      name: "المواعيد", goal: "إدارة كل حجز من الطلب حتى الإتمام.",
      desc: "صفحة المواعيد هي مركز إدارة الحجوزات الكامل. عرض وتصفية وتأكيد وإعادة جدولة وتتبع كل موعد.",
      features: [
        { t: "خط أنابيب الحالة", d: "تصفية الحجوزات: معلق، مؤكد، مكتمل، ملغى، غائب." },
        { t: "البحث الفوري", d: "إيجاد أي حجز باسم العميل أو البريد أو الهاتف أو الخدمة." },
        { t: "إعادة الجدولة", d: "نقل الحجوزات إلى وقت جديد مع كشف التعارض." },
        { t: "طلب التقييم", d: "إرسال بريد دعوة للتقييم بعد الانتهاء من الخدمة." },
        { t: "تدفق الإتمام", d: "التعليم كمكتمل وتفعيل نقاط الولاء والفاتورة التلقائية." },
      ],
      steps: ["استخدم فلاتر الحالة لإيجاد الحجوزات التي تحتاج إجراء.", "انقر على بطاقة الحجز لفتح التفاصيل الكاملة.", "أكد أو أعد الجدولة أو ألغ أو علّم كمكتمل باستخدام أزرار الإجراء.", "أرسل طلبات التقييم خلال 24 ساعة بعد الموعد."],
      tips: ["أكد الحجوزات بسرعة — العملاء يقدرون الاستجابة السريعة.", "استخدم فلتر التاريخ للتخطيط للأسبوع القادم.", "أرسل طلبات التقييم خلال 24 ساعة بينما التجربة لا تزال طازجة."],
    },
  },
  {
    id: "queue", icon: MonitorPlay, color: "cyan", section: "management",
    path: "/owner/dashboard/queue",
    en: {
      name: "Queue Screen", goal: "Live waiting-room display for your clients.",
      desc: "The Queue Screen is a live TV display designed to be shown on a screen in your waiting room. Customers can see their position, the current session timer, and estimated wait time — reducing anxiety and improving the customer experience.",
      features: [
        { t: "Live Position Display", d: "Shows each waiting customer's first name and queue position." },
        { t: "Session Timer", d: "Real-time countdown for the current active session." },
        { t: "Auto-refresh", d: "Updates in real-time via WebSocket — no manual refresh needed." },
        { t: "Privacy Safe", d: "Shows only first names, never full names or personal data." },
        { t: "Full-screen Mode", d: "Open the /display/:slug URL on any TV or tablet in your space." },
      ],
      steps: ["Go to Queue Screen in the sidebar.", "Start a consultation from a confirmed appointment to add customers to the queue.", "Open the display URL (/display/your-slug) on your waiting-room TV.", "The screen updates live as sessions start and end."],
      tips: ["Put the display link as a QR code at the entrance so clients can check their position on their phone.", "The timer starts automatically when you begin a consultation.", "No login is required for the display screen — it's fully public."],
    },
    fr: {
      name: "Écran file d'attente", goal: "Affichage en direct pour votre salle d'attente.",
      desc: "L'écran de file d'attente est un affichage TV conçu pour votre salle d'attente. Les clients voient leur position, le minuteur de session en cours et le temps d'attente estimé.",
      features: [
        { t: "Affichage de position en direct", d: "Montre le prénom et la position de chaque client en attente." },
        { t: "Minuteur de session", d: "Compte à rebours en temps réel pour la session active." },
        { t: "Mise à jour automatique", d: "Se met à jour en temps réel via WebSocket — pas de rechargement." },
        { t: "Respect de la vie privée", d: "N'affiche que les prénoms, jamais les données personnelles complètes." },
        { t: "Mode plein écran", d: "Ouvrez l'URL /display/:slug sur n'importe quelle TV ou tablette." },
      ],
      steps: ["Accédez à Écran file d'attente dans la barre latérale.", "Démarrez une consultation depuis un rendez-vous confirmé pour ajouter des clients.", "Ouvrez l'URL d'affichage sur la TV de votre salle d'attente.", "L'écran se met à jour en direct au fil des sessions."],
      tips: ["Affichez le lien en QR code à l'entrée pour que les clients vérifient leur position.", "Le minuteur démarre automatiquement avec la consultation.", "L'écran d'affichage est public — aucune connexion requise."],
    },
    ar: {
      name: "شاشة الانتظار", goal: "عرض مباشر لغرفة الانتظار لعملائك.",
      desc: "شاشة الانتظار هي عرض تلفزيوني مباشر مصمم لغرفة الانتظار. يرى العملاء موضعهم في الطابور ومؤقت الجلسة الحالية.",
      features: [
        { t: "عرض الموضع المباشر", d: "يعرض الاسم الأول وموضع كل عميل منتظر." },
        { t: "مؤقت الجلسة", d: "عد تنازلي في الوقت الفعلي للجلسة النشطة الحالية." },
        { t: "تحديث تلقائي", d: "يتحدث في الوقت الفعلي عبر WebSocket بدون إعادة تحميل." },
        { t: "حماية الخصوصية", d: "يعرض الأسماء الأولى فقط، وليس البيانات الشخصية الكاملة." },
        { t: "وضع الشاشة الكاملة", d: "افتح رابط /display/:slug على أي تلفزيون أو لوح في مكانك." },
      ],
      steps: ["انتقل إلى شاشة الانتظار في الشريط الجانبي.", "ابدأ استشارة من موعد مؤكد لإضافة عملاء إلى الطابور.", "افتح رابط العرض على تلفزيون غرفة الانتظار.", "تتحدث الشاشة مباشرة مع تقدم الجلسات."],
      tips: ["ضع رابط العرض كرمز QR عند المدخل ليتحقق العملاء من موضعهم.", "يبدأ المؤقت تلقائياً عند بدء الاستشارة.", "شاشة العرض عامة — لا يتطلب تسجيل دخول."],
    },
  },
  {
    id: "staff", icon: Users, color: "teal", section: "management",
    path: "/owner/dashboard/staff",
    en: {
      name: "Staff", goal: "Build and manage your team with role-based access.",
      desc: "The Staff page lets you invite team members, assign them roles (Manager, Receptionist, Staff), and control what they can access in the portal. Each staff member gets a personal login link.",
      features: [
        { t: "Invite by Link", d: "Send a secure invite link that guides staff through registration." },
        { t: "Role Assignment", d: "Manager, Receptionist, or Staff — each with different permissions." },
        { t: "Schedule Management", d: "Define working days and hours for each staff member." },
        { t: "Activate / Deactivate", d: "Instantly suspend or re-enable a staff member's access." },
        { t: "Staff Portal", d: "Staff log in to a simplified portal to see and manage bookings." },
      ],
      steps: ["Click 'Add Staff Member' and fill in their name, role and email.", "Share the generated invite link with the staff member.", "The staff member completes registration and sets their password.", "They can now access the Staff Portal at /staff/login."],
      tips: ["Give managers access to financial data and staff management.", "Deactivate staff immediately when they leave — no shared passwords needed.", "Staff see only the business they work for, not your full dashboard."],
    },
    fr: {
      name: "Personnel", goal: "Créez et gérez votre équipe avec un accès basé sur les rôles.",
      desc: "La page Personnel vous permet d'inviter des membres de l'équipe, de leur attribuer des rôles et de contrôler leur accès au portail. Chaque membre reçoit un lien de connexion personnel.",
      features: [
        { t: "Invitation par lien", d: "Envoyez un lien d'invitation sécurisé guidant le personnel à travers l'inscription." },
        { t: "Attribution de rôles", d: "Manager, Réceptionniste ou Personnel — chacun avec des permissions différentes." },
        { t: "Gestion des horaires", d: "Définissez les jours et heures de travail de chaque membre." },
        { t: "Activer / Désactiver", d: "Suspendez ou réactivez l'accès d'un membre immédiatement." },
        { t: "Portail du personnel", d: "Le personnel se connecte à un portail simplifié pour gérer les réservations." },
      ],
      steps: ["Cliquez sur 'Ajouter un membre' et remplissez son nom, rôle et email.", "Partagez le lien d'invitation généré avec le membre.", "Le membre complète l'inscription et définit son mot de passe.", "Il peut maintenant accéder au Portail Personnel sur /staff/login."],
      tips: ["Donnez aux managers accès aux données financières et à la gestion du personnel.", "Désactivez immédiatement un membre qui quitte — plus besoin de mots de passe partagés.", "Le personnel voit uniquement le business pour lequel il travaille."],
    },
    ar: {
      name: "الموظفون", goal: "بناء وإدارة فريقك بصلاحيات مبنية على الأدوار.",
      desc: "صفحة الموظفين تتيح لك دعوة أعضاء الفريق وتعيين أدوار لهم والتحكم في ما يمكنهم الوصول إليه. كل موظف يحصل على رابط تسجيل دخول شخصي.",
      features: [
        { t: "الدعوة عبر رابط", d: "أرسل رابط دعوة آمن يرشد الموظف خلال عملية التسجيل." },
        { t: "تعيين الأدوار", d: "مدير أو موظف استقبال أو موظف — كل منهم بصلاحيات مختلفة." },
        { t: "إدارة الجداول", d: "تحديد أيام وساعات العمل لكل موظف." },
        { t: "تفعيل / تعطيل", d: "تعليق أو إعادة تفعيل وصول الموظف فوراً." },
        { t: "بوابة الموظف", d: "يسجل الموظفون دخولهم لبوابة مبسطة لرؤية وإدارة الحجوزات." },
      ],
      steps: ["انقر على 'إضافة موظف' واملأ الاسم والدور والبريد الإلكتروني.", "شارك رابط الدعوة المولّد مع الموظف.", "يكمل الموظف التسجيل ويضع كلمة مروره.", "يمكنه الآن الوصول لبوابة الموظفين على /staff/login."],
      tips: ["أعط المديرين إمكانية الوصول للبيانات المالية وإدارة الموظفين.", "عطّل الموظفين فوراً عند مغادرتهم — لا حاجة لكلمات مرور مشتركة.", "الموظفون يرون فقط العمل الذي يعملون فيه، وليس لوحة التحكم الكاملة."],
    },
  },
  {
    id: "recruitment", icon: Briefcase, color: "violet", section: "management",
    path: "/owner/dashboard/recruitment",
    en: {
      name: "Recruitment", goal: "Post jobs and receive applications directly in your dashboard.",
      desc: "The Recruitment page allows you to post job openings for your business and receive applications from candidates on the Bookiify Find Work page. Review applicants, accept or reject, and manage your hiring pipeline.",
      features: [
        { t: "Job Posting", d: "Create detailed job listings with description, requirements and salary range." },
        { t: "Applications Inbox", d: "Review all candidate applications with their CV and cover letter." },
        { t: "Accept / Reject", d: "Move candidates through your pipeline with clear status updates." },
        { t: "Public Visibility", d: "Your jobs appear on the /find-work discovery page for job seekers." },
        { t: "Admin Review", d: "Listings go through a quick admin review before going live." },
      ],
      steps: ["Click 'Post New Job' and fill in the title, description, requirements and salary.", "Your listing is reviewed by admin and published on the Find Work page.", "Candidates apply — you receive notifications for each application.", "Review applications in your Recruitment dashboard and make decisions."],
      tips: ["Be specific about requirements to attract the right candidates.", "Respond to applicants quickly to maintain a good employer reputation.", "Hiring from Bookiify ensures candidates are vetted through the platform."],
    },
    fr: {
      name: "Recrutement", goal: "Publiez des offres d'emploi et recevez des candidatures directement.",
      desc: "La page Recrutement vous permet de publier des offres d'emploi et de recevoir des candidatures depuis la page Trouver un emploi de Bookiify. Gérez votre pipeline de recrutement.",
      features: [
        { t: "Publication d'offres", d: "Créez des offres détaillées avec description, exigences et salaire." },
        { t: "Boîte de réception des candidatures", d: "Consultez toutes les candidatures avec CV et lettre de motivation." },
        { t: "Accepter / Rejeter", d: "Faites progresser les candidats dans votre pipeline avec des mises à jour claires." },
        { t: "Visibilité publique", d: "Vos offres apparaissent sur la page /find-work pour les chercheurs d'emploi." },
        { t: "Revue admin", d: "Les annonces passent par une revue rapide avant d'être publiées." },
      ],
      steps: ["Cliquez sur 'Publier une offre' et remplissez le titre, la description et le salaire.", "Votre annonce est examinée par l'admin et publiée sur la page Find Work.", "Les candidats postulent — vous recevez des notifications pour chaque candidature.", "Examinez les candidatures dans votre tableau de bord et prenez des décisions."],
      tips: ["Soyez précis sur les exigences pour attirer les bons candidats.", "Répondez rapidement aux candidats pour maintenir une bonne réputation.", "Le recrutement via Bookiify garantit des candidats vérifiés par la plateforme."],
    },
    ar: {
      name: "التوظيف", goal: "انشر وظائف واستقبل الطلبات مباشرة في لوحة تحكمك.",
      desc: "صفحة التوظيف تتيح لك نشر فرص العمل واستقبال الطلبات من المرشحين على صفحة Bookiify للبحث عن عمل.",
      features: [
        { t: "نشر الوظائف", d: "أنشئ إعلانات وظيفية مفصلة مع الوصف والمتطلبات والراتب." },
        { t: "صندوق الطلبات", d: "راجع جميع طلبات المرشحين مع السيرة الذاتية وخطاب التقديم." },
        { t: "قبول / رفض", d: "انقل المرشحين عبر خط أنابيبك مع تحديثات واضحة للحالة." },
        { t: "الرؤية العامة", d: "وظائفك تظهر على صفحة /find-work لمن يبحثون عن عمل." },
        { t: "مراجعة الإدارة", d: "تمر الإعلانات بمراجعة سريعة قبل النشر." },
      ],
      steps: ["انقر على 'نشر وظيفة جديدة' واملأ العنوان والوصف والمتطلبات والراتب.", "تتم مراجعة إعلانك ونشره على صفحة البحث عن عمل.", "يتقدم المرشحون — تصلك إشعارات لكل طلب.", "راجع الطلبات في لوحة التوظيف واتخذ قراراتك."],
      tips: ["كن محدداً في المتطلبات لجذب المرشحين المناسبين.", "استجب للمتقدمين بسرعة للحفاظ على سمعة صاحب عمل جيد.", "التوظيف عبر Bookiify يضمن مرشحين تم التحقق منهم."],
    },
  },
  {
    id: "chat", icon: MessageSquare, color: "sky", section: "management",
    path: "/owner/dashboard/chat",
    en: {
      name: "Chat", goal: "Real-time messaging between you, your staff, and your customers.",
      desc: "The Chat page gives you a real-time communication hub. Create chat rooms, message staff members, and respond to customers — all in one organized interface powered by WebSocket.",
      features: [
        { t: "Real-time Messages", d: "Instant delivery via WebSocket — no page refresh needed." },
        { t: "Multiple Rooms", d: "Create separate rooms for different teams or conversations." },
        { t: "Participant Management", d: "Add or remove members from any room you control." },
        { t: "Typing Indicators", d: "See when someone is typing a response in real time." },
        { t: "Notification Badges", d: "Unread message count badges so you never miss a message." },
      ],
      steps: ["Click 'New Room' to create a conversation channel.", "Add participants by their name or email.", "Start messaging in real time.", "Receive push notifications when new messages arrive even on other pages."],
      tips: ["Create a dedicated room for each staff team to keep communication organized.", "Use chat for quick coordination during busy periods instead of phone calls.", "Messages are stored permanently — you can scroll back at any time."],
    },
    fr: {
      name: "Chat", goal: "Messagerie en temps réel entre vous, votre personnel et vos clients.",
      desc: "La page Chat vous offre un hub de communication en temps réel. Créez des salons, envoyez des messages au personnel et répondez aux clients dans une interface organisée.",
      features: [
        { t: "Messages en temps réel", d: "Livraison instantanée via WebSocket — pas de rechargement." },
        { t: "Salons multiples", d: "Créez des salons séparés pour différentes équipes ou conversations." },
        { t: "Gestion des participants", d: "Ajoutez ou retirez des membres de chaque salon." },
        { t: "Indicateurs de saisie", d: "Voyez quand quelqu'un rédige une réponse en temps réel." },
        { t: "Badges de notification", d: "Compteur de messages non lus pour ne rien manquer." },
      ],
      steps: ["Cliquez sur 'Nouveau salon' pour créer un canal de conversation.", "Ajoutez des participants par leur nom ou email.", "Commencez à envoyer des messages en temps réel.", "Recevez des notifications quand de nouveaux messages arrivent."],
      tips: ["Créez un salon dédié pour chaque équipe pour organiser la communication.", "Utilisez le chat pour la coordination rapide pendant les périodes chargées.", "Les messages sont stockés en permanence — vous pouvez faire défiler à tout moment."],
    },
    ar: {
      name: "المحادثة", goal: "المراسلة الفورية بينك وبين موظفيك وعملائك.",
      desc: "صفحة المحادثة تمنحك مركزاً للتواصل الفوري. أنشئ غرف دردشة وتواصل مع الموظفين وأجب على العملاء في واجهة منظمة.",
      features: [
        { t: "الرسائل الفورية", d: "توصيل فوري عبر WebSocket — لا حاجة لإعادة التحميل." },
        { t: "غرف متعددة", d: "أنشئ غرفاً منفصلة لفرق أو محادثات مختلفة." },
        { t: "إدارة المشاركين", d: "إضافة أو إزالة الأعضاء من أي غرفة تديرها." },
        { t: "مؤشرات الكتابة", d: "رؤية عندما يكتب شخص ما رداً في الوقت الفعلي." },
        { t: "شارات الإشعارات", d: "عداد الرسائل غير المقروءة لعدم تفويت أي رسالة." },
      ],
      steps: ["انقر على 'غرفة جديدة' لإنشاء قناة محادثة.", "أضف المشاركين بأسمائهم أو بريدهم الإلكتروني.", "ابدأ المراسلة في الوقت الفعلي.", "استقبل إشعارات عند وصول رسائل جديدة حتى في الصفحات الأخرى."],
      tips: ["أنشئ غرفة مخصصة لكل فريق موظفين لتنظيم التواصل.", "استخدم الدردشة للتنسيق السريع خلال فترات الانشغال.", "الرسائل مخزنة بشكل دائم — يمكنك التمرير للخلف في أي وقت."],
    },
  },
  {
    id: "workmode", icon: Power, color: "emerald", section: "management",
    path: "/owner/dashboard/work-mode",
    en: {
      name: "Work Mode", goal: "Simplified daily interface optimized for in-business use.",
      desc: "Work Mode is a streamlined view designed for use at your business during operational hours. Manage the live queue, start consultations, handle walk-ins, and let staff join via a secure invite link — all from a mobile-friendly interface.",
      features: [
        { t: "Live Queue", d: "See all today's appointments in a queue and manage flow." },
        { t: "Consultations", d: "Start a real-time session with a timer for each customer." },
        { t: "Walk-in Booking", d: "Add customers who arrive without prior booking." },
        { t: "Staff Access Link", d: "Generate a secure invite link for staff to join Work Mode." },
        { t: "Session Timer", d: "Countdown timer per customer visible on the waiting-room screen." },
      ],
      steps: ["Enter Work Mode from the sidebar when you open your business.", "The queue shows all today's confirmed appointments.", "Click 'Start Session' to begin a consultation with the next customer.", "Mark as complete to move to the next customer automatically."],
      tips: ["Keep Work Mode open on a tablet at your workstation for easy access.", "The waiting-room screen (/display/:slug) updates automatically from Work Mode.", "Staff can join Work Mode via an invite link — no separate login needed."],
    },
    fr: {
      name: "Mode Travail", goal: "Interface quotidienne simplifiée optimisée pour une utilisation en business.",
      desc: "Le Mode Travail est une vue rationalisée conçue pour une utilisation pendant les heures d'ouverture. Gérez la file en direct, démarrez des consultations et gérez les clients sans réservation.",
      features: [
        { t: "File en direct", d: "Voyez tous les rendez-vous du jour en file et gérez le flux." },
        { t: "Consultations", d: "Démarrez une session en temps réel avec minuteur par client." },
        { t: "Réservation sans RDV", d: "Ajoutez des clients arrivant sans réservation préalable." },
        { t: "Lien d'accès personnel", d: "Générez un lien d'invitation sécurisé pour que le personnel rejoigne." },
        { t: "Minuteur de session", d: "Compte à rebours par client visible sur l'écran de la salle d'attente." },
      ],
      steps: ["Entrez en Mode Travail depuis la barre latérale à l'ouverture.", "La file affiche tous les rendez-vous confirmés du jour.", "Cliquez sur 'Démarrer la session' pour commencer une consultation.", "Marquez comme terminé pour passer automatiquement au client suivant."],
      tips: ["Gardez le Mode Travail ouvert sur une tablette pour un accès facile.", "L'écran de salle d'attente se met à jour automatiquement depuis le Mode Travail.", "Le personnel peut rejoindre via un lien — pas de connexion séparée nécessaire."],
    },
    ar: {
      name: "وضع العمل", goal: "واجهة يومية مبسطة محسّنة للاستخدام داخل العمل.",
      desc: "وضع العمل هو عرض مبسط مصمم للاستخدام خلال ساعات العمل. إدارة الطابور المباشر وبدء الاستشارات وإضافة العملاء العابرين.",
      features: [
        { t: "الطابور المباشر", d: "رؤية جميع مواعيد اليوم في طابور وإدارة التدفق." },
        { t: "الاستشارات", d: "بدء جلسة في الوقت الفعلي مع مؤقت لكل عميل." },
        { t: "الحجز الفوري", d: "إضافة عملاء يصلون بدون حجز مسبق." },
        { t: "رابط وصول الموظف", d: "توليد رابط دعوة آمن للموظفين للانضمام لوضع العمل." },
        { t: "مؤقت الجلسة", d: "عداد تنازلي لكل عميل يظهر على شاشة غرفة الانتظار." },
      ],
      steps: ["أدخل وضع العمل من الشريط الجانبي عند فتح عملك.", "يعرض الطابور جميع المواعيد المؤكدة لليوم.", "انقر على 'بدء الجلسة' لبدء استشارة مع العميل التالي.", "علّم كمكتمل للانتقال تلقائياً للعميل التالي."],
      tips: ["احتفظ بوضع العمل مفتوحاً على لوح للوصول السهل.", "تتحدث شاشة غرفة الانتظار تلقائياً من وضع العمل.", "يمكن للموظفين الانضمام عبر رابط دعوة — لا حاجة لتسجيل دخول منفصل."],
    },
  },
  /* ─── FINANCE ─── */
  {
    id: "finance", icon: Wallet, color: "amber", section: "finance",
    path: "/owner/dashboard/finance",
    en: {
      name: "Financials", goal: "Track your revenue, expenses, and financial health.",
      desc: "The Financials page gives you a complete picture of your business finances. View revenue over time, track transactions, monitor cash flow, and analyze earnings by service or period.",
      features: [
        { t: "Revenue Dashboard", d: "Visual charts showing daily, weekly and monthly earnings." },
        { t: "Transaction Log", d: "Complete history of all financial transactions with filters." },
        { t: "Revenue by Service", d: "See which services generate the most income." },
        { t: "Wallet Overview", d: "Your Bookiify wallet balance and pending amounts." },
        { t: "Period Comparison", d: "Compare performance across different time periods." },
      ],
      steps: ["Select a date range to see revenue for a specific period.", "Use the service breakdown to see your most profitable services.", "Export transactions for your accounting records.", "Monitor the trend chart to spot seasonal patterns."],
      tips: ["Check financials weekly to stay on top of your cash flow.", "Use service revenue breakdown to decide which services to promote.", "Compare month-over-month to track business growth."],
    },
    fr: {
      name: "Finances", goal: "Suivez vos revenus, dépenses et santé financière.",
      desc: "La page Finances vous donne une image complète de vos finances. Visualisez les revenus dans le temps, suivez les transactions et analysez les gains par service ou période.",
      features: [
        { t: "Tableau de bord revenus", d: "Graphiques visuels des gains quotidiens, hebdomadaires et mensuels." },
        { t: "Journal des transactions", d: "Historique complet de toutes les transactions financières." },
        { t: "Revenus par service", d: "Voyez quels services génèrent le plus de revenus." },
        { t: "Aperçu du portefeuille", d: "Votre solde Bookiify et les montants en attente." },
        { t: "Comparaison de périodes", d: "Comparez les performances sur différentes périodes." },
      ],
      steps: ["Sélectionnez une plage de dates pour voir les revenus d'une période.", "Utilisez la ventilation par service pour voir vos services les plus rentables.", "Exportez les transactions pour votre comptabilité.", "Surveillez le graphique de tendance pour repérer les patterns saisonniers."],
      tips: ["Vérifiez les finances chaque semaine pour rester au courant de votre trésorerie.", "Utilisez la ventilation des revenus pour décider quels services promouvoir.", "Comparez mois par mois pour suivre la croissance de votre business."],
    },
    ar: {
      name: "المالية", goal: "تتبع إيراداتك ونفقاتك وصحتك المالية.",
      desc: "صفحة المالية تعطيك صورة كاملة عن مالية عملك. عرض الإيرادات عبر الزمن وتتبع المعاملات وتحليل الأرباح حسب الخدمة أو الفترة.",
      features: [
        { t: "لوحة الإيرادات", d: "مخططات بيانية توضح الأرباح اليومية والأسبوعية والشهرية." },
        { t: "سجل المعاملات", d: "تاريخ كامل لجميع المعاملات المالية مع فلاتر." },
        { t: "الإيرادات حسب الخدمة", d: "معرفة الخدمات التي تولد أكبر دخل." },
        { t: "نظرة عامة على المحفظة", d: "رصيد محفظتك في Bookiify والمبالغ المعلقة." },
        { t: "مقارنة الفترات", d: "مقارنة الأداء عبر فترات زمنية مختلفة." },
      ],
      steps: ["اختر نطاقاً زمنياً لرؤية الإيرادات لفترة محددة.", "استخدم تفصيل الخدمات لرؤية خدماتك الأكثر ربحية.", "صدّر المعاملات لسجلاتك المحاسبية.", "راقب مخطط الاتجاه لاكتشاف الأنماط الموسمية."],
      tips: ["تحقق من الماليات أسبوعياً للبقاء على اطلاع بالتدفق النقدي.", "استخدم تفصيل الإيرادات لتقرر أي الخدمات تروج لها.", "قارن شهراً بشهر لتتبع نمو عملك."],
    },
  },
  {
    id: "invoices", icon: FileText, color: "orange", section: "finance",
    path: "/owner/dashboard/invoices",
    en: {
      name: "Invoices", goal: "Create, send and manage professional invoices.",
      desc: "The Invoices page lets you create branded invoices, send them to customers by email, and track their payment status. Invoices can be auto-generated when a booking is completed.",
      features: [
        { t: "Auto-generation", d: "Invoices are automatically drafted when you mark a booking complete." },
        { t: "PDF Export", d: "Download or email invoices as professionally formatted PDFs." },
        { t: "Custom Line Items", d: "Add multiple services, products or charges to a single invoice." },
        { t: "Tax Calculation", d: "Automatic tax calculation (19% TVA) with configurable rates." },
        { t: "Payment Status", d: "Track draft, sent, paid, and overdue statuses per invoice." },
      ],
      steps: ["Go to Invoices and click 'New Invoice'.", "Select the customer and add services or products.", "Set the due date, add any notes, and hit Send.", "The customer receives the invoice by email and you track payment status."],
      tips: ["Enable auto-invoice generation in the booking completion flow.", "Always add your business details in Settings before sending invoices.", "Mark invoices as paid manually when you receive cash or bank transfer payments."],
    },
    fr: {
      name: "Factures", goal: "Créez, envoyez et gérez des factures professionnelles.",
      desc: "La page Factures vous permet de créer des factures avec votre branding, de les envoyer par email et de suivre leur statut de paiement. Les factures peuvent être générées automatiquement.",
      features: [
        { t: "Génération automatique", d: "Les factures sont automatiquement créées à la complétion d'une réservation." },
        { t: "Export PDF", d: "Téléchargez ou envoyez des factures en PDF bien formatées." },
        { t: "Lignes personnalisées", d: "Ajoutez plusieurs services, produits ou charges sur une facture." },
        { t: "Calcul des taxes", d: "Calcul automatique de la TVA (19%) avec taux configurables." },
        { t: "Statut de paiement", d: "Suivez: brouillon, envoyée, payée, et en retard par facture." },
      ],
      steps: ["Allez dans Factures et cliquez sur 'Nouvelle Facture'.", "Sélectionnez le client et ajoutez des services ou produits.", "Définissez la date d'échéance, ajoutez des notes, et envoyez.", "Le client reçoit la facture par email et vous suivez le statut de paiement."],
      tips: ["Activez la génération automatique dans le flux de complétion des réservations.", "Ajoutez les détails de votre business dans Paramètres avant d'envoyer des factures.", "Marquez les factures comme payées manuellement pour les paiements en espèces."],
    },
    ar: {
      name: "الفواتير", goal: "إنشاء وإرسال وإدارة الفواتير الاحترافية.",
      desc: "صفحة الفواتير تتيح لك إنشاء فواتير بعلامتك التجارية وإرسالها بالبريد الإلكتروني وتتبع حالة الدفع. يمكن توليد الفواتير تلقائياً عند اكتمال الحجز.",
      features: [
        { t: "التوليد التلقائي", d: "تُنشأ الفواتير تلقائياً عند تعليم الحجز كمكتمل." },
        { t: "تصدير PDF", d: "تنزيل أو إرسال الفواتير كملفات PDF منسقة باحترافية." },
        { t: "بنود مخصصة", d: "إضافة خدمات أو منتجات أو رسوم متعددة لفاتورة واحدة." },
        { t: "حساب الضريبة", d: "حساب تلقائي للضريبة (19% TVA) مع معدلات قابلة للتخصيص." },
        { t: "حالة الدفع", d: "تتبع: مسودة، مرسلة، مدفوعة، ومتأخرة لكل فاتورة." },
      ],
      steps: ["اذهب إلى الفواتير وانقر على 'فاتورة جديدة'.", "اختر العميل وأضف الخدمات أو المنتجات.", "حدد تاريخ الاستحقاق وأضف ملاحظات ثم أرسل.", "يستقبل العميل الفاتورة بالبريد وتتابع حالة الدفع."],
      tips: ["فعّل التوليد التلقائي في تدفق اكتمال الحجز.", "أضف تفاصيل عملك في الإعدادات قبل إرسال الفواتير.", "علّم الفواتير كمدفوعة يدوياً عند استقبال المدفوعات نقداً."],
    },
  },
  {
    id: "loyalty", icon: Star, color: "yellow", section: "finance",
    path: "/owner/dashboard/loyalty",
    en: {
      name: "Loyalty", goal: "Reward your best customers and increase retention.",
      desc: "The Loyalty page lets you create a points or stamps program that automatically rewards customers for each visit. Set redemption rules, track customer balances, and boost repeat bookings.",
      features: [
        { t: "Points or Stamps", d: "Choose between a points-based or stamp-card loyalty system." },
        { t: "Auto-Award", d: "Points or stamps awarded automatically on booking completion." },
        { t: "Redemption Rules", d: "Define how many points equal a reward or free service." },
        { t: "Customer Balances", d: "View each customer's points balance and visit history." },
        { t: "Discount Codes", d: "Generate redeemable discount codes for loyal customers." },
      ],
      steps: ["Go to Loyalty and create your program (points or stamps).", "Set how many points/stamps per booking and what reward they earn.", "Points are automatically awarded when you mark bookings as complete.", "Customers can redeem points at their next booking."],
      tips: ["A stamp card (e.g., 10th visit free) is simple and effective for service businesses.", "Mention your loyalty program when customers book — it encourages repeat visits.", "Check the top customers leaderboard to identify your VIP clients."],
    },
    fr: {
      name: "Fidélité", goal: "Récompensez vos meilleurs clients et augmentez la rétention.",
      desc: "La page Fidélité vous permet de créer un programme de points ou de tampons qui récompense automatiquement les clients à chaque visite.",
      features: [
        { t: "Points ou tampons", d: "Choisissez entre un système basé sur les points ou les tampons." },
        { t: "Attribution automatique", d: "Points ou tampons attribués automatiquement à la complétion d'une réservation." },
        { t: "Règles de remboursement", d: "Définissez combien de points valent une récompense ou un service gratuit." },
        { t: "Soldes clients", d: "Consultez le solde de points et l'historique de chaque client." },
        { t: "Codes de réduction", d: "Générez des codes de réduction remboursables pour les clients fidèles." },
      ],
      steps: ["Allez dans Fidélité et créez votre programme (points ou tampons).", "Définissez combien de points/tampons par réservation et quelle récompense.", "Les points sont attribués automatiquement à la complétion des réservations.", "Les clients peuvent échanger leurs points lors de leur prochaine réservation."],
      tips: ["Un carnet de tampons (ex: 10ème visite gratuite) est simple et efficace.", "Mentionnez votre programme lors des réservations — ça encourage les visites répétées.", "Consultez le classement des meilleurs clients pour identifier vos VIPs."],
    },
    ar: {
      name: "الولاء", goal: "كافئ أفضل عملائك وزد معدل الاحتفاظ بهم.",
      desc: "صفحة الولاء تتيح لك إنشاء برنامج نقاط أو طوابع يكافئ العملاء تلقائياً على كل زيارة.",
      features: [
        { t: "نقاط أو طوابع", d: "اختر بين نظام الولاء المبني على النقاط أو الطوابع." },
        { t: "المنح التلقائي", d: "تُمنح النقاط أو الطوابع تلقائياً عند اكتمال الحجز." },
        { t: "قواعد الاسترداد", d: "تحديد كم نقطة تساوي مكافأة أو خدمة مجانية." },
        { t: "أرصدة العملاء", d: "عرض رصيد نقاط كل عميل وتاريخ زياراته." },
        { t: "رموز الخصم", d: "توليد رموز خصم قابلة للاسترداد للعملاء المخلصين." },
      ],
      steps: ["اذهب للولاء وأنشئ برنامجك (نقاط أو طوابع).", "حدد عدد النقاط/الطوابع لكل حجز وما هي المكافأة.", "تُمنح النقاط تلقائياً عند تعليم الحجوزات كمكتملة.", "يمكن للعملاء استبدال نقاطهم في حجزهم التالي."],
      tips: ["كرت الطوابع (مثل الزيارة العاشرة مجانية) بسيط وفعّال لأعمال الخدمات.", "اذكر برنامج الولاء عند الحجز — يشجع الزيارات المتكررة.", "تحقق من قائمة أفضل العملاء لتحديد عملائك المميزين."],
    },
  },
  /* ─── GROWTH ─── */
  {
    id: "smartai", icon: Sparkles, color: "purple", section: "growth",
    path: "/owner/dashboard/smart-ai",
    en: {
      name: "Smart AI", goal: "Your AI-powered business advisor available 24/7.",
      desc: "The Smart AI assistant gives you instant, context-aware business advice. Ask about pricing strategy, marketing ideas, how to handle customer situations, or get insights on your booking data — all powered by AI.",
      features: [
        { t: "Business Advice", d: "Get strategic recommendations tailored to your business category." },
        { t: "Marketing Ideas", d: "Generate promotion concepts, social media posts, and campaign ideas." },
        { t: "Data Insights", d: "Ask questions about your bookings, revenue, or customer patterns." },
        { t: "Customer Handling", d: "Get scripts and advice for difficult customer situations." },
        { t: "24/7 Availability", d: "Always available — get answers outside of business hours too." },
      ],
      steps: ["Open Smart AI from the sidebar.", "Type your question or business challenge in the chat.", "The AI responds with tailored, actionable advice.", "Follow up with clarifying questions to dig deeper."],
      tips: ["Be specific in your questions to get more targeted advice.", "Use it to draft customer communication like emails or response templates.", "Ask for a monthly business review based on your recent data."],
    },
    fr: {
      name: "Smart AI", goal: "Votre conseiller business IA disponible 24h/24.",
      desc: "L'assistant Smart AI vous donne des conseils business instantanés et contextuels. Posez des questions sur la stratégie de prix, les idées marketing ou la gestion clients.",
      features: [
        { t: "Conseils business", d: "Obtenez des recommandations stratégiques adaptées à votre catégorie." },
        { t: "Idées marketing", d: "Générez des concepts de promotions, posts sociaux et campagnes." },
        { t: "Insights données", d: "Posez des questions sur vos réservations, revenus ou patterns clients." },
        { t: "Gestion clients", d: "Obtenez des scripts et conseils pour les situations clients difficiles." },
        { t: "Disponibilité 24/7", d: "Toujours disponible — obtenez des réponses en dehors des heures d'ouverture." },
      ],
      steps: ["Ouvrez Smart AI depuis la barre latérale.", "Tapez votre question ou défi business dans le chat.", "L'IA répond avec des conseils adaptés et actionnables.", "Posez des questions complémentaires pour approfondir."],
      tips: ["Soyez précis dans vos questions pour obtenir des conseils plus ciblés.", "Utilisez-le pour rédiger des communications clients comme des emails.", "Demandez une revue mensuelle basée sur vos données récentes."],
    },
    ar: {
      name: "المساعد الذكي", goal: "مستشارك الذكي للأعمال متاح على مدار الساعة.",
      desc: "يمنحك المساعد الذكي نصائح أعمال فورية وسياقية. اسأل عن استراتيجية التسعير أو أفكار التسويق أو إدارة العملاء.",
      features: [
        { t: "نصائح الأعمال", d: "احصل على توصيات استراتيجية مخصصة لفئة عملك." },
        { t: "أفكار التسويق", d: "توليد مفاهيم ترويجية ومنشورات وسائل التواصل وأفكار الحملات." },
        { t: "رؤى البيانات", d: "اطرح أسئلة حول حجوزاتك أو إيراداتك أو أنماط عملائك." },
        { t: "إدارة العملاء", d: "احصل على نصوص ونصائح لمواقف العملاء الصعبة." },
        { t: "الإتاحة 24/7", d: "متاح دائماً — احصل على إجابات خارج ساعات العمل أيضاً." },
      ],
      steps: ["افتح المساعد الذكي من الشريط الجانبي.", "اكتب سؤالك أو تحديك التجاري في الدردشة.", "يستجيب الذكاء الاصطناعي بنصائح مخصصة وقابلة للتنفيذ.", "تابع بأسئلة توضيحية للتعمق أكثر."],
      tips: ["كن محدداً في أسئلتك للحصول على نصائح أكثر استهدافاً.", "استخدمه لصياغة التواصل مع العملاء كالبريد الإلكتروني.", "اطلب مراجعة شهرية للأعمال بناءً على بياناتك الأخيرة."],
    },
  },
  {
    id: "analytics", icon: BarChart3, color: "pink", section: "growth",
    path: "/owner/dashboard/stats",
    en: {
      name: "Analytics", goal: "Deep-dive insights into your business performance.",
      desc: "The Analytics page gives you visual, data-driven insights into your business. Track booking trends, service popularity, customer retention, completion rates, and seasonal patterns to make smarter decisions.",
      features: [
        { t: "Booking Trends", d: "Monthly and weekly charts showing booking volume over time." },
        { t: "Top Services", d: "Ranking of your most booked and most profitable services." },
        { t: "Completion Rate", d: "The ratio of completed vs cancelled and no-show bookings." },
        { t: "Customer Insights", d: "New vs returning customers, peak hours, and demographics." },
        { t: "Revenue Timeline", d: "Visual revenue chart with period-over-period comparison." },
      ],
      steps: ["Select the time period you want to analyze (this month, last quarter, etc.).", "Review the booking trend chart for volume patterns.", "Check the top services table to see what's performing best.", "Use the completion rate metric to identify operational issues."],
      tips: ["Look for seasonal patterns to plan promotions and staffing in advance.", "A low completion rate (< 70%) may indicate scheduling issues — investigate.", "Share analytics screenshots with your team to align on goals."],
    },
    fr: {
      name: "Analytique", goal: "Analyse approfondie des performances de votre business.",
      desc: "La page Analytique vous donne des insights visuels basés sur les données. Suivez les tendances de réservation, la popularité des services, la rétention clients et les taux de complétion.",
      features: [
        { t: "Tendances de réservation", d: "Graphiques mensuels et hebdomadaires du volume de réservations." },
        { t: "Top services", d: "Classement de vos services les plus réservés et rentables." },
        { t: "Taux de complétion", d: "Le ratio de réservations terminées vs annulées et absents." },
        { t: "Insights clients", d: "Nouveaux vs récurrents, heures de pointe et démographiques." },
        { t: "Timeline revenus", d: "Graphique des revenus avec comparaison période sur période." },
      ],
      steps: ["Sélectionnez la période à analyser (ce mois, dernier trimestre, etc.).", "Consultez le graphique de tendance pour les patterns de volume.", "Vérifiez le tableau des top services pour voir ce qui performe le mieux.", "Utilisez le taux de complétion pour identifier les problèmes opérationnels."],
      tips: ["Cherchez des patterns saisonniers pour planifier promotions et personnel.", "Un taux de complétion bas (< 70%) peut indiquer des problèmes — investiguer.", "Partagez des captures d'écran avec votre équipe pour aligner les objectifs."],
    },
    ar: {
      name: "التحليلات", goal: "رؤى معمقة حول أداء عملك.",
      desc: "صفحة التحليلات تمنحك رؤى بصرية مبنية على البيانات. تتبع اتجاهات الحجز وشعبية الخدمات والاحتفاظ بالعملاء ومعدلات الإتمام.",
      features: [
        { t: "اتجاهات الحجز", d: "مخططات شهرية وأسبوعية تظهر حجم الحجوزات عبر الزمن." },
        { t: "أفضل الخدمات", d: "تصنيف خدماتك الأكثر حجزاً والأكثر ربحية." },
        { t: "معدل الإتمام", d: "نسبة الحجوزات المكتملة مقابل الملغاة وحالات الغياب." },
        { t: "رؤى العملاء", d: "العملاء الجدد مقابل العائدين وساعات الذروة." },
        { t: "جدول الإيرادات", d: "مخطط الإيرادات مع مقارنة فترة بفترة." },
      ],
      steps: ["اختر الفترة الزمنية للتحليل (هذا الشهر، الربع الأخير، إلخ).", "راجع مخطط الاتجاه لأنماط الحجم.", "تحقق من جدول أفضل الخدمات لرؤية ما يؤدي بشكل أفضل.", "استخدم معدل الإتمام لتحديد المشكلات التشغيلية."],
      tips: ["ابحث عن الأنماط الموسمية لتخطيط العروض والتوظيف مسبقاً.", "معدل الإتمام المنخفض (< 70%) قد يشير لمشاكل في الجدولة — حقق الأمر.", "شارك لقطات التحليلات مع فريقك لتوافق الأهداف."],
    },
  },
  {
    id: "website", icon: Palette, color: "rose", section: "growth",
    path: "/owner/dashboard/themes",
    en: {
      name: "Website Builder", goal: "Create your professional online presence in minutes.",
      desc: "The Website Builder lets you create a stunning online business page tailored to your category. Choose a theme, add your services, gallery, opening hours, and publish your booking page — no coding needed.",
      features: [
        { t: "Category Themes", d: "Dozens of beautiful templates for barbers, doctors, coaches, and more." },
        { t: "Service Catalog", d: "Add services with name, description, price, and duration." },
        { t: "Gallery", d: "Upload before/after photos and a portfolio gallery." },
        { t: "Business Hours", d: "Set your opening hours, breaks, and special closing dates." },
        { t: "Booking Integration", d: "Your website automatically connects to your booking system." },
      ],
      steps: ["Go to Website Builder and select your business category.", "Choose a theme that matches your brand.", "Add your services, gallery images, hours, and contact info.", "Submit for admin approval — once approved, your page goes live."],
      tips: ["Add high-quality photos to your gallery to attract more customers.", "Keep your service prices and durations up to date.", "Share your /p/:slug link everywhere — Instagram bio, WhatsApp status, etc."],
    },
    fr: {
      name: "Créateur de site", goal: "Créez votre présence en ligne professionnelle en quelques minutes.",
      desc: "Le Créateur de site vous permet de créer une belle page business adaptée à votre catégorie. Choisissez un thème, ajoutez vos services et publiez — sans code.",
      features: [
        { t: "Thèmes par catégorie", d: "Des dizaines de modèles pour coiffeurs, médecins, coachs et plus." },
        { t: "Catalogue de services", d: "Ajoutez des services avec nom, description, prix et durée." },
        { t: "Galerie", d: "Uploadez des photos avant/après et une galerie portfolio." },
        { t: "Horaires d'ouverture", d: "Définissez vos horaires, pauses et dates de fermeture spéciales." },
        { t: "Intégration réservation", d: "Votre site se connecte automatiquement à votre système de réservation." },
      ],
      steps: ["Allez dans Créateur de site et sélectionnez votre catégorie.", "Choisissez un thème correspondant à votre marque.", "Ajoutez vos services, photos, horaires et coordonnées.", "Soumettez pour approbation — une fois approuvé, votre page est en ligne."],
      tips: ["Ajoutez des photos de haute qualité pour attirer plus de clients.", "Maintenez vos prix et durées à jour.", "Partagez votre lien /p/:slug partout — bio Instagram, statut WhatsApp, etc."],
    },
    ar: {
      name: "منشئ الموقع", goal: "أنشئ حضورك المهني على الإنترنت في دقائق.",
      desc: "منشئ الموقع يتيح لك إنشاء صفحة عمل احترافية مصممة خصيصاً لفئتك. اختر قالباً وأضف خدماتك وانشر صفحة الحجز — بدون برمجة.",
      features: [
        { t: "قوالب حسب الفئة", d: "عشرات القوالب الجميلة للحلاقة والأطباء والمدربين وأكثر." },
        { t: "كتالوج الخدمات", d: "أضف خدمات بالاسم والوصف والسعر والمدة." },
        { t: "معرض الصور", d: "رفع صور قبل/بعد ومعرض بورتفوليو." },
        { t: "ساعات العمل", d: "تحديد ساعات الفتح والفترات الراحة وتواريخ الإغلاق الخاص." },
        { t: "تكامل الحجز", d: "موقعك يتصل تلقائياً بنظام الحجز الخاص بك." },
      ],
      steps: ["اذهب لمنشئ الموقع واختر فئة عملك.", "اختر قالباً يناسب علامتك التجارية.", "أضف خدماتك وصور معرضك وساعات عملك ومعلومات الاتصال.", "قدّم للموافقة — بمجرد الموافقة، تصبح صفحتك مباشرة."],
      tips: ["أضف صوراً عالية الجودة لمعرضك لجذب المزيد من العملاء.", "احتفظ بأسعار ومدد خدماتك محدثة.", "شارك رابط /p/:slug في كل مكان — بايو إنستغرام وحالة واتساب وأكثر."],
    },
  },
  /* ─── ACCOUNT ─── */
  {
    id: "billing", icon: CreditCard, color: "green", section: "account",
    path: "/owner/dashboard/billing",
    en: {
      name: "Subscription", goal: "Manage your plan, billing, and access level.",
      desc: "The Subscription page shows your current plan details, trial status, and billing information. Upgrade your plan to unlock premium features and increase limits.",
      features: [
        { t: "Trial Status", d: "Days remaining on your free trial and what happens after." },
        { t: "Plan Comparison", d: "Side-by-side comparison of Free, Basic, Premium and Pro plans." },
        { t: "Feature Access", d: "Clear view of which features each plan unlocks." },
        { t: "Billing History", d: "Download invoices for your subscription payments." },
        { t: "Upgrade Flow", d: "One-click upgrade to a higher plan when ready." },
      ],
      steps: ["View your current plan and trial expiration date.", "Click 'Compare Plans' to see what each plan includes.", "Choose the plan that fits your business size.", "Complete payment and your new limits activate instantly."],
      tips: ["Your free trial gives you full access to all features — use it to learn the platform.", "Upgrade before the trial ends to avoid service interruption.", "Premium plan is recommended for businesses with more than 20 bookings per week."],
    },
    fr: {
      name: "Abonnement", goal: "Gérez votre plan, facturation et niveau d'accès.",
      desc: "La page Abonnement affiche les détails de votre plan actuel, le statut d'essai et les informations de facturation. Améliorez votre plan pour débloquer des fonctionnalités premium.",
      features: [
        { t: "Statut d'essai", d: "Jours restants sur votre essai gratuit et ce qui se passe après." },
        { t: "Comparaison des plans", d: "Comparaison côte à côte des plans Gratuit, Basic, Premium et Pro." },
        { t: "Accès fonctionnalités", d: "Vue claire des fonctionnalités débloquées par chaque plan." },
        { t: "Historique de facturation", d: "Téléchargez les factures de vos paiements d'abonnement." },
        { t: "Flux de mise à niveau", d: "Mise à niveau en un clic vers un plan supérieur." },
      ],
      steps: ["Consultez votre plan actuel et la date d'expiration de l'essai.", "Cliquez sur 'Comparer les plans' pour voir ce que chaque plan inclut.", "Choisissez le plan adapté à la taille de votre business.", "Complétez le paiement et vos nouvelles limites s'activent immédiatement."],
      tips: ["Votre essai gratuit donne un accès complet — utilisez-le pour apprendre la plateforme.", "Améliorez votre plan avant la fin de l'essai pour éviter une interruption.", "Le plan Premium est recommandé pour les businesses avec plus de 20 réservations/semaine."],
    },
    ar: {
      name: "الاشتراك", goal: "إدارة خطتك والفوترة ومستوى الوصول.",
      desc: "صفحة الاشتراك تعرض تفاصيل خطتك الحالية وحالة التجربة ومعلومات الفوترة. قم بالترقية لفتح الميزات المتميزة.",
      features: [
        { t: "حالة التجربة", d: "الأيام المتبقية من تجربتك المجانية وما يحدث بعدها." },
        { t: "مقارنة الخطط", d: "مقارنة جانبية لخطط المجاني والأساسي والمتميز والاحترافي." },
        { t: "الوصول للميزات", d: "عرض واضح للميزات التي تفتحها كل خطة." },
        { t: "تاريخ الفوترة", d: "تنزيل الفواتير لمدفوعات الاشتراك." },
        { t: "تدفق الترقية", d: "ترقية بنقرة واحدة لخطة أعلى عندما تكون مستعداً." },
      ],
      steps: ["اعرض خطتك الحالية وتاريخ انتهاء التجربة.", "انقر على 'مقارنة الخطط' لرؤية ما تتضمنه كل خطة.", "اختر الخطة التي تناسب حجم عملك.", "أكمل الدفع وتُفعَّل حدودك الجديدة فوراً."],
      tips: ["تجربتك المجانية تمنح وصولاً كاملاً — استخدمها لتعلم المنصة.", "قم بالترقية قبل انتهاء التجربة لتجنب انقطاع الخدمة.", "خطة Premium موصى بها للأعمال التي تحصل على أكثر من 20 حجزاً أسبوعياً."],
    },
  },
  {
    id: "settings", icon: Settings, color: "slate", section: "account",
    path: "/owner/dashboard/settings",
    en: {
      name: "Settings", goal: "Configure your account, security, and preferences.",
      desc: "The Settings page is where you manage your profile, change your password, enable two-factor authentication, configure notification preferences, and update your business details.",
      features: [
        { t: "Profile Settings", d: "Update your name, phone number and business information." },
        { t: "Password Change", d: "Securely update your password with strength validation." },
        { t: "Two-Factor Auth", d: "Enable TOTP-based 2FA with Google Authenticator or Authy." },
        { t: "Notifications", d: "Configure which email notifications you want to receive." },
        { t: "Language & Theme", d: "Set your dashboard language and light/dark mode preference." },
      ],
      steps: ["Go to Settings from the sidebar or profile dropdown.", "Update your profile details in the Profile tab.", "Go to Security tab to change password or enable 2FA.", "Adjust notification preferences in the Notifications tab."],
      tips: ["Enable 2FA for maximum account security.", "Keep your phone number up to date — it's used for account recovery.", "Set notification preferences to avoid inbox overload while staying informed."],
    },
    fr: {
      name: "Paramètres", goal: "Configurez votre compte, sécurité et préférences.",
      desc: "La page Paramètres est l'endroit où vous gérez votre profil, changez votre mot de passe, activez l'authentification à deux facteurs et configurez vos préférences.",
      features: [
        { t: "Paramètres de profil", d: "Mettez à jour votre nom, numéro de téléphone et informations business." },
        { t: "Changement de mot de passe", d: "Mettez à jour votre mot de passe en toute sécurité." },
        { t: "Authentification 2FA", d: "Activez le 2FA TOTP avec Google Authenticator ou Authy." },
        { t: "Notifications", d: "Configurez quelles notifications email vous souhaitez recevoir." },
        { t: "Langue et thème", d: "Définissez la langue et le mode clair/sombre de votre tableau de bord." },
      ],
      steps: ["Allez dans Paramètres depuis la barre latérale ou le menu profil.", "Mettez à jour vos détails dans l'onglet Profil.", "Allez dans l'onglet Sécurité pour changer le mot de passe ou activer le 2FA.", "Ajustez les préférences de notification dans l'onglet Notifications."],
      tips: ["Activez le 2FA pour une sécurité maximale du compte.", "Gardez votre numéro de téléphone à jour — utilisé pour la récupération de compte.", "Ajustez les préférences de notification pour éviter la surcharge."],
    },
    ar: {
      name: "الإعدادات", goal: "تهيئة حسابك والأمان والتفضيلات.",
      desc: "صفحة الإعدادات حيث تدير ملفك الشخصي وتغير كلمة مرورك وتفعّل المصادقة الثنائية وتضبط التفضيلات.",
      features: [
        { t: "إعدادات الملف الشخصي", d: "تحديث الاسم ورقم الهاتف ومعلومات العمل." },
        { t: "تغيير كلمة المرور", d: "تحديث كلمة مرورك بأمان مع التحقق من القوة." },
        { t: "المصادقة الثنائية", d: "تفعيل 2FA المبني على TOTP مع Google Authenticator." },
        { t: "الإشعارات", d: "تهيئة إشعارات البريد التي تريد استلامها." },
        { t: "اللغة والسمة", d: "ضبط لغة لوحة التحكم وتفضيلات الوضع الفاتح/الداكن." },
      ],
      steps: ["اذهب للإعدادات من الشريط الجانبي أو قائمة الملف الشخصي.", "حدّث تفاصيلك في تبويب الملف الشخصي.", "اذهب لتبويب الأمان لتغيير كلمة المرور أو تفعيل 2FA.", "اضبط تفضيلات الإشعارات في تبويب الإشعارات."],
      tips: ["فعّل المصادقة الثنائية لأقصى أمان للحساب.", "احتفظ برقم هاتفك محدثاً — يُستخدم لاسترداد الحساب.", "اضبط تفضيلات الإشعارات لتجنب الإرهاق مع البقاء مطلعاً."],
    },
  },
  {
    id: "kyc", icon: ShieldCheck, color: "amber", section: "account",
    path: "/owner/dashboard/kyc",
    en: {
      name: "KYC Verification", goal: "Verify your identity to unlock full platform access.",
      desc: "KYC (Know Your Customer) verification is required to activate your Bookiify account. Upload your national ID and a liveness photo — our team reviews within 24 hours and notifies you by email.",
      features: [
        { t: "Identity Documents", d: "Upload a clear photo of your national ID card (front and back)." },
        { t: "Liveness Check", d: "Short video selfie to prove you are the document holder." },
        { t: "Admin Review", d: "Our team reviews your submission within 24 hours." },
        { t: "Instant Activation", d: "Once approved, your account is fully activated immediately." },
        { t: "Resubmission", d: "If rejected, you can fix the issue and resubmit immediately." },
      ],
      steps: ["Go to KYC Verification in the sidebar.", "Upload a clear photo of your ID front and a clear photo of the back.", "Record a short selfie video (5 seconds) looking at the camera.", "Submit — our team reviews and responds within 24 hours."],
      tips: ["Use good lighting and make sure all text on your ID is clearly readable.", "The selfie video must show your face clearly and match your ID photo.", "If rejected, read the rejection reason carefully before resubmitting."],
    },
    fr: {
      name: "Vérification KYC", goal: "Vérifiez votre identité pour débloquer l'accès complet à la plateforme.",
      desc: "La vérification KYC est requise pour activer votre compte Bookiify. Uploadez votre carte d'identité et une photo de vous en direct — notre équipe examine en 24 heures.",
      features: [
        { t: "Documents d'identité", d: "Uploadez une photo claire de votre carte d'identité (recto et verso)." },
        { t: "Vérification en direct", d: "Courte vidéo selfie pour prouver que vous êtes le titulaire du document." },
        { t: "Revue admin", d: "Notre équipe examine votre soumission dans les 24 heures." },
        { t: "Activation instantanée", d: "Une fois approuvé, votre compte est immédiatement activé." },
        { t: "Resoumission", d: "En cas de rejet, vous pouvez corriger et resoumettre immédiatement." },
      ],
      steps: ["Allez dans Vérification KYC dans la barre latérale.", "Uploadez une photo claire du recto et du verso de votre carte.", "Enregistrez une courte vidéo selfie (5 secondes) en regardant la caméra.", "Soumettez — notre équipe examine et répond dans les 24 heures."],
      tips: ["Utilisez un bon éclairage et assurez-vous que tout le texte de votre ID est lisible.", "La vidéo selfie doit montrer clairement votre visage et correspondre à la photo.", "En cas de rejet, lisez attentivement la raison avant de resoumettre."],
    },
    ar: {
      name: "التحقق من الهوية", goal: "تحقق من هويتك لفتح الوصول الكامل للمنصة.",
      desc: "التحقق من الهوية (KYC) مطلوب لتفعيل حساب Bookiify الخاص بك. قم بتحميل بطاقة هويتك وصورة حية — يراجع فريقنا خلال 24 ساعة.",
      features: [
        { t: "وثائق الهوية", d: "تحميل صورة واضحة لبطاقة هويتك الوطنية (الوجه الأمامي والخلفي)." },
        { t: "فحص الحضور الحي", d: "فيديو سيلفي قصير لإثبات أنك صاحب الوثيقة." },
        { t: "مراجعة الإدارة", d: "يراجع فريقنا طلبك خلال 24 ساعة." },
        { t: "التفعيل الفوري", d: "عند الموافقة، يُفعَّل حسابك فوراً." },
        { t: "إعادة التقديم", d: "في حال الرفض، يمكنك التصحيح وإعادة التقديم فوراً." },
      ],
      steps: ["اذهب للتحقق من الهوية في الشريط الجانبي.", "قم بتحميل صورة واضحة لوجه بطاقتك الأمامي والخلفي.", "سجّل فيديو سيلفي قصير (5 ثوانٍ) تنظر للكاميرا.", "قدّم — يراجع فريقنا ويستجيب خلال 24 ساعة."],
      tips: ["استخدم إضاءة جيدة وتأكد أن نص بطاقتك مقروء بوضوح.", "يجب أن يظهر وجهك بوضوح في فيديو السيلفي ويطابق صورة البطاقة.", "في حال الرفض، اقرأ سبب الرفض بعناية قبل إعادة التقديم."],
    },
  },
];

const SECTION_CONFIG = {
  main:       { en: "Main",       fr: "Principal",  ar: "الرئيسية"  },
  management: { en: "Management", fr: "Gestion",     ar: "الإدارة"   },
  finance:    { en: "Finance",    fr: "Finance",     ar: "المالية"   },
  growth:     { en: "Growth",     fr: "Croissance",  ar: "النمو"     },
  account:    { en: "Account",    fr: "Compte",      ar: "الحساب"    },
};

const COLOR_RING = {
  indigo: "ring-indigo-500/40 bg-indigo-500/10 text-indigo-400",
  blue:   "ring-blue-500/40 bg-blue-500/10 text-blue-400",
  cyan:   "ring-cyan-500/40 bg-cyan-500/10 text-cyan-400",
  teal:   "ring-teal-500/40 bg-teal-500/10 text-teal-400",
  violet: "ring-violet-500/40 bg-violet-500/10 text-violet-400",
  sky:    "ring-sky-500/40 bg-sky-500/10 text-sky-400",
  emerald:"ring-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  amber:  "ring-amber-500/40 bg-amber-500/10 text-amber-400",
  orange: "ring-orange-500/40 bg-orange-500/10 text-orange-400",
  yellow: "ring-yellow-500/40 bg-yellow-500/10 text-yellow-400",
  purple: "ring-purple-500/40 bg-purple-500/10 text-purple-400",
  pink:   "ring-pink-500/40 bg-pink-500/10 text-pink-400",
  rose:   "ring-rose-500/40 bg-rose-500/10 text-rose-400",
  green:  "ring-green-500/40 bg-green-500/10 text-green-400",
  slate:  "ring-slate-500/40 bg-slate-500/10 text-slate-400",
};

const ACCENT = {
  indigo:"from-indigo-600 to-violet-600", blue:"from-blue-600 to-cyan-600",
  cyan:"from-cyan-600 to-teal-600", teal:"from-teal-600 to-emerald-600",
  violet:"from-violet-600 to-purple-600", sky:"from-sky-500 to-blue-600",
  emerald:"from-emerald-600 to-teal-600", amber:"from-amber-500 to-orange-500",
  orange:"from-orange-500 to-red-500", yellow:"from-yellow-500 to-amber-500",
  purple:"from-purple-600 to-violet-600", pink:"from-pink-600 to-rose-600",
  rose:"from-rose-600 to-pink-600", green:"from-green-600 to-emerald-600",
  slate:"from-slate-600 to-gray-600",
};

const LANG_LABELS = { EN: "English", FR: "Français", AR: "العربية" };

/* ─────────────────────────────────────────────────────────────────────────────
   TUTORIAL PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function Tutorial() {
  const { user } = useAuth();

  // Language — read from localStorage and sync with DashboardLayout header switcher
  const [lang, setLang] = useState(() => {
    const s = localStorage.getItem("bookiify_lang") || "FR";
    return s.toUpperCase();
  });

  // Poll so language changes from the header switcher are reflected instantly
  useEffect(() => {
    const id = setInterval(() => {
      const s = (localStorage.getItem("bookiify_lang") || "FR").toUpperCase();
      setLang(prev => prev !== s ? s : prev);
    }, 300);
    return () => clearInterval(id);
  }, []);

  const lk = lang === "AR" ? "ar" : lang === "FR" ? "fr" : "en";

  const [selectedId, setSelectedId] = useState("overview");
  const [search, setSearch]         = useState("");
  const [viewed,  setViewed]        = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("tut_viewed") || "[]")); }
    catch { return new Set(); }
  });
  const [showWelcome, setShowWelcome] = useState(() => {
    const count = parseInt(localStorage.getItem("bookiify_login_count") || "0");
    return count <= 3;
  });

  const loginCount = parseInt(localStorage.getItem("bookiify_login_count") || "0");
  const isRTL = lang === "AR";

  // Mark page as viewed on selection
  const selectPage = useCallback((id) => {
    setSelectedId(id);
    setViewed(prev => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem("tut_viewed", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const selected = PAGES.find(p => p.id === selectedId);
  const content  = selected?.[lk] || selected?.en;
  const idx      = PAGES.findIndex(p => p.id === selectedId);

  const filteredPages = search.trim()
    ? PAGES.filter(p => {
        const c = p[lk] || p.en;
        return c.name.toLowerCase().includes(search.toLowerCase());
      })
    : PAGES;

  const grouped = Object.entries(
    filteredPages.reduce((acc, p) => {
      (acc[p.section] = acc[p.section] || []).push(p);
      return acc;
    }, {})
  );

  const completionPct = Math.round((viewed.size / PAGES.length) * 100);

  // Mark current page as viewed on first render
  useEffect(() => { selectPage("overview"); }, []);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen">

      {/* ── WELCOME BANNER ── */}
      {showWelcome && (
        <div className="relative mb-6 rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 60%,#0ea5e9 100%)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)" }} />
          <button
            onClick={() => setShowWelcome(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <X size={16} />
          </button>
          <div className="relative px-6 py-8 sm:px-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={32} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">
                    {lang === "AR" ? "مرحباً" : lang === "FR" ? "Bienvenue" : "Welcome"} —{" "}
                    {lang === "AR"
                      ? `الزيارة رقم ${loginCount}`
                      : lang === "FR"
                        ? `Connexion n°${loginCount}`
                        : `Login #${loginCount}`}
                  </span>
                </div>
                <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">
                  {lang === "AR"
                    ? `أهلاً، ${user?.fullName?.split(" ")[0] || ""}! 🎉`
                    : lang === "FR"
                      ? `Bienvenue, ${user?.fullName?.split(" ")[0] || ""} ! 🎉`
                      : `Welcome, ${user?.fullName?.split(" ")[0] || ""}! 🎉`}
                </h2>
                <p className="text-indigo-200 text-sm font-medium max-w-xl">
                  {lang === "AR"
                    ? "هذا الدليل التفاعلي سيأخذك عبر كل صفحة في لوحة التحكم. استغرق 5 دقائق لتتعلم كل ما يحتاجه عملك."
                    : lang === "FR"
                      ? "Ce guide interactif vous guide à travers chaque page du tableau de bord. Prenez 5 minutes pour maîtriser tout ce dont votre business a besoin."
                      : "This interactive guide walks you through every page in your dashboard. Take 5 minutes to master everything your business needs."}
                </p>
              </div>
            </div>
            {/* Progress mini-bar */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-700"
                  style={{ width: `${completionPct}%` }} />
              </div>
              <span className="text-white font-black text-sm whitespace-nowrap">
                {viewed.size}/{PAGES.length} {lang === "AR" ? "مقروء" : lang === "FR" ? "lus" : "read"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div className="flex gap-5 lg:gap-7">

        {/* LEFT PANEL */}
        <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0">
          <div className="sticky top-24 flex flex-col gap-4 max-h-[calc(100vh-8rem)] overflow-hidden">

            {/* Language switcher */}
            <div className="flex gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              {["EN","FR","AR"].map(l => (
                <button key={l}
                  onClick={() => { setLang(l); localStorage.setItem("bookiify_lang", l.toLowerCase()); }}
                  className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                    lang === l
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {l === "AR" ? "العربية" : l}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? "right-3" : "left-3"}`} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={lang === "AR" ? "بحث..." : lang === "FR" ? "Rechercher..." : "Search..."}
                className={`w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${isRTL ? "pr-9 pl-3" : "pl-9 pr-3"}`}
              />
            </div>

            {/* Progress */}
            {!showWelcome && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {lang === "AR" ? "التقدم" : lang === "FR" ? "Progression" : "Progress"}
                  </span>
                  <span className="text-xs font-black text-indigo-600">{completionPct}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                    style={{ width: `${completionPct}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  {viewed.size}/{PAGES.length} {lang === "AR" ? "صفحة تمت مراجعتها" : lang === "FR" ? "pages consultées" : "pages reviewed"}
                </p>
              </div>
            )}

            {/* Nav list */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1" style={{ scrollbarWidth: "thin" }}>
              {grouped.map(([section, pages]) => (
                <div key={section} className="mb-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-600 px-2 mb-1.5">
                    {SECTION_CONFIG[section]?.[lk] || section}
                  </p>
                  {pages.map(page => {
                    const Icon = page.icon;
                    const c = page[lk] || page.en;
                    const isActive = selectedId === page.id;
                    const isDone   = viewed.has(page.id);
                    return (
                      <button key={page.id} onClick={() => selectPage(page.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left ${
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700/40"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg ring-1 flex items-center justify-center flex-shrink-0 ${COLOR_RING[page.color]}`}>
                          <Icon size={13} />
                        </div>
                        <span className="text-xs font-bold flex-1 truncate">{c.name}</span>
                        {isDone && <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 min-w-0">

          {/* Mobile page selector */}
          <div className="lg:hidden mb-4 flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {PAGES.map(page => {
              const Icon = page.icon;
              const c = page[lk] || page.en;
              return (
                <button key={page.id}
                  onClick={() => selectPage(page.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border flex-shrink-0 text-xs font-bold transition-all ${
                    selectedId === page.id
                      ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Icon size={13} /> {c.name}
                </button>
              );
            })}
          </div>

          {selected && content && (
            <div key={selectedId} className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">

              {/* ── HERO ── */}
              <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
                style={{ background: `linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(30,27,75,0.95) 100%)`, border: "1px solid rgba(99,102,241,0.2)" }}>
                <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none"
                  style={{ background: `radial-gradient(circle, white 0%, transparent 70%)` }} />

                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${ACCENT[selected.color]} shadow-lg`}>
                    {React.createElement(selected.icon, { size: 36, className: "text-white" })}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-indigo-400">
                        {SECTION_CONFIG[selected.section]?.[lk]}
                      </span>
                      {viewed.has(selectedId) && (
                        <span className="flex items-center gap-1 text-[9px] font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={9} />
                          {lang === "AR" ? "مكتمل" : lang === "FR" ? "Vu" : "Reviewed"}
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">{content.name}</h1>
                    <p className="text-indigo-200 text-base font-semibold leading-relaxed max-w-xl">{content.goal}</p>
                  </div>

                  {/* Go to page button */}
                  <Link to={selected.path}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm text-white bg-gradient-to-r ${ACCENT[selected.color]} shadow-lg hover:opacity-90 transition-all flex-shrink-0 self-start`}
                  >
                    {lang === "AR" ? "اذهب" : lang === "FR" ? "Ouvrir" : "Open"}
                    <ExternalLink size={14} />
                  </Link>
                </div>

                {/* Description */}
                <p className="mt-6 text-slate-300 text-[15px] leading-relaxed border-t border-slate-700/50 pt-5">
                  {content.desc}
                </p>
              </div>

              {/* ── FEATURES GRID ── */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white mb-4">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center bg-gradient-to-br ${ACCENT[selected.color]}`}>
                    <Zap size={13} className="text-white" />
                  </span>
                  {lang === "AR" ? "الميزات الرئيسية" : lang === "FR" ? "Fonctionnalités clés" : "Key Features"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {content.features.map((f, i) => (
                    <div key={i} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all hover:shadow-sm">
                      <div className={`w-8 h-8 rounded-xl mb-3 flex items-center justify-center bg-gradient-to-br ${ACCENT[selected.color]}`}>
                        <span className="text-white font-black text-xs">{i + 1}</span>
                      </div>
                      <p className="text-sm font-black text-slate-900 dark:text-white mb-1">{f.t}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── HOW TO USE ── */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white mb-6">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center bg-gradient-to-br ${ACCENT[selected.color]}`}>
                    <Play size={13} className="text-white" />
                  </span>
                  {lang === "AR" ? "كيفية الاستخدام" : lang === "FR" ? "Comment l'utiliser" : "How to Use"}
                </h2>
                <div className="space-y-3">
                  {content.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${ACCENT[selected.color]}`}>
                        <span className="text-white font-black text-xs">{i + 1}</span>
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
                        {i < content.steps.length - 1 && (
                          <div className={`mt-3 h-px bg-slate-100 dark:bg-slate-800 ${isRTL ? "mr-0" : "ml-0"}`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── PRO TIPS ── */}
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-3xl p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-base font-black text-amber-800 dark:text-amber-400 mb-4">
                  <Lightbulb size={18} />
                  {lang === "AR" ? "نصائح احترافية" : lang === "FR" ? "Conseils Pro" : "Pro Tips"}
                </h2>
                <ul className="space-y-2.5">
                  {content.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-700/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-800 dark:text-amber-300 font-black text-[10px]">✓</span>
                      </div>
                      <p className="text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── NAVIGATION ── */}
              <div className="flex items-center justify-between gap-4 pt-2 pb-4">
                <button
                  onClick={() => idx > 0 && selectPage(PAGES[idx - 1].id)}
                  disabled={idx === 0}
                  className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                  {lang === "AR" ? "السابق" : lang === "FR" ? "Précédent" : "Previous"}
                </button>

                <div className="flex items-center gap-1.5">
                  {PAGES.map((p, i) => (
                    <button key={p.id} onClick={() => selectPage(p.id)}
                      className={`transition-all rounded-full ${
                        i === idx
                          ? `w-6 h-2 bg-indigo-600`
                          : viewed.has(p.id)
                            ? "w-2 h-2 bg-emerald-400"
                            : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => idx < PAGES.length - 1 && selectPage(PAGES[idx + 1].id)}
                  disabled={idx === PAGES.length - 1}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r ${ACCENT[selected.color]} hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow`}
                >
                  {lang === "AR" ? "التالي" : lang === "FR" ? "Suivant" : "Next"}
                  {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>

              {/* Completion celebration */}
              {viewed.size === PAGES.length && (
                <div className="text-center py-10 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-200 dark:border-emerald-700/30 rounded-3xl">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    {lang === "AR" ? "أتقنت لوحة التحكم!" : lang === "FR" ? "Tableau de bord maîtrisé !" : "Dashboard Mastered!"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-6 max-w-md mx-auto">
                    {lang === "AR"
                      ? "لقد راجعت جميع الصفحات الـ 16. أنت جاهز لتشغيل عملك بكامل قوته."
                      : lang === "FR"
                        ? "Vous avez parcouru les 16 pages. Vous êtes prêt à faire tourner votre business à pleine puissance."
                        : "You've reviewed all 16 pages. You're ready to run your business at full power."}
                  </p>
                  <Link to="/owner/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40"
                  >
                    <TrendingUp size={16} />
                    {lang === "AR" ? "ابدأ الآن" : lang === "FR" ? "Commencer" : "Get Started"}
                  </Link>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
