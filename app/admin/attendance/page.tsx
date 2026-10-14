
"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type CSSProperties,
} from "react";

type Student = {
  id: string;
  student_id: string;
  full_name: string;
  class_name: string | null;
  section: string | null;
  roll_number: string | null;
};

type Attendance = {
  id: string;
  student_id: string;
  attendance_date: string;
  status: string;
};

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function localDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const card: CSSProperties = {
  background: "#ffffff",
  padding: 20,
  borderRadius: 16,
  border: "1px solid #decba6",
  marginBottom: 16,
};

const button: CSSProperties = {
  padding: "12px 18px",
  border: "none",
  borderRadius: 9,
  cursor: "pointer",
  fontSize: 15,
  color: "white",
  background: "#064535",
};

const input: CSSProperties = {
  width: "100%",
  padding: 12,
  border: "1px solid #d7c29b",
  borderRadius: 9,
  boxSizing: "border-box",
  marginTop: 6,
  marginBottom: 14,
  fontSize: 16,
};

export default function AttendancePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const [date, setDate] = useState(localDate);
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function headers(jwt: string) {
    if (!KEY) throw new Error("Supabase key missing.");

    return {
      apikey: KEY,
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    };
  }

  async function api(
    path: string,
    jwt: string,
    options: RequestInit = {}
  ) {
    if (!URL) throw new Error("Supabase URL missing.");

    const response = await fetch(`${URL}${path}`, {
      ...options,
      headers: {
        ...headers(jwt),
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    const text = await response.text();

    let data: any = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      throw new Error(
        typeof data === "object" && data?.message
          ? data.message
          : `Request failed: ${response.status}`
      );
    }

    return data;
  }

  async function loadStudents(jwt: string) {
    const all: Student[] = [];
    const pageSize = 500;

    for (let offset = 0; ; offset += pageSize) {
      const data = await api(
        `/rest/v1/students?select=id,student_id,full_name,class_name,section,roll_number&order=student_id.asc&limit=${pageSize}&offset=${offset}`,
        jwt
      );

      if (!Array.isArray(data)) {
        throw new Error("Invalid student data.");
      }

      all.push(...data);

      if (data.length < pageSize) break;
    }

    setStudents(all);
  }

  async function loadAttendance(jwt: string, day: string) {
    const all: Attendance[] = [];
    const pageSize = 500;

    for (let offset = 0; ; offset += pageSize) {
      const data = await api(
        `/rest/v1/attendance?select=id,student_id,attendance_date,status&attendance_date=eq.${encodeURIComponent(day)}&limit=${pageSize}&offset=${offset}`,
        jwt
      );

      if (!Array.isArray(data)) {
        throw new Error("Invalid attendance data.");
      }

      all.push(...data);

      if (data.length < pageSize) break;
    }

    setAttendance(all);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!URL || !KEY) {
        throw new Error("Supabase configuration missing.");
      }

      const session = await api(
        "/auth/v1/token?grant_type=password",
        KEY,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      if (!session?.access_token) {
        throw new Error("Invalid login.");
      }

      const jwt = session.access_token as string;

      const admin = await api(
        "/rest/v1/rpc/is_admin",
        jwt,
        {
          method: "POST",
          body: "{}",
        }
      );

      if (admin !== true) {
        throw new Error("Administrator access required.");
      }

      await Promise.all([
        loadStudents(jwt),
        loadAttendance(jwt, date),
      ]);

      setToken(jwt);
      setPassword("");
      setMessage("Attendance Dashboard ready.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function refreshDate() {
      setLoading(true);
      setMessage("");

      try {
        const data = await api(
          `/rest/v1/attendance?select=id,student_id,attendance_date,status&attendance_date=eq.${encodeURIComponent(date)}&limit=5000`,
          token
        );

        if (!cancelled) {
          setAttendance(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!cancelled) {
          setMessage(
            error instanceof Error ? error.message : "Loading failed."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    refreshDate();

    return () => {
      cancelled = true;
    };
  }, [date, token]);

  const classes = useMemo(
    () =>
      [...new Set(students.map((s) => s.class_name || ""))]
        .filter(Boolean)
        .sort(),
    [students]
  );

  const sections = useMemo(
    () =>
      [
        ...new Set(
          students
            .filter(
              (s) =>
                selectedClass === "All" ||
                s.class_name === selectedClass
            )
            .map((s) => s.section || "")
        ),
      ]
        .filter(Boolean)
        .sort(),
    [students, selectedClass]
  );

  const visible = useMemo(
    () =>
      students.filter(
        (s) =>
          (selectedClass === "All" ||
            s.class_name === selectedClass) &&
          (selectedSection === "All" ||
            s.section === selectedSection)
      ),
    [students, selectedClass, selectedSection]
  );

  const statusMap = useMemo(
    () =>
      new Map(
        attendance.map((a) => [a.student_id, a.status])
      ),
    [attendance]
  );

  const present = visible.filter(
    (s) => statusMap.get(s.id) === "present"
  ).length;

  const absent = visible.filter(
    (s) => statusMap.get(s.id) === "absent"
  ).length;

  const pending = visible.length - present - absent;

  async function mark(
    student: Student,
    status: "present" | "absent"
  ) {
    if (!token || saving[student.id] || loading) return;

    setSaving((old) => ({ ...old, [student.id]: true }));
    setErrors((old) => ({ ...old, [student.id]: "" }));
    setMessage("");

    try {
      const result = await api(
        "/rest/v1/attendance?on_conflict=student_id,attendance_date",
        token,
        {
          method: "POST",
          headers: {
            Prefer:
              "resolution=merge-duplicates,return=representation",
          },
          body: JSON.stringify({
            student_id: student.id,
            attendance_date: date,
            status,
          }),
        }
      );

      if (!Array.isArray(result) || result.length !== 1) {
        throw new Error(
          "Database did not confirm the save. Check permissions."
        );
      }

      const saved = result[0] as Attendance;

      setAttendance((old) => [
        ...old.filter(
          (a) => a.student_id !== student.id
        ),
        saved,
      ]);
    } catch (error) {
      setErrors((old) => ({
        ...old,
        [student.id]:
          error instanceof Error
            ? error.message
            : "Attendance save failed.",
      }));
    } finally {
      setSaving((old) => ({
        ...old,
        [student.id]: false,
      }));
    }
  }

  async function refresh() {
    if (!token) return;

    setLoading(true);
    setMessage("");

    try {
      await Promise.all([
        loadStudents(token),
        loadAttendance(token, date),
      ]);

      setMessage("Records refreshed.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Refresh failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#faf8f2",
        color: "#123f35",
        padding: "24px 14px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 950, margin: "auto" }}>
        <h1>ELVARIN ACADEMY</h1>
        <p style={{ color: "#a98036" }}>
          One-Click Attendance System
        </p>

        {!token ? (
          <form onSubmit={login} style={card}>
            <h2>Administrator Login</h2>

            <label>
              Email
              <input
                type="email"
                style={input}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                style={input}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button style={button} disabled={loading}>
              {loading ? "Checking..." : "Login"}
            </button>
          </form>
        ) : (
          <>
            <section style={card}>
              <h2>Daily Attendance</h2>

              <label>
                Attendance Date
                <input
                  type="date"
                  style={input}
                  value={date}
                  disabled={loading || Object.values(saving).some(Boolean)}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              <label>
                Class
                <select
                  style={input}
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setSelectedSection("All");
                  }}
                >
                  <option value="All">All Classes</option>
                  {classes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label>
                Section
                <select
                  style={input}
                  value={selectedSection}
                  onChange={(e) =>
                    setSelectedSection(e.target.value)
                  }
                >
                  <option value="All">All Sections</option>
                  {sections.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={button}
                  disabled={loading}
                  onClick={refresh}
                >
                  Refresh
                </button>

                <button
                  style={{
                    ...button,
                    background: "#765748",
                  }}
                  onClick={() => {
                    setToken("");
                    setStudents([]);
                    setAttendance([]);
                    setMessage("");
                  }}
                >
                  Logout
                </button>
              </div>
            </section>

            <section style={card}>
              <h2>Attendance Summary</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: 10,
                }}
              >
                {[
                  ["Total", visible.length],
                  ["Present", present],
                  ["Absent", absent],
                  ["Pending", pending],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      background: "#f6f2e9",
                      padding: 15,
                      borderRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        fontSize: 28,
                      }}
                    >
                      {value}
                    </strong>
                    {label}
                  </div>
                ))}
              </div>
            </section>

            <section style={card}>
              <h2>Student Attendance</h2>

              {loading && <p>Loading records...</p>}

              {!loading && visible.length === 0 && (
                <p>No students found.</p>
              )}

              {visible.map((student) => {
                const status = statusMap.get(student.id);
                const isSaving = !!saving[student.id];

                return (
                  <div
                    key={student.id}
                    style={{
                      border: "1px solid #dfd1b4",
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 12,
                    }}
                  >
                    <h3 style={{ marginTop: 0 }}>
                      {student.full_name}
                    </h3>

                    <p>
                      ID: {student.student_id}
                    </p>

                    <p>
                      Class: {student.class_name || "—"}
                      {" | "}
                      Section: {student.section || "—"}
                      {" | "}
                      Roll: {student.roll_number || "—"}
                    </p>

                    <p>
                      <strong>
                        Status:{" "}
                        {status
                          ? status.toUpperCase()
                          : "PENDING"}
                      </strong>
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                      }}
                    >
                      <button
                        disabled={isSaving || loading}
                        onClick={() =>
                          mark(student, "present")
                        }
                        style={{
                          ...button,
                          margin: 0,
                          background:
                            status === "present"
                              ? "#087543"
                              : "#79988a",
                          opacity: isSaving ? 0.6 : 1,
                        }}
                      >
                        {isSaving
                          ? "Saving..."
                          : "✓ Present"}
                      </button>

                      <button
                        disabled={isSaving || loading}
                        onClick={() =>
                          mark(student, "absent")
                        }
                        style={{
                          ...button,
                          margin: 0,
                          background:
                            status === "absent"
                              ? "#b52f36"
                              : "#bd8589",
                          opacity: isSaving ? 0.6 : 1,
                        }}
                      >
                        {isSaving
                          ? "Saving..."
                          : "✕ Absent"}
                      </button>
                    </div>

                    {errors[student.id] && (
                      <p
                        role="alert"
                        style={{ color: "#b52f36" }}
                      >
                        {errors[student.id]}
                      </p>
                    )}
                  </div>
                );
              })}
            </section>
          </>
        )}

        {message && (
          <p role="status" style={card}>
            {message}
          </p>
        )}

        <a
          href="/admin"
          style={{
            display: "inline-block",
            marginTop: 14,
            color: "#064535",
          }}
        >
          Back to Admin Dashboard
        </a>
      </div>
    </main>
  );
}
