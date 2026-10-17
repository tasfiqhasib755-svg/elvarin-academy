
import Link from "next/link";

const pillars = [
  {
    icon: "✦",
    title: "Education",
    subtitle: "Knowledge",
    description: "Building knowledge through curiosity, understanding and purposeful learning."
  },
  {
    icon: "❀",
    title: "Life & Learning",
    subtitle: "Growth",
    description: "Encouraging continuous learning, personal development and lifelong growth."
  },
  {
    icon: "◇",
    title: "Values",
    subtitle: "Character",
    description: "Nurturing respect, compassion, responsibility and strong character."
  },
  {
    icon: "◎",
    title: "Awareness",
    subtitle: "Responsibility",
    description: "Developing thoughtful minds and an awareness of our responsibilities."
  },
  {
    icon: "✧",
    title: "Righteousness",
    subtitle: "Good Deeds",
    description: "Inspiring good conduct and the courage to do what is right."
  },
  {
    icon: "❖",
    title: "Integrity",
    subtitle: "Trust",
    description: "Building honesty, sincerity and trust through everyday actions."
  },
  {
    icon: "✳",
    title: "Najah",
    subtitle: "Meaningful Success",
    description: "Striving for meaningful success through knowledge, character and purpose."
  }
];

const learning = [
  {
    number: "01",
    title: "Purposeful Learning",
    description: "An educational approach that encourages understanding, curiosity and consistent academic growth."
  },
  {
    number: "02",
    title: "Character Development",
    description: "Integrating values, responsibility, integrity and good conduct into the learning journey."
  },
  {
    number: "03",
    title: "Lifelong Growth",
    description: "Inspiring students to develop good habits, confidence and a lasting love of learning."
  }
];

export default function HomePage() {
  return (
    <main className="elvarin">

      {/* TOP BAR */}
      <div className="top-bar">
        Education • Life & Learning • Values • Awareness • Integrity • Najah
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="container header-inner">

          <Link href="/" className="brand">
            <span className="brand-symbol">E</span>
            <span className="brand-name">
              <strong>ELVARIN</strong>
              <small>ACADEMY</small>
            </span>
          </Link>

          <nav className="navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#values">Our Values</a>
            <a href="#learning">Learning</a>
            <a href="#admission">Admission</a>
            <a href="#contact">Contact</a>
          </nav>

          <Link href="/admin" className="portal-button">
            Admin Portal ↗
          </Link>

        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="hero">
        <div className="container hero-grid">

          <div className="hero-content">

            <p className="eyebrow">
              WELCOME TO ELVARIN ACADEMY
            </p>

            <h1>
              Education Beyond
              <span> Excellence.</span>
            </h1>

            <p className="hero-description">
              A place where knowledge meets character,
              learning inspires growth, and values
              guide the journey towards a meaningful future.
            </p>

            <div className="hero-actions">
              <a href="#about" className="button-gold">
                Explore Our Academy ↗
              </a>

              <a href="#admission" className="button-outline">
                Admission Information
              </a>
            </div>

            <p className="hero-tagline">
              LEARN • GROW • ACHIEVE NAJAH
            </p>

          </div>

          <div className="hero-visual">
            <div className="visual-frame">
              <span className="visual-star">✦</span>
              <span className="visual-letter">E</span>
              <span className="visual-book">﹀</span>
            </div>
            <p>
              KNOWLEDGE • CHARACTER • PURPOSE
            </p>
          </div>

        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container trust-items">
          <span>Knowledge with Purpose</span>
          <span>Growth with Values</span>
          <span>Character with Integrity</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container about-grid">

          <div>
            <p className="section-label">
              01 / ABOUT OUR ACADEMY
            </p>

            <h2>
              A Foundation for a
              <em> Meaningful Future.</em>
            </h2>
          </div>

          <div>
            <p className="body-text">
              At ELVARIN Academy, we believe education
              goes beyond textbooks and examinations.
              Learning should nurture knowledge,
              character, awareness and a sense
              of responsibility.
            </p>

            <p className="body-text">
              Our educational philosophy is guided by
              seven interconnected principles, encouraging
              learners to develop intellectually,
              personally and ethically.
            </p>

            <a href="#values" className="text-link">
              Discover Our Guiding Principles →
            </a>
          </div>

        </div>
      </section>

      {/* SEVEN PILLARS */}
      <section id="values" className="section values-section">
        <div className="container">

          <div className="section-heading">
            <p className="section-label">
              02 / OUR GUIDING PRINCIPLES
            </p>

            <h2>
              Seven Pillars.
              <em> One Purpose.</em>
            </h2>

            <p>
              Our academy is guided by principles
              that connect learning, values,
              responsibility and meaningful success.
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title}>

                <span className="pillar-icon">
                  {pillar.icon}
                </span>

                <h3>{pillar.title}</h3>

                <strong>{pillar.subtitle}</strong>

                <p>{pillar.description}</p>

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy-section">
        <div className="container philosophy-content">

          <p className="section-label">
            OUR EDUCATIONAL PHILOSOPHY
          </p>

          <blockquote>
            “Education and Life-long Learning,
            guided by Values and Awareness,
            shaped by Righteousness and Integrity,
            leading to Najah.”
          </blockquote>

          <p>THE ELVARIN ACADEMY VISION</p>

        </div>
      </section>

      {/* LEARNING APPROACH */}
      <section id="learning" className="section">
        <div className="container">

          <div className="section-heading">

            <p className="section-label">
              03 / HOW WE APPROACH EDUCATION
            </p>

            <h2>
              Learning That Shapes
              <em> the Whole Person.</em>
            </h2>

            <p>
              We believe meaningful education
              develops both understanding and character.
            </p>

          </div>

          <div className="learning-grid">

            {learning.map((item) => (
              <article className="learning-card" key={item.number}>

                <span className="learning-number">
                  {item.number}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* ADMISSION */}
      <section id="admission" className="section admission-section">
        <div className="container admission-grid">

          <div>
            <p className="section-label">
              04 / JOIN OUR JOURNEY
            </p>

            <h2>
              Discover Your Next
              <em> Learning Journey.</em>
            </h2>

            <p className="body-text">
              Interested in becoming part of
              ELVARIN Academy?
              Explore our educational philosophy
              and stay connected for official
              academic and admission announcements.
            </p>
          </div>

          <div className="admission-card">

            <span className="admission-icon">✦</span>

            <h3>Admission Information</h3>

            <p>
              Academic programs, eligibility,
              enrollment procedures and fees
              will be published once officially confirmed.
            </p>

            <a href="#contact" className="button-gold">
              Learn More ↗
            </a>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="footer">

        <div className="container">

          <div className="footer-grid">

            <div>
              <h2>ELVARIN</h2>
              <p className="footer-academy">ACADEMY</p>

              <p>
                Education Beyond Excellence.
                Guided by knowledge, values,
                awareness, righteousness
                and integrity.
              </p>

              <p className="footer-motto">
                LEARN • GROW • ACHIEVE NAJAH
              </p>
            </div>

            <div>
              <h3>Explore</h3>

              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#values">Our Values</a>
              <a href="#learning">Learning</a>
              <a href="#admission">Admission</a>
            </div>

            <div>
              <h3>Connect</h3>

              <p>
                Official contact information
                will be added after confirmation.
              </p>

              <Link href="/admin">
                Administrator Portal ↗
              </Link>
            </div>

          </div>

          <div className="footer-bottom">

            <span>
              © {new Date().getFullYear()} ELVARIN Academy.
              All Rights Reserved.
            </span>

            <span>
              Learn • Grow • Achieve Najah
            </span>

          </div>

        </div>
      </footer>

      {/* STYLES */}
      <style>{`

        .elvarin {
          --green: #064535;
          --dark-green: #053D32;
          --gold: #C6A052;
          --ivory: #FAF8F2;
          --text: #173E34;
          background: var(--ivory);
          color: var(--text);
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        .elvarin * {
          box-sizing: border-box;
        }

        .elvarin a {
          text-decoration: none;
          color: inherit;
        }

        .container {
          width: min(1160px, 100%);
          margin: auto;
          padding: 0 22px;
        }

        .top-bar {
          background: #033A30;
          color: #D7B66F;
          text-align: center;
          padding: 11px;
          font-size: 10px;
          letter-spacing: 1.5px;
          line-height: 1.6;
        }

        .header {
          background: #FFFDF8;
          border-bottom: 1px solid #E8E2D4;
          position: sticky;
          top: 0;
          z-index: 30;
        }

        .header-inner {
          min-height: 86px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-symbol {
          width: 46px;
          height: 49px;
          border: 2px solid var(--gold);
          border-radius: 50% 50% 10% 10%;
          display: grid;
          place-items: center;
          color: var(--green);
          font: italic bold 34px Georgia, serif;
        }

        .brand-name {
          display: flex;
          flex-direction: column;
          color: var(--green);
        }

        .brand-name strong {
          font: bold 24px Georgia, serif;
          letter-spacing: 1px;
        }

        .brand-name small {
          font-size: 10px;
          letter-spacing: 5px;
          margin-top: 4px;
        }

        .navigation {
          display: flex;
          gap: 22px;
          align-items: center;
        }

        .navigation a {
          font-size: 13px;
          font-weight: 600;
        }

        .navigation a:hover {
          color: #B58A40;
        }

        .portal-button {
          border: 1px solid var(--green);
          padding: 12px 16px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
        }

        .hero {
          background:
            radial-gradient(circle at 85% 20%, #126653, transparent 40%),
            linear-gradient(120deg, #053B31, #075344);
          color: white;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 55px;
          min-height: 600px;
          padding-top: 75px;
          padding-bottom: 75px;
        }

        .eyebrow,
        .section-label {
          color: #C9A251;
          letter-spacing: 2.4px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .hero h1 {
          font: normal clamp(45px, 6vw, 84px)/1.08 Georgia, serif;
          letter-spacing: -1.5px;
          margin: 22px 0;
        }

        .hero h1 span {
          display: block;
          color: #D4B269;
          font-style: italic;
        }

        .hero-description {
          color: #E0ECE4;
          font-size: 17px;
          line-height: 1.85;
          max-width: 530px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .button-gold,
        .button-outline {
          display: inline-block;
          padding: 15px 22px;
          border-radius: 5px;
          font-size: 13px;
          font-weight: bold;
        }

        .button-gold {
          background: #D6B36A;
          color: #063D32 !important;
        }

        .button-outline {
          border: 1px solid #A6C0B3;
          color: white !important;
        }

        .hero-tagline {
          color: #D8BD80;
          font-size: 11px;
          letter-spacing: 3px;
          margin-top: 45px;
        }

        .hero-visual {
          min-height: 390px;
          border: 1px solid #739A86;
          border-radius: 210px 210px 12px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, #126B56, #063C32);
          text-align: center;
          padding: 25px;
        }

        .visual-frame {
          border: 2px solid #CBA85A;
          border-radius: 120px 120px 14px 14px;
          width: 220px;
          height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .visual-star {
          color: #D8B86D;
          font-size: 36px;
        }

        .visual-letter {
          color: #FFFFFF;
          font: italic bold 130px Georgia, serif;
          line-height: 1;
        }

        .visual-book {
          color: #D8B86D;
          font-size: 65px;
          line-height: 0.3;
        }

        .hero-visual p {
          margin-top: 28px;
          font-size: 10px;
          letter-spacing: 2px;
          color: #E7DDC2;
        }

        .trust-strip {
          background: #EFF0E7;
          border-bottom: 1px solid #DBDED1;
        }

        .trust-items {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-top: 23px;
          padding-bottom: 23px;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 1.3px;
          text-transform: uppercase;
          color: #416456;
        }

        .section {
          padding: 100px 0;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 90px;
          align-items: center;
        }

        .section h2 {
          font: normal clamp(35px, 4.5vw, 56px)/1.2 Georgia, serif;
          margin: 20px 0 25px;
          color: #073E33;
        }

        .section h2 em {
          color: #B08B43;
          font-weight: normal;
        }

        .body-text {
          color: #526B60;
          font-size: 16px;
          line-height: 1.95;
        }

        .text-link {
          display: inline-block;
          margin-top: 18px;
          font-size: 14px;
          font-weight: bold;
          color: #075744 !important;
        }

        .values-section {
          background: #F0F0E8;
        }

        .section-heading {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 45px;
        }

        .section-heading > p:last-child {
          color: #607166;
          font-size: 16px;
          line-height: 1.8;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .pillar-card {
          background: #FFFEFA;
          border: 1px solid #E4DECF;
          border-radius: 10px;
          padding: 27px 22px;
          min-height: 235px;
        }

        .pillar-icon {
          color: #B38F48;
          font-size: 36px;
        }

        .pillar-card h3 {
          font: 23px Georgia, serif;
          color: #084738;
          margin: 18px 0 7px;
        }

        .pillar-card strong {
          color: #B38F48;
          font-size: 12px;
        }

        .pillar-card p {
          color: #66756A;
          font-size: 13px;
          line-height: 1.75;
        }

        .philosophy-section {
          background: #063D32;
          color: white;
          text-align: center;
          padding: 85px 0;
        }

        .philosophy-content {
          max-width: 950px;
        }

        .philosophy-section blockquote {
          font: italic clamp(22px, 3vw, 37px)/1.65 Georgia, serif;
          color: #F4EEE2;
          margin: 30px 0;
        }

        .philosophy-content > p:last-child {
          color: #D8B86D;
          font-size: 11px;
          letter-spacing: 2px;
        }

        .learning-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .learning-card {
          background: white;
          border-top: 3px solid #C6A052;
          padding: 35px 28px;
          box-shadow: 0 10px 32px rgba(0,0,0,0.04);
        }

        .learning-number {
          font: 36px Georgia, serif;
          color: #C6A052;
        }

        .learning-card h3 {
          font: 25px Georgia, serif;
          color: #073E33;
        }

        .learning-card p {
          color: #617369;
          font-size: 14px;
          line-height: 1.85;
        }

        .admission-section {
          background: #E8ECE4;
        }

        .admission-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          gap: 65px;
        }

        .admission-card {
          padding: 38px;
          background: #063D32;
          color: white;
          border-radius: 9px;
        }

        .admission-icon {
          color: #D6B36A;
          font-size: 40px;
        }

        .admission-card h3 {
          font: 29px Georgia, serif;
        }

        .admission-card p {
          color: #DCE8E0;
          font-size: 14px;
          line-height: 1.9;
          margin-bottom: 30px;
        }

        .footer {
          background: #052F28;
          color: white;
          padding: 65px 0 25px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.3fr;
          gap: 55px;
        }

        .footer-grid h2 {
          font: 32px Georgia, serif;
          margin: 0;
        }

        .footer-academy {
          letter-spacing: 5px;
          font-size: 12px;
          color: #D6B36A !important;
        }

        .footer-grid h3 {
          color: #D6B36A;
          font-size: 14px;
        }

        .footer-grid p {
          color: #C8D8CF;
          font-size: 14px;
          line-height: 1.8;
        }

        .footer-grid a {
          display: block;
          margin: 14px 0;
          font-size: 13px;
          color: #E4ECE6;
        }

        .footer-motto {
          color: #D6B36A !important;
          letter-spacing: 1px;
          font-size: 11px !important;
        }

        .footer-bottom {
          border-top: 1px solid #476D5E;
          margin-top: 55px;
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          font-size: 11px;
          color: #C3D2C8;
        }

        html {
          scroll-behavior: smooth;
        }

        .elvarin section[id],
        .elvarin footer[id] {
          scroll-margin-top: 110px;
        }

        @media (max-width: 1050px) {
          .navigation {
            gap: 12px;
          }

          .navigation a {
            font-size: 12px;
          }

          .about-grid {
            gap: 45px;
          }
        }

        @media (max-width: 800px) {
          .header-inner {
            flex-wrap: wrap;
            padding-top: 14px;
            padding-bottom: 14px;
          }

          .navigation {
            order: 3;
            width: 100%;
            overflow-x: auto;
            gap: 20px;
            padding: 12px 0;
            white-space: nowrap;
          }

          .hero-grid,
          .about-grid,
          .admission-grid {
            grid-template-columns: 1fr;
          }

          .hero-grid {
            padding-top: 60px;
          }

          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .learning-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }

          .section {
            padding: 75px 0;
          }

          .trust-items {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 520px) {
          .container {
            padding: 0 18px;
          }

          .top-bar {
            font-size: 8px;
          }

          .brand-symbol {
            width: 36px;
            height: 40px;
            font-size: 27px;
          }

          .brand-name strong {
            font-size: 19px;
          }

          .brand-name small {
            font-size: 8px;
            letter-spacing: 4px;
          }

          .portal-button {
            padding: 10px;
            font-size: 10px;
          }

          .hero h1 {
            font-size: 49px;
          }

          .hero-grid {
            gap: 42px;
            padding-top: 50px;
            padding-bottom: 55px;
          }

          .hero-visual {
            min-height: 320px;
          }

          .trust-items {
            font-size: 10px;
            text-align: center;
          }

          .pillars-grid {
            grid-template-columns: 1fr;
          }

          .section h2 {
            font-size: 37px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
          }

          .admission-card {
            padding: 27px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-actions a {
            text-align: center;
          }
        }

      `}</style>

    </main>
  );
}
