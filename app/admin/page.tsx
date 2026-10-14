
"use client";

import { useState, type FormEvent } from "react";

type Student = Record<string, unknown>;

type StudentForm = {
  student_id: string;
  full_name: string;
  class_name: string;
  section: string;
  roll_number: string;
  admission_date: string;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const emptyForm: StudentForm = {
  student_id: "",
  full_name: "",
  class_name: "",
  section: "",
  roll_number: "",
  admission_date: new Date().toLocaleDateString("en-CA"),
};

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

const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  padding: 24,
  border: "1px solid #D8C6A0",
  borderRadius: 14,
  marginBottom: 20,
};

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<StudentForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  function headers(accessToken: string) {
    if (!key) throw new Error("Supabase key missing.");

    return {
      apikey: key,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }

  async function loadStudents(accessToken: string) {
    if (!url) throw new Error("Supabase URL missing.");

    const response = await fetch(
      `${url}/rest/v1/students?select=*&limit=100`,
      {
        headers: headers(accessToken),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Student loading failed: ${response.status}`);
    }

    const data = await response.json();
    setStudents(data);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setToken("");
    setStudents([]);

    try {
      if (!url || !key) {
        throw new Error("Supabase configuration missing.");
      }

      const response = await fetch(
        `${url}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            apikey: key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const session = await response.json();

      if (!response.ok || !session.access_token) {
        throw new Error("Invalid email or password.");
      }

      const accessToken: string = session.access_token;

      const adminResponse = await fetch(
        `${url}/rest/v1/rpc/is_admin`,
        {
          method: "POST",
          headers: headers(accessToken),
          body: "{}",
        }
      );

      if (!adminResponse.ok) {
        throw new Error("Administrator verification failed.");
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
          error instanceof Error ? error.message : "Loading failed."
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
    try {
      await loadStudents(token);
      setMessage("Student list refreshed.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Refresh failed."
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof StudentForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function addStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || !url) return;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${url}/rest/v1/students`, {
        method: "POST",
        headers: {
          ...headers(token),
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          student_id: form.student_id.trim(),
          full_name: form.full_name.trim(),
          class_name: form.class_name.trim(),
          section: form.section.trim(),
          roll_number: form.roll_number.trim(),
          admission_date: form.admission_date,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Could not save student.");
      }

      setForm(emptyForm);
      setShowForm(false);
      setSearch("");

      try {
        await loadStudents(token);
        setMessage("Student added successfully.");
      } catch {
        setMessage(
          "Student saved. Refresh the page list to see the update."
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Save failed."
      );
    } finally {
      setSaving(false);
    }
  }

  function logout() {
    setToken("");
    setStudents([]);
    setPassword("");
    setSearch("");
    setShowForm(false);
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
          <form onSubmit={handleLogin} style={cardStyle}>
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
          <>
            <section style={cardStyle}>
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
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setShowForm(!showForm)}
                  style={buttonStyle}
                >
                  {showForm ? "Close Form" : "+ Add Student"}
                </button>

                <button
                  onClick={refreshStudents}
                  disabled={loading}
                  style={buttonStyle}
                >
                  Refresh
                </button>

                <button
                  onClick={logout}
                  style={{ ...buttonStyle, background: "#795548" }}
                >
                  Logout
                </button>
              </div>
            </section>

            {showForm && (
              <section style={cardStyle}>
                <h2>Add New Student</h2>

                <form onSubmit={addStudent}>
                  <label htmlFor="student_id">Student ID</label>
                  <input
                    id="student_id"
                    required
                    maxLength={60}
                    value={form.student_id}
                    onChange={(e) =>
                      updateField("student_id", e.target.value)
                    }
                    style={inputStyle}
                    placeholder="ELV-2026-002"
                  />

                  <label htmlFor="full_name">Full Name</label>
                  <input
                    id="full_name"
                    required
                    value={form.full_name}
                    onChange={(e) =>
                      updateField("full_name", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <label htmlFor="class_name">Class</label>
                  <input
                    id="class_name"
                    required
                    value={form.class_name}
                    onChange={(e) =>
                      updateField("class_name", e.target.value)
                    }
                    style={inputStyle}
                    placeholder="Class 5"
                  />

                  <label htmlFor="section">Section</label>
                  <input
                    id="section"
                    required
                    value={form.section}
                    onChange={(e) =>
                      updateField("section", e.target.value)
                    }
                    style={inputStyle}
                    placeholder="A"
                  />

                  <label htmlFor="roll_number">Roll Number</label>
                  <input
                    id="roll_number"
                    required
                    value={form.roll_number}
                    onChange={(e) =>
                      updateField("roll_number", e.target.value)
                    }
                    style={inputStyle}
                    placeholder="02"
                  />

                  <label htmlFor="admission_date">
                    Admission Date
                  </label>
                  <input
                    id="admission_date"
                    type="date"
                    required
                    value={form.admission_date}
                    onChange={(e) =>
                      updateField("admission_date", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <button
                    type="submit"
                    disabled={saving}
                    style={buttonStyle}
                  >
                    {saving ? "Saving..." : "Save Student"}
                  </button>
                </form>
              </section>
            )}

            <section style={cardStyle}>
              <h2>Student Directory</h2>

              <input
                placeholder="Search students..."
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
                    <h3>
                      {String(student.full_name ?? `Student ${index + 1}`)}
                    </h3>

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
            </section>
          </>
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
