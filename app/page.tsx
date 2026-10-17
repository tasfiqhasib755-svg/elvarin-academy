"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * ELVARIN ACADEMY — COMPLETE ONE-FILE NEXT.JS HOMEPAGE
 * Replace the existing app/page.tsx with this file.
 * The supplied 10 ELVARIN visuals are bundled in public/elvarin; /admin route retained.
 * No third-party packages or external fonts are required.
 *
 * IMPORTANT BEFORE PUBLISHING:
 * 1. Edit CONFIG below with REAL institutional information.
 * 2. Replace example programmes with courses you ACTUALLY offer.
 * 3. Replace placeholder faculty/results/testimonials with VERIFIED content.
 * 4. Application and contact forms use mailto (no database); configure email.
 * 5. Student/parent/teacher portals require separate authenticated backend routes.
 */

const CONFIG = {
  name: "ELVARIN Academy",
  tagline: "Education Beyond Excellence",
  email: "", // e.g. admissions@yourdomain.com — leave blank to show contact instructions
  phone: "", // e.g. +8801XXXXXXXXX
  address: "", // full verified physical address
  mapUrl: "", // optional verified Google Maps link
  facebook: "", // optional verified public profile URL
  youtube: "", // optional verified public channel URL
  registration: "", // only if applicable and verified
  established: "", // real year, otherwise leave blank
};

type Lang = "en" | "bn";
type Localized = { en: string; bn: string };
type Program = {
  id: string;
  name: Localized;
  level: Localized;
  summary: Localized;
  subjects: string[];
  image: string;
  suitable: Localized;
};

const L = (en: string, bn: string): Localized => ({ en, bn });

const programs: Program[] = [
  {
    id: "foundation",
    name: L("Foundational Academic Learning", "ভিত্তিমূলক একাডেমিক শিক্ষা"),
    level: L("Secondary foundation · programme template", "মাধ্যমিক ভিত্তি · কোর্সের নমুনা"),
    summary: L("Build conceptual understanding, academic confidence and consistent learning habits.", "বিষয়ভিত্তিক বোঝাপড়া, আত্মবিশ্বাস ও নিয়মিত পড়ার অভ্যাস গড়ে তোলার পরিকল্পনা।"),
    subjects: ["Mathematics", "Science", "English"],
    image: "/elvarin/elvarin-classroom.jpg",
    suitable: L("For learners strengthening their academic foundations.", "একাডেমিক ভিত্তি আরও মজবুত করতে আগ্রহী শিক্ষার্থীদের জন্য।"),
  },
  {
    id: "ssc",
    name: L("SSC Academic Preparation", "এসএসসি একাডেমিক প্রস্তুতি"),
    level: L("Classes IX–X · programme template", "নবম–দশম শ্রেণি · কোর্সের নমুনা"),
    summary: L("A structured approach to subject mastery, review and exam-focused practice.", "বিষয় আয়ত্ত, পুনরালোচনা ও পরীক্ষাভিত্তিক অনুশীলনের সুসংগঠিত পরিকল্পনা।"),
    subjects: ["Subject revision", "Practice tests", "Feedback"],
    image: "/elvarin/elvarin-male-student.jpg",
    suitable: L("For students preparing for school and SSC assessments.", "স্কুল ও এসএসসি মূল্যায়নের প্রস্তুতিতে থাকা শিক্ষার্থীদের জন্য।"),
  },
  {
    id: "hsc",
    name: L("HSC Academic Support", "এইচএসসি একাডেমিক সহায়তা"),
    level: L("Classes XI–XII · programme template", "একাদশ–দ্বাদশ শ্রেণি · কোর্সের নমুনা"),
    summary: L("Develop subject understanding through guided learning and purposeful revision.", "নির্দেশনামূলক পাঠদান ও পরিকল্পিত পুনরালোচনায় বিষয়ভিত্তিক দক্ষতা উন্নয়ন।"),
    subjects: ["Concept learning", "Study planning", "Assessment"],
    image: "/elvarin/elvarin-classroom.jpg",
    suitable: L("For higher-secondary learners requiring structured support.", "সুসংগঠিত সহায়তা প্রয়োজন এমন উচ্চমাধ্যমিক শিক্ষার্থীদের জন্য।"),
  },
  {
    id: "admission",
    name: L("Admission Readiness", "ভর্তি পরীক্ষার প্রস্তুতি"),
    level: L("Higher-study pathway · programme template", "উচ্চশিক্ষা প্রস্তুতি · কোর্সের নমুনা"),
    summary: L("Plan preparation with clear learning targets, practice and reflective feedback.", "স্পষ্ট শেখার লক্ষ্য, অনুশীলন ও ফিডব্যাকের মাধ্যমে প্রস্তুতির পরিকল্পনা।"),
    subjects: ["Study strategy", "Mock practice", "Review"],
    image: "/elvarin/elvarin-certificates.jpg",
    suitable: L("For learners exploring competitive admission preparation.", "প্রতিযোগিতামূলক ভর্তি প্রস্তুতি সম্পর্কে জানতে ইচ্ছুক শিক্ষার্থীদের জন্য।"),
  },
];

const pillars = [
  { title: "Education", subtitle: "Knowledge", description: "Building strong understanding through meaningful learning, curiosity and academic excellence." },
  { title: "Life & Learning", subtitle: "Growth", description: "Encouraging learners to grow continuously through reflection, discipline and lifelong learning." },
  { title: "Values", subtitle: "Character", description: "Nurturing character through respect, kindness, responsibility and moral grounding." },
  { title: "Awareness", subtitle: "Responsibility", description: "Developing thoughtful minds that understand self, society and responsibility." },
  { title: "Righteousness", subtitle: "Good Deeds", description: "Inspiring right action, ethical conduct and a sincere commitment to goodness." },
  { title: "Integrity", subtitle: "Trust", description: "Strengthening honesty, transparency and trust in every part of the learning journey." },
  { title: "Najah", subtitle: "Meaningful Success", description: "Guiding students toward purposeful success rooted in knowledge, values and character." },
];

const activities = [
  "Student Progress Monitoring", "Monthly Academic Reports", "Result & Assessment Updates", "Attendance Tracking",
  "Class Performance Review", "Guardian Communication", "Previous Progress History", "Academic Announcements",
  "Student Records Management", "Learning Development Insights", "Examination & Evaluation", "Administrative Support",
];

const highlights = [
  { title: "Brand & Institutional Presence", text: "A refined academy identity expressed through signboard, official environment and premium brand applications.", image: "/elvarin/elvarin-directors-office.jpg", fit: "cover" },
  { title: "Academic Environment", text: "Clean, premium and value-driven classroom and office concepts that reflect a serious educational atmosphere.", image: "/elvarin/elvarin-classroom.jpg", fit: "cover" },
  { title: "Learning & Presentation Assets", text: "Classroom visuals, stationery, academic seal and presentation materials designed to communicate trust and quality.", image: "/elvarin/elvarin-stationery.jpg", fit: "contain" },
];

const essentials = [
  { title: "Student Identity", text: "Professional student presentation with elegant, modest and recognizable institutional styling.", image: "/elvarin/elvarin-female-student.jpg", fit: "contain" },
  { title: "Pillars & Brand System", text: "The academy's principle-based identity system presented with clarity, consistency and educational meaning.", image: "/elvarin/elvarin-brand-values.jpg", fit: "contain" },
  { title: "Foundation & Vision", text: "A strong core identity built around the values of knowledge, awareness, righteousness, integrity and Najah.", image: "/elvarin/elvarin-stationery.jpg", fit: "contain" },
];

const visualGallery = [
  { src: "/elvarin/elvarin-hero-logo.jpg", title: "Brand Identity", detail: "Institutional logo and philosophy" },
  { src: "/elvarin/elvarin-directors-office.jpg", title: "Leadership Office Concept", detail: "A thoughtful academic leadership environment" },
  { src: "/elvarin/elvarin-official-seal.jpg", title: "Official Seal Concept", detail: "A refined academic seal design" },
  { src: "/elvarin/elvarin-stationery.jpg", title: "Institutional Stationery", detail: "Branded paper, notebooks and correspondence" },
  { src: "/elvarin/elvarin-male-student.jpg", title: "Student Identity · Male", detail: "Uniform and campus identity concept" },
  { src: "/elvarin/elvarin-female-student.jpg", title: "Student Identity · Female", detail: "Modest student presentation concept" },
  { src: "/elvarin/elvarin-brand-values.jpg", title: "Our Seven Guiding Values", detail: "The ELVARIN academic identity system" },
  { src: "/elvarin/elvarin-classroom.jpg", title: "Learning & Assessment", detail: "Classroom and examination environment concept" },
  { src: "/elvarin/elvarin-id-cards.jpg", title: "Identification System", detail: "Student and staff ID visual concepts" },
  { src: "/elvarin/elvarin-certificates.jpg", title: "Academic Documents", detail: "Certificate and transcript design concepts" },
];

const faqs: { q: Localized; a: Localized }[] = [
  { q: L("What programmes are available?", "কোন কোন কোর্স পাওয়া যাবে?"), a: L("The programme cards are examples for the website. Please contact the academy to confirm currently available subjects, grades, batches and schedules.", "এখানে দেখানো কোর্সগুলো ওয়েবসাইটের নমুনা। বর্তমান কোর্স, শ্রেণি, ব্যাচ ও সময়সূচি নিশ্চিত করতে প্রতিষ্ঠানের সঙ্গে যোগাযোগ করুন।") },
  { q: L("How can I learn about admissions?", "ভর্তি সম্পর্কে কীভাবে জানব?"), a: L("Use the admission enquiry form below. Once the academy publishes confirmed eligibility, fees and schedules, they can be displayed in each programme's details.", "নিচের ভর্তি অনুসন্ধান ফর্ম ব্যবহার করুন। যোগ্যতা, ফি ও সময়সূচি নিশ্চিত হলে প্রতিটি কোর্সের বিবরণে যুক্ত করা যাবে।") },
  { q: L("How are student assessments organised?", "শিক্ষার্থীদের মূল্যায়ন কীভাবে হয়?"), a: L("The proposed academic model includes baseline checks, concept teaching, practice, review and feedback. The academy should publish the methods it actually operates.", "প্রস্তাবিত একাডেমিক পদ্ধতিতে প্রাথমিক যাচাই, পাঠদান, অনুশীলন, মূল্যায়ন ও ফিডব্যাক রয়েছে। প্রতিষ্ঠান বাস্তবে যে পদ্ধতি ব্যবহার করে সেটিই প্রকাশ করতে হবে।") },
  { q: L("Can guardians see progress reports?", "অভিভাবকরা কি অগ্রগতির রিপোর্ট দেখতে পারবেন?"), a: L("A guardian portal is planned as a future integration. Access to live reports requires a secure student-management backend.", "অভিভাবক পোর্টাল ভবিষ্যৎ সংযোজনের পরিকল্পনায় রয়েছে। লাইভ রিপোর্ট দেখতে নিরাপদ স্টুডেন্ট-ম্যানেজমেন্ট ব্যাকএন্ড প্রয়োজন।") },
  { q: L("Are course fees listed online?", "কোর্সের ফি কি অনলাইনে দেওয়া আছে?"), a: L("Only verified current fees should be published. Until the academy provides them, request a written fee schedule through the enquiry contact.", "শুধু যাচাইকৃত বর্তমান ফি প্রকাশ করা উচিত। তা প্রকাশের আগে যোগাযোগের মাধ্যমে লিখিত ফি তালিকা চাইতে পারেন।") },
  { q: L("Where is the academy located?", "একাডেমির অবস্থান কোথায়?"), a: L("The confirmed address and map will appear in the contact section once added to the site's configuration.", "সাইটের সেটিংসে সঠিক ঠিকানা ও ম্যাপ যুক্ত করলে যোগাযোগ অংশে দেখা যাবে।") },
];

const navItems: { id: string; label: Localized }[] = [
  { id: "about", label: L("About", "পরিচিতি") },
  { id: "gallery", label: L("Gallery", "গ্যালারি") },
  { id: "programs", label: L("Programs", "কোর্সসমূহ") },
  { id: "methodology", label: L("Our Approach", "পাঠদান পদ্ধতি") },
  { id: "faculty", label: L("Faculty", "শিক্ষকবৃন্দ") },
  { id: "achievements", label: L("Achievements", "অর্জন") },
  { id: "admission", label: L("Admissions", "ভর্তি") },
  { id: "contact", label: L("Contact", "যোগাযোগ") },
];

const plannedModules = [
  { name: "Student", icon: "01", description: "Courses · Routine · Assignments · Results · Notices" },
  { name: "Guardian", icon: "02", description: "Attendance · Academic Reports · Communication · Fees" },
  { name: "Teacher", icon: "03", description: "Classes · Attendance · Assessment · Resources" },
  { name: "Administration", icon: "04", description: "Admissions · Batches · Faculty · Reporting · Records" },
];

function Icon({ name, size = 19 }: { name: "arrow" | "menu" | "close" | "chevron" | "check" | "mail" | "phone" | "pin" | "search" | "book" | "shield" | "calendar" | "users"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5l14 14M19 5L5 19" /></>,
    chevron: <><path d="m6 9 6 6 6-6" /></>,
    check: <><path d="m4 12 5 5L20 6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <><path d="M8 3H5a2 2 0 0 0-2 2c0 8.84 7.16 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 2a14 14 0 0 1-6-6l2-2-2-5z" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    book: <><path d="M12 6c-3-2-6-2-10-1v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1ZM12 6v14" /></>,
    shield: <><path d="M12 2 4 5v6c0 5 3 8 8 11 5-3 8-6 8-11V5l-8-3z" /><path d="m8 12 3 3 5-6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Photo({ src, alt, fit = "contain", priority = false, className = "" }: { src: string; alt: string; fit?: string; priority?: boolean; className?: string }) {
  return (
    <div className={`photo ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 750px) 100vw, (max-width: 1100px) 50vw, 40vw" className={fit === "cover" ? "photo-cover" : "photo-contain"} />
    </div>
  );
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const [galleryImage, setGalleryImage] = useState<(typeof visualGallery)[number] | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);
  const [programSearch, setProgramSearch] = useState("");
  const [noticeTab, setNoticeTab] = useState<"news" | "academic" | "admission">("news");
  const [formStatus, setFormStatus] = useState("");
  const [modal, setModal] = useState<null | "policies" | "registration" | "fees">(null);
  const t = (item: Localized) => item[lang];

  const shownPrograms = useMemo(() => programs.filter((p) =>
    [p.name.en, p.name.bn, p.summary.en, p.summary.bn, ...p.subjects].join(" ").toLowerCase().includes(programSearch.toLowerCase())
  ), [programSearch]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: 0.07 });
    document.querySelectorAll(".elvarin-home .reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeProgram, modal]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setActiveProgram(null); setModal(null); setMobileMenu(false); } };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const subject = String(data.get("program") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !contact || !subject) { setFormStatus(t(L("Please complete the required fields.", "প্রয়োজনীয় তথ্য পূরণ করুন।"))); return; }
    if (!CONFIG.email) { setFormStatus(t(L("The official email is not configured yet. Please contact the academy through its verified contact details when published. Your information has not been sent or saved.", "অফিসিয়াল ইমেইল এখনও সেট করা হয়নি। নির্ভরযোগ্য যোগাযোগের তথ্য প্রকাশ হলে যোগাযোগ করুন। আপনার তথ্য পাঠানো বা সংরক্ষণ করা হয়নি।"))); return; }
    const body = `Name: ${name}\nContact: ${contact}\nProgramme: ${subject}\nMessage: ${message || "Not provided"}`;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`ELVARIN enquiry — ${subject}`)}&body=${encodeURIComponent(body)}`;
    setFormStatus(t(L("Your email app should open with a prepared enquiry. Please press Send there; this page does not submit or store your information.", "আপনার ইমেইল অ্যাপে প্রস্তুত বার্তা খোলার কথা। সেখানে Send চাপতে হবে; এই ওয়েবপেজ আপনার তথ্য জমা বা সংরক্ষণ করে না।")));
  };

  const closeMenu = () => setMobileMenu(false);
  return (
    <main className="elvarin-home" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="top-strip"><span>EDUCATION</span><b>✦</b><span>LIFE & LEARNING</span><b>✦</b><span>VALUES</span><b>✦</b><span>AWARENESS</span><b>✦</b><span>RIGHTEOUSNESS</span><b>✦</b><span>INTEGRITY</span><b>✦</b><span>NAJAH</span></div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand-block" aria-label="ELVARIN Academy home" onClick={closeMenu}>
            <div className="brand-mark" aria-hidden="true" />
            <div className="brand-copy"><span className="brand-title">ELVARIN</span><span className="brand-subtitle">ACADEMY</span></div>
          </Link>
          <nav className={`nav-links ${mobileMenu ? "nav-open" : ""}`} aria-label="Main navigation">
            <a href="#home" onClick={closeMenu}>{t(L("Home", "হোম"))}</a>
            {navItems.map((item) => <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>{t(item.label)}</a>)}
            <a className="nav-admin-mobile" href="/admin" onClick={closeMenu}>{t(L("Admin Portal", "অ্যাডমিন পোর্টাল"))}</a>
          </nav>
          <div className="header-actions">
            <button type="button" className="language-btn" onClick={() => setLang((old) => old === "en" ? "bn" : "en")} aria-label="Switch language">{lang === "en" ? "বাংলা" : "English"}</button>
            <Link href="/admin" className="portal-btn">{t(L("Admin Portal", "অ্যাডমিন পোর্টাল"))}</Link>
            <button type="button" className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-expanded={mobileMenu} aria-label={mobileMenu ? "Close navigation" : "Open navigation"}><Icon name={mobileMenu ? "close" : "menu"} size={22} /></button>
          </div>
        </div>
      </header>

      <div id="main-content">
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="section-kicker">{t(L("WELCOME TO ELVARIN ACADEMY", "এলভারিন একাডেমিতে স্বাগতম"))}</p>
              <h1>{t(L("Education Beyond", "শিক্ষার পথে"))}<span>{t(L(" Excellence.", " উৎকর্ষের সন্ধানে।"))}</span></h1>
              <p className="hero-text">{t(L("A purposeful learning philosophy where academic knowledge meets character, growth, responsibility and integrity. Discover a clear vision for a more meaningful educational journey.", "জ্ঞান, চরিত্র, বিকাশ, দায়িত্ববোধ ও সততার সমন্বয়ে আমাদের শিক্ষাদর্শন। অর্থবহ শিক্ষাযাত্রার জন্য জানুন এলভারিনের লক্ষ্য ও পরিকল্পনা।"))}</p>
              <div className="hero-actions"><a href="#programs" className="btn btn-gold">{t(L("Explore Academic Programs", "একাডেমিক কোর্স দেখুন"))} <Icon name="arrow" size={16}/></a><a href="#admission" className="btn btn-outline">{t(L("Admission Enquiry", "ভর্তি বিষয়ে জানুন"))}</a></div>
              <div className="hero-points"><span>{t(L("Purposeful Learning", "অর্থবহ শিক্ষা"))}</span><span>{t(L("Character & Values", "চরিত্র ও মূল্যবোধ"))}</span><span>{t(L("Meaningful Success", "অর্থপূর্ণ সাফল্য"))}</span></div>
            </div>
            <div className="hero-visual reveal"><Photo src="/elvarin/elvarin-hero-logo.jpg" alt="ELVARIN Academy brand and institutional identity concept" fit="cover" priority className="hero-frame" /><span className="image-note">{t(L("ELVARIN institutional visual concept", "এলভারিনের প্রাতিষ্ঠানিক ডিজাইন ধারণা"))}</span></div>
          </div>
        </section>

        <section className="identity-strip" aria-label="Our commitments"><div className="container identity-grid">
          {[{title:L("Academic Purpose", "একাডেমিক লক্ষ্য"),body:L("Conceptual knowledge, strong learning habits and purposeful progress.", "বিষয়ভিত্তিক জ্ঞান, অধ্যবসায় ও অর্থবহ উন্নয়ন।")}, {title:L("Values-Led Vision", "মূল্যবোধের দর্শন"),body:L("Education connected with integrity, awareness and character.", "সততা, সচেতনতা ও চরিত্রের সঙ্গে শিক্ষার সংযোগ।")}, {title:L("Transparent Communication", "স্বচ্ছ যোগাযোগ"),body:L("Clear information about programmes, admissions and academy development.", "কোর্স, ভর্তি ও প্রতিষ্ঠানের উন্নয়ন নিয়ে স্পষ্ট তথ্য।")}].map((item) => <article className="identity-card reveal" key={item.title.en}><h3>{t(item.title)}</h3><p>{t(item.body)}</p></article>)}
        </div></section>

        <section id="about" className="section"><div className="container two-col">
          <div className="copy-col reveal"><p className="section-kicker">01 / {t(L("ABOUT THE ACADEMY", "একাডেমির পরিচিতি"))}</p><h2>{t(L("An academic vision with", "একটি শিক্ষাদর্শন,"))} <em>{t(L(" deeper purpose.", " যার লক্ষ্য আরও গভীর।"))}</em></h2>
            <p className="body-text">{t(L("ELVARIN Academy is envisioned as a learning institution where knowledge, thoughtful habits and moral character develop together. Our identity brings academic aspirations and purposeful life-long learning into one coherent philosophy.", "এলভারিন একাডেমির ভাবনায় জ্ঞান, চিন্তাশীল অভ্যাস ও নৈতিক চরিত্র একসঙ্গে বিকশিত হয়। এখানে একাডেমিক লক্ষ্য এবং জীবনব্যাপী শিক্ষা একই দর্শনে যুক্ত।"))}</p>
            <p className="body-text">{t(L("Our aim is to build a clear, welcoming and responsible educational environment. As programmes and facilities develop, their verified details will be published transparently.", "আমাদের লক্ষ্য একটি সুসংগঠিত, আন্তরিক ও দায়িত্বশীল শিক্ষার পরিবেশ গড়ে তোলা। কোর্স ও সুযোগ-সুবিধা চালু হলে যাচাইকৃত তথ্য স্বচ্ছভাবে প্রকাশ করা হবে।"))}</p>
            <div className="mission-grid"><div><span>{t(L("OUR MISSION", "আমাদের মিশন"))}</span><p>{t(L("Encourage knowledge, character and steady academic growth.", "জ্ঞান, চরিত্র ও ধারাবাহিক শিক্ষাগত বিকাশে উৎসাহ দেওয়া।"))}</p></div><div><span>{t(L("OUR VISION", "আমাদের ভিশন"))}</span><p>{t(L("Meaningful success guided by awareness, integrity and values.", "সচেতনতা, সততা ও মূল্যবোধে পরিচালিত অর্থবহ সাফল্য।"))}</p></div></div>
            <a href="#principles" className="text-link">{t(L("Discover our seven guiding pillars", "আমাদের সাতটি মূলনীতি দেখুন"))} <Icon name="arrow" size={17}/></a>
          </div><div className="media-col reveal"><Photo src="/elvarin/elvarin-stationery.jpg" alt="ELVARIN foundational vision" className="soft-frame" /></div>
        </div></section>

        <section className="philosophy-band"><div className="container reveal"><p className="section-kicker center-kicker">ELVARIN ACADEMY PHILOSOPHY</p><blockquote>“Education and Life-long Learning, guided by Values and Awareness, shaped by Righteousness and Integrity, leading to Najah.”</blockquote><p className="philosophy-note">LEARN · GROW · ACHIEVE NAJAH</p></div></section>

        <section id="principles" className="section soft-section"><div className="container">
          <div className="section-head reveal"><p className="section-kicker">02 / {t(L("GUIDING PRINCIPLES", "আমাদের মূলনীতি"))}</p><h2>{t(L("Seven pillars.", "সাতটি ভিত্তি।"))} <em>{t(L(" One educational purpose.", " একটিই শিক্ষার লক্ষ্য।"))}</em></h2><p>{t(L("Our principles connect learning with responsibility, goodness and lasting growth.", "আমাদের মূলনীতি শিক্ষা, দায়িত্ববোধ, ভালো কাজ ও দীর্ঘস্থায়ী বিকাশকে যুক্ত করে।"))}</p></div>
          <div className="wide-visual reveal"><Photo src="/elvarin/elvarin-brand-values.jpg" alt="ELVARIN Academy seven guiding pillars" className="wide-frame" /></div>
          <div className="pillars-grid">{pillars.map((pillar,index) => <article key={pillar.title} className="pillar-card reveal"><span className="pillar-number">{String(index+1).padStart(2,"0")}</span><h3>{pillar.title}</h3><strong>{pillar.subtitle}</strong><p>{pillar.description}</p></article>)}</div>
        </div></section>

        <section id="programs" className="section"><div className="container">
          <div className="section-head reveal"><p className="section-kicker">03 / {t(L("LEARNING PATHWAYS", "শেখার পথ"))}</p><h2>{t(L("Explore the", "খুঁজে নিন"))} <em>{t(L(" academic possibilities.", " আপনার শিক্ষার পথ।"))}</em></h2><p>{t(L("These are illustrative programme categories. Actual admissions, subjects, fees and schedules will appear once confirmed by the academy.", "এগুলো কোর্স বিভাগের নমুনা। প্রতিষ্ঠানের অনুমোদিত কোর্স, বিষয়, ফি ও সময়সূচি নিশ্চিত হলে এখানে প্রকাশ করা হবে।"))}</p></div>
          <div className="program-toolbar"><label htmlFor="program-search"><Icon name="search"/><span className="sr-only">Search courses</span></label><input id="program-search" type="search" value={programSearch} onChange={(e)=>setProgramSearch(e.target.value)} placeholder={t(L("Search learning pathways...", "কোর্স খুঁজুন..."))}/><span className="program-count">{shownPrograms.length} {t(L("categories", "টি বিভাগ"))}</span></div>
          <div className="program-grid">{shownPrograms.map(p => <article className="program-card reveal" key={p.id}><Photo src={p.image} alt={`${p.name.en} ELVARIN visual concept`} className="program-photo"/><div className="program-content"><span className="eyebrow">{t(p.level)}</span><h3>{t(p.name)}</h3><p>{t(p.summary)}</p><button type="button" className="text-link" onClick={()=>setActiveProgram(p)}>{t(L("Explore programme", "কোর্সের বিবরণ"))} <Icon name="arrow" size={16}/></button></div></article>)}</div>
          {shownPrograms.length===0 && <p className="empty-search">{t(L("No matching programme categories.", "এই অনুসন্ধানে কোনো কোর্স পাওয়া যায়নি।"))}</p>}
          <p className="editorial-note">{t(L("Programme information shown here is a planning template, not an announcement of currently running classes.", "এখানে দেখানো কোর্সগুলো পরিকল্পনার নমুনা, বর্তমানে চালু থাকা ক্লাসের ঘোষণা নয়।"))}</p>
        </div></section>

        <section id="methodology" className="section soft-section"><div className="container">
          <div className="section-head reveal"><p className="section-kicker">04 / {t(L("ACADEMIC METHODOLOGY", "একাডেমিক পদ্ধতি"))}</p><h2>{t(L("A thoughtful path", "শেখার একটি"))} <em>{t(L(" from learning to growth.", " সুপরিকল্পিত যাত্রা।"))}</em></h2><p>{t(L("A proposed five-stage framework for a clear and student-centred academic experience.", "শিক্ষার্থী-কেন্দ্রিক একাডেমিক অভিজ্ঞতার প্রস্তাবিত পাঁচ ধাপ।"))}</p></div>
          <div className="steps-grid">{[
            {a:"Diagnose",b:"প্রাথমিক যাচাই",d:"Understand starting points and learning needs."},
            {a:"Teach",b:"পাঠদান",d:"Build understanding with clear explanations."},
            {a:"Practice",b:"অনুশীলন",d:"Reinforce learning with guided exercises."},
            {a:"Assess",b:"মূল্যায়ন",d:"Check understanding through relevant assessments."},
            {a:"Improve",b:"উন্নয়ন",d:"Use feedback to guide the next learning step."},
          ].map((step,i)=><article key={step.a} className="step-card reveal"><span className="step-number">0{i+1}</span><h3>{lang==="en"?step.a:step.b}</h3><p>{lang==="en"?step.d:["শুরুর দক্ষতা ও চাহিদা বোঝা।","সহজ ব্যাখ্যায় বিষয়টি আয়ত্ত করা।","পরিচালিত অনুশীলনে দক্ষতা বাড়ানো।","উপযুক্ত পরীক্ষায় শেখা যাচাই।","ফিডব্যাক থেকে পরবর্তী পদক্ষেপ নির্ধারণ।"][i]}</p></article>)}</div>
          <div className="operations-intro reveal"><div><p className="section-kicker">{t(L("ACADEMIC SUPPORT MODEL", "একাডেমিক সহায়তার কাঠামো"))}</p><h3>{t(L("Built to support a more organised learning journey.", "আরও সুসংগঠিত শিক্ষাযাত্রার পরিকল্পনা।"))}</h3></div><p>{t(L("These are proposed academic and operational modules. Items requiring student records or databases should be activated only when connected to a working administration system.", "এগুলো প্রস্তাবিত একাডেমিক ও প্রশাসনিক মডিউল। শিক্ষার্থীর তথ্য বা ডেটাবেস-নির্ভর সেবা কার্যকর সিস্টেমের সঙ্গে যুক্ত হওয়ার পর চালু করতে হবে।"))}</p></div>
          <div className="operations-grid">{activities.map((item,index)=><div className="operation-card reveal" key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></div>)}</div>
        </div></section>

        <section id="faculty" className="section"><div className="container faculty-grid">
          <div className="reveal"><p className="section-kicker">05 / {t(L("FACULTY & ACADEMIC LEADERSHIP", "শিক্ষক ও একাডেমিক নেতৃত্ব"))}</p><h2>{t(L("Education begins", "শিক্ষার শুরু"))} <em>{t(L(" with dedicated people.", " নিবেদিত মানুষের হাতে।"))}</em></h2><p className="body-text">{t(L("Trust grows when learners and guardians know who is guiding them. This area is reserved for real faculty names, teaching subjects, verified qualifications and an authentic message from the academic director.", "যাঁরা শিক্ষা দেন তাঁদের সম্পর্কে জানা অভিভাবক ও শিক্ষার্থীর আস্থা বাড়ায়। এই অংশে প্রকৃত শিক্ষকদের নাম, বিষয়, যাচাইকৃত যোগ্যতা এবং একাডেমিক পরিচালকের বক্তব্য দেওয়া হবে।"))}</p><ul className="feature-list"><li>{t(L("Authentic teacher portraits and full names", "শিক্ষকদের আসল ছবি ও পূর্ণ নাম"))}</li><li>{t(L("Subjects, qualifications and experience", "বিষয়, শিক্ষাগত যোগ্যতা ও অভিজ্ঞতা"))}</li><li>{t(L("Director's message and academic philosophy", "পরিচালকের বক্তব্য ও শিক্ষাদর্শন"))}</li></ul><span className="coming-tag">{t(L("Profiles pending verification", "প্রোফাইল যাচাই সাপেক্ষে প্রকাশিত হবে"))}</span></div>
          <div className="faculty-visual reveal"><Photo src="/elvarin/elvarin-directors-office.jpg" alt="ELVARIN planned academic environment" className="soft-frame"/><div className="floating-quote">{t(L("Real credentials. Clear roles. Responsible guidance.", "প্রকৃত যোগ্যতা। স্পষ্ট দায়িত্ব। দায়িত্বশীল দিকনির্দেশনা।"))}</div></div>
        </div></section>

        <section id="achievements" className="section achievement-section"><div className="container achievement-grid">
          <div className="reveal"><p className="section-kicker">06 / {t(L("PROGRESS & ACHIEVEMENTS", "অগ্রগতি ও অর্জন"))}</p><h2>{t(L("A place for", "যাচাইকৃত"))} <em>{t(L(" verified progress.", " অগ্রগতির গল্প।"))}</em></h2><p className="body-text">{t(L("We believe achievements should be presented with accuracy and context. Once verified outcomes are available, this area can showcase examination-year results, competitions, student growth and approved success stories.", "আমাদের বিশ্বাস সাফল্যের তথ্য সঠিক ও প্রাসঙ্গিক হওয়া উচিত। যাচাইকৃত তথ্য পাওয়া গেলে পরীক্ষার বছর অনুযায়ী ফলাফল, প্রতিযোগিতা, শিক্ষার্থীর বিকাশ ও অনুমতিপ্রাপ্ত সাফল্যের গল্প এখানে প্রকাশিত হবে।"))}</p><span className="coming-tag">{t(L("Verified results will be published here", "যাচাইকৃত ফলাফল এখানে প্রকাশিত হবে"))}</span></div>
          <div className="achievement-cards reveal"><div><Icon name="shield" size={27}/><h3>{t(L("Verified Results", "যাচাইকৃত ফলাফল"))}</h3><p>{t(L("Year, examination and source context.", "বছর, পরীক্ষা ও তথ্যের উৎস।"))}</p></div><div><Icon name="users" size={27}/><h3>{t(L("Student Stories", "শিক্ষার্থীর গল্প"))}</h3><p>{t(L("With permission and authentic attribution.", "অনুমতি ও প্রকৃত পরিচয়সহ।"))}</p></div><div><Icon name="book" size={27}/><h3>{t(L("Academic Reviews", "শিক্ষাগত পর্যালোচনা"))}</h3><p>{t(L("Meaningful updates on activities and growth.", "কার্যক্রম ও উন্নয়নের অর্থবহ তথ্য।"))}</p></div></div>
        </div></section>

        <section id="environment" className="section"><div className="container"><div className="section-head reveal"><p className="section-kicker">07 / {t(L("ENVIRONMENT & CAMPUS VISION", "পরিবেশ ও ক্যাম্পাসের পরিকল্পনা"))}</p><h2>{t(L("An identity that feels", "শিক্ষার পরিবেশে"))} <em>{t(L(" academic and refined.", " সৌন্দর্য ও শৃঙ্খলা।"))}</em></h2><p>{t(L("The original ELVARIN concept imagery is preserved below. These are brand and environment presentations—not proof of completed campus facilities.", "এলভারিনের আগের ডিজাইন কনসেপ্টের ছবিগুলো নিচে রাখা হয়েছে। এগুলো ব্র্যান্ড ও পরিবেশের ধারণা—বাস্তব অবকাঠামো সম্পন্ন হওয়ার প্রমাণ নয়।"))}</p></div>
          <div className="showcase-grid">{highlights.map(item=><article key={item.title} className="showcase-card reveal"><Photo src={item.image} alt={item.title} fit={item.fit} className="showcase-frame"/><div className="showcase-body"><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div></section>

        <section className="section student-section"><div className="container student-grid"><div className="reveal"><Photo src="/elvarin/elvarin-female-student.jpg" alt="ELVARIN Academy student identity concept" className="student-frame" /></div><div className="reveal"><p className="section-kicker">08 / {t(L("STUDENT IDENTITY", "শিক্ষার্থীর পরিচয়"))}</p><h2>{t(L("Presentation that reflects", "পরিচয় হোক"))} <em>{t(L(" discipline and belonging.", " শৃঙ্খলা ও ঐক্যের প্রতীক।"))}</em></h2><p className="body-text">{t(L("The academy's visual direction uses deep green, muted gold and warm ivory to express unity, modesty and academic seriousness.", "একাডেমির ভিজ্যুয়াল পরিচয়ে ডিপ গ্রিন, সংযত গোল্ড ও ওয়ার্ম আইভরি ব্যবহৃত হয়েছে ঐক্য, পরিমিতি ও শিক্ষার গুরুত্ব প্রকাশে।"))}</p><ul className="feature-list"><li>{t(L("Recognisable academic identity", "সহজে চেনা যায় এমন প্রাতিষ্ঠানিক পরিচয়"))}</li><li>{t(L("Consistent visual system and materials", "সামঞ্জস্যপূর্ণ ভিজ্যুয়াল ডিজাইন ও উপকরণ"))}</li><li>{t(L("Student-centred institutional presentation", "শিক্ষার্থীকেন্দ্রিক প্রাতিষ্ঠানিক উপস্থাপনা"))}</li></ul></div></div></section>

        <section className="section"><div className="container"><div className="section-head reveal"><p className="section-kicker">09 / {t(L("ACADEMY BRAND ESSENTIALS", "একাডেমির ব্র্যান্ড উপকরণ"))}</p><h2>{t(L("Every detail helps build", "প্রতিটি উপাদানে"))} <em>{t(L(" a cohesive identity.", " সামঞ্জস্যপূর্ণ পরিচয়।"))}</em></h2><p>{t(L("Selected original ELVARIN visual assets, from student presentation to foundational identity.", "শিক্ষার্থীদের উপস্থাপনা থেকে প্রতিষ্ঠানের মূল পরিচয় পর্যন্ত এলভারিনের আগের বাছাই করা ডিজাইন।"))}</p></div><div className="essentials-grid">{essentials.map(item=><article key={item.title} className="essential-card reveal"><Photo src={item.image} alt={item.title} fit={item.fit} className="essential-frame"/><div className="essential-content"><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>

        {/* COMPLETE BRAND VISUAL GALLERY — ten supplied images */}
        <section id="gallery" className="section gallery-section">
          <div className="container">
            <div className="section-head reveal">
              <p className="section-kicker">ELVARIN / VISUAL IDENTITY GALLERY</p>
              <h2>{t(L("An academy identity", "এলভারিনের পরিচয়ে"))} <em>{t(L(" in every detail.", " প্রতিটি বিস্তারিত উপাদান।"))}</em></h2>
              <p>{t(L("Explore our complete collection of visual identity and campus concepts. Illustrations are design proposals, not verified photographs of operating facilities.", "আমাদের ব্র্যান্ড এবং ক্যাম্পাস ডিজাইন কনসেপ্ট দেখুন। ছবিগুলো পরিকল্পিত ভিজ্যুয়াল—বাস্তব চালু সুবিধার যাচাইকৃত ছবি নয়।"))}</p>
            </div>
            <div className="gallery-grid">
              {visualGallery.map((item, index) => (
                <article key={item.src} className="gallery-card reveal" style={{transitionDelay:`${(index%4)*35}ms`}}>
                  <button type="button" className="gallery-visual" onClick={() => setGalleryImage(item)} aria-label={`Enlarge ${item.title}`}>
                    <Image src={item.src} alt={item.title + " ELVARIN design concept"} fill sizes="(max-width: 650px) 100vw, (max-width: 950px) 50vw, 33vw" />
                    <span className="gallery-zoom">View image ↗</span>
                  </button>
                  <div className="gallery-body"><h3>{item.title}</h3><p>{item.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="student-life" className="section soft-section"><div className="container two-col"><div className="reveal"><p className="section-kicker">10 / {t(L("STUDENT & GUARDIAN EXPERIENCE", "শিক্ষার্থী ও অভিভাবকের অভিজ্ঞতা"))}</p><h2>{t(L("Trust is built", "বিশ্বাসের ভিত্তি"))} <em>{t(L(" on real experiences.", " বাস্তব অভিজ্ঞতা।"))}</em></h2><p className="body-text">{t(L("Authentic student reflections and guardian feedback will be shared here only when consent and attribution are available. We do not publish fabricated endorsements.", "শিক্ষার্থী ও অভিভাবকের প্রকৃত অভিজ্ঞতা অনুমতি ও পরিচয় নিশ্চিত করেই এখানে প্রকাশ করা হবে। কল্পিত প্রশংসাপত্র প্রকাশ করা হবে না।"))}</p><span className="coming-tag">{t(L("Community stories coming after verification", "যাচাইয়ের পর অভিজ্ঞতার গল্প যুক্ত হবে"))}</span></div><div className="testimonial-placeholder reveal"><span className="quote-mark">“</span><h3>{t(L("Every learner has a story worth hearing.", "প্রতিটি শিক্ষার্থীর অভিজ্ঞতা মূল্যবান।"))}</h3><p>{t(L("This space is reserved for genuine student and guardian voices.", "এই জায়গাটি প্রকৃত শিক্ষার্থী ও অভিভাবকদের বক্তব্যের জন্য সংরক্ষিত।"))}</p></div></div></section>

        <section id="news" className="section"><div className="container"><div className="section-head reveal"><p className="section-kicker">11 / {t(L("NEWS & ANNOUNCEMENTS", "খবর ও নোটিশ"))}</p><h2>{t(L("Stay informed.", "সর্বশেষ তথ্য।"))} <em>{t(L(" Stay connected.", " থাকুন সংযুক্ত।"))}</em></h2><p>{t(L("Official updates are displayed here once published through an academy-managed content system.", "প্রতিষ্ঠানের কনটেন্ট ম্যানেজমেন্ট সিস্টেম দিয়ে প্রকাশ করা হলে এখানে অফিসিয়াল আপডেট দেখানো হবে।"))}</p></div>
          <div className="tab-buttons" role="tablist" aria-label="Announcements">{[{id:"news",l:L("Latest News", "খবর")},{id:"academic",l:L("Academic Notices", "একাডেমিক নোটিশ")},{id:"admission",l:L("Admission Updates", "ভর্তি আপডেট")}].map(tab=><button key={tab.id} type="button" role="tab" aria-selected={noticeTab===tab.id} className={noticeTab===tab.id?"tab-active":""} onClick={()=>setNoticeTab(tab.id as typeof noticeTab)}>{t(tab.l)}</button>)}</div>
          <div className="notice-empty" role="tabpanel"><Icon name="calendar" size={32}/><h3>{noticeTab==="news"?t(L("Latest News", "সর্বশেষ খবর")):noticeTab==="academic"?t(L("Academic Notices", "একাডেমিক নোটিশ")):t(L("Admission Updates", "ভর্তি আপডেট"))}</h3><p>{t(L("No official announcements have been published in this category yet. Updates will appear here with a publication date when available.", "এই বিভাগে এখনো কোনো অফিসিয়াল ঘোষণা প্রকাশিত হয়নি। প্রকাশ হলে তারিখসহ এখানে দেখা যাবে।"))}</p></div>
        </div></section>

        <section id="admission" className="section admission-section"><div className="container"><div className="section-head reveal"><p className="section-kicker">12 / {t(L("ADMISSION JOURNEY", "ভর্তি প্রক্রিয়া"))}</p><h2>{t(L("A clear beginning", "শিক্ষাযাত্রার"))} <em>{t(L(" for every learner.", " সহজ সূচনা।"))}</em></h2><p>{t(L("Explore a programme, request accurate information and make an informed enrolment decision.", "কোর্স সম্পর্কে জানুন, সঠিক তথ্য সংগ্রহ করুন এবং বুঝে-শুনে ভর্তি সিদ্ধান্ত নিন।"))}</p></div>
          <div className="admission-steps">{[
            [L("Choose a Path", "কোর্স বেছে নিন"),L("Explore available academic options.", "একাডেমিক বিকল্পগুলো দেখুন।")],
            [L("Request Details", "বিস্তারিত জানুন"),L("Ask about eligibility, times and fees.", "যোগ্যতা, সময় ও ফি সম্পর্কে জানুন।")],
            [L("Apply", "আবেদন করুন"),L("Complete the academy's confirmed process.", "প্রতিষ্ঠানের নির্ধারিত নিয়মে আবেদন করুন।")],
            [L("Start Learning", "শেখা শুরু করুন"),L("Receive your confirmed class information.", "নিশ্চিত ক্লাসের তথ্য সংগ্রহ করুন।")],
          ].map((step,i)=><article key={i} className="admission-step reveal"><span>0{i+1}</span><h3>{t(step[0])}</h3><p>{t(step[1])}</p></article>)}</div>
          <div className="admission-grid"><div className="admission-copy reveal"><h3>{t(L("Ask an admission question", "ভর্তি সম্পর্কে প্রশ্ন করুন"))}</h3><p>{t(L("Tell us your programme of interest. The form prepares an email for your own email app; it does not store applications or automatically enroll students.", "আপনার আগ্রহের কোর্সটি জানান। এই ফর্ম আপনার ইমেইল অ্যাপে বার্তা প্রস্তুত করে; এটি আবেদন সংরক্ষণ বা স্বয়ংক্রিয় ভর্তি করে না।"))}</p><div className="admission-actions"><button type="button" onClick={()=>setModal("fees")} className="text-link">{t(L("Fees & admissions transparency", "ফি ও ভর্তি সংক্রান্ত স্বচ্ছতা"))} <Icon name="arrow" size={16}/></button></div></div>
            <form className="enquiry-form reveal" onSubmit={handleEnquiry}><label htmlFor="enquiry-name">{t(L("Your name", "আপনার নাম"))} *</label><input id="enquiry-name" name="name" required maxLength={90} autoComplete="name" placeholder={t(L("Full name", "পূর্ণ নাম"))}/><label htmlFor="enquiry-contact">{t(L("Email or phone", "ইমেইল বা ফোন"))} *</label><input id="enquiry-contact" name="contact" required maxLength={120} autoComplete="email" placeholder={t(L("Your contact details", "আপনার যোগাযোগের তথ্য"))}/><label htmlFor="enquiry-program">{t(L("Programme of interest", "পছন্দের কোর্স"))} *</label><select id="enquiry-program" name="program" required defaultValue=""><option value="" disabled>{t(L("Select an area", "একটি বিভাগ বেছে নিন"))}</option>{programs.map(p=><option key={p.id} value={p.name.en}>{t(p.name)}</option>)}<option value="General enquiry">{t(L("General enquiry", "সাধারণ প্রশ্ন"))}</option></select><label htmlFor="enquiry-message">{t(L("Your question (optional)", "আপনার প্রশ্ন (ঐচ্ছিক)"))}</label><textarea id="enquiry-message" name="message" rows={3} maxLength={1500} placeholder={t(L("What would you like to know?", "আপনি কী জানতে চান?"))}/><button className="btn btn-gold" type="submit">{t(L("Prepare email enquiry", "ইমেইল বার্তা তৈরি করুন"))} <Icon name="arrow" size={16}/></button><p className="form-disclaimer">{t(L("No information is saved by this page. An email application is required.", "এই পেজে তথ্য সংরক্ষিত হয় না। ইমেইল অ্যাপ প্রয়োজন।"))}</p>{formStatus && <p className="form-status" role="status">{formStatus}</p>}</form>
          </div>
        </div></section>

        <section id="digital-campus" className="section"><div className="container"><div className="section-head reveal"><p className="section-kicker">13 / {t(L("DIGITAL ACADEMY ROADMAP", "ডিজিটাল একাডেমি পরিকল্পনা"))}</p><h2>{t(L("Connected services.", "সমন্বিত সেবা।"))} <em>{t(L(" Responsible technology.", " দায়িত্বশীল প্রযুক্তি।"))}</em></h2><p>{t(L("A planned digital ecosystem for learners, guardians, faculty and academy management. These modules require backend development and secure access before launch.", "শিক্ষার্থী, অভিভাবক, শিক্ষক ও প্রশাসনের জন্য পরিকল্পিত ডিজিটাল ব্যবস্থা। চালুর আগে এগুলোর ব্যাকএন্ড উন্নয়ন ও নিরাপদ প্রবেশাধিকার তৈরি করতে হবে।"))}</p></div>
          <div className="module-grid">{plannedModules.map(m=><article className="module-card reveal" key={m.name}><span>{m.icon}</span><h3>{m.name} Portal</h3><p>{m.description}</p><small>{t(L("Planned integration", "পরিকল্পিত সংযোজন"))}</small></article>)}</div>
          <div className="portal-inline"><div><h3>{t(L("Existing Administrator Access", "বর্তমান অ্যাডমিন অ্যাক্সেস"))}</h3><p>{t(L("Your original /admin route is preserved. Its security and actual functionality depend on the existing application.", "আপনার আগের /admin লিংক অক্ষত রয়েছে। এর নিরাপত্তা ও বাস্তব কার্যকারিতা বর্তমান অ্যাপ্লিকেশনের ওপর নির্ভর করে।"))}</p></div><Link className="btn btn-dark" href="/admin">{t(L("Open Admin Portal", "অ্যাডমিন পোর্টাল খুলুন"))} <Icon name="arrow" size={16}/></Link></div>
        </div></section>

        <section id="faq" className="section soft-section"><div className="container faq-grid"><div className="reveal"><p className="section-kicker">14 / {t(L("FREQUENTLY ASKED QUESTIONS", "সাধারণ প্রশ্নাবলি"))}</p><h2>{t(L("Clarity makes", "স্পষ্ট তথ্য"))} <em>{t(L(" better decisions possible.", " সিদ্ধান্ত সহজ করে।"))}</em></h2><p className="body-text">{t(L("Find useful information about programmes, admissions and the academy's planned services.", "কোর্স, ভর্তি ও একাডেমির পরিকল্পিত সেবা সম্পর্কে প্রয়োজনীয় তথ্য জানুন।"))}</p></div><div className="faq-list">{faqs.map((f,i)=><div className="faq-item" key={i}><button type="button" aria-expanded={openFaq===i} aria-controls={`faq-answer-${i}`} onClick={()=>setOpenFaq(openFaq===i?null:i)}><span>{t(f.q)}</span><Icon name="chevron" size={19}/></button>{openFaq===i && <div id={`faq-answer-${i}`} className="faq-answer"><p>{t(f.a)}</p></div>}</div>)}</div></div></section>

        <section className="cta-section"><div className="container cta-grid reveal"><div><p className="section-kicker">{t(L("CONNECT WITH ELVARIN", "এলভারিনের সঙ্গে যুক্ত হোন"))}</p><h2>{t(L("Begin with curiosity.", "কৌতূহল থেকে শুরু।"))} <em>{t(L(" Grow with purpose.", " উদ্দেশ্য নিয়ে এগিয়ে চলা।"))}</em></h2><p className="body-text light-text">{t(L("Explore our academic vision and connect with the academy for verified programme and admission information.", "আমাদের শিক্ষাদর্শন জানুন এবং কোর্স ও ভর্তির যাচাইকৃত তথ্যের জন্য যোগাযোগ করুন।"))}</p></div><div className="cta-card"><h3>{t(L("Take the next step", "পরবর্তী ধাপে এগিয়ে যান"))}</h3><p>{t(L("Discover learning pathways or send an admission question. We value clear information and thoughtful decisions.", "কোর্স দেখুন অথবা ভর্তি বিষয়ে প্রশ্ন করুন। স্পষ্ট তথ্য ও চিন্তাশীল সিদ্ধান্তই আমাদের অগ্রাধিকার।"))}</p><div className="cta-actions"><a href="#admission" className="btn btn-gold">{t(L("Admission Enquiry", "ভর্তি অনুসন্ধান"))}</a><a href="#contact" className="btn btn-outline">{t(L("Contact", "যোগাযোগ"))}</a></div></div></div></section>
      </div>

      <footer id="contact" className="site-footer"><div className="container footer-grid"><div className="footer-brand"><h2>ELVARIN</h2><p className="footer-sub">ACADEMY</p><p>{t(L("Education and life-long learning, guided by values, awareness, integrity and Najah.", "মূল্যবোধ, সচেতনতা, সততা ও নাজাহর দর্শনে শিক্ষা ও জীবনব্যাপী শেখা।"))}</p><p className="footer-motto">LEARN • GROW • ACHIEVE NAJAH</p>{CONFIG.registration && <p className="verification-line">{t(L("Registration", "নিবন্ধন"))}: {CONFIG.registration}</p>}</div>
        <div className="footer-column"><h3>{t(L("Explore", "এক্সপ্লোর"))}</h3>{[{id:"about",v:L("About Academy","পরিচিতি")},{id:"principles",v:L("Seven Pillars","সাতটি মূলনীতি")},{id:"programs",v:L("Programs","কোর্সসমূহ")},{id:"faculty",v:L("Faculty","শিক্ষকবৃন্দ")},{id:"news",v:L("News & Notices","খবর ও নোটিশ")},{id:"admission",v:L("Admissions","ভর্তি")},{id:"faq",v:L("FAQ","সাধারণ প্রশ্ন")}].map(item=><a href={`#${item.id}`} key={item.id}>{t(item.v)}</a>)}</div>
        <div className="footer-column"><h3>{t(L("Academic Access", "একাডেমিক সেবা"))}</h3><a href="#digital-campus">{t(L("Digital Academy Roadmap", "ডিজিটাল একাডেমি পরিকল্পনা"))}</a><Link href="/admin">{t(L("Administrator Portal", "অ্যাডমিন পোর্টাল"))}</Link><button type="button" onClick={()=>setModal("policies")}>{t(L("Policies & Safeguarding", "নীতিমালা ও নিরাপত্তা"))}</button><button type="button" onClick={()=>setModal("fees")}>{t(L("Fees & Refund Information", "ফি ও রিফান্ড তথ্য"))}</button></div>
        <div className="footer-column"><h3>{t(L("Contact", "যোগাযোগ"))}</h3>{CONFIG.address?<p className="contact-line"><Icon name="pin" size={17}/>{CONFIG.address}</p>:<p>{t(L("Confirmed campus address to be published.", "ক্যাম্পাসের সঠিক ঠিকানা পরে প্রকাশ করা হবে।"))}</p>}{CONFIG.phone && <a href={`tel:${CONFIG.phone.replace(/\s/g,"")}`} className="contact-line"><Icon name="phone" size={17}/>{CONFIG.phone}</a>}{CONFIG.email && <a href={`mailto:${CONFIG.email}`} className="contact-line"><Icon name="mail" size={17}/>{CONFIG.email}</a>}{CONFIG.mapUrl && <a href={CONFIG.mapUrl} target="_blank" rel="noreferrer">{t(L("View on Google Maps ↗", "গুগল ম্যাপে দেখুন ↗"))}</a>}{CONFIG.facebook && <a href={CONFIG.facebook} target="_blank" rel="noreferrer">Facebook ↗</a>}{CONFIG.youtube && <a href={CONFIG.youtube} target="_blank" rel="noreferrer">YouTube ↗</a>}<p className="contact-note">{t(L("Please use only official, verified contact channels.", "শুধু অফিসিয়াল ও যাচাইকৃত যোগাযোগ মাধ্যম ব্যবহার করুন।"))}</p></div>
      </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} ELVARIN Academy. All Rights Reserved.</span><span>Education Beyond Excellence</span><a href="#top">{t(L("Back to top ↑", "উপরে যান ↑"))}</a></div></footer>

      {galleryImage && <div className="modal-overlay gallery-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setGalleryImage(null);}}>
        <section className="gallery-modal" role="dialog" aria-modal="true" aria-label={galleryImage.title}>
          <button type="button" className="gallery-close" onClick={()=>setGalleryImage(null)} aria-label="Close image">✕</button>
          <div className="gallery-modal-picture"><Image src={galleryImage.src} alt={galleryImage.title} fill sizes="95vw" /></div>
          <div className="gallery-modal-caption"><strong>{galleryImage.title}</strong><span>{galleryImage.detail} · Design concept</span></div>
        </section>
      </div>}
      {activeProgram && <div className="modal-overlay" role="presentation" onMouseDown={(e)=>{if(e.target===e.currentTarget)setActiveProgram(null);}}><section className="info-modal" role="dialog" aria-modal="true" aria-label={t(activeProgram.name)}><button type="button" className="modal-close" onClick={()=>setActiveProgram(null)} aria-label="Close"><Icon name="close"/></button><span className="section-kicker">{t(L("PROGRAMME OVERVIEW · EXAMPLE", "কোর্স বিবরণ · নমুনা"))}</span><h2>{t(activeProgram.name)}</h2><p className="modal-lead">{t(activeProgram.summary)}</p><h3>{t(L("Who this is for", "যাদের জন্য"))}</h3><p>{t(activeProgram.suitable)}</p><h3>{t(L("Illustrative learning components", "নমুনা পাঠ্য উপাদান"))}</h3><div className="subject-tags">{activeProgram.subjects.map(s=><span key={s}>{s}</span>)}</div><div className="modal-note"><Icon name="shield" size={20}/><p>{t(L("Duration, batch schedules, fees, admission eligibility, faculty and assessments must be confirmed by the academy before enrolment.", "ভর্তির আগে সময়কাল, ব্যাচের সময়, ফি, যোগ্যতা, শিক্ষক ও মূল্যায়নের তথ্য প্রতিষ্ঠান থেকে নিশ্চিত করতে হবে।"))}</p></div><a href="#admission" className="btn btn-gold" onClick={()=>setActiveProgram(null)}>{t(L("Ask about this programme", "এই কোর্স সম্পর্কে জানুন"))} <Icon name="arrow" size={16}/></a></section></div>}
      {modal && <div className="modal-overlay" role="presentation" onMouseDown={(e)=>{if(e.target===e.currentTarget)setModal(null);}}><section className="info-modal" role="dialog" aria-modal="true" aria-label="Information"><button type="button" className="modal-close" onClick={()=>setModal(null)} aria-label="Close"><Icon name="close"/></button><span className="section-kicker">ELVARIN ACADEMY</span>{modal==="fees"?<><h2>{t(L("Admissions, Fees & Refunds", "ভর্তি, ফি ও রিফান্ড"))}</h2><p>{t(L("No official price list has been supplied for this website. The academy should publish exact course fees, charges, payment schedule, cancellation and refund terms before taking payments. Do not transfer money based on an unverified website message.", "এই ওয়েবসাইটে এখনো অফিসিয়াল ফি তালিকা দেওয়া হয়নি। অর্থ গ্রহণের আগে কোর্স ফি, অতিরিক্ত চার্জ, পরিশোধের সময়, বাতিল ও রিফান্ডের শর্ত প্রকাশ করতে হবে। যাচাইহীন বার্তার ভিত্তিতে অর্থ পাঠাবেন না।"))}</p></>:<><h2>{t(L("Privacy, Policies & Safeguarding", "গোপনীয়তা, নীতিমালা ও শিক্ষার্থী সুরক্ষা"))}</h2><p>{t(L("This is a preview of the site's policy area, not a final legal policy. The institution should publish a full privacy policy, student safeguarding process, complaints channel, terms of use, and data-retention rules appropriate to its actual practices and applicable law.", "এটি নীতিমালা অংশের নমুনা, চূড়ান্ত আইনি নীতি নয়। প্রতিষ্ঠানের বাস্তব কাজ ও প্রযোজ্য আইন অনুযায়ী পূর্ণ প্রাইভেসি পলিসি, শিশু সুরক্ষা, অভিযোগ প্রক্রিয়া, ব্যবহারের শর্ত ও তথ্য সংরক্ষণ নীতি প্রকাশ করতে হবে।"))}</p><ul className="modal-list"><li>{t(L("Clear consent for images and testimonials", "ছবি ও প্রশংসাপত্রে স্পষ্ট অনুমতি"))}</li><li>{t(L("Secure student information with role-based access", "ভূমিকাভিত্তিক নিয়ন্ত্রিত শিক্ষার্থী তথ্য"))}</li><li>{t(L("Dedicated complaints and safeguarding contact", "অভিযোগ ও সুরক্ষার নির্দিষ্ট যোগাযোগ"))}</li><li>{t(L("Transparent payments and refunds", "স্বচ্ছ পেমেন্ট ও রিফান্ড নীতি"))}</li></ul></>}</section></div>}

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #faf8f2; }
        .elvarin-home { --green:#0a5a47; --green-dark:#063e33; --green-soft:#edf4f0; --gold:#c7a24f; --gold-deep:#a77d2c; --ivory:#faf8f2; --card:#fffdf8; --text:#163b33; --muted:#536e63; --line:#e2dac8; font-family: Arial, Helvetica, sans-serif; color:var(--text); background:var(--ivory); overflow-x:clip; }
        .elvarin-home * { box-sizing:border-box; }
        .elvarin-home a { color:inherit; text-decoration:none; }
        .elvarin-home button,.elvarin-home input,.elvarin-home select,.elvarin-home textarea { font:inherit; }
        .elvarin-home button { cursor:pointer; }
        .elvarin-home :focus-visible { outline:3px solid #bb903c; outline-offset:4px; }
        .elvarin-home [id] { scroll-margin-top:105px; }
        .container { width:min(1200px,calc(100% - 48px)); margin:0 auto; }
        .sr-only {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
        .skip-link { position:absolute;z-index:500;top:-60px;left:12px;background:white;padding:12px;color:#063e33!important; }
        .skip-link:focus {top:12px;}
        .top-strip { display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;background:#073e33;color:#e4c880;text-align:center;padding:10px 18px;font-size:10px;letter-spacing:1.4px;font-weight:700;line-height:1.6; }
        .top-strip b {opacity:.45;}
        .site-header {position:sticky;top:0;z-index:50;background:rgba(250,248,242,.96);backdrop-filter:blur(12px);border-bottom:1px solid rgba(10,90,71,.11);}
        .header-inner {min-height:86px;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        .brand-block {display:flex;align-items:center;gap:12px;flex-shrink:0;}
        .brand-mark {width:16px;height:43px;border-radius:30px;background:linear-gradient(180deg,var(--gold),var(--green));box-shadow:0 0 0 4px rgba(199,162,79,.12);}
        .brand-copy {display:flex;flex-direction:column;line-height:1;}
        .brand-title {font-family:Georgia,serif;font-size:27px;font-weight:700;letter-spacing:.7px;color:var(--green-dark);}
        .brand-subtitle {margin-top:4px;font-size:10px;letter-spacing:5px;color:var(--gold-deep);font-weight:700;}
        .nav-links {display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;}
        .nav-links a {font-size:12px;font-weight:700;color:#244b40;transition:color .2s;}
        .nav-links a:hover {color:var(--gold-deep);}
        .header-actions {display:flex;align-items:center;gap:9px;}
        .language-btn {background:transparent;color:var(--green-dark);border:1px solid #cad5c7;padding:10px 12px;border-radius:25px;font-size:12px;font-weight:700;white-space:nowrap;}
        .portal-btn {background:var(--green-dark);color:white!important;padding:12px 15px;border-radius:999px;font-size:12px;font-weight:700;white-space:nowrap;}
        .menu-btn,.nav-admin-mobile {display:none!important;}
        .section {padding:94px 0;}
        .soft-section {background:linear-gradient(180deg,#f3f5f0 0%,#faf8f2 100%);}
        .section-kicker {color:var(--gold-deep);font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 15px;}
        .center-kicker {text-align:center;}
        .section h2,.cta-section h2 {font:700 clamp(32px,4.4vw,54px)/1.13 Georgia,'Times New Roman',serif;letter-spacing:-.7px;color:var(--green-dark);margin:0 0 22px;}
        .section h2 em,.cta-section h2 em {font-style:italic;color:var(--gold-deep);}
        .body-text {font-size:16px;line-height:1.9;color:var(--muted);margin:0 0 18px;}
        .section-head {max-width:830px;text-align:center;margin:0 auto 40px;}
        .section-head p:last-child {font-size:16px;line-height:1.8;color:var(--muted);margin:0;}
        .hero-section {background:radial-gradient(circle at 80% 10%,rgba(199,162,79,.16),transparent 32%),linear-gradient(135deg,#063e33 0%,#0b644f 100%);color:white;padding:72px 0 80px;}
        .hero-grid,.two-col,.student-grid,.faculty-grid,.achievement-grid,.admission-grid,.faq-grid,.cta-grid {display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:48px;}
        .hero-copy .section-kicker,.cta-section .section-kicker,.philosophy-band .section-kicker {color:#ddc37f;}
        .hero-copy h1 {font:700 clamp(42px,6.3vw,78px)/1.07 Georgia,serif;letter-spacing:-1.1px;margin:0;}
        .hero-copy h1 span {display:block;font-style:italic;color:#e5cb89;}
        .hero-text {font-size:17px;line-height:1.9;color:#e2eee7;max-width:590px;margin:23px 0 0;}
        .hero-actions,.cta-actions {display:flex;flex-wrap:wrap;gap:12px;margin-top:30px;}
        .btn {display:inline-flex;justify-content:center;align-items:center;gap:10px;min-height:49px;padding:13px 21px;border-radius:999px;font-size:13px;font-weight:700;border:0;transition:transform .2s,background .2s;text-align:center;}
        .btn:hover {transform:translateY(-2px);}
        .btn-gold {background:linear-gradient(180deg,#dec476,#c59a45);color:#082c24!important;box-shadow:0 10px 28px rgba(191,148,62,.18);}
        .btn-outline {border:1px solid rgba(255,255,255,.45);color:white!important;background:transparent;}
        .btn-dark {background:#062f27;color:white!important;}
        .hero-points {display:flex;flex-wrap:wrap;gap:10px;margin-top:27px;}
        .hero-points span {padding:10px 13px;border:1px solid rgba(255,255,255,.18);border-radius:999px;color:#e9dfbc;font-size:11px;}
        .photo {width:100%;position:relative;overflow:hidden;border-radius:22px;aspect-ratio:16/9;background:#f4efe3;border:1px solid rgba(7,62,51,.09);}

        .gallery-section{background:linear-gradient(180deg,#f5f1e7,#faf8f2)}
        .gallery-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
        .gallery-card{background:#fffdf8;border:1px solid #e5ddcc;border-radius:20px;overflow:hidden;box-shadow:0 15px 36px rgba(8,57,45,.06)}
        .gallery-visual{display:block;position:relative;width:100%;aspect-ratio:16/10;padding:0;border:0;background:#eee7d9;cursor:zoom-in;overflow:hidden}
        .gallery-visual img{object-fit:cover;transition:transform .35s ease}
        .gallery-visual:hover img{transform:scale(1.035)}
        .gallery-zoom{position:absolute;right:12px;bottom:12px;padding:7px 11px;border-radius:999px;color:white;background:rgba(5,43,35,.83);font-size:11px}
        .gallery-body{padding:19px 21px 22px}.gallery-body h3{font-family:Georgia,serif;font-size:20px;margin:0 0 8px;color:#073e33}.gallery-body p{color:#61786b;font-size:13px;line-height:1.7;margin:0}
        .gallery-overlay{z-index:150!important}.gallery-modal{position:relative;width:min(1100px,94vw);max-height:92vh;border-radius:16px;overflow:hidden;background:#fffdf8;display:flex;flex-direction:column}
        .gallery-modal-picture{position:relative;width:100%;height:min(72vh,660px);background:#103a31}.gallery-modal-picture img{object-fit:contain}
        .gallery-modal-caption{display:flex;gap:12px;flex-wrap:wrap;align-items:center;padding:15px 21px;color:#123e33}.gallery-modal-caption span{color:#61786b;font-size:13px}
        .gallery-close{position:absolute;z-index:3;right:14px;top:14px;border:0;border-radius:50%;width:40px;height:40px;background:#fff;color:#103a31;cursor:pointer;font-size:18px}
        @media(max-width:900px){.gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:600px){.gallery-grid{grid-template-columns:1fr}.gallery-modal-picture{height:62vh}}
        .photo img.photo-cover {object-fit:cover;object-position:center;}
        .photo img.photo-contain {object-fit:contain;padding:9px;background:linear-gradient(180deg,#fffdf8,#f3eee2);}
        .hero-frame {aspect-ratio:16/10;border-radius:28px;box-shadow:0 24px 65px rgba(0,0,0,.22);}
        .image-note {display:block;margin-top:12px;color:#cbded3;font-size:11px;text-align:center;}
        .identity-strip {padding:25px 0;background:#eff3ef;border-bottom:1px solid #e2e9e3;}
        .identity-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .identity-card {padding:23px;background:rgba(255,255,255,.75);border:1px solid #dde6df;border-radius:18px;}
        .identity-card h3,.showcase-body h3,.essential-content h3 {font:700 21px Georgia,serif;color:var(--green-dark);margin:0 0 10px;}
        .identity-card p,.showcase-body p,.essential-content p {font-size:14px;line-height:1.8;color:var(--muted);margin:0;}
        .mission-grid {display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:27px 0;}
        .mission-grid div {padding:19px;background:#f1f5f1;border-left:2px solid var(--gold);border-radius:8px;}
        .mission-grid span,.eyebrow {font-size:10px;letter-spacing:1.15px;text-transform:uppercase;font-weight:800;color:var(--gold-deep);}
        .mission-grid p {font-size:13px;color:var(--muted);line-height:1.7;margin:10px 0 0;}
        .text-link {display:inline-flex;align-items:center;gap:9px;background:none;border:0;padding:6px 0;color:var(--green)!important;font-size:14px;font-weight:800;text-align:left;}
        .text-link:hover {text-decoration:underline;}
        .philosophy-band {padding:85px 0;background:radial-gradient(circle at 20% 20%,rgba(214,184,106,.17),transparent 30%),linear-gradient(135deg,#063e33,#0a5a47);text-align:center;color:white;}
        .philosophy-band blockquote {max-width:970px;margin:0 auto;font:italic clamp(23px,3vw,39px)/1.6 Georgia,serif;color:#f6efdd;}
        .philosophy-note {margin:23px 0 0;color:#d9bc79;font-size:11px;letter-spacing:2px;}
        .wide-visual {margin-bottom:29px;}
        .pillars-grid {display:grid;grid-template-columns:repeat(4,1fr);gap:17px;}
        .pillar-card {padding:23px 21px;min-height:220px;background:var(--card);border:1px solid #e9dfd0;border-radius:20px;box-shadow:0 10px 30px rgba(7,62,51,.035);}
        .pillar-number {display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:#f5ecd8;color:var(--gold-deep);font-weight:800;font-size:12px;margin-bottom:16px;}
        .pillar-card h3 {margin:0 0 8px;font:700 22px Georgia,serif;color:var(--green-dark);}
        .pillar-card strong {display:block;color:var(--gold-deep);font-size:12px;margin-bottom:10px;}
        .pillar-card p {font-size:13px;line-height:1.75;color:var(--muted);margin:0;}
        .program-toolbar {display:flex;align-items:center;gap:10px;max-width:650px;margin:0 auto 28px;padding:0 16px;border:1px solid #dcdccf;background:white;border-radius:15px;}
        .program-toolbar label {color:var(--green-dark);display:flex;}
        .program-toolbar input {background:transparent;border:0;flex:1;outline:none;padding:16px 2px;min-width:0;color:var(--text);font-size:14px;}
        .program-count {font-size:11px;color:var(--muted);white-space:nowrap;}
        .program-grid {display:grid;grid-template-columns:repeat(2,1fr);gap:21px;}
        .program-card {border:1px solid #e4dccd;background:var(--card);border-radius:22px;overflow:hidden;display:grid;grid-template-columns:44% 56%;min-height:270px;}
        .program-photo {height:100%;aspect-ratio:auto;border-radius:0;border:0;}
        .program-content {padding:27px 24px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;}
        .program-content h3 {font:700 25px/1.22 Georgia,serif;color:var(--green-dark);margin:11px 0;}
        .program-content p {color:var(--muted);font-size:13px;line-height:1.72;margin:0 0 15px;}
        .empty-search,.editorial-note {font-size:13px;color:var(--muted);text-align:center;margin:20px auto 0;line-height:1.7;}
        .steps-grid {display:grid;grid-template-columns:repeat(5,1fr);gap:13px;margin-bottom:56px;}
        .step-card {padding:22px 17px;background:white;border:1px solid #e6e0d2;border-radius:17px;min-height:215px;}
        .step-number {display:inline-block;color:var(--gold-deep);font:700 30px Georgia,serif;margin-bottom:19px;}
        .step-card h3 {font:700 20px Georgia,serif;margin:0 0 10px;}
        .step-card p {font-size:13px;color:var(--muted);line-height:1.7;margin:0;}
        .operations-intro {display:grid;grid-template-columns:1fr 1fr;gap:38px;align-items:center;border-top:1px solid var(--line);padding-top:42px;margin-bottom:26px;}
        .operations-intro h3 {font:700 28px/1.3 Georgia,serif;margin:0;color:var(--green-dark);}
        .operations-intro>p {font-size:14px;color:var(--muted);line-height:1.8;}
        .operations-grid {display:grid;grid-template-columns:repeat(4,1fr);gap:13px;}
        .operation-card {background:#fff;border:1px solid #e6dfd2;border-radius:15px;padding:20px;min-height:117px;}
        .operation-card span {font-size:12px;color:var(--gold-deep);font-weight:800;}
        .operation-card p {font-size:14px;font-weight:700;line-height:1.55;margin:12px 0 0;}
        .feature-list {padding:0;margin:23px 0;list-style:none;display:grid;gap:12px;}
        .feature-list li {padding-left:23px;position:relative;color:var(--muted);font-size:14px;line-height:1.7;}
        .feature-list li::before {content:"";position:absolute;left:0;top:9px;width:9px;height:9px;background:var(--gold);border-radius:50%;}
        .coming-tag {display:inline-block;margin-top:10px;padding:10px 13px;border-radius:999px;background:#f1ede1;color:#6e5b36;font-size:12px;font-weight:700;}
        .faculty-visual {position:relative;}
        .floating-quote {position:relative;max-width:90%;margin:-34px auto 0;z-index:2;background:var(--green-dark);color:#f3e6c6;padding:20px;border-radius:15px;font:italic 17px/1.5 Georgia,serif;text-align:center;}
        .achievement-section {background:linear-gradient(135deg,#f2f4ed,#faf8f2);}
        .achievement-cards {display:grid;grid-template-columns:1fr 1fr;gap:13px;}
        .achievement-cards>div {background:white;border:1px solid #e5dfd1;padding:22px;border-radius:17px;}
        .achievement-cards>div:last-child {grid-column:span 2;}
        .achievement-cards svg {color:#98742b;}
        .achievement-cards h3 {font:700 21px Georgia,serif;margin:13px 0 8px;}
        .achievement-cards p {font-size:13px;line-height:1.7;margin:0;color:var(--muted);}
        .showcase-grid,.essentials-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .showcase-card,.essential-card {background:var(--card);border-radius:22px;overflow:hidden;border:1px solid #e7dfcf;box-shadow:0 12px 30px rgba(7,62,51,.04);}
        .showcase-frame,.essential-frame {border-radius:0;border:0;}
        .showcase-body,.essential-content {padding:22px;}
        .student-section {background:linear-gradient(180deg,#faf8f2,#f1f5f2);}
        .testimonial-placeholder {border:1px solid #e6dfcf;background:#fff;padding:38px;border-radius:25px;text-align:center;}
        .quote-mark {display:block;font:700 85px Georgia,serif;color:#c4a45d;line-height:1;}
        .testimonial-placeholder h3 {font:700 29px/1.3 Georgia,serif;margin:0 0 15px;}
        .testimonial-placeholder p {font-size:14px;color:var(--muted);line-height:1.8;margin:0;}
        .tab-buttons {display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:22px;}
        .tab-buttons button {border:1px solid #d9dfd6;border-radius:999px;padding:12px 18px;background:white;color:var(--green-dark);font-size:13px;font-weight:700;}
        .tab-buttons button.tab-active {background:var(--green-dark);color:white;border-color:var(--green-dark);}
        .notice-empty {max-width:790px;margin:0 auto;border:1px solid #e5ddcf;background:#fff;border-radius:22px;padding:46px 25px;text-align:center;color:var(--green-dark);}
        .notice-empty h3 {font:700 26px Georgia,serif;margin:18px 0 10px;}
        .notice-empty p {max-width:530px;margin:0 auto;color:var(--muted);font-size:14px;line-height:1.85;}
        .admission-section {background:#f3f5f0;}
        .admission-steps {display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:42px;}
        .admission-step {background:white;border:1px solid #e2dfd4;padding:24px;border-radius:18px;}
        .admission-step span {font:700 30px Georgia,serif;color:#b18a3a;}
        .admission-step h3 {font:700 20px Georgia,serif;margin:15px 0 8px;}
        .admission-step p {font-size:13px;line-height:1.7;color:var(--muted);margin:0;}
        .admission-grid {align-items:start;}
        .admission-copy h3 {font:700 33px Georgia,serif;color:var(--green-dark);margin:0 0 18px;}
        .admission-copy p {color:var(--muted);font-size:15px;line-height:1.9;}
        .enquiry-form {background:white;border:1px solid #e5dece;border-radius:22px;padding:28px;display:grid;gap:9px;}
        .enquiry-form label {font-size:12px;color:var(--text);font-weight:800;margin-top:8px;}
        .enquiry-form input,.enquiry-form select,.enquiry-form textarea {width:100%;border:1px solid #d6ddd6;border-radius:10px;background:#fffefa;color:var(--text);padding:13px 14px;outline:none;font-size:14px;}
        .enquiry-form input:focus,.enquiry-form select:focus,.enquiry-form textarea:focus {border-color:var(--gold-deep);outline:2px solid #eadcb7;}
        .enquiry-form button {margin-top:13px;width:100%;}
        .form-disclaimer,.form-status {font-size:12px;line-height:1.6;color:var(--muted);margin:5px 0 0;}
        .form-status {color:#78551c;background:#fff8e5;padding:12px;border-radius:10px;}
        .module-grid {display:grid;grid-template-columns:repeat(4,1fr);gap:17px;}
        .module-card {background:#fff;border:1px solid #e8e1d3;padding:26px 21px;border-radius:20px;}
        .module-card span {color:var(--gold-deep);font:700 30px Georgia,serif;}
        .module-card h3 {font:700 22px Georgia,serif;margin:20px 0 10px;}
        .module-card p {font-size:13px;line-height:1.75;color:var(--muted);min-height:62px;}
        .module-card small {font-size:11px;color:#8b6c2f;font-weight:800;}
        .portal-inline {background:#f3f5ef;border:1px solid #e6e2d7;border-radius:18px;padding:24px;display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:23px;}
        .portal-inline h3 {font:700 22px Georgia,serif;margin:0 0 7px;}
        .portal-inline p {font-size:13px;line-height:1.75;color:var(--muted);margin:0;max-width:650px;}
        .portal-inline .btn {white-space:nowrap;}
        .faq-grid {align-items:start;}
        .faq-list {border-top:1px solid #dadfda;}
        .faq-item {border-bottom:1px solid #dadfda;}
        .faq-item>button {width:100%;border:0;background:transparent;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;padding:19px 2px;color:var(--text);font-size:15px;font-weight:700;}
        .faq-item>button[aria-expanded=true] svg {transform:rotate(180deg);}
        .faq-item svg {flex-shrink:0;transition:transform .2s;}
        .faq-answer {padding:0 22px 17px 2px;}
        .faq-answer p {font-size:14px;line-height:1.85;color:var(--muted);margin:0;}
        .cta-section {padding:95px 0;background:radial-gradient(circle at 80% 20%,rgba(214,184,106,.2),transparent 30%),linear-gradient(135deg,#063e33,#0b644f);color:white;}
        .cta-section h2 {color:white;}
        .cta-section h2 em {color:#dec780;}
        .light-text {color:#e0eee6;}
        .cta-card {padding:30px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.2);border-radius:23px;}
        .cta-card h3 {font:700 27px Georgia,serif;color:white;margin:0 0 14px;}
        .cta-card p {font-size:14px;line-height:1.8;color:#e1eee7;}
        .site-footer {background:#052f28;color:white;padding:70px 0 24px;}
        .footer-grid {display:grid;grid-template-columns:1.5fr 1fr 1.15fr 1.4fr;gap:30px;}
        .footer-brand h2 {font:700 37px Georgia,serif;margin:0;color:white;}
        .footer-sub {font-size:12px;color:#dcbf7b;font-weight:800;letter-spacing:5px;margin:6px 0 20px;}
        .footer-grid h3 {font-size:14px;color:#e4c980;margin:0 0 18px;}
        .footer-grid p,.footer-grid a,.footer-grid button {font-size:13px;line-height:1.8;color:#d2e1d9;}
        .footer-grid p {margin:0 0 10px;}
        .footer-column a,.footer-column button {display:block;margin:8px 0;}
        .footer-column button {border:0;background:none;text-align:left;padding:0;}
        .footer-grid a:hover,.footer-grid button:hover {color:white;text-decoration:underline;}
        .footer-motto {font-size:11px!important;color:#dcbf7b!important;letter-spacing:1.5px;margin-top:21px!important;}
        .contact-line {display:flex!important;align-items:center;gap:9px;}
        .contact-note {font-size:11px!important;color:#abc9bb!important;margin-top:15px!important;}
        .verification-line {font-size:12px!important;color:#e4c980!important;}
        .footer-bottom {border-top:1px solid rgba(255,255,255,.14);margin-top:42px;padding-top:20px;display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap;color:#becdc5;font-size:11px;}
        .footer-bottom a {color:#dec780!important;}
        .modal-overlay {position:fixed;inset:0;z-index:200;background:rgba(4,24,20,.78);display:flex;align-items:center;justify-content:center;padding:18px;overflow-y:auto;}
        .info-modal {position:relative;background:#fffdf8;color:var(--text);border-radius:24px;padding:clamp(25px,4vw,45px);max-width:650px;width:100%;max-height:min(90vh,900px);overflow:auto;box-shadow:0 30px 80px rgba(0,0,0,.35);}
        .info-modal h2 {font:700 clamp(29px,4vw,43px)/1.2 Georgia,serif;margin:12px 30px 18px 0;color:var(--green-dark);}
        .info-modal h3 {font:700 20px Georgia,serif;margin:22px 0 8px;}
        .info-modal p,.modal-list {font-size:14px;line-height:1.85;color:var(--muted);}
        .info-modal .btn {margin-top:16px;}
        .modal-close {position:absolute;right:19px;top:18px;width:37px;height:37px;border-radius:50%;background:#f2ebdd;border:0;display:grid;place-items:center;color:var(--green-dark);}
        .modal-lead {font-size:16px!important;}
        .subject-tags {display:flex;gap:9px;flex-wrap:wrap;}
        .subject-tags span {padding:9px 12px;background:#f2ebdc;border-radius:999px;font-size:12px;color:var(--green-dark);}
        .modal-note {display:flex;align-items:flex-start;gap:13px;padding:16px;border-radius:12px;background:#f0f4ef;margin:22px 0 12px;}
        .modal-note svg {flex-shrink:0;color:var(--green);margin-top:5px;}
        .modal-note p {margin:0;font-size:13px;}
        .reveal {opacity:1;transform:none;}
        @media (prefers-reduced-motion:no-preference) { .reveal {opacity:0;transform:translateY(25px);transition:opacity .7s ease,transform .7s ease;} .reveal.is-visible {opacity:1;transform:translateY(0);} }
        @media (max-width:1150px) { .nav-links{gap:10px}.nav-links a{font-size:11px}.header-inner{gap:12px}.pillars-grid{grid-template-columns:repeat(3,1fr)}.steps-grid{grid-template-columns:repeat(3,1fr)}.footer-grid{grid-template-columns:repeat(2,1fr)} }
        @media (max-width:940px) { .header-inner{min-height:75px}.menu-btn{display:grid!important;place-items:center;background:transparent;border:1px solid #d3dccc;border-radius:10px;width:40px;height:40px;color:var(--green-dark)}.nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:var(--ivory);padding:20px 24px 28px;box-shadow:0 19px 30px rgba(0,0,0,.12);flex-direction:column;align-items:stretch;gap:0;max-height:75vh;overflow:auto}.nav-links.nav-open{display:flex}.nav-links a{font-size:15px;padding:13px 2px;border-bottom:1px solid #eee5d8}.nav-admin-mobile{display:block!important}.portal-btn{display:none}.hero-grid,.two-col,.student-grid,.faculty-grid,.achievement-grid,.admission-grid,.faq-grid,.cta-grid{grid-template-columns:1fr;gap:36px}.hero-section{padding:65px 0}.hero-frame{max-width:750px}.identity-grid{grid-template-columns:repeat(3,1fr)}.section{padding:75px 0}.operations-grid,.module-grid,.admission-steps{grid-template-columns:repeat(2,1fr)}.program-grid{grid-template-columns:1fr}.faculty-visual{max-width:720px}.steps-grid{grid-template-columns:repeat(3,1fr)} }
        @media (max-width:650px) { .container{width:calc(100% - 30px)}.top-strip{font-size:8px;gap:6px;letter-spacing:.5px}.top-strip span:nth-of-type(n+5),.top-strip b:nth-of-type(n+5){display:none}.brand-title{font-size:23px}.brand-subtitle{font-size:9px;letter-spacing:4px}.header-actions{gap:7px}.language-btn{font-size:11px;padding:9px}.hero-copy h1{font-size:44px}.hero-text,.body-text{font-size:15px}.hero-actions,.cta-actions{flex-direction:column;align-items:stretch}.hero-actions .btn,.cta-actions .btn{width:100%}.identity-grid,.pillars-grid,.steps-grid,.operations-grid,.showcase-grid,.essentials-grid,.module-grid,.admission-steps,.mission-grid{grid-template-columns:1fr}.section{padding:62px 0}.program-card{grid-template-columns:1fr}.program-photo{aspect-ratio:16/8}.program-content{padding:23px}.operations-intro{grid-template-columns:1fr;gap:6px}.achievement-cards{grid-template-columns:1fr}.achievement-cards>div:last-child{grid-column:auto}.footer-grid{grid-template-columns:1fr}.portal-inline{flex-direction:column;align-items:stretch}.portal-inline .btn{white-space:normal}.admission-grid{gap:25px}.enquiry-form{padding:21px}.program-count{display:none}.section-head p:last-child{font-size:14px}.testimonial-placeholder{padding:27px}.top-strip{padding:8px}.hero-points span{font-size:10px} }
        @media (prefers-reduced-motion:reduce) {html{scroll-behavior:auto}.elvarin-home *, .elvarin-home *::before, .elvarin-home *::after{animation-duration:.01ms!important;transition-duration:.01ms!important}.reveal{opacity:1!important;transform:none!important} }
      `}</style>
    </main>
  );
}
