const features = [
  { title: "Student Attendance", description: "Smart attendance tracking for every student." },
  { title: "Homework & Learning", description: "Assignments, lessons and continuous learning." },
  { title: "Examinations", description: "Exams, results and academic assessments." },
  { title: "Academic Progress", description: "Track growth and celebrate achievements." },
  { title: "Guardian Communication", description: "Connecting parents, teachers and students." },
  { title: "Character Development", description: "Building values, integrity and responsibility." },
];

const pillars = [
  "Education", "Life & Learning", "Values", "Awareness",
  "Righteousness", "Integrity", "Najah",
];

export default function Home() {
  return (
    <main style={{ margin: 0, minHeight: "100vh", background: "#FAF8F2", color: "#063D32", fontFamily: "Georgia, serif" }}>
      {/* HEADER */}
      <header style={{ background: "#064535", color: "white", padding: "24px 6%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontSize: 27, fontWeight: "bold", letterSpacing: 3 }}>
            <span style={{ color: "#D4AF62" }}>✦ </span>ELVARIN
          </div>
          <div style={{ fontSize: 11, letterSpacing: 5, textAlign: "center" }}>ACADEMY</div>
        </div>
        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap", fontFamily: "Arial, sans-serif", fontSize: 14 }}>
          {[
            ["Home", "#home"], ["About", "#about"], ["Programs", "#programs"],
            ["Values", "#values"], ["Admin Login", "/admin"], ["Guardian Login", "/guardian"],
          ].map(([name, href]) => (
            <a key={name} href={href} style={{ color: "white", textDecoration: "none" }}>{name}</a>
          ))}
        </nav>
      </header>
      {/* HERO SECTION */}
      <section id="home" style={{ background: "linear-gradient(135deg, #032D25, #075843)", color: "white", textAlign: "center", padding: "110px 7%" }}>
        <p style={{ color: "#D4AF62", letterSpacing: 4, fontSize: 13 }}>WELCOME TO ELVARIN ACADEMY</p>
        <div style={{ fontSize: 60, color: "#D4AF62", margin: "20px 0" }}>✧</div>
        <h1 style={{ fontSize: "clamp(38px, 7vw, 72px)", lineHeight: 1.15, maxWidth: 900, margin: "20px auto" }}>
          Education Beyond<br /><span style={{ color: "#D4AF62" }}>Excellence</span>
        </h1>
        <p style={{ maxWidth: 750, margin: "30px auto", fontSize: 18, lineHeight: 1.9, color: "#E8EDE9" }}>
          Education and Life-long Learning, guided by Values and Awareness,
          shaped by Righteousness and Integrity, leading to Najah.
        </p>
        <p style={{ color: "#D4AF62", letterSpacing: 2, fontSize: 13 }}>LEARN • GROW • DO GOOD • ACHIEVE NAJAH</p>
        <a href="#programs" style={{ display: "inline-block", marginTop: 30, background: "#D4AF62", color: "#063D32", padding: "17px 35px", borderRadius: 6, fontWeight: "bold", fontFamily: "Arial, sans-serif", textDecoration: "none" }}>Explore Our Academy →</a>
      </section>
      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 7%", textAlign: "center" }}>
        <p style={{ color: "#B58A40", letterSpacing: 3 }}>WHO WE ARE</p>
        <h2 style={{ fontSize: "clamp(30px, 5vw, 44px)" }}>Learning With Purpose</h2>
        <div style={{ width: 80, height: 2, background: "#D4AF62", margin: "25px auto" }} />
        <p style={{ maxWidth: 800, margin: "auto", fontSize: 18, lineHeight: 1.9 }}>
          At ELVARIN Academy, we believe education is more than examination results.
          Our mission is to nurture knowledge, character, responsibility and lifelong
          learning, helping every student grow with purpose.
        </p>
      </section>
      {/* DIGITAL LEARNING */}
      <section id="programs" style={{ padding: "90px 7%", background: "#F0EEE5" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#B58A40", letterSpacing: 3 }}>DISCOVER ELVARIN</p>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 44px)", marginBottom: 50 }}>Our Digital Learning System</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, maxWidth: 1200, margin: "auto" }}>
          {features.map((feature, index) => (
            <article key={feature.title} style={{ background: "white", padding: 32, borderRadius: 12, borderTop: "4px solid #D4AF62", boxShadow: "0 8px 25px rgba(0,0,0,0.05)" }}>
              <div style={{ color: "#B58A40", fontSize: 32 }}>{String(index + 1).padStart(2, "0")}</div>
              <h3 style={{ fontSize: 23 }}>{feature.title}</h3>
              <p style={{ color: "#52675D", lineHeight: 1.8, fontFamily: "Arial, sans-serif" }}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
      {/* SEVEN PILLARS */}
      <section id="values" style={{ padding: "90px 7%", textAlign: "center" }}>
        <p style={{ color: "#B58A40", letterSpacing: 3 }}>OUR FOUNDATION</p>
        <h2 style={{ fontSize: "clamp(30px, 5vw, 44px)" }}>Seven Guiding Pillars</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18, maxWidth: 1000, margin: "45px auto" }}>
          {pillars.map((pillar, index) => (
            <div key={pillar} style={{ background: "#FFFDF8", border: "1px solid #D8C6A0", padding: "25px 20px", borderRadius: 10, minWidth: 150 }}>
              <div style={{ color: "#B9944D", fontSize: 25, marginBottom: 12 }}>✦ {index + 1}</div>
              <strong>{pillar}</strong>
            </div>
          ))}
        </div>
      </section>
      {/* FINAL MESSAGE */}
      <section style={{ background: "#064535", color: "white", textAlign: "center", padding: "85px 7%" }}>
        <h2 style={{ color: "#E1C17A", fontSize: "clamp(30px, 5vw, 44px)" }}>Learn. Grow. Achieve Najah.</h2>
        <p style={{ fontSize: 18, lineHeight: 1.8 }}>Same Values. Different Paths.<br />One Destination — Najah.</p>
      </section>
      {/* FOOTER */}
      <footer style={{ background: "#032C24", color: "white", padding: "50px 7%", textAlign: "center" }}>
        <h3 style={{ letterSpacing: 4 }}>ELVARIN ACADEMY</h3>
        <p style={{ color: "#D4AF62", lineHeight: 1.8 }}>
          Education • Life & Learning • Values<br />Awareness • Righteousness • Integrity • Najah
        </p>
        <small>© {new Date().getFullYear()} ELVARIN Academy. All Rights Reserved.</small>
      </footer>
    </main>
  );
}
