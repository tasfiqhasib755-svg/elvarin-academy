"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "Education",
    subtitle: "Knowledge",
    description:
      "Building strong understanding through meaningful learning, curiosity and academic excellence."
  },
  {
    title: "Life & Learning",
    subtitle: "Growth",
    description:
      "Encouraging learners to grow continuously through reflection, discipline and lifelong learning."
  },
  {
    title: "Values",
    subtitle: "Character",
    description:
      "Nurturing character through respect, kindness, responsibility and moral grounding."
  },
  {
    title: "Awareness",
    subtitle: "Responsibility",
    description:
      "Developing thoughtful minds that understand self, society and responsibility."
  },
  {
    title: "Righteousness",
    subtitle: "Good Deeds",
    description:
      "Inspiring right action, ethical conduct and a sincere commitment to goodness."
  },
  {
    title: "Integrity",
    subtitle: "Trust",
    description:
      "Strengthening honesty, transparency and trust in every part of the learning journey."
  },
  {
    title: "Najah",
    subtitle: "Meaningful Success",
    description:
      "Guiding students toward purposeful success rooted in knowledge, values and character."
  }
];

const activities = [
  "Student Progress Monitoring",
  "Monthly Academic Reports",
  "Result & Assessment Updates",
  "Attendance Tracking",
  "Class Performance Review",
  "Guardian Communication",
  "Previous Progress History",
  "Academic Announcements",
  "Student Records Management",
  "Learning Development Insights",
  "Examination & Evaluation",
  "Administrative Support"
];

const highlights = [
  {
    title: "Brand & Institutional Presence",
    text:
      "A refined academy identity expressed through signboard, official environment and premium brand applications.",
    image: "/elvarin/brand-applications.jpg",
    fit: "cover"
  },
  {
    title: "Academic Environment",
    text:
      "Clean, premium and value-driven classroom and office concepts that reflect a serious educational atmosphere.",
    image: "/elvarin/campus-environment.jpg",
    fit: "contain"
  },
  {
    title: "Learning & Presentation Assets",
    text:
      "Classroom visuals, stationery, academic seal and presentation materials designed to communicate trust and quality.",
    image: "/elvarin/campus-branding.jpg",
    fit: "contain"
  }
];

const essentials = [
  {
    title: "Student Identity",
    text:
      "Professional student presentation with elegant, modest and recognizable institutional styling.",
    image: "/elvarin/student-identity.jpg",
    fit: "contain"
  },
  {
    title: "Pillars & Brand System",
    text:
      "The academy’s principle-based identity system presented with clarity, consistency and educational meaning.",
    image: "/elvarin/pillars-system.jpg",
    fit: "contain"
  },
  {
    title: "Foundation & Vision",
    text:
      "A strong core identity built around the values of knowledge, awareness, righteousness, integrity and Najah.",
    image: "/elvarin/brand-foundation.jpg",
    fit: "contain"
  }
];

export default function HomePage() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="elvarin-home">
      {/* TOP STRIP */}
      <div className="top-strip">
        EDUCATION • LIFE & LEARNING • VALUES • AWARENESS • RIGHTEOUSNESS •
        INTEGRITY • NAJAH
      </div>

      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand-block">
            <div className="brand-mark" />
            <div className="brand-copy">
              <span className="brand-title">ELVARIN</span>
              <span className="brand-subtitle">ACADEMY</span>
            </div>
          </Link>

          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#principles">Principles</a>
            <a href="#environment">Environment</a>
            <a href="#operations">Activities</a>
            <a href="#contact">Contact</a>
          </nav>

          <Link href="/admin" className="portal-btn">
            Admin Portal
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <p className="section-kicker">WELCOME TO ELVARIN ACADEMY</p>

            <h1>
              Education Beyond
              <span> Excellence.</span>
            </h1>

            <p className="hero-text">
              A premium educational journey where knowledge meets character,
              values guide growth, and every experience is shaped with purpose,
              awareness and integrity.
            </p>

            <div className="hero-actions">
              <a href="#about" className="btn btn-gold">
                Explore the Academy
              </a>
              <a href="#operations" className="btn btn-outline">
                View Key Activities
              </a>
            </div>

            <div className="hero-points">
              <span>Premium Learning Culture</span>
              <span>Character & Values</span>
              <span>Meaningful Success</span>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="landscape-frame hero-frame">
              <Image
                src="/elvarin/brand-applications.jpg"
                alt="ELVARIN Academy hero visual"
                fill
                priority
                className="img-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / IDENTITY STRIP */}
      <section className="identity-strip">
        <div className="container identity-grid">
          <div className="identity-card reveal">
            <h3>Educational Identity</h3>
            <p>
              Designed to feel premium, trustworthy and deeply academic in tone.
            </p>
          </div>

          <div className="identity-card reveal">
            <h3>Value-led Learning</h3>
            <p>
              Every learning experience is connected to growth, values and
              responsibility.
            </p>
          </div>

          <div className="identity-card reveal">
            <h3>Institutional Clarity</h3>
            <p>
              A polished structure that presents academics, progress and school
              activities clearly.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container two-col">
          <div className="copy-col reveal">
            <p className="section-kicker">01 / ABOUT ELVARIN ACADEMY</p>
            <h2>
              A premium academy with a
              <em> meaningful educational vision.</em>
            </h2>

            <p className="body-text">
              ELVARIN Academy is envisioned as an institution where education
              goes beyond the classroom. It is a place where students grow in
              knowledge, develop strong character and move forward with
              responsibility, awareness and purpose.
            </p>

            <p className="body-text">
              The academy’s visual identity, learning atmosphere and student
              experience are all shaped to reflect a refined, professional and
              premium educational environment.
            </p>

            <a href="#principles" className="text-link">
              Explore Our Guiding Principles →
            </a>
          </div>

          <div className="media-col reveal">
            <div className="landscape-frame soft-frame">
              <Image
                src="/elvarin/brand-foundation.jpg"
                alt="ELVARIN Academy brand foundation"
                fill
                className="img-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY BAND */}
      <section className="philosophy-band">
        <div className="container reveal">
          <p className="section-kicker center-kicker">
            ELVARIN ACADEMY PHILOSOPHY
          </p>

          <blockquote>
            “Education and Life-long Learning, guided by Values and Awareness,
            shaped by Righteousness and Integrity, leading to Najah.”
          </blockquote>

          <p className="philosophy-note">
            A vision rooted in excellence, growth and purposeful success.
          </p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="section soft-section">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-kicker">02 / GUIDING PRINCIPLES</p>
            <h2>
              Seven pillars.
              <em> One educational purpose.</em>
            </h2>
            <p>
              The academy is guided by seven interconnected values that shape
              learning, behaviour, responsibility and success.
            </p>
          </div>

          <div className="wide-visual reveal">
            <div className="landscape-frame wide-frame">
              <Image
                src="/elvarin/pillars-system.jpg"
                alt="ELVARIN Academy pillars and brand system"
                fill
                className="img-contain"
              />
            </div>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="pillar-card reveal"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <span className="pillar-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{pillar.title}</h3>
                <strong>{pillar.subtitle}</strong>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENT / SHOWCASE */}
      <section id="environment" className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-kicker">03 / LEARNING ENVIRONMENT</p>
            <h2>
              A refined environment that feels
              <em> academic, elegant and clear.</em>
            </h2>
            <p>
              Every touchpoint is presented to communicate a strong educational
              identity — from classroom atmosphere to institutional materials.
            </p>
          </div>

          <div className="showcase-grid">
            {highlights.map((item, index) => (
              <article
                className="showcase-card reveal"
                key={item.title}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="landscape-frame showcase-frame">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={item.fit === "cover" ? "img-cover" : "img-contain"}
                  />
                </div>
                <div className="showcase-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT IDENTITY */}
      <section className="section student-section">
        <div className="container student-grid">
          <div className="student-media reveal">
            <div className="landscape-frame student-frame">
              <Image
                src="/elvarin/student-identity.jpg"
                alt="ELVARIN Academy student identity"
                fill
                className="img-contain"
              />
            </div>
          </div>

          <div className="student-copy reveal">
            <p className="section-kicker">04 / STUDENT IDENTITY</p>
            <h2>
              Presentation that reflects
              <em> discipline, unity and confidence.</em>
            </h2>

            <p className="body-text">
              Student identity should feel complete, clear and premium.
              ELVARIN’s visual direction supports a polished institutional
              presence through clean styling, strong colors and dignified visual
              presentation.
            </p>

            <ul className="feature-list">
              <li>Professional and modest presentation</li>
              <li>Consistent deep green, gold and ivory palette</li>
              <li>Clear institutional visibility and recognition</li>
              <li>Designed to strengthen belonging and academy identity</li>
            </ul>
          </div>
        </div>
      </section>

      {/* OPERATIONS / ACTIVITIES */}
      <section id="operations" className="section soft-section">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-kicker">05 / ACADEMY ACTIVITIES</p>
            <h2>
              Important academic and school functions
              <em> presented more clearly.</em>
            </h2>
            <p>
              The website should not only look premium — it should also help
              students and guardians quickly understand the academy’s key
              functions and ongoing academic activity.
            </p>
          </div>

          <div className="operations-grid">
            {activities.map((item, index) => (
              <div
                className="operation-card reveal"
                key={item}
                style={{ transitionDelay: `${index * 35}ms` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESSENTIALS */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-kicker">06 / VISUAL ESSENTIALS</p>
            <h2>
              Institutional assets that support
              <em> trust and professionalism.</em>
            </h2>
            <p>
              From brand system to documents and learning presentation, each
              asset contributes to a cohesive educational experience.
            </p>
          </div>

          <div className="essentials-grid">
            {essentials.map((item, index) => (
              <article
                key={item.title}
                className="essential-card reveal"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="landscape-frame essential-frame">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={item.fit === "cover" ? "img-cover" : "img-contain"}
                  />
                </div>
                <div className="essential-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="admission" className="cta-section">
        <div className="container cta-grid reveal">
          <div>
            <p className="section-kicker">07 / CONNECT WITH ELVARIN</p>
            <h2>
              Ready to present ELVARIN Academy
              <em> with clarity and excellence?</em>
            </h2>
            <p className="body-text light-text">
              This homepage structure is designed to feel more premium,
              educational and visually organized, while keeping the academy’s
              values and institutional identity at the center.
            </p>
          </div>

          <div className="cta-card">
            <h3>Next Steps</h3>
            <p>
              You can now refine content, replace assets individually and expand
              the site with admission, results, notices and progress-related
              sections.
            </p>

            <div className="cta-actions">
              <a href="#contact" className="btn btn-gold">
                Contact Section
              </a>
              <Link href="/admin" className="btn btn-dark">
                Open Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h2>ELVARIN</h2>
            <p className="footer-sub">ACADEMY</p>
            <p>
              A premium academy experience shaped by education, values,
              awareness, righteousness, integrity and Najah.
            </p>
            <p className="footer-motto">LEARN • GROW • ACHIEVE NAJAH</p>
          </div>

          <div>
            <h3>Explore</h3>
            <a href="#about">About</a>
            <a href="#principles">Principles</a>
            <a href="#environment">Environment</a>
            <a href="#operations">Activities</a>
            <a href="#admission">Next Steps</a>
          </div>

          <div>
            <h3>Portal</h3>
            <p>
              Administrative tools, student management and other operational
              features remain accessible through the admin portal.
            </p>
            <Link href="/admin">Go to Administrator Portal</Link>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} ELVARIN Academy. All Rights Reserved.</span>
          <span>Education Beyond Excellence</span>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #faf8f2;
        }

        .elvarin-home {
          --green: #0a5a47;
          --green-dark: #063e33;
          --green-soft: #edf4f0;
          --gold: #c7a24f;
          --gold-deep: #b38934;
          --ivory: #faf8f2;
          --card: #fffdf8;
          --text: #163b33;
          --muted: #60756d;
          --line: #e2dac8;
          color: var(--text);
          background: var(--ivory);
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        .elvarin-home * {
          box-sizing: border-box;
        }

        .elvarin-home a {
          color: inherit;
          text-decoration: none;
        }

        .container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .top-strip {
          background: #073e33;
          color: #dfc27f;
          text-align: center;
          padding: 12px 18px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;
          line-height: 1.7;
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(250, 248, 242, 0.94);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(10, 90, 71, 0.08);
        }

        .header-inner {
          min-height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand-block {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: fit-content;
        }

        .brand-mark {
          width: 16px;
          height: 42px;
          border-radius: 999px;
          background: linear-gradient(180deg, var(--gold), var(--green));
          box-shadow: 0 0 0 4px rgba(199, 162, 79, 0.12);
        }

        .brand-copy {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brand-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--green-dark);
          letter-spacing: 0.8px;
        }

        .brand-subtitle {
          margin-top: 4px;
          font-size: 11px;
          letter-spacing: 5px;
          color: var(--gold-deep);
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .nav-links a {
          font-size: 13px;
          font-weight: 700;
          color: #244b40;
          transition: 0.25s ease;
        }

        .nav-links a:hover {
          color: var(--gold-deep);
        }

        .portal-btn {
          padding: 12px 18px;
          background: var(--green-dark);
          color: white !important;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(6, 62, 51, 0.16);
          white-space: nowrap;
        }

        .hero-section {
          background:
            radial-gradient(circle at 85% 10%, rgba(199, 162, 79, 0.18), transparent 24%),
            linear-gradient(135deg, #063e33 0%, #0b644f 100%);
          color: white;
          padding: 54px 0 70px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.02fr;
          gap: 48px;
          align-items: center;
        }

        .section-kicker {
          color: #d8ba73;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 14px;
        }

        .center-kicker {
          text-align: center;
        }

        .hero-copy h1,
        .section h2,
        .cta-section h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.5px;
        }

        .hero-copy h1 {
          font-size: clamp(42px, 7vw, 78px);
          max-width: 640px;
        }

        .hero-copy h1 span {
          display: block;
          color: #e1c98a;
          font-style: italic;
        }

        .hero-text {
          max-width: 610px;
          color: rgba(255, 255, 255, 0.85);
          font-size: 17px;
          line-height: 1.9;
          margin: 22px 0 0;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 14px 22px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          transition: 0.28s ease;
        }

        .btn-gold {
          background: linear-gradient(180deg, #d6b86a, #bf943e);
          color: #0a392f !important;
          box-shadow: 0 10px 28px rgba(191, 148, 62, 0.24);
        }

        .btn-gold:hover {
          transform: translateY(-2px);
        }

        .btn-outline {
          border: 1px solid rgba(255, 255, 255, 0.26);
          color: white !important;
          background: rgba(255, 255, 255, 0.04);
        }

        .btn-dark {
          background: #072f27;
          color: white !important;
        }

        .hero-points {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }

        .hero-points span {
          padding: 10px 14px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          font-size: 11px;
          letter-spacing: 0.7px;
          color: #ebdfbf;
          background: rgba(255, 255, 255, 0.04);
        }

        .landscape-frame {
          position: relative;
          width: 100%;
          border-radius: 28px;
          overflow: hidden;
          background: #f3efe5;
          border: 1px solid rgba(7, 62, 51, 0.08);
        }

        .hero-frame {
          aspect-ratio: 16 / 10;
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.24);
        }

        .wide-frame,
        .showcase-frame,
        .essential-frame,
        .student-frame,
        .soft-frame {
          aspect-ratio: 16 / 9;
        }

        .img-cover,
        .img-contain {
          object-position: center;
        }

        .img-cover {
          object-fit: cover;
        }

        .img-contain {
          object-fit: contain;
          padding: 10px;
          background: linear-gradient(180deg, #fffdf8, #f7f2e7);
        }

        .identity-strip {
          padding: 26px 0;
          background: #f0f3ef;
          border-bottom: 1px solid rgba(10, 90, 71, 0.08);
        }

        .identity-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .identity-card {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid #dde6e1;
          border-radius: 20px;
          padding: 24px;
        }

        .identity-card h3,
        .showcase-body h3,
        .essential-content h3,
        .cta-card h3 {
          margin: 0 0 10px;
          font-size: 20px;
          font-family: Georgia, "Times New Roman", serif;
          color: var(--green-dark);
        }

        .identity-card p,
        .showcase-body p,
        .essential-content p,
        .cta-card p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .section {
          padding: 96px 0;
        }

        .soft-section {
          background: linear-gradient(180deg, #f3f5f0 0%, #faf8f2 100%);
        }

        .two-col,
        .student-grid,
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .section h2,
        .cta-section h2 {
          font-size: clamp(34px, 5vw, 58px);
          color: var(--green-dark);
          margin-bottom: 22px;
        }

        .section h2 em,
        .cta-section h2 em {
          color: var(--gold-deep);
          font-style: italic;
          font-weight: 700;
        }

        .body-text {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.95;
          margin: 0 0 18px;
        }

        .light-text {
          color: rgba(255, 255, 255, 0.78);
        }

        .text-link {
          display: inline-block;
          margin-top: 8px;
          color: var(--green) !important;
          font-size: 14px;
          font-weight: 700;
        }

        .philosophy-band {
          padding: 90px 0;
          background:
            radial-gradient(circle at 20% 10%, rgba(214, 184, 106, 0.18), transparent 22%),
            linear-gradient(135deg, #063e33 0%, #0a5a47 100%);
          color: white;
          text-align: center;
        }

        .philosophy-band blockquote {
          max-width: 980px;
          margin: 0 auto;
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          font-size: clamp(24px, 3.2vw, 40px);
          line-height: 1.65;
          color: #f6f0df;
        }

        .philosophy-note {
          margin-top: 20px;
          color: #d9bc79;
          font-size: 12px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
        }

        .section-head {
          max-width: 860px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .section-head p:last-child {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.85;
          margin: 0;
        }

        .wide-visual {
          margin-bottom: 30px;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .pillar-card {
          background: var(--card);
          border: 1px solid #e8dfcf;
          border-radius: 22px;
          padding: 24px 22px;
          min-height: 230px;
          box-shadow: 0 10px 30px rgba(7, 62, 51, 0.04);
        }

        .pillar-number {
          display: inline-flex;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(199, 162, 79, 0.14);
          color: var(--gold-deep);
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .pillar-card h3 {
          margin: 0 0 8px;
          font-size: 22px;
          font-family: Georgia, "Times New Roman", serif;
          color: var(--green-dark);
        }

        .pillar-card strong {
          display: block;
          margin-bottom: 10px;
          font-size: 12px;
          color: var(--gold-deep);
          letter-spacing: 0.4px;
        }

        .pillar-card p {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .showcase-grid,
        .essentials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .showcase-card,
        .essential-card {
          background: var(--card);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #e7dfcf;
          box-shadow: 0 14px 40px rgba(7, 62, 51, 0.05);
        }

        .showcase-body,
        .essential-content {
          padding: 22px;
        }

        .student-section {
          background: linear-gradient(180deg, #faf8f2 0%, #f1f5f2 100%);
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 28px 0 0;
          display: grid;
          gap: 12px;
        }

        .feature-list li {
          position: relative;
          padding-left: 24px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.8;
        }

        .feature-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(180deg, var(--gold), var(--green));
        }

        .operations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .operation-card {
          padding: 20px 18px;
          border-radius: 18px;
          background: white;
          border: 1px solid #e9e1d2;
          min-height: 120px;
          box-shadow: 0 10px 30px rgba(7, 62, 51, 0.04);
        }

        .operation-card span {
          display: inline-block;
          margin-bottom: 10px;
          color: var(--gold-deep);
          font-size: 12px;
          font-weight: 700;
        }

        .operation-card p {
          margin: 0;
          color: var(--text);
          font-size: 14px;
          line-height: 1.65;
          font-weight: 700;
        }

        .cta-section {
          padding: 96px 0;
          background:
            radial-gradient(circle at 85% 20%, rgba(214, 184, 106, 0.18), transparent 24%),
            linear-gradient(135deg, #063e33 0%, #0b644f 100%);
          color: white;
        }

        .cta-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: 30px;
          backdrop-filter: blur(10px);
        }

        .cta-card h3 {
          color: white;
        }

        .cta-card p {
          color: rgba(255, 255, 255, 0.8);
        }

        .cta-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .site-footer {
          background: #052f28;
          color: white;
          padding: 70px 0 24px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 0.9fr 1.1fr;
          gap: 44px;
        }

        .footer-brand h2 {
          margin: 0;
          font-size: 36px;
          font-family: Georgia, "Times New Roman", serif;
          color: white;
        }

        .footer-sub {
          margin: 8px 0 18px;
          color: #dbbe79;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        .footer-grid h3 {
          margin: 0 0 12px;
          color: #dbbe79;
          font-size: 14px;
          letter-spacing: 0.4px;
        }

        .footer-grid p,
        .footer-grid a {
          color: #c8d8d1;
          font-size: 14px;
          line-height: 1.85;
        }

        .footer-grid a {
          display: block;
          margin: 10px 0;
        }

        .footer-motto {
          color: #dbbe79 !important;
          font-size: 11px !important;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin-top: 18px;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          margin-top: 40px;
          padding-top: 18px;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: #bccbc5;
          font-size: 11px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
          will-change: transform, opacity;
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .elvarin-home section[id],
        .elvarin-home footer[id] {
          scroll-margin-top: 110px;
        }

        @media (max-width: 1100px) {
          .hero-grid,
          .two-col,
          .student-grid,
          .cta-grid {
            grid-template-columns: 1fr;
          }

          .pillars-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .showcase-grid,
          .essentials-grid {
            grid-template-columns: 1fr;
          }

          .operations-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 860px) {
          .header-inner {
            flex-wrap: wrap;
            padding: 14px 0;
          }

          .nav-links {
            order: 3;
            width: 100%;
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 6px;
          }

          .identity-grid,
          .pillars-grid,
          .operations-grid {
            grid-template-columns: 1fr 1fr;
          }

          .section,
          .cta-section {
            padding: 78px 0;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 580px) {
          .container {
            width: min(100% - 28px, 1180px);
          }

          .top-strip {
            font-size: 8px;
            letter-spacing: 1.2px;
          }

          .brand-title {
            font-size: 22px;
          }

          .brand-subtitle {
            font-size: 9px;
            letter-spacing: 3px;
          }

          .hero-copy h1 {
            font-size: 42px;
          }

          .hero-text,
          .body-text,
          .section-head p:last-child {
            font-size: 15px;
          }

          .identity-grid,
          .pillars-grid,
          .operations-grid {
            grid-template-columns: 1fr;
          }

          .hero-actions,
          .cta-actions {
            flex-direction: column;
          }

          .btn,
          .portal-btn {
            width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}
