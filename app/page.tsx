
export default function Home() {
  const features = [
    "Student Attendance",
    "Homework Tracking",
    "Examination Results",
    "Academic Progress",
    "Guardian Communication",
    "Character Development"
  ];

  return (
    <main style={{
      fontFamily: "Arial, sans-serif",
      margin: 0,
      background: "#f8fafc",
      color: "#0b1f3a",
      minHeight: "100vh"
    }}>
      <header style={{
        background: "#0b1f3a",
        color: "white",
        padding: "22px",
        textAlign: "center"
      }}>
        <h1 style={{ margin: 0 }}>ELVARIN</h1>
        <p>ACADEMY</p>
      </header>

      <section style={{
        textAlign: "center",
        padding: "75px 20px",
        background: "#0b1f3a",
        color: "white"
      }}>
        <h1 style={{ fontSize: "38px" }}>
          Education Beyond Excellence
        </h1>
        <p style={{ lineHeight: 1.8 }}>
          Education • Life & Learning • Values •
          Awareness • Righteousness • Integrity • Najah
        </p>
        <h2 style={{ color: "#d4af37" }}>
          Learn. Grow. Succeed.
        </h2>
      </section>

      <section style={{
        padding: "45px 20px",
        textAlign: "center"
      }}>
        <h2>Welcome to ELVARIN Academy</h2>
        <p>
          We believe education is more than examination
          results. Our mission is to develop knowledge,
          values, responsibility and character.
        </p>
      </section>

      <section style={{
        padding: "30px 20px",
        maxWidth: "900px",
        margin: "auto"
      }}>
        <h2 style={{ textAlign: "center" }}>
          Our Digital Learning System
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}>
          {features.map((feature) => (
            <div key={feature} style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 3px 12px #00000012",
              textAlign: "center",
              fontWeight: "bold"
            }}>
              {feature}
            </div>
          ))}
        </div>
      </section>

      <footer style={{
        background: "#0b1f3a",
        color: "white",
        padding: "25px",
        textAlign: "center",
        marginTop: "40px"
      }}>
        ELVARIN Academy © 2026
      </footer>
    </main>
  );
}
