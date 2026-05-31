import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, ChevronRight, ArrowLeft } from "lucide-react";

const LAST_UPDATED = "2026-05-31";

const CONTENT = {
  en: {
    title: "Privacy Policy",
    subtitle: "How Bookiify collects, uses, and protects your personal data.",
    toc: [
      "Data Controller",
      "Data We Collect",
      "How We Use Your Data",
      "Data Storage & Security",
      "Data Sharing",
      "Your Rights",
      "Cookies & Sessions",
      "Contact Us",
    ],
    sections: [
      {
        title: "1. Data Controller",
        content: [
          "Bookiify is a professional booking and business management platform operated from Tunisia. For the purposes of this Privacy Policy, Bookiify acts as the data controller for information collected through our platform.",
          "Contact: privacy@bookiify.com · Sousse, Tunisia",
        ],
      },
      {
        title: "2. Data We Collect",
        subsections: [
          {
            label: "Business Owners (Registered Users)",
            items: [
              "Identity data: full name, email address, phone number",
              "Business data: business name, category, city",
              "KYC documents: national ID card (front & back), selfie video (for identity verification only)",
              "Profile photo (optional, uploaded to Cloudinary)",
              "Session data: device fingerprint hash, IP address at login, refresh token hash",
              "Activity: login timestamps, security events, booking history",
            ],
          },
          {
            label: "End Customers (Booking Clients)",
            items: [
              "Name, email address, and phone number (provided at booking)",
              "Appointment details: service, date, time, optional notes",
              "No account is created — data is linked to the booking record only",
            ],
          },
        ],
      },
      {
        title: "3. How We Use Your Data",
        items: [
          "To operate your Bookiify account and provide the booking management service",
          "To verify your identity through the KYC process (required for business activation)",
          "To send booking confirmations, reminders, and notifications",
          "To generate invoices and process financial records",
          "To improve the platform and detect fraudulent or abusive activity",
          "To comply with legal obligations under Tunisian law",
        ],
      },
      {
        title: "4. Data Storage & Security",
        content: [
          "Your data is stored on secure servers hosted by MongoDB Atlas (cloud database), Cloudinary (file storage for KYC documents and photos), and Upstash Redis (for session management and security tokens).",
          "We implement the following security measures:",
        ],
        items: [
          "Passwords are hashed using bcrypt (cost factor 14) — never stored in plaintext",
          "JWT access tokens expire in 15 minutes and are stored in HttpOnly cookies",
          "Refresh tokens are hashed with SHA-256 before database storage",
          "Device fingerprinting and IP logging for breach detection",
          "Two-factor authentication (TOTP) available for all accounts",
          "Redis-based session blacklisting for immediate logout across devices",
          "All HTTPS connections with HSTS preload enabled",
        ],
      },
      {
        title: "5. Data Sharing",
        content: [
          "We do not sell, rent, or trade your personal data to third parties. Data may be shared only in the following circumstances:",
        ],
        items: [
          "Cloudinary (France/USA) — for secure file storage of profile photos and KYC documents",
          "MongoDB Atlas — cloud database provider for encrypted data storage",
          "Upstash — Redis-based session and security token management",
          "Legal authorities — only if required by a valid court order or Tunisian law",
        ],
      },
      {
        title: "6. Your Rights",
        content: [
          "Under applicable data protection principles, you have the following rights regarding your personal data:",
        ],
        items: [
          "Right of access — request a copy of the data we hold about you",
          "Right of rectification — request correction of inaccurate data",
          "Right of erasure — request deletion of your account and data (subject to legal retention requirements)",
          "Right to restrict processing — request we limit how we use your data",
          "Right to data portability — receive your data in a machine-readable format",
          "Right to object — object to processing for specific purposes",
        ],
        footer: "To exercise these rights, contact us at privacy@bookiify.com. We will respond within 30 days.",
      },
      {
        title: "7. Cookies & Sessions",
        content: [
          "Bookiify uses HttpOnly secure cookies to manage your authenticated session. These cookies are strictly necessary for the platform to function and cannot be opted out of while using an authenticated account.",
          "We use the following cookies:",
        ],
        items: [
          "accessToken (15 min) — your encrypted session token, HttpOnly, Secure, SameSite=None",
          "refreshToken (7 days) — used to silently renew your session, HttpOnly, Secure",
          "csrfToken — double-submit CSRF protection cookie, readable by JavaScript",
        ],
        footer: "We do not use advertising cookies, tracking pixels, or third-party analytics. We do not use Google Analytics or Facebook Pixel.",
      },
      {
        title: "8. Contact Us",
        content: [
          "For any privacy-related questions, data access requests, or concerns, please contact our privacy team:",
          "Email: privacy@bookiify.com",
          "Address: Bookiify, Sousse, Tunisia",
          "Response time: within 30 business days",
          `This Privacy Policy was last updated on ${LAST_UPDATED}.`,
        ],
      },
    ],
  },
  fr: {
    title: "Politique de Confidentialité",
    subtitle: "Comment Bookiify collecte, utilise et protège vos données personnelles.",
    toc: [
      "Responsable du traitement",
      "Données collectées",
      "Utilisation des données",
      "Stockage & Sécurité",
      "Partage des données",
      "Vos droits",
      "Cookies & Sessions",
      "Nous contacter",
    ],
    sections: [
      {
        title: "1. Responsable du traitement",
        content: [
          "Bookiify est une plateforme de gestion de réservations professionnelles opérée depuis la Tunisie. Dans le cadre de cette Politique de Confidentialité, Bookiify agit en tant que responsable du traitement des données collectées via notre plateforme.",
          "Contact : privacy@bookiify.com · Sousse, Tunisie",
        ],
      },
      {
        title: "2. Données collectées",
        subsections: [
          {
            label: "Propriétaires d'entreprise (Utilisateurs inscrits)",
            items: [
              "Données d'identité : nom complet, adresse e-mail, numéro de téléphone",
              "Données professionnelles : nom d'entreprise, catégorie, ville",
              "Documents KYC : carte d'identité nationale (recto-verso), vidéo selfie (uniquement pour la vérification d'identité)",
              "Photo de profil (optionnelle, hébergée sur Cloudinary)",
              "Données de session : hash d'empreinte d'appareil, adresse IP à la connexion, hash du token de rafraîchissement",
              "Activité : horodatages de connexion, événements de sécurité, historique des réservations",
            ],
          },
          {
            label: "Clients finaux (Clients de réservation)",
            items: [
              "Nom, adresse e-mail et numéro de téléphone (fournis lors de la réservation)",
              "Détails du rendez-vous : service, date, heure, notes optionnelles",
              "Aucun compte n'est créé — les données sont liées uniquement à la réservation",
            ],
          },
        ],
      },
      {
        title: "3. Utilisation des données",
        items: [
          "Pour gérer votre compte Bookiify et fournir le service de gestion des réservations",
          "Pour vérifier votre identité via le processus KYC (requis pour l'activation du compte professionnel)",
          "Pour envoyer des confirmations de réservation, des rappels et des notifications",
          "Pour générer des factures et traiter les dossiers financiers",
          "Pour améliorer la plateforme et détecter les activités frauduleuses ou abusives",
          "Pour se conformer aux obligations légales en vertu de la loi tunisienne",
        ],
      },
      {
        title: "4. Stockage & Sécurité",
        content: [
          "Vos données sont stockées sur des serveurs sécurisés hébergés par MongoDB Atlas (base de données cloud), Cloudinary (stockage de fichiers pour les documents KYC et photos) et Upstash Redis (gestion des sessions et tokens de sécurité).",
          "Nous mettons en œuvre les mesures de sécurité suivantes :",
        ],
        items: [
          "Les mots de passe sont hachés avec bcrypt (facteur de coût 14) — jamais stockés en clair",
          "Les tokens d'accès JWT expirent en 15 minutes et sont stockés dans des cookies HttpOnly",
          "Les tokens de rafraîchissement sont hachés avec SHA-256 avant stockage en base de données",
          "Empreinte d'appareil et journalisation IP pour la détection d'intrusions",
          "Authentification à deux facteurs (TOTP) disponible pour tous les comptes",
          "Blacklist de sessions Redis pour une déconnexion immédiate sur tous les appareils",
          "Toutes les connexions HTTPS avec HSTS préchargé activé",
        ],
      },
      {
        title: "5. Partage des données",
        content: [
          "Nous ne vendons, ne louons et ne commercialisons pas vos données personnelles à des tiers. Les données ne peuvent être partagées que dans les circonstances suivantes :",
        ],
        items: [
          "Cloudinary (France/États-Unis) — pour le stockage sécurisé des photos de profil et documents KYC",
          "MongoDB Atlas — fournisseur de base de données cloud pour le stockage de données chiffrées",
          "Upstash — gestion des sessions Redis et des tokens de sécurité",
          "Autorités légales — uniquement si requis par une décision de justice valide ou la loi tunisienne",
        ],
      },
      {
        title: "6. Vos droits",
        content: [
          "En vertu des principes applicables en matière de protection des données, vous disposez des droits suivants concernant vos données personnelles :",
        ],
        items: [
          "Droit d'accès — demander une copie des données que nous détenons sur vous",
          "Droit de rectification — demander la correction de données inexactes",
          "Droit à l'effacement — demander la suppression de votre compte et de vos données (sous réserve des obligations légales de conservation)",
          "Droit à la limitation du traitement — demander une limitation de l'utilisation de vos données",
          "Droit à la portabilité — recevoir vos données dans un format lisible par machine",
          "Droit d'opposition — vous opposer au traitement à des fins spécifiques",
        ],
        footer: "Pour exercer ces droits, contactez-nous à privacy@bookiify.com. Nous répondrons dans un délai de 30 jours.",
      },
      {
        title: "7. Cookies & Sessions",
        content: [
          "Bookiify utilise des cookies sécurisés HttpOnly pour gérer votre session authentifiée. Ces cookies sont strictement nécessaires au fonctionnement de la plateforme et ne peuvent pas être désactivés lors de l'utilisation d'un compte authentifié.",
          "Nous utilisons les cookies suivants :",
        ],
        items: [
          "accessToken (15 min) — votre token de session chiffré, HttpOnly, Sécurisé, SameSite=None",
          "refreshToken (7 jours) — utilisé pour renouveler silencieusement votre session, HttpOnly, Sécurisé",
          "csrfToken — cookie de protection CSRF à double soumission, lisible par JavaScript",
        ],
        footer: "Nous n'utilisons pas de cookies publicitaires, de pixels de suivi ou d'analytiques tiers. Nous n'utilisons pas Google Analytics ni Facebook Pixel.",
      },
      {
        title: "8. Nous contacter",
        content: [
          "Pour toute question relative à la confidentialité, demande d'accès aux données ou préoccupation, veuillez contacter notre équipe Privacy :",
          "Email : privacy@bookiify.com",
          "Adresse : Bookiify, Sousse, Tunisie",
          "Délai de réponse : dans un délai de 30 jours ouvrables",
          `Cette Politique de Confidentialité a été mise à jour le ${LAST_UPDATED}.`,
        ],
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    subtitle: "كيف تجمع Bookiify بياناتك الشخصية وتستخدمها وتحميها.",
    toc: [
      "المتحكم في البيانات",
      "البيانات التي نجمعها",
      "كيف نستخدم بياناتك",
      "التخزين والأمان",
      "مشاركة البيانات",
      "حقوقك",
      "ملفات تعريف الارتباط والجلسات",
      "اتصل بنا",
    ],
    sections: [
      {
        title: "١. المتحكم في البيانات",
        content: [
          "Bookiify هي منصة إدارة حجوزات احترافية تعمل من تونس. لأغراض سياسة الخصوصية هذه، تعمل Bookiify بوصفها المتحكم في البيانات المجمعة عبر منصتنا.",
          "التواصل: privacy@bookiify.com · سوسة، تونس",
        ],
      },
      {
        title: "٢. البيانات التي نجمعها",
        subsections: [
          {
            label: "أصحاب الأعمال (المستخدمون المسجلون)",
            items: [
              "بيانات الهوية: الاسم الكامل وعنوان البريد الإلكتروني ورقم الهاتف",
              "البيانات التجارية: اسم العمل والفئة والمدينة",
              "وثائق التحقق من الهوية: بطاقة الهوية الوطنية (وجهان) وفيديو السيلفي (للتحقق من الهوية فقط)",
              "صورة الملف الشخصي (اختيارية، مستضافة على Cloudinary)",
              "بيانات الجلسة: تجزئة بصمة الجهاز وعنوان IP عند تسجيل الدخول وتجزئة رمز التحديث",
              "النشاط: طوابع وقت تسجيل الدخول وأحداث الأمان وسجل الحجوزات",
            ],
          },
          {
            label: "العملاء النهائيون (عملاء الحجز)",
            items: [
              "الاسم وعنوان البريد الإلكتروني ورقم الهاتف (المقدمة عند الحجز)",
              "تفاصيل الموعد: الخدمة والتاريخ والوقت والملاحظات الاختيارية",
              "لا يتم إنشاء حساب — البيانات مرتبطة بسجل الحجز فقط",
            ],
          },
        ],
      },
      {
        title: "٣. كيف نستخدم بياناتك",
        items: [
          "لإدارة حسابك في Bookiify وتوفير خدمة إدارة الحجوزات",
          "للتحقق من هويتك من خلال عملية KYC (مطلوبة لتفعيل الحساب التجاري)",
          "لإرسال تأكيدات الحجز والتذكيرات والإشعارات",
          "لإنشاء الفواتير ومعالجة السجلات المالية",
          "لتحسين المنصة والكشف عن الأنشطة الاحتيالية أو المسيئة",
          "للامتثال للالتزامات القانونية بموجب القانون التونسي",
        ],
      },
      {
        title: "٤. التخزين والأمان",
        content: [
          "تُخزَّن بياناتك على خوادم آمنة مستضافة من قِبل MongoDB Atlas (قاعدة بيانات سحابية) وCloudinary (تخزين ملفات وثائق KYC والصور) وUpstash Redis (إدارة الجلسات ورموز الأمان).",
          "نطبق التدابير الأمنية التالية:",
        ],
        items: [
          "تُجزَّأ كلمات المرور باستخدام bcrypt (معامل التكلفة 14) — ولا تُخزَّن أبداً بنص واضح",
          "تنتهي صلاحية رموز وصول JWT خلال 15 دقيقة وتُخزَّن في ملفات تعريف ارتباط HttpOnly",
          "تُجزَّأ رموز التحديث بـ SHA-256 قبل تخزينها في قاعدة البيانات",
          "بصمة الجهاز وتسجيل IP للكشف عن الاختراقات",
          "المصادقة الثنائية (TOTP) متاحة لجميع الحسابات",
          "قائمة سوداء لجلسات Redis لتسجيل الخروج الفوري عبر جميع الأجهزة",
          "جميع اتصالات HTTPS مع تفعيل HSTS المسبق",
        ],
      },
      {
        title: "٥. مشاركة البيانات",
        content: [
          "لا نبيع بياناتك الشخصية أو نؤجرها أو نتاجر بها مع أطراف ثالثة. يمكن مشاركة البيانات فقط في الحالات التالية:",
        ],
        items: [
          "Cloudinary (فرنسا/الولايات المتحدة) — لتخزين آمن لصور الملف الشخصي ووثائق KYC",
          "MongoDB Atlas — مزود قاعدة بيانات سحابية لتخزين البيانات المشفرة",
          "Upstash — إدارة جلسات Redis ورموز الأمان",
          "السلطات القانونية — فقط إذا كان ذلك مطلوباً بموجب أمر قضائي صالح أو القانون التونسي",
        ],
      },
      {
        title: "٦. حقوقك",
        content: [
          "بموجب مبادئ حماية البيانات المعمول بها، لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:",
        ],
        items: [
          "حق الوصول — طلب نسخة من البيانات التي نحتفظ بها عنك",
          "حق التصحيح — طلب تصحيح البيانات غير الدقيقة",
          "حق المحو — طلب حذف حسابك وبياناتك (مع مراعاة متطلبات الاحتفاظ القانونية)",
          "حق تقييد المعالجة — طلب تقييد كيفية استخدامنا لبياناتك",
          "حق نقل البيانات — استلام بياناتك بتنسيق قابل للقراءة آلياً",
          "حق الاعتراض — الاعتراض على المعالجة لأغراض محددة",
        ],
        footer: "لممارسة هذه الحقوق، تواصل معنا على privacy@bookiify.com. سنستجيب خلال 30 يوماً.",
      },
      {
        title: "٧. ملفات تعريف الارتباط والجلسات",
        content: [
          "تستخدم Bookiify ملفات تعريف ارتباط HttpOnly الآمنة لإدارة جلستك المصادق عليها. هذه الملفات ضرورية بشكل صارم لعمل المنصة ولا يمكن إلغاؤها أثناء استخدام حساب مصادق عليه.",
          "نستخدم ملفات تعريف الارتباط التالية:",
        ],
        items: [
          "accessToken (15 دقيقة) — رمز جلستك المشفر، HttpOnly، آمن، SameSite=None",
          "refreshToken (7 أيام) — يُستخدم لتجديد جلستك بصمت، HttpOnly، آمن",
          "csrfToken — ملف تعريف ارتباط حماية CSRF بالإرسال المزدوج، قابل للقراءة بـ JavaScript",
        ],
        footer: "لا نستخدم ملفات تعريف ارتباط الإعلانات أو بكسلات التتبع أو التحليلات التابعة لجهات خارجية. لا نستخدم Google Analytics ولا Facebook Pixel.",
      },
      {
        title: "٨. اتصل بنا",
        content: [
          "لأي أسئلة تتعلق بالخصوصية أو طلبات الوصول إلى البيانات أو المخاوف، يرجى التواصل مع فريق الخصوصية لدينا:",
          "البريد الإلكتروني: privacy@bookiify.com",
          "العنوان: Bookiify، سوسة، تونس",
          "وقت الاستجابة: في غضون 30 يوم عمل",
          `تم تحديث سياسة الخصوصية هذه في ${LAST_UPDATED}.`,
        ],
      },
    ],
  },
};

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "en";
  const data = CONTENT[lang] || CONTENT.en;
  const isRTL = lang === "ar";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors" dir={isRTL ? "rtl" : "ltr"}>

      {/* Hero */}
      <div className="bg-slate-950 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <motion.div className="absolute left-1/4 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[80px]"
          animate={{ x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-400">{data.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Shield size={22} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{data.title}</h1>
            </div>
          </div>
          <p className="text-slate-400 font-medium text-base sm:text-lg max-w-2xl mt-3">{data.subtitle}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Last updated: {LAST_UPDATED}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <Link to="/terms" className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider transition-colors">
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* TOC (sticky sidebar) */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-600 mb-4">Contents</p>
              <nav className="space-y-1">
                {data.toc.map((item, i) => (
                  <a key={i} href={`#section-${i}`}
                    className="block text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 py-1.5 transition-colors leading-snug">
                    {item}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                <Link to="/terms" className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                  <ArrowLeft size={12} className={isRTL ? "" : "rotate-180"} /> Terms of Service
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {data.sections.map((section, si) => (
                <motion.section
                  key={si}
                  id={`section-${si}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: si * 0.04 }}
                  className="mb-12 scroll-mt-28"
                >
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    {section.title}
                  </h2>

                  {section.content?.map((p, pi) => (
                    <p key={pi} className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-3 text-sm">{p}</p>
                  ))}

                  {section.subsections?.map((sub, subi) => (
                    <div key={subi} className="mb-5">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200 mb-2">{sub.label}</p>
                      <ul className="space-y-1.5">
                        {sub.items.map((item, ii) => (
                          <li key={ii} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {section.items && (
                    <ul className="space-y-2 mt-3">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.footer && (
                    <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-500 italic leading-relaxed bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      {section.footer}
                    </p>
                  )}
                </motion.section>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
              <p className="text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-3">Questions about your privacy?</p>
              <a href="mailto:privacy@bookiify.com"
                className="inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
                privacy@bookiify.com <ArrowLeft size={14} className="rotate-180" />
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
