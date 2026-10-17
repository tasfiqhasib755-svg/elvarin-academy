
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const pillars = [
  {
    icon: "✦",
    title: "Education",
    subtitle: "Knowledge",
    description:
      "Inspiring curiosity, understanding and the pursuit of meaningful knowledge.",
  },
  {
    icon: "❀",
    title: "Life & Learning",
    subtitle: "Growth",
    description:
      "Encouraging personal development, reflection and a lifelong love of learning.",
  },
  {
    icon: "◇",
    title: "Values",
    subtitle: "Character",
    description:
      "Placing respect, kindness and strong character at the heart of education.",
  },
  {
    icon: "◎",
    title: "Awareness",
    subtitle: "Responsibility",
    description:
      "Developing thoughtful individuals who understand their responsibilities.",
  },
  {
    icon: "✧",
    title: "Righteousness",
    subtitle: "Good Deeds",
    description:
      "Encouraging sincerity, positive action and the courage to do what is right.",
  },
  {
    icon: "❖",
    title: "Integrity",
    subtitle: "Trust",
    description:
      "Building honesty, accountability and trust through everyday choices.",
  },
  {
    icon: "✳",
    title: "Najah",
    subtitle: "Meaningful Success",
    description:
      "Striving for purposeful achievement through knowledge and good character.",
  },
];

const learning = [
  {
    number: "01",
    title: "Purposeful Education",
    description:
      "An approach to learning that values understanding, curiosity and consistent intellectual development.",
  },
  {
    number: "02",
    title: "Character & Values",
    description:
      "A philosophy that places respect, integrity, responsibility and positive conduct alongside knowledge.",
  },
  {
    number: "03",
    title: "Growth Beyond the Classroom",
    description:
      "Encouraging confidence, independent thinking, good habits and lifelong personal growth.",
  },
];

const gallery = [
  {
    src: "/elvarin/classroom.jpg",
    title: "Learning Environment",
    caption: "Classroom design concept",
    label: "01",
  },
  {
    src: "/elvarin/classroom-2.jpg",
    title: "Academic Atmosphere",
    caption: "Classroom inspiration",
    label: "02",
  },
  {
    src: "/elvarin/office.jpg",
    title: "Institutional Environment",
    caption: "Office design concept",
    label: "03",
  },
  {
    src: "/elvarin/uniform.jpg",
    title: "Student Identity",
    caption: "Uniform design concept",
    label: "04",
  },
  {
    src: "/elvarin/notebook.jpg",
    title: "Learning Essentials",
    caption: "Branded notebook concept",
    label: "05",
  },
  {
    src: "/elvarin/stationery.jpg",
    title: "Academy Stationery",
    caption: "Institutional stationery concept",
    label: "06",
  },
  {
    src: "/elvarin/seal.jpg",
    title: "Academy Seal",
    caption: "Official identity concept",
    label: "07",
  },
  {
    src: "/elvarin/brand-board.jpg",
    title: "Our Brand Identity",
    caption: "ELVARIN brand presentation",
    label: "08",
  },
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#values", label: "Our Values" },
  { href: "#learning", label: "Learning" },
  { href: "#environment", label: "Environment" },
  { href: "#admission", label: "Admission" },
  { href: "#contact", label: "Contact" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(
      ".elvarin .reveal"
    );

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    items.forEach((item) => {
      item.classList.add("animate-ready");
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="elvarin" id="home">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="top-bar">
        <span className="top-star">✦</span>
        EDUCATION · LIFE & LEARNING · VALUES · INTEGRITY · NAJAH
        <span className="top-star">✦</span>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" onClick={closeMenu}>
            <span className="brand-logo">
              <Image
                src="/elvarin/logo-mark.png"
                alt="ELVARIN Academy emblem"
                width={62}
                height={62}
                className="logo-img"
                priority
              />
            </span>

            <span className="brand-words">
              <strong>ELVARIN</strong>
              <small>ACADEMY</small>
            </span>
          </Link>

          <nav
            id="main-navigation"
            className={`navigation ${menuOpen ? "navigation-open" : ""}`}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/admin"
              className="mobile-portal"
              onClick={closeMenu}
            >
              Admin Portal ↗
            </Link>
          </nav>

          <div className="header-actions">
            <Link href="/admin" className="portal-button">
              Admin Portal <span>↗</span>
            </Link>

            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-pattern" aria-hidden="true" />

        <div className="container hero-layout">
          <div className="hero-copy reveal visible">
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              WELCOME TO ELVARIN ACADEMY
            </p>

            <h1>
              Education
              <br />
              Beyond
              <br />
              <em>Excellence.</em>
            </h1>

            <p className="hero-intro">
              Where knowledge meets character, learning
              inspires growth, and values guide every
              step towards a meaningful future.
            </p>

            <div className="hero-buttons">
              <a className="btn btn-gold" href="#about">
                Explore Our Academy <span>↗</span>
              </a>

              <a className="btn btn-light-outline" href="#admission">
                Admission Information
              </a>
            </div>

            <div className="hero-signature">
              <span className="signature-line" />
              LEARN · GROW · ACHIEVE NAJAH
            </div>
          </div>

          <div className="hero-art reveal visible">
            <div className="hero-art-inner">
              <div className="hero-gold-corner" />

              <Image
                src="/elvarin/logo-mark.png"
                alt="ELVARIN Academy brand symbol"
                width={350}
                height={350}
                className="hero-emblem"
                priority
              />

              <span className="hero-art-title">
                KNOWLEDGE
                <span>✦</span>
                CHARACTER
                <span>✦</span>
                PURPOSE
              </span>
            </div>

            <div className="hero-art-footer">
              <span>ESTABLISHING A CULTURE OF LEARNING</span>
              <span>✦</span>
            </div>
          </div>
        </div>

        <div className="hero-bottom-border" />
      </section>

      {/* PRINCIPLES STRIP */}
      <div className="trust-strip">
        <div className="container trust-row">
          <div><span>✦</span> Knowledge with Purpose</div>
          <div><span>✦</span> Growth with Values</div>
          <div><span>✦</span> Character with Integrity</div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <div className="container about-layout">
          <div className="about-visual reveal">
            <div className="about-image-shell">
              <Image
                src="/elvarin/classroom.jpg"
                alt="ELVARIN Academy classroom design concept"
                width={850}
                height={700}
                className="cover-image"
                sizes="(max-width: 800px) 100vw, 48vw"
              />
            </div>

            <div className="about-image-tag">
              <span className="tag-star">✦</span>
              A VISION FOR
              <br />
              MEANINGFUL EDUCATION
            </div>
            <p className="image-disclaimer">
              Classroom concept illustration
            </p>
          </div>

          <div className="about-copy reveal">
            <p className="section-kicker">
              <span>01</span> / DISCOVER OUR ACADEMY
            </p>

            <h2 className="section-title">
              A Foundation
              <br />
              for a <em>Meaningful</em>
              <br />
              Future.
            </h2>

            <div className="gold-rule" />

            <p className="body-copy">
              At ELVARIN Academy, we believe education
              extends far beyond textbooks and examinations.
              It is a lifelong journey of gaining knowledge,
              developing character and discovering purpose.
            </p>

            <p className="body-copy">
              Our educational vision brings together
              learning, values, awareness, righteousness
              and integrity, inspiring individuals to
              pursue success with responsibility.
            </p>

            <a className="text-action" href="#values">
              Explore Our Educational Philosophy
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* SEVEN PILLARS */}
      <section id="values" className="section pillars-section">
        <div className="container">
          <div className="section-heading reveal">
            <p className="section-kicker">
              <span>02</span> / OUR GUIDING PRINCIPLES
            </p>

            <h2 className="section-title">
              Seven Pillars.
              <br />
              <em>One Purpose.</em>
            </h2>

            <p className="section-description">
              The seven guiding principles of ELVARIN
              reflect our belief that knowledge,
              character and meaningful success
              belong together.
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <article
                className="pillar-card reveal"
                key={pillar.title}
                style={{
                  transitionDelay: `${(index % 4) * 75}ms`,
                }}
              >
                <span className="pillar-index">
                  0{index + 1}
                </span>

                <span className="pillar-symbol" aria-hidden="true">
                  {pillar.icon}
                </span>

                <h3>{pillar.title}</h3>
                <span className="pillar-subtitle">
                  {pillar.subtitle}
                </span>

                <div className="pillar-line" />

                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy-section">
        <div className="container philosophy-layout reveal">
          <div className="philosophy-mark" aria-hidden="true">
            ✦
          </div>

          <p className="section-kicker">
            THE ELVARIN EDUCATIONAL PHILOSOPHY
          </p>

          <blockquote>
            “Education and Life-long Learning,
            guided by Values and Awareness,
            shaped by Righteousness and Integrity,
            leading to <em>Najah.</em>”
          </blockquote>

          <div className="philosophy-divider">
            <span />
            ✦
            <span />
          </div>

          <p className="philosophy-footer">
            LEARN · GROW · DO GOOD · ACHIEVE NAJAH
          </p>
        </div>
      </section>

      {/* LEARNING */}
      <section id="learning" className="section learning-section">
        <div className="container">
          <div className="section-heading reveal">
            <p className="section-kicker">
              <span>03</span> / THE LEARNING PHILOSOPHY
            </p>

            <h2 className="section-title">
              Learning That
              <br />
              Shapes the <em>Whole Person.</em>
            </h2>

            <p className="section-description">
              A thoughtful educational vision where
              academic understanding and personal
              development support one another.
            </p>
          </div>

          <div className="learning-layout">
            {learning.map((item, index) => (
              <article
                key={item.number}
                className="learning-card reveal"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span className="learning-number">
                  {item.number}
                </span>

                <div className="learning-card-rule" />

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <span className="learning-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENT */}
      <section
        id="environment"
        className="section environment-section"
      >
        <div className="container">
          <div className="environment-heading reveal">
            <div>
              <p className="section-kicker">
                <span>04</span> / VISUALISING OUR ACADEMY
              </p>

              <h2 className="section-title">
                An Environment
                <br />
                Designed to <em>Inspire.</em>
              </h2>
            </div>

            <p className="environment-intro">
              Explore the visual direction for ELVARIN
              Academy, from learning spaces and student
              identity to thoughtfully designed
              institutional materials.
            </p>
          </div>

          <div className="gallery-grid">
            {gallery.map((item, index) => (
              <article
                key={item.src}
                className={`gallery-card reveal ${
                  index === 0 ? "gallery-featured" : ""
                }`}
              >
                <div className="gallery-image-wrap">
                  <Image
                    src={item.src}
                    alt={`${item.title} — ${item.caption}`}
                    fill
                    className="gallery-image"
                    sizes={
                      index === 0
                        ? "(max-width: 760px) 100vw, 58vw"
                        : "(max-width: 760px) 100vw, 33vw"
                    }
                  />

                  <span className="gallery-number">
                    {item.label}
                  </span>
                </div>

                <div className="gallery-caption">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.caption}</p>
                  </div>

                  <span className="gallery-caption-icon">
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p className="gallery-note reveal">
            Note: Images in this section are brand and
            architectural concepts, not verified photographs
            of operational campus facilities.
          </p>
        </div>
      </section>

      {/* IDENTITY */}
      <section id="identity" className="section identity-section">
        <div className="container identity-layout">
          <div className="identity-copy reveal">
            <p className="section-kicker">
              <span>05</span> / OUR DISTINCT IDENTITY
            </p>

            <h2 className="section-title">
              Rooted in Values.
              <br />
              <em>United in Purpose.</em>
            </h2>

            <p className="body-copy">
              A strong identity reflects a thoughtful
              philosophy. ELVARIN's deep green,
              refined gold and ivory palette expresses
              knowledge, dignity, aspiration and
              timeless academic character.
            </p>

            <div className="color-palette">
              <div>
                <span className="color-dot deep-green" />
                <small>Deep Green</small>
              </div>

              <div>
                <span className="color-dot academy-gold" />
                <small>Gold</small>
              </div>

              <div>
                <span className="color-dot academy-ivory" />
                <small>Ivory</small>
              </div>
            </div>

            <div className="identity-quote">
              “Same Values, Different Paths.
              <br />
              One Destination — Najah.”
            </div>
          </div>

          <div className="identity-image reveal">
            <Image
              src="/elvarin/uniform.jpg"
              alt="ELVARIN Academy proposed uniform identity"
              fill
              sizes="(max-width: 800px) 100vw, 48vw"
              className="cover-image"
            />
            <span className="identity-image-label">
              PROPOSED STUDENT UNIFORM
            </span>
          </div>
        </div>
      </section>

      {/* ADMISSION */}
      <section id="admission" className="section admission-section">
        <div className="container admission-layout">
          <div className="admission-copy reveal">
            <p className="section-kicker">
              <span>06</span> / THE NEXT CHAPTER
            </p>

            <h2 className="section-title">
              Your Journey
              <br />
              Towards <em>Najah.</em>
            </h2>

            <p className="body-copy">
              Interested in learning more about ELVARIN
              Academy? Discover our educational vision
              and follow our journey as official academic
              programs and admission details are announced.
            </p>
          </div>

          <div className="admission-panel reveal">
            <span className="admission-panel-star">✦</span>

            <p className="panel-eyebrow">
              ELVARIN ACADEMY
            </p>

            <h3>Admission & Academic Information</h3>

            <p>
              Program details, eligibility requirements,
              enrollment procedures and admission dates
              will be published after official confirmation.
            </p>

            <a href="#contact" className="btn btn-gold">
              Stay Connected <span>↗</span>
            </a>

            <span className="panel-bottom">
              LEARN · GROW · ACHIEVE NAJAH
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand-block">
              <div className="footer-brand">
                <Image
                  src="/elvarin/logo-mark.png"
                  alt="ELVARIN Academy emblem"
                  width={75}
                  height={75}
                />

                <div>
                  <strong>ELVARIN</strong>
                  <small>ACADEMY</small>
                </div>
              </div>

              <p>
                Education Beyond Excellence. Guided by
                knowledge, character, awareness,
                righteousness and integrity.
              </p>

              <span className="footer-tagline">
                LEARN · GROW · ACHIEVE NAJAH
              </span>
            </div>

            <div className="footer-links">
              <h3>Explore</h3>
              <a href="#home">Home</a>
              <a href="#about">About Academy</a>
              <a href="#values">Our Seven Pillars</a>
              <a href="#learning">Learning Philosophy</a>
              <a href="#environment">Academy Concepts</a>
            </div>

            <div className="footer-links">
              <h3>Information</h3>
              <a href="#identity">Our Identity</a>
              <a href="#admission">Admission</a>
              <Link href="/admin">
                Administrator Portal
              </Link>
            </div>

            <div className="footer-contact">
              <h3>Stay Connected</h3>

              <p>
                Verified contact information and
                announcements will be added here.
              </p>

              <div className="footer-symbol">✦</div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} ELVARIN Academy.
              All Rights Reserved.
            </span>

            <span>
              EDUCATION · VALUES · INTEGRITY · NAJAH
            </span>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <a
        href="#home"
        className="back-to-top"
        aria-label="Back to top"
      >
        ↑
      </a>

      {/* STYLES */}
      <style>{`
        .elvarin {
          --green: #064535;
          --green-dark: #04372E;
          --green-deep: #032D26;
          --gold: #C6A052;
          --gold-light: #E0BF7B;
          --ivory: #FAF8F2;
          --text: #153D33;
          --muted: #66766D;
          background: var(--ivory);
          color: var(--text);
          font-family: Arial, Helvetica, sans-serif;
          overflow: clip;
        }

        .elvarin *,
        .elvarin *::before,
        .elvarin *::after {
          box-sizing: border-box;
        }

        .elvarin a {
          text-decoration: none;
          color: inherit;
        }

        .elvarin button {
          font: inherit;
        }

        .elvarin a:focus-visible,
        .elvarin button:focus-visible {
          outline: 3px solid #D5AA52;
          outline-offset: 4px;
        }

        .elvarin .container {
          max-width: 1230px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .elvarin .section {
          padding: 116px 0;
        }

        .elvarin section[id] {
          scroll-margin-top: 110px;
        }

        .elvarin .reveal {
          opacity: 1;
          transform: none;
        }

        .elvarin .reveal.animate-ready:not(.visible) {
          opacity: 0;
          transform: translateY(35px);
        }

        .elvarin .reveal.animate-ready {
          transition:
            opacity 800ms ease,
            transform 800ms cubic-bezier(.22,1,.36,1);
        }

        .elvarin .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .elvarin .top-bar {
          min-height: 36px;
          padding: 10px 15px;
          text-align: center;
          background: #032F27;
          color: #DFC283;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          line-height: 1.6;
        }

        .elvarin .top-star {
          margin: 0 18px;
          color: #DFC283;
        }

        .elvarin .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,253,248,.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #E7E3D8;
        }

        .elvarin .header-inner {
          min-height: 88px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .elvarin .brand,
        .elvarin .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .elvarin .brand-logo {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .elvarin .logo-img {
          width: 58px;
          height: 58px;
          object-fit: contain;
        }

        .elvarin .brand-words,
        .elvarin .footer-brand div {
          display: flex;
          flex-direction: column;
        }

        .elvarin .brand-words strong {
          font: bold 24px Georgia, serif;
          letter-spacing: 1px;
          color: #043D32;
        }

        .elvarin .brand-words small {
          margin-top: 3px;
          color: #9C7632;
          letter-spacing: 5px;
          font-size: 9px;
        }

        .elvarin .navigation {
          display: flex;
          align-items: center;
          gap: 21px;
        }

        .elvarin .navigation a {
          font-size: 12px;
          font-weight: 600;
          color: #26483C;
          transition: color .25s ease;
          white-space: nowrap;
        }

        .elvarin .navigation a:hover {
          color: #B08B43;
        }

        .elvarin .portal-button {
          display: inline-flex;
          gap: 12px;
          align-items: center;
          border: 1px solid #075140;
          color: #064535;
          padding: 13px 16px;
          font-size: 12px;
          font-weight: 700;
          transition: background .25s, color .25s;
          white-space: nowrap;
        }

        .elvarin .portal-button:hover {
          background: #064535;
          color: #FFFFFF;
        }

        .elvarin .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .elvarin .menu-toggle,
        .elvarin .mobile-portal {
          display: none;
        }

        .elvarin .hero {
          position: relative;
          background:
            radial-gradient(circle at 88% 22%,
              rgba(18,118,91,.65), transparent 45%),
            linear-gradient(125deg,#04362D,#08614F);
          color: #FFFFFF;
          overflow: hidden;
        }

        .elvarin .hero-pattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .2;
          background-image:
            linear-gradient(90deg,
              transparent 98%,rgba(255,255,255,.12) 99%),
            linear-gradient(0deg,
              transparent 98%,rgba(255,255,255,.12) 99%);
          background-size: 65px 65px;
        }

        .elvarin .hero-layout {
          position: relative;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          align-items: center;
          gap: 70px;
          min-height: 690px;
          padding-top: 90px;
          padding-bottom: 90px;
        }

        .elvarin .eyebrow,
        .elvarin .section-kicker {
          color: #BC9548;
          letter-spacing: 2.5px;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.7;
          text-transform: uppercase;
        }

        .elvarin .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #E3C889;
        }

        .elvarin .eyebrow-line {
          width: 26px;
          height: 1px;
          background: #E3C889;
        }

        .elvarin .hero h1 {
          font: 400 clamp(53px,6.8vw,91px)/1.06 Georgia,serif;
          letter-spacing: -2px;
          margin: 25px 0;
        }

        .elvarin .hero h1 em {
          font-weight: 400;
          color: #E0BB70;
        }

        .elvarin .hero-intro {
          max-width: 525px;
          color: #DCE9E2;
          font-size: 17px;
          line-height: 1.95;
          margin: 0;
        }

        .elvarin .hero-buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 35px;
        }

        .elvarin .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-height: 50px;
          padding: 14px 23px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .3px;
          transition:
            transform .25s ease,
            background .25s ease,
            box-shadow .25s ease;
        }

        .elvarin .btn:hover {
          transform: translateY(-3px);
        }

        .elvarin .btn-gold {
          background: #D9B46B;
          color: #073C31;
        }

        .elvarin .btn-gold:hover {
          background: #E8C985;
          box-shadow: 0 8px 25px rgba(0,0,0,.14);
        }

        .elvarin .btn-light-outline {
          border: 1px solid rgba(255,255,255,.65);
          color: #FFFFFF;
        }

        .elvarin .btn-light-outline:hover {
          background: rgba(255,255,255,.1);
        }

        .elvarin .hero-signature {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 60px;
          color: #DBC188;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.8px;
        }

        .elvarin .signature-line {
          width: 35px;
          height: 1px;
          background: #CFA85B;
        }

        .elvarin .hero-art {
          position: relative;
          min-width: 0;
        }

        .elvarin .hero-art-inner {
          min-height: 465px;
          padding: 45px;
          border-radius: 235px 235px 7px 7px;
          border: 1px solid rgba(231,200,134,.54);
          background:
            radial-gradient(circle at 50% 30%, #14755D, #04382F);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .elvarin .hero-art-inner::after {
          content: "";
          position: absolute;
          inset: 17px;
          border: 1px solid rgba(229,190,109,.28);
          border-radius: 220px 220px 4px 4px;
          pointer-events: none;
        }

        .elvarin .hero-gold-corner {
          position: absolute;
          top: 37px;
          left: 50%;
          width: 8px;
          height: 8px;
          background: #DFC17E;
          transform: translateX(-50%) rotate(45deg);
        }

        .elvarin .hero-emblem {
          width: 100%;
          max-width: 320px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 16px 25px rgba(0,0,0,.17));
          position: relative;
          z-index: 1;
        }

        .elvarin .hero-art-title {
          color: #E5CB92;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 9px;
          letter-spacing: 2px;
          margin-top: 17px;
          position: relative;
          z-index: 1;
        }

        .elvarin .hero-art-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 17px;
          font-size: 9px;
          letter-spacing: 2px;
          color: #E1C789;
        }

        .elvarin .hero-bottom-border {
          height: 5px;
          background: linear-gradient(90deg,#084535,#D6B46E,#084535);
        }

        .elvarin .trust-strip {
          background: #EFEEE4;
          border-bottom: 1px solid #E1DFD0;
        }

        .elvarin .trust-row {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          text-align: center;
          gap: 15px;
          padding-top: 23px;
          padding-bottom: 23px;
          font-size: 11px;
          letter-spacing: 1.3px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .elvarin .trust-row span {
          color: #B48A40;
          margin-right: 10px;
        }

        .elvarin .about-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 95px;
        }

        .elvarin .about-visual {
          position: relative;
        }

        .elvarin .about-image-shell {
          position: relative;
          aspect-ratio: 4 / 4.3;
          overflow: hidden;
          background: #E7E4DC;
        }

        .elvarin .cover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .elvarin .about-image-tag {
          position: absolute;
          bottom: 50px;
          right: -26px;
          background: #064535;
          color: #FFFFFF;
          padding: 25px 30px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          line-height: 1.8;
          box-shadow: 0 12px 30px rgba(0,0,0,.12);
        }

        .elvarin .tag-star {
          display: block;
          color: #D9B46B;
          font-size: 27px;
          margin-bottom: 6px;
        }

        .elvarin .image-disclaimer {
          font-size: 11px;
          color: #7B827A;
          margin-top: 12px;
        }

        .elvarin .section-kicker span {
          color: #587164;
          margin-right: 8px;
        }

        .elvarin .section-title {
          font: 400 clamp(38px,4.7vw,60px)/1.17 Georgia,serif;
          letter-spacing: -1px;
          margin: 19px 0 25px;
          color: #073F33;
        }

        .elvarin .section-title em {
          color: #B28B45;
          font-weight: 400;
        }

        .elvarin .gold-rule {
          width: 52px;
          height: 2px;
          background: #C6A052;
          margin: 30px 0;
        }

        .elvarin .body-copy {
          color: #617469;
          font-size: 16px;
          line-height: 1.95;
          margin: 0 0 20px;
        }

        .elvarin .text-action {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          margin-top: 22px;
          color: #07513F;
          font-size: 13px;
          font-weight: 700;
          padding-bottom: 8px;
          border-bottom: 1px solid #B18C49;
          transition: gap .25s;
        }

        .elvarin .text-action:hover {
          gap: 30px;
        }

        .elvarin .pillars-section {
          background: #F0F0E8;
        }

        .elvarin .section-heading {
          max-width: 770px;
          margin: 0 auto 55px;
          text-align: center;
        }

        .elvarin .section-description {
          max-width: 620px;
          margin: 0 auto;
          color: #64776A;
          font-size: 16px;
          line-height: 1.9;
        }

        .elvarin .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4,minmax(0,1fr));
          gap: 19px;
        }

        .elvarin .pillar-card {
          position: relative;
          min-height: 294px;
          padding: 28px 25px;
          background: #FFFEFA;
          border: 1px solid #E5DFD1;
          transition:
            transform .35s ease,
            box-shadow .35s ease,
            border-color .35s ease;
        }

        .elvarin .pillar-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 18px 40px rgba(10,65,46,.09);
          border-color: #CFB16F;
        }

        .elvarin .pillar-index {
          position: absolute;
          right: 23px;
          top: 24px;
          color: #B7B4A5;
          font-size: 11px;
        }

        .elvarin .pillar-symbol {
          display: block;
          font-size: 39px;
          color: #B38C42;
          margin: 12px 0 20px;
          line-height: 1;
        }

        .elvarin .pillar-card h3 {
          font: 23px Georgia,serif;
          color: #064535;
          margin: 0 0 8px;
        }

        .elvarin .pillar-subtitle {
          color: #B28C46;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .7px;
        }

        .elvarin .pillar-line {
          width: 30px;
          height: 1px;
          background: #CFB36F;
          margin: 21px 0 13px;
        }

        .elvarin .pillar-card p {
          color: #66796F;
          font-size: 13px;
          line-height: 1.8;
          margin: 0;
        }

        .elvarin .philosophy-section {
          padding: 100px 0;
          background:
            radial-gradient(circle at 50% 0%,
              rgba(23,102,77,.45),transparent 55%),
            #053C31;
          text-align: center;
          color: #FFFFFF;
        }

        .elvarin .philosophy-layout {
          max-width: 1010px;
        }

        .elvarin .philosophy-mark {
          color: #DAB777;
          font-size: 36px;
          margin-bottom: 25px;
        }

        .elvarin .philosophy-section .section-kicker {
          color: #E3C586;
        }

        .elvarin .philosophy-section blockquote {
          font: italic clamp(25px,3.5vw,44px)/1.6 Georgia,serif;
          color: #F3EDE2;
          margin: 35px 0;
        }

        .elvarin .philosophy-section blockquote em {
          color: #DFBF79;
        }

        .elvarin .philosophy-divider {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 18px;
          color: #D9B46B;
          margin-bottom: 24px;
        }

        .elvarin .philosophy-divider span {
          width: 62px;
          height: 1px;
          background: #B3945A;
        }

        .elvarin .philosophy-footer {
          color: #D4BC85;
          font-size: 10px;
          letter-spacing: 2.8px;
        }

        .elvarin .learning-layout {
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 24px;
        }

        .elvarin .learning-card {
          position: relative;
          background: #FFFFFF;
          padding: 40px 32px 55px;
          border: 1px solid #EBE5D8;
          border-top: 3px solid #C6A052;
          box-shadow: 0 12px 35px rgba(8,51,38,.04);
          min-height: 325px;
        }

        .elvarin .learning-number {
          font: 40px Georgia,serif;
          color: #C6A052;
        }

        .elvarin .learning-card-rule {
          width: 37px;
          height: 1px;
          background: #D4B674;
          margin: 23px 0;
        }

        .elvarin .learning-card h3 {
          font: 27px/1.3 Georgia,serif;
          color: #073F34;
          margin: 0 0 18px;
        }

        .elvarin .learning-card p {
          font-size: 14px;
          line-height: 1.9;
          color: #67796F;
        }

        .elvarin .learning-arrow {
          position: absolute;
          right: 26px;
          bottom: 23px;
          color: #B18A43;
          font-size: 21px;
        }

        .elvarin .environment-section {
          background: #F0EFE7;
        }

        .elvarin .environment-heading {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          align-items: end;
          gap: 45px;
          margin-bottom: 48px;
        }

        .elvarin .environment-intro {
          color: #63756A;
          font-size: 16px;
          line-height: 1.9;
          padding-bottom: 13px;
        }

        .elvarin .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 19px;
        }

        .elvarin .gallery-featured {
          grid-column: span 2;
        }

        .elvarin .gallery-card {
          background: #FFFEFB;
          border: 1px solid #E6E0D3;
          overflow: hidden;
          min-width: 0;
        }

        .elvarin .gallery-image-wrap {
          position: relative;
          aspect-ratio: 1.35 / 1;
          overflow: hidden;
          background: #E2E1D8;
        }

        .elvarin .gallery-featured .gallery-image-wrap {
          aspect-ratio: 2.15 / 1;
        }

        .elvarin .gallery-image {
          object-fit: cover;
          transition: transform .7s cubic-bezier(.22,1,.36,1);
        }

        .elvarin .gallery-card:hover .gallery-image {
          transform: scale(1.055);
        }

        .elvarin .gallery-number {
          position: absolute;
          top: 17px;
          left: 18px;
          background: rgba(4,55,45,.9);
          color: #E4C78C;
          padding: 9px 12px;
          font-size: 11px;
        }

        .elvarin .gallery-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 21px 23px;
        }

        .elvarin .gallery-caption h3 {
          font: 21px Georgia,serif;
          color: #063F33;
          margin: 0 0 7px;
        }

        .elvarin .gallery-caption p {
          color: #728075;
          font-size: 12px;
          margin: 0;
        }

        .elvarin .gallery-caption-icon {
          color: #BC9750;
          font-size: 20px;
        }

        .elvarin .gallery-note {
          color: #788177;
          margin: 24px 0 0;
          font-size: 12px;
          line-height: 1.7;
        }

        .elvarin .identity-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .elvarin .identity-image {
          position: relative;
          min-height: 545px;
          background: #EAE6DE;
          overflow: hidden;
        }

        .elvarin .identity-image-label {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: #054638;
          color: #E9D09B;
          font-size: 10px;
          letter-spacing: 1.8px;
          padding: 13px 16px;
        }

        .elvarin .color-palette {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
          margin: 32px 0;
        }

        .elvarin .color-palette > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .elvarin .color-palette small {
          color: #6A756A;
          font-size: 11px;
        }

        .elvarin .color-dot {
          display: block;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,.09);
        }

        .elvarin .deep-green {
          background: #064535;
        }

        .elvarin .academy-gold {
          background: #C6A052;
        }

        .elvarin .academy-ivory {
          background: #FAF8F2;
        }

        .elvarin .identity-quote {
          font: italic 21px/1.65 Georgia,serif;
          color: #0A5040;
          border-left: 2px solid #C6A052;
          padding-left: 20px;
          margin-top: 30px;
        }

        .elvarin .admission-section {
          background: #E9ECE4;
        }

        .elvarin .admission-layout {
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 75px;
          align-items: center;
        }

        .elvarin .admission-panel {
          position: relative;
          padding: 50px 45px;
          background:
            radial-gradient(circle at 85% 15%,
              #12614E,transparent 60%),
            #043C31;
          color: #FFFFFF;
          min-height: 390px;
          overflow: hidden;
        }

        .elvarin .admission-panel-star {
          color: #D8B570;
          font-size: 30px;
        }

        .elvarin .panel-eyebrow {
          color: #D9B975;
          font-size: 10px;
          letter-spacing: 2.5px;
          margin: 22px 0;
        }

        .elvarin .admission-panel h3 {
          font: 34px/1.25 Georgia,serif;
          margin: 0 0 22px;
        }

        .elvarin .admission-panel > p:not(.panel-eyebrow) {
          color: #D4E5DA;
          font-size: 15px;
          line-height: 1.9;
          margin-bottom: 28px;
        }

        .elvarin .panel-bottom {
          display: block;
          margin-top: 45px;
          color: #D8BC7A;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .elvarin .site-footer {
          background: #032F28;
          padding: 80px 0 25px;
          color: #FFFFFF;
        }

        .elvarin .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 45px;
        }

        .elvarin .footer-brand img {
          object-fit: contain;
        }

        .elvarin .footer-brand strong {
          font: 30px Georgia,serif;
          letter-spacing: 1px;
        }

        .elvarin .footer-brand small {
          color: #D7B875;
          font-size: 10px;
          letter-spacing: 5px;
          margin-top: 5px;
        }

        .elvarin .footer-brand-block > p,
        .elvarin .footer-contact p {
          max-width: 310px;
          font-size: 13px;
          line-height: 1.9;
          color: #C3D5CA;
          margin: 25px 0;
        }

        .elvarin .footer-tagline {
          font-size: 10px;
          letter-spacing: 1.6px;
          color: #D8B875;
        }

        .elvarin .footer-top h3 {
          color: #D8B875;
          font-size: 13px;
          margin: 10px 0 25px;
          letter-spacing: .6px;
        }

        .elvarin .footer-links a {
          display: block;
          color: #CFDCD2;
          font-size: 13px;
          margin-bottom: 16px;
          transition: color .25s;
        }

        .elvarin .footer-links a:hover {
          color: #E5C685;
        }

        .elvarin .footer-symbol {
          font-size: 45px;
          color: #D1B16F;
        }

        .elvarin .footer-bottom {
          border-top: 1px solid #41685A;
          margin-top: 70px;
          padding-top: 25px;
          display: flex;
          justify-content: space-between;
          gap: 25px;
          color: #BCCDC2;
          font-size: 11px;
          line-height: 1.7;
        }

        .elvarin .back-to-top {
          position: fixed;
          bottom: 25px;
          right: 22px;
          z-index: 50;
          background: #C9A65F;
          color: #083C31;
          border: 1px solid #E7CB91;
          width: 44px;
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          font-size: 24px;
          box-shadow: 0 5px 20px rgba(0,0,0,.12);
        }

        @media (max-width: 1140px) {
          .elvarin .navigation {
            gap: 12px;
          }

          .elvarin .navigation a {
            font-size: 11px;
          }

          .elvarin .hero-layout {
            gap: 38px;
          }

          .elvarin .about-layout,
          .elvarin .identity-layout {
            gap: 50px;
          }
        }

        @media (max-width: 900px) {
          .elvarin .menu-toggle {
            width: 43px;
            height: 43px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: #F2F0E9;
            border: 1px solid #DCD8CC;
            cursor: pointer;
          }

          .elvarin .menu-toggle span {
            display: block;
            width: 19px;
            height: 2px;
            background: #064535;
          }

          .elvarin .navigation {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #FFFEFA;
            box-shadow: 0 20px 25px rgba(0,0,0,.08);
            padding: 20px 28px 26px;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            border-bottom: 1px solid #E2DCCA;
            max-height: 75vh;
            overflow-y: auto;
          }

          .elvarin .navigation-open {
            display: flex;
          }

          .elvarin .navigation a {
            padding: 12px 0;
            font-size: 14px;
            border-bottom: 1px solid #F0ECE2;
          }

          .elvarin .mobile-portal {
            display: block;
            color: #064535;
            font-weight: 700;
          }

          .elvarin .hero-layout,
          .elvarin .about-layout,
          .elvarin .identity-layout,
          .elvarin .admission-layout,
          .elvarin .environment-heading {
            grid-template-columns: 1fr;
          }

          .elvarin .hero-layout {
            padding-top: 65px;
            padding-bottom: 75px;
          }

          .elvarin .hero-art {
            max-width: 520px;
            width: 100%;
            margin: auto;
          }

          .elvarin .pillars-grid {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }

          .elvarin .learning-layout {
            grid-template-columns: 1fr;
          }

          .elvarin .footer-top {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }

          .elvarin .identity-image {
            min-height: 470px;
          }

          .elvarin .about-image-tag {
            right: 0;
          }

          .elvarin .section {
            padding: 85px 0;
          }
        }

        @media (max-width: 600px) {
          .elvarin .container {
            padding: 0 18px;
          }

          .elvarin .top-bar {
            font-size: 8px;
            letter-spacing: 1px;
          }

          .elvarin .top-star {
            margin: 0 5px;
          }

          .elvarin .header-inner {
            min-height: 73px;
            gap: 8px;
          }

          .elvarin .logo-img {
            width: 43px;
            height: 43px;
          }

          .elvarin .brand {
            gap: 7px;
          }

          .elvarin .brand-words strong {
            font-size: 19px;
          }

          .elvarin .brand-words small {
            font-size: 8px;
            letter-spacing: 3.7px;
          }

          .elvarin .portal-button {
            display: none;
          }

          .elvarin .hero-layout {
            gap: 45px;
            padding-top: 58px;
            padding-bottom: 60px;
          }

          .elvarin .hero h1 {
            font-size: clamp(48px,12vw,67px);
            letter-spacing: -1.5px;
          }

          .elvarin .hero-intro {
            font-size: 15px;
          }

          .elvarin .hero-buttons {
            flex-direction: column;
          }

          .elvarin .hero-buttons .btn {
            width: 100%;
          }

          .elvarin .hero-signature {
            margin-top: 40px;
            font-size: 9px;
            letter-spacing: 1.3px;
          }

          .elvarin .hero-art-inner {
            min-height: 350px;
            padding: 30px;
          }

          .elvarin .hero-emblem {
            max-width: 240px;
          }

          .elvarin .hero-art-title {
            font-size: 7px;
            letter-spacing: 1px;
            gap: 5px;
          }

          .elvarin .hero-art-footer {
            font-size: 8px;
            letter-spacing: 1px;
          }

          .elvarin .trust-row {
            grid-template-columns: 1fr;
            gap: 12px;
            font-size: 10px;
          }

          .elvarin .section {
            padding: 70px 0;
          }

          .elvarin .section-title {
            font-size: clamp(35px,9vw,46px);
          }

          .elvarin .about-image-shell {
            aspect-ratio: 4 / 3.8;
          }

          .elvarin .about-image-tag {
            bottom: 40px;
            right: 0;
            padding: 17px;
            font-size: 9px;
          }

          .elvarin .pillars-grid {
            grid-template-columns: 1fr;
          }

          .elvarin .pillar-card {
            min-height: 230px;
          }

          .elvarin .philosophy-section {
            padding: 73px 0;
          }

          .elvarin .philosophy-section blockquote {
            font-size: 24px;
          }

          .elvarin .gallery-grid {
            grid-template-columns: 1fr;
          }

          .elvarin .gallery-featured {
            grid-column: auto;
          }

          .elvarin .gallery-featured .gallery-image-wrap,
          .elvarin .gallery-image-wrap {
            aspect-ratio: 1.3 / 1;
          }

          .elvarin .identity-image {
            min-height: 340px;
          }

          .elvarin .admission-panel {
            min-height: auto;
            padding: 35px 27px;
          }

          .elvarin .admission-panel h3 {
            font-size: 29px;
          }

          .elvarin .footer-top {
            grid-template-columns: 1fr;
            gap: 27px;
          }

          .elvarin .footer-bottom {
            flex-direction: column;
            margin-top: 42px;
          }

          .elvarin .footer-brand strong {
            font-size: 26px;
          }

          .elvarin .back-to-top {
            right: 16px;
            bottom: 17px;
            width: 40px;
            height: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .elvarin *,
          .elvarin *::before,
          .elvarin *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .elvarin .reveal,
          .elvarin .reveal.animate-ready {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}
