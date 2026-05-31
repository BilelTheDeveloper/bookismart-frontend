import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FileText, ChevronRight, ArrowLeft } from "lucide-react";

const LAST_UPDATED = "2026-05-31";
const EFFECTIVE_DATE = "2026-06-01";

const CONTENT = {
  en: {
    title: "Terms of Service",
    subtitle: "Please read these terms carefully before using Bookiify.",
    effectiveNote: `Effective: ${EFFECTIVE_DATE} · Last updated: ${LAST_UPDATED}`,
    toc: [
      "Acceptance of Terms",
      "Platform Description",
      "Account Registration & KYC",
      "Business Owner Obligations",
      "End User (Client) Terms",
      "Prohibited Uses",
      "Intellectual Property",
      "Limitation of Liability",
      "Account Suspension & Termination",
      "Governing Law",
      "Changes to Terms",
      "Contact",
    ],
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: [
          "By creating an account on Bookiify or using any of our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use the platform.",
          "These terms apply to all users of the platform, including business owners (registered professionals) and end customers (clients who make bookings).",
        ],
      },
      {
        title: "2. Platform Description",
        content: [
          "Bookiify is a Software-as-a-Service (SaaS) platform that enables verified service businesses in Tunisia to manage their bookings, staff, finances, and customer relationships online.",
          "Core features include: online booking management, staff access control, real-time queue management, invoice generation, customer loyalty programs, AI-assisted business tools, and a public business profile page.",
          "Bookiify does not provide the services listed by businesses on the platform. We are a technology intermediary and are not responsible for the quality, accuracy, or delivery of services offered by registered professionals.",
        ],
      },
      {
        title: "3. Account Registration & KYC",
        items: [
          "You must be at least 18 years old to create a Bookiify business account",
          "You must provide accurate, complete, and up-to-date information during registration",
          "Identity verification (KYC) is mandatory for full platform access — you must upload a valid national ID card and a selfie video",
          "You are responsible for maintaining the security of your account credentials",
          "Sharing your account credentials with unauthorized individuals is prohibited",
          "Bookiify reserves the right to reject a KYC application if documents are incomplete, fraudulent, or do not meet our requirements",
          "One account per legal business entity — creating duplicate accounts is prohibited",
        ],
      },
      {
        title: "4. Business Owner Obligations",
        content: ["As a registered business owner on Bookiify, you agree to:"],
        items: [
          "Provide accurate information about your services, including prices, durations, and descriptions",
          "Honor confirmed bookings or notify clients in advance of any cancellation",
          "Respond to new booking requests in a timely and professional manner",
          "Not use the platform for any service that is illegal, fraudulent, or harmful",
          "Keep your KYC documents current and notify us of any changes to your legal identity",
          "Not circumvent our platform fees or direct customers to bypass Bookiify",
          "Comply with all applicable Tunisian laws regarding your business operations",
          "Maintain appropriate professional qualifications and licenses for your services where legally required",
        ],
      },
      {
        title: "5. End User (Client) Terms",
        content: ["Clients who use Bookiify to book appointments agree to:"],
        items: [
          "Provide accurate personal information (name, phone, email) when making a booking",
          "Honor confirmed appointments or cancel with sufficient advance notice",
          "Not make fraudulent or bad-faith bookings",
          "Not use the platform to spam businesses or submit abusive content in notes or reviews",
          "Respect the business's cancellation and refund policies",
        ],
      },
      {
        title: "6. Prohibited Uses",
        content: ["The following are strictly prohibited on the Bookiify platform:"],
        items: [
          "Creating fake, fraudulent, or impersonation accounts",
          "Attempting to access, alter, or destroy another user's data without authorization",
          "Using automated bots, scrapers, or tools to extract data from the platform",
          "Uploading false KYC documents or misrepresenting your identity",
          "Posting illegal, offensive, defamatory, or misleading content",
          "Attempting to reverse-engineer, decompile, or hack the platform",
          "Using the platform to facilitate illegal services, tax evasion, or money laundering",
          "Sending unsolicited commercial communications through the platform",
          "Attempting to overload, disrupt, or denial-of-service attack the platform",
        ],
      },
      {
        title: "7. Intellectual Property",
        content: [
          "All content, branding, design, software, and technology comprising the Bookiify platform is the exclusive property of Bookiify and is protected by intellectual property laws.",
          "You retain ownership of the content you upload to Bookiify (such as business photos, service descriptions). By uploading content, you grant Bookiify a non-exclusive, worldwide license to display and use that content to provide the platform services.",
          "You may not use Bookiify's trademarks, logos, or branding without our prior written consent.",
        ],
      },
      {
        title: "8. Limitation of Liability",
        content: [
          "Bookiify provides the platform on an 'as-is' and 'as-available' basis. We do not warrant that the platform will be uninterrupted, error-free, or completely secure.",
          "To the maximum extent permitted by law, Bookiify shall not be liable for:",
        ],
        items: [
          "Any indirect, incidental, special, or consequential damages arising from use of the platform",
          "Loss of revenue, clients, or business opportunities resulting from platform downtime",
          "The quality, accuracy, or conduct of businesses or clients using the platform",
          "Disputes between business owners and their clients",
          "Unauthorized access to your account if you have failed to adequately protect your credentials",
        ],
        footer: "Our maximum liability to you in any 12-month period shall not exceed the total subscription fees you paid to Bookiify during that period.",
      },
      {
        title: "9. Account Suspension & Termination",
        content: [
          "Bookiify reserves the right to suspend, restrict, or permanently terminate any account that:",
        ],
        items: [
          "Violates these Terms of Service or our Privacy Policy",
          "Provides false KYC documents or fraudulent business information",
          "Engages in abusive, harassing, or illegal behavior on the platform",
          "Fails to pay applicable subscription fees",
          "Is associated with fraudulent or suspicious activity",
        ],
        footer: "In the event of account termination, you may request export of your data within 30 days by contacting support@bookiify.com. After this period, data may be permanently deleted.",
      },
      {
        title: "10. Governing Law",
        content: [
          "These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Tunisia, without regard to its conflict of law provisions.",
          "Any disputes arising from these terms or your use of the Bookiify platform shall be subject to the exclusive jurisdiction of the competent courts of Sousse, Tunisia.",
          "If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
        ],
      },
      {
        title: "11. Changes to Terms",
        content: [
          "Bookiify reserves the right to update these Terms of Service at any time. We will notify registered users of significant changes via email and by displaying a notice on the platform.",
          "Your continued use of Bookiify after the effective date of updated terms constitutes your acceptance of the new terms.",
          "If you do not agree to the updated terms, you must stop using the platform and may request account deletion.",
        ],
      },
      {
        title: "12. Contact",
        content: [
          "For questions about these Terms of Service, please contact us:",
          "Legal: legal@bookiify.com",
          "Support: support@bookiify.com",
          "Address: Bookiify, Sousse, Tunisia",
        ],
      },
    ],
  },
  fr: {
    title: "Conditions Générales d'Utilisation",
    subtitle: "Veuillez lire attentivement ces conditions avant d'utiliser Bookiify.",
    effectiveNote: `Entrée en vigueur : ${EFFECTIVE_DATE} · Dernière mise à jour : ${LAST_UPDATED}`,
    toc: [
      "Acceptation des CGU",
      "Description de la plateforme",
      "Compte & KYC",
      "Obligations des propriétaires",
      "Conditions pour les clients",
      "Utilisations interdites",
      "Propriété intellectuelle",
      "Limitation de responsabilité",
      "Suspension & Résiliation",
      "Loi applicable",
      "Modifications des CGU",
      "Contact",
    ],
    sections: [
      {
        title: "1. Acceptation des Conditions",
        content: [
          "En créant un compte sur Bookiify ou en utilisant l'un de nos services, vous acceptez d'être lié par ces Conditions Générales d'Utilisation et notre Politique de Confidentialité. Si vous n'acceptez pas ces conditions, vous ne pouvez pas utiliser la plateforme.",
          "Ces conditions s'appliquent à tous les utilisateurs de la plateforme, y compris les propriétaires d'entreprise (professionnels inscrits) et les clients finaux (clients effectuant des réservations).",
        ],
      },
      {
        title: "2. Description de la plateforme",
        content: [
          "Bookiify est une plateforme SaaS (Software-as-a-Service) permettant aux entreprises de services vérifiées en Tunisie de gérer leurs réservations, leur personnel, leurs finances et leurs relations clients en ligne.",
          "Les fonctionnalités principales incluent : gestion des réservations en ligne, contrôle d'accès du personnel, gestion de file d'attente en temps réel, génération de factures, programmes de fidélité clients, outils business assistés par IA et une page de profil d'entreprise publique.",
          "Bookiify ne fournit pas les services listés par les entreprises sur la plateforme. Nous sommes un intermédiaire technologique et ne sommes pas responsables de la qualité ou de la livraison des services offerts par les professionnels inscrits.",
        ],
      },
      {
        title: "3. Inscription & KYC",
        items: [
          "Vous devez avoir au moins 18 ans pour créer un compte professionnel Bookiify",
          "Vous devez fournir des informations précises, complètes et à jour lors de l'inscription",
          "La vérification d'identité (KYC) est obligatoire pour un accès complet à la plateforme",
          "Vous êtes responsable de la sécurité de vos identifiants de connexion",
          "Le partage de vos identifiants avec des personnes non autorisées est interdit",
          "Bookiify se réserve le droit de rejeter une demande KYC si les documents sont incomplets ou frauduleux",
          "Un seul compte par entité légale — la création de comptes en doublon est interdite",
        ],
      },
      {
        title: "4. Obligations des propriétaires d'entreprise",
        content: ["En tant que propriétaire d'entreprise inscrit sur Bookiify, vous vous engagez à :"],
        items: [
          "Fournir des informations précises sur vos services, y compris les prix, durées et descriptions",
          "Honorer les réservations confirmées ou notifier les clients à l'avance de toute annulation",
          "Répondre aux nouvelles demandes de réservation en temps opportun et de manière professionnelle",
          "Ne pas utiliser la plateforme pour des services illégaux, frauduleux ou nuisibles",
          "Maintenir vos documents KYC à jour et nous informer de tout changement",
          "Respecter toutes les lois tunisiennes applicables à votre activité",
          "Maintenir les qualifications et licences professionnelles requises par la loi",
        ],
      },
      {
        title: "5. Conditions pour les clients finaux",
        content: ["Les clients utilisant Bookiify pour réserver des rendez-vous acceptent de :"],
        items: [
          "Fournir des informations personnelles précises lors d'une réservation",
          "Honorer les rendez-vous confirmés ou annuler avec un préavis suffisant",
          "Ne pas effectuer de réservations frauduleuses ou de mauvaise foi",
          "Ne pas utiliser la plateforme pour spammer des entreprises ou soumettre du contenu abusif",
          "Respecter les politiques d'annulation et de remboursement des entreprises",
        ],
      },
      {
        title: "6. Utilisations interdites",
        content: ["Les éléments suivants sont strictement interdits sur la plateforme Bookiify :"],
        items: [
          "Créer des comptes faux, frauduleux ou usurper l'identité d'autrui",
          "Tenter d'accéder, modifier ou détruire les données d'un autre utilisateur",
          "Utiliser des robots automatisés ou des outils pour extraire des données de la plateforme",
          "Télécharger de faux documents KYC ou usurper son identité",
          "Publier du contenu illégal, offensant, diffamatoire ou trompeur",
          "Tenter de décompiler, pirater ou procéder à de l'ingénierie inverse sur la plateforme",
          "Utiliser la plateforme pour faciliter des services illégaux ou le blanchiment d'argent",
          "Tenter de surcharger ou d'attaquer la plateforme par déni de service",
        ],
      },
      {
        title: "7. Propriété intellectuelle",
        content: [
          "Tout le contenu, la marque, le design, le logiciel et la technologie composant la plateforme Bookiify sont la propriété exclusive de Bookiify et sont protégés par les lois sur la propriété intellectuelle.",
          "Vous conservez la propriété du contenu que vous téléchargez sur Bookiify. En téléchargeant du contenu, vous accordez à Bookiify une licence non exclusive pour afficher ce contenu afin de fournir les services de la plateforme.",
          "Vous ne pouvez pas utiliser les marques, logos ou l'image de marque de Bookiify sans notre consentement écrit préalable.",
        ],
      },
      {
        title: "8. Limitation de responsabilité",
        content: [
          "Bookiify fournit la plateforme en l'état et selon disponibilité. Nous ne garantissons pas que la plateforme sera ininterrompue ou exempte d'erreurs.",
          "Dans la mesure permise par la loi, Bookiify ne saurait être tenu responsable de :",
        ],
        items: [
          "Tout dommage indirect, accessoire ou consécutif découlant de l'utilisation de la plateforme",
          "Perte de revenus ou d'opportunités commerciales résultant d'une interruption de service",
          "La qualité ou la conduite des entreprises ou clients utilisant la plateforme",
          "Les litiges entre propriétaires d'entreprise et leurs clients",
          "Accès non autorisé à votre compte si vous n'avez pas protégé vos identifiants",
        ],
        footer: "Notre responsabilité maximale envers vous sur toute période de 12 mois ne dépassera pas les frais d'abonnement totaux que vous avez payés à Bookiify pendant cette période.",
      },
      {
        title: "9. Suspension & Résiliation",
        content: ["Bookiify se réserve le droit de suspendre ou de résilier tout compte qui :"],
        items: [
          "Viole ces Conditions d'Utilisation ou notre Politique de Confidentialité",
          "Fournit de faux documents KYC ou des informations professionnelles frauduleuses",
          "Se livre à des comportements abusifs, harcelants ou illégaux sur la plateforme",
          "Omet de payer les frais d'abonnement applicables",
          "Est associé à une activité frauduleuse ou suspecte",
        ],
        footer: "En cas de résiliation de compte, vous pouvez demander l'export de vos données dans les 30 jours en contactant support@bookiify.com.",
      },
      {
        title: "10. Loi applicable",
        content: [
          "Ces Conditions d'Utilisation sont régies et interprétées conformément aux lois de la République de Tunisie.",
          "Tout litige découlant de ces conditions ou de votre utilisation de la plateforme Bookiify sera soumis à la juridiction exclusive des tribunaux compétents de Sousse, Tunisie.",
        ],
      },
      {
        title: "11. Modifications des Conditions",
        content: [
          "Bookiify se réserve le droit de mettre à jour ces Conditions d'Utilisation à tout moment. Nous informerons les utilisateurs inscrits des changements significatifs par e-mail.",
          "Votre utilisation continue de Bookiify après la date d'entrée en vigueur des conditions mises à jour constitue votre acceptation des nouvelles conditions.",
        ],
      },
      {
        title: "12. Contact",
        content: [
          "Pour toute question concernant ces Conditions d'Utilisation, veuillez nous contacter :",
          "Juridique : legal@bookiify.com",
          "Support : support@bookiify.com",
          "Adresse : Bookiify, Sousse, Tunisie",
        ],
      },
    ],
  },
  ar: {
    title: "شروط الخدمة",
    subtitle: "يرجى قراءة هذه الشروط بعناية قبل استخدام Bookiify.",
    effectiveNote: `السريان: ${EFFECTIVE_DATE} · آخر تحديث: ${LAST_UPDATED}`,
    toc: [
      "قبول الشروط",
      "وصف المنصة",
      "التسجيل والتحقق من الهوية",
      "التزامات صاحب العمل",
      "شروط العملاء",
      "الاستخدامات المحظورة",
      "الملكية الفكرية",
      "تحديد المسؤولية",
      "التعليق والإنهاء",
      "القانون الحاكم",
      "تغييرات الشروط",
      "التواصل",
    ],
    sections: [
      {
        title: "١. قبول الشروط",
        content: [
          "بإنشاء حساب على Bookiify أو استخدام أي من خدماتنا، فإنك توافق على الالتزام بشروط الخدمة هذه وسياسة الخصوصية الخاصة بنا. إذا لم توافق على هذه الشروط، فلا يمكنك استخدام المنصة.",
          "تنطبق هذه الشروط على جميع مستخدمي المنصة، بما في ذلك أصحاب الأعمال (المحترفون المسجلون) والعملاء النهائيون (العملاء الذين يقومون بالحجز).",
        ],
      },
      {
        title: "٢. وصف المنصة",
        content: [
          "Bookiify هي منصة SaaS تُمكّن الشركات الخدمية الموثقة في تونس من إدارة حجوزاتها وموظفيها وشؤونها المالية وعلاقاتها مع العملاء عبر الإنترنت.",
          "تشمل الميزات الأساسية: إدارة الحجوزات الإلكترونية وإدارة صلاحيات الموظفين وإدارة الطابور الفعلي وإنشاء الفواتير وبرامج ولاء العملاء وأدوات الأعمال المدعومة بالذكاء الاصطناعي وصفحة ملف العمل العامة.",
          "لا توفر Bookiify الخدمات التي تدرجها الشركات على المنصة. نحن وسيط تقني ولسنا مسؤولين عن جودة أو تقديم الخدمات التي يعرضها المحترفون المسجلون.",
        ],
      },
      {
        title: "٣. التسجيل والتحقق من الهوية",
        items: [
          "يجب أن يكون عمرك 18 عاماً على الأقل لإنشاء حساب تجاري في Bookiify",
          "يجب تقديم معلومات دقيقة وكاملة ومحدّثة عند التسجيل",
          "التحقق من الهوية (KYC) إلزامي للوصول الكامل للمنصة",
          "أنت مسؤول عن الحفاظ على أمان بيانات الاعتماد الخاصة بك",
          "مشاركة بيانات الاعتماد مع أشخاص غير مصرح لهم محظورة",
          "تحتفظ Bookiify بالحق في رفض طلب KYC إذا كانت الوثائق غير مكتملة أو مزورة",
          "حساب واحد لكل كيان قانوني — إنشاء حسابات مكررة محظور",
        ],
      },
      {
        title: "٤. التزامات صاحب العمل",
        content: ["بوصفك صاحب عمل مسجلاً في Bookiify، فإنك توافق على:"],
        items: [
          "تقديم معلومات دقيقة عن خدماتك بما في ذلك الأسعار والمدد والأوصاف",
          "الوفاء بالحجوزات المؤكدة أو إخطار العملاء مسبقاً بأي إلغاء",
          "الاستجابة لطلبات الحجز الجديدة بشكل وقت مناسب ومهني",
          "عدم استخدام المنصة لأي خدمة غير قانونية أو احتيالية أو ضارة",
          "الحفاظ على تحديث وثائق KYC وإخطارنا بأي تغييرات",
          "الامتثال لجميع قوانين تونس المنطبقة على عملياتك التجارية",
          "الحفاظ على المؤهلات والتراخيص المهنية المطلوبة قانوناً لخدماتك",
        ],
      },
      {
        title: "٥. شروط العملاء النهائيين",
        content: ["يوافق العملاء الذين يستخدمون Bookiify لحجز المواعيد على:"],
        items: [
          "تقديم معلومات شخصية دقيقة عند الحجز",
          "الوفاء بالمواعيد المؤكدة أو الإلغاء مع إشعار مسبق كافٍ",
          "عدم إجراء حجوزات احتيالية أو بسوء نية",
          "عدم استخدام المنصة لإرسال رسائل غير مرغوب بها أو محتوى مسيء",
          "احترام سياسات الإلغاء والاسترداد الخاصة بالأعمال",
        ],
      },
      {
        title: "٦. الاستخدامات المحظورة",
        content: ["المنهيات التالية محظورة بشكل صارم على منصة Bookiify:"],
        items: [
          "إنشاء حسابات مزيفة أو احتيالية أو انتحال هوية الآخرين",
          "محاولة الوصول إلى بيانات مستخدم آخر أو تعديلها أو إتلافها",
          "استخدام الروبوتات الآلية أو أدوات استخراج البيانات من المنصة",
          "رفع وثائق KYC مزيفة أو التحايل على هويتك",
          "نشر محتوى غير قانوني أو مسيء أو تشهيري أو مضلل",
          "محاولة إجراء هندسة عكسية أو اختراق المنصة",
          "استخدام المنصة لتسهيل خدمات غير قانونية أو غسيل الأموال",
          "محاولة إرهاق المنصة أو شنّ هجوم حجب الخدمة",
        ],
      },
      {
        title: "٧. الملكية الفكرية",
        content: [
          "جميع المحتوى والعلامات التجارية والتصميم والبرمجيات والتقنيات التي تتكون منها منصة Bookiify هي ملك حصري لـ Bookiify وتحميها قوانين الملكية الفكرية.",
          "تحتفظ بملكية المحتوى الذي ترفعه إلى Bookiify. برفعك للمحتوى، تمنح Bookiify ترخيصاً غير حصري لعرض هذا المحتوى لتقديم خدمات المنصة.",
          "لا يمكنك استخدام العلامات التجارية أو الشعارات الخاصة بـ Bookiify دون موافقة كتابية مسبقة منا.",
        ],
      },
      {
        title: "٨. تحديد المسؤولية",
        content: [
          "توفر Bookiify المنصة على أساس 'كما هي' و'حسب التوفر'. لا نضمن أن المنصة ستكون متواصلة أو خالية من الأخطاء.",
          "إلى أقصى حد تسمح به القوانين المعمول بها، لن تكون Bookiify مسؤولة عن:",
        ],
        items: [
          "أي أضرار غير مباشرة أو عرضية أو تبعية ناجمة عن استخدام المنصة",
          "خسارة الإيرادات أو الفرص التجارية الناتجة عن توقف الخدمة",
          "جودة أو سلوك الشركات أو العملاء الذين يستخدمون المنصة",
          "النزاعات بين أصحاب الأعمال وعملائهم",
          "الوصول غير المصرح به إلى حسابك إذا فشلت في حماية بيانات اعتمادك",
        ],
        footer: "لا يتجاوز حدنا الأقصى من المسؤولية تجاهك في أي فترة 12 شهراً إجمالي رسوم الاشتراك التي دفعتها لـ Bookiify خلال تلك الفترة.",
      },
      {
        title: "٩. التعليق والإنهاء",
        content: ["تحتفظ Bookiify بالحق في تعليق أو إنهاء أي حساب:"],
        items: [
          "ينتهك شروط الخدمة هذه أو سياسة الخصوصية",
          "يقدم وثائق KYC مزيفة أو معلومات تجارية احتيالية",
          "يمارس سلوكاً مسيئاً أو مضايقاً أو غير قانوني على المنصة",
          "لا يسدد رسوم الاشتراك المطبقة",
          "مرتبط بنشاط احتيالي أو مشبوه",
        ],
        footer: "في حالة إنهاء الحساب، يمكنك طلب تصدير بياناتك في غضون 30 يوماً بالتواصل مع support@bookiify.com.",
      },
      {
        title: "١٠. القانون الحاكم",
        content: [
          "تخضع شروط الخدمة هذه وتُفسَّر وفقاً لقوانين جمهورية تونس.",
          "تخضع أي نزاعات ناجمة عن هذه الشروط أو استخدامك لمنصة Bookiify للاختصاص القضائي الحصري للمحاكم المختصة في سوسة، تونس.",
        ],
      },
      {
        title: "١١. تغييرات الشروط",
        content: [
          "تحتفظ Bookiify بالحق في تحديث شروط الخدمة هذه في أي وقت. سنُخطر المستخدمين المسجلين بالتغييرات الجوهرية عبر البريد الإلكتروني.",
          "استمرارك في استخدام Bookiify بعد تاريخ سريان الشروط المحدّثة يُعدّ قبولاً للشروط الجديدة.",
        ],
      },
      {
        title: "١٢. التواصل",
        content: [
          "للأسئلة المتعلقة بشروط الخدمة هذه، يرجى التواصل معنا:",
          "القانونية: legal@bookiify.com",
          "الدعم: support@bookiify.com",
          "العنوان: Bookiify، سوسة، تونس",
        ],
      },
    ],
  },
};

export default function Terms() {
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
        <motion.div className="absolute right-1/4 top-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[80px]"
          animate={{ x: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity }} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-400">{data.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <FileText size={22} className="text-violet-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{data.title}</h1>
          </div>
          <p className="text-slate-400 font-medium text-base sm:text-lg max-w-2xl mt-3">{data.subtitle}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{data.effectiveNote}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <Link to="/privacy-policy" className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider transition-colors">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* TOC */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-600 mb-4">Contents</p>
              <nav className="space-y-1">
                {data.toc.map((item, i) => (
                  <a key={i} href={`#section-${i}`}
                    className="block text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 py-1.5 transition-colors leading-snug">
                    {item}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                <Link to="/privacy-policy" className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                  <ArrowLeft size={12} className={isRTL ? "" : "rotate-180"} /> Privacy Policy
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
                  transition={{ duration: 0.4, delay: si * 0.03 }}
                  className="mb-12 scroll-mt-28"
                >
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    {section.title}
                  </h2>

                  {section.content?.map((p, pi) => (
                    <p key={pi} className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-3 text-sm">{p}</p>
                  ))}

                  {section.items && (
                    <ul className="space-y-2 mt-3">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0 mt-2" />
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
            <div className="mt-12 p-6 rounded-3xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/40">
              <p className="text-sm font-bold text-violet-800 dark:text-violet-300 mb-3">Questions about our Terms?</p>
              <a href="mailto:legal@bookiify.com"
                className="inline-flex items-center gap-2 text-sm font-black text-violet-600 dark:text-violet-400 hover:text-violet-500 transition-colors">
                legal@bookiify.com <ArrowLeft size={14} className="rotate-180" />
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
