
"use client";

import { useState, type FormEvent } from "react";

type Student = Record<string, unknown>;

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  marginTop: 8,
  marginBottom: 16,
  border: "1px solid #D8C6A0",
  borderRadius: 8,
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 18px",
  border: "none",
  borderRadius: 8,
  background: "#064535",
  color: "white",
  cursor: "pointer",
};

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadStudents(accessToken: string) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase configuration missing.");
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/students?select=*&limit=100`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Could not load students (${response.status}).`
      );
    }

    const data: Student[] = await response.json();
    setStudents(data);
  }

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setToken("");
    setStudents([]);

    try {
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase configuration missing.");
      }

      const loginResponse = await fetch(
        `${supabaseUrl}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const session = await loginResponse.json();

      if (!loginResponse.ok || !session.access_token) {
        throw new Error("Invalid email or password.");
      }

      const accessToken: string = session.access_token;

      const adminResponse = await fetch(
        `${supabaseUrl}/rest/v1/rpc/is_admin`,
        {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: "{}",
        }
      );

      if (!adminResponse.ok) {
        throw new Error("Admin verification failed.");
      }

      const isAdmin = await adminResponse.json();

      if (isAdmin !== true) {
        throw new Error("Administrator access required.");
      }

      setToken(accessToken);
      setPassword("");
      setMessage("Administrator login successful.");

      try {
        await loadStudents(accessToken);
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Could not load students."
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  async function refreshStudents() {
    if (!token) return;

    setLoading(true);
    setMessage("");

    try {
      await loadStudents(token);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Refresh failed."
      );
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken("");
    setStudents([]);
    setPassword("");
    setSearch("");
    setMessage("");
  }

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FAF8F2",
        color: "#063D32",
        padding: "32px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 950, margin: "auto" }}>
        <h1>ELVARIN ACADEMY</h1>
        <p style={{ color: "#B58A40" }}>
          Administration Portal
        </p>

        {!token ? (
          <form
            onSubmit={handleLogin}
            style={cardStyle}
          >
            <h2>Administrator Login</h2>

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Checking..." : "Login"}
            </button>
          </form>
        ) : (
          <section>
            <div style={cardStyle}>
              <h2>Student Management</h2>
              <p>Welcome, Administrator</p>

              <p>
                Students loaded: <strong>{students.length}</strong>
              </p>
              <p style={{ fontSize: 13 }}>
                Showing up to 100 records.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <button
                  onClick={refreshStudents}
                  disabled={loading}
                  style={buttonStyle}
                >
                  {loading ? "Loading..." : "Refresh Students"}
                </button>

                <button
                  onClick={logout}
                  style={{
                    ...buttonStyle,
                    background: "#795548",
                  }}
                >
                  Logout
                </button>
              </div>
            </div>

            <div style={cardStyle}>
              <h3>Student Directory</h3>

              <input
                placeholder="Search loaded students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={inputStyle}
              />

              {filteredStudents.length === 0 ? (
                <p>No matching student records.</p>
              ) : (
                filteredStudents.map((student, index) => (
                  <div
                    key={String(student.id ?? index)}
                    style={{
                      padding: 16,
                      marginBottom: 12,
                      border: "1px solid #E4D9C2",
                      borderRadius: 8,
                    }}
                  >
                    <h4>Student {index + 1}</h4>

                    {Object.entries(student).map(
                      ([field, value]) => (
                        <p
                          key={field}
                          style={{
                            overflowWrap: "anywhere",
                            fontSize: 14,
                          }}
                        >
                          <strong>{field}: </strong>
                          {value === null
                            ? "—"
                            : typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                        </p>
                      )
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {message && (
          <p role="status" style={{ marginTop: 16 }}>
            {message}
          </p>
        )}

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: 20,
            color: "#064535",
          }}
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  padding: 24,
  background: "#FFFFFF",
  border: "1px solid #D8C6A0",
  borderRadius: 14,
  marginBottom: 20,
};
