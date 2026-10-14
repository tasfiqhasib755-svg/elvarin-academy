
"use client";

import {
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

type ReportRow = {
  student: Student;
  present: number;
  absent: number;
  late: number;
  excused: number;
  marked: number;
  percentage: number;
};

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function currentMonth() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0")
  );
}

const box: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #decba6",
  borderRadius: 15,
  padding: 20,
  marginBottom: 18,
};

const input: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: 12,
  marginTop: 7,
  marginBottom: 15,
  borderRadius: 9,
  border: "1px solid #d5c29c",
  fontSize: 16,
};

const button: CSSProperties = {
  padding: "12px 16px",
  background: "#064535",
  color: "white",
  border: "none",
  borderRadius: 9,
  cursor: "pointer",
  marginRight: 8,
  marginBottom: 8,
};

export default function MonthlyAttendanceReport() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [month, setMonth] = useState(currentMonth);
  const [className, setClassName] = useState("All");
  const [section, setSection] = useState("All");

  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [reportReady, setReportReady] = useState(false);

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
    let data: unknown = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      const errorMessage =
        data &&
        typeof data === "object" &&
        "message" in data
          ? String(data.message)
          : `Request failed: ${response.status}`;

      throw new Error(errorMessage);
    }

    return data;
  }

  async function loadAll<T>(
    table: string,
    select: string,
    jwt: string,
    filters = ""
  ): Promise<T[]> {
    const all: T[] = [];
    const size = 500;

    for (let offset = 0; ; offset += size) {
      const data = await api(
        `/rest/v1/${table}?select=${select}${filters}` +
          `&limit=${size}&offset=${offset}`,
        jwt
      );

      if (!Array.isArray(data)) {
        throw new Error(`Invalid data from ${table}.`);
      }

      all.push(...(data as T[]));

      if (data.length < size) break;
    }

    return all;
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const session = (await api(
        "/auth/v1/token?grant_type=password",
        KEY || "",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      )) as { access_token?: string };

      if (!session?.access_token) {
        throw new Error("Invalid email or password.");
      }

      const jwt = session.access_token;

      const isAdmin = await api(
        "/rest/v1/rpc/is_admin",
        jwt,
        {
          method: "POST",
          body: "{}",
        }
      );

      if (isAdmin !== true) {
        throw new Error("Administrator access required.");
      }

      const loadedStudents = await loadAll<Student>(
        "students",
        "id,student_id,full_name,class_name,section,roll_number",
        jwt,
        "&order=id.asc"
      );

      setStudents(loadedStudents);
      setToken(jwt);
      setPassword("");
      setMessage("Login successful. Generate your report.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  async function generateReport() {
    if (!token) return;

    setLoading(true);
    setMessage("");
    setReportReady(false);

    try {
      if (!/^\d{4}-\d{2}$/.test(month)) {
        throw new Error("Select a valid month.");
      }

      const [year, m] = month.split("-").map(Number);

      if (m < 1 || m > 12) {
        throw new Error("Invalid month.");
      }

      const start = `${month}-01`;

      const next =
        m === 12
          ? `${year + 1}-01-01`
          : `${year}-${String(m + 1).padStart(2, "0")}-01`;

      const records = await loadAll<Attendance>(
        "attendance",
        "id,student_id,attendance_date,status",
        token,
        `&attendance_date=gte.${start}` +
          `&attendance_date=lt.${next}` +
          "&order=id.asc"
      );

      setAttendance(records);
      setReportReady(true);

      setMessage(
        `Report generated. ${records.length} attendance records found.`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Report generation failed."
      );
    } finally {
      setLoading(false);
    }
  }

  const classes = Array.from(
    new Set(
      students.map((s) => s.class_name).filter(
        (v): v is string => !!v
      )
    )
  ).sort();

  const sections = Array.from(
    new Set(
      students
        .filter(
          (s) =>
            className === "All" ||
            s.class_name === className
        )
        .map((s) => s.section)
        .filter((v): v is string => !!v)
    )
  ).sort();

  const visibleStudents = students.filter(
    (s) =>
      (className === "All" ||
        s.class_name === className) &&
      (section === "All" || s.section === section)
  );

  const report: ReportRow[] = visibleStudents.map(
    (student) => {
      const records = attendance.filter(
        (a) => a.student_id === student.id
      );

      const present = records.filter(
        (a) => a.status === "present"
      ).length;

      const absent = records.filter(
        (a) => a.status === "absent"
      ).length;

      const late = records.filter(
        (a) => a.status === "late"
      ).length;

      const excused = records.filter(
        (a) => a.status === "excused"
      ).length;

      const marked =
        present + absent + late + excused;

      const percentage =
        marked > 0
          ? (present / marked) * 100
          : 0;

      return {
        student,
        present,
        absent,
        late,
        excused,
        marked,
        percentage,
      };
    }
  );

  const totalPresent = report.reduce(
    (sum, r) => sum + r.present,
    0
  );

  const totalAbsent = report.reduce(
    (sum, r) => sum + r.absent,
    0
  );

  const totalMarked = report.reduce(
    (sum, r) => sum + r.marked,
    0
  );

  const overallPercentage =
    totalMarked > 0
      ? ((totalPresent / totalMarked) * 100).toFixed(1)
      : "0.0";

  function downloadCSV() {
    if (!reportReady) return;

    const escapeCSV = (value: string | number) => {
      const text = String(value);

      // Prevent spreadsheet formula injection.
      const safe = /^[\s]*[=+\-@]/.test(text)
        ? "'" + text
        : text;

      return `"${safe.replace(/"/g, '""')}"`;
    };

    const headings = [
      "Student ID",
      "Student Name",
      "Class",
      "Section",
      "Roll",
      "Present",
      "Absent",
      "Late",
      "Excused",
      "Marked Days",
      "Present Percentage",
    ];

    const csv = [
      headings.map(escapeCSV).join(","),
      ...report.map((r) =>
        [
          r.student.student_id,
          r.student.full_name,
          r.student.class_name || "",
          r.student.section || "",
          r.student.roll_number || "",
          r.present,
          r.absent,
          r.late,
          r.excused,
          r.marked,
          r.percentage.toFixed(1) + "%",
        ]
          .map(escapeCSV)
          .join(",")
      ),
    ].join("\r\n");

    const blob = new Blob(
      ["\uFEFF" + csv],
      { type: "text/csv;charset=utf-8;" }
    );

    const downloadUrl = URLCreator(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `ELVARIN_Attendance_${month}.csv`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.setTimeout(
      () => URL.revokeObjectURL(downloadUrl),
      1000
    );
  }

  function URLCreator(blob: Blob) {
    return window.URL.createObjectURL(blob);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#faf8f2",
        padding: "25px 14px",
        color: "#123f35",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "auto" }}>
        <h1>ELVARIN ACADEMY</h1>

        <p style={{ color: "#a98036" }}>
          Monthly Attendance Report
        </p>

        {!token ? (
          <form onSubmit={login} style={box}>
            <h2>Administrator Login</h2>

            <label>
              Email
              <input
                type="email"
                style={input}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                style={input}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button style={button} disabled={loading}>
              {loading ? "Checking..." : "Login"}
            </button>
          </form>
        ) : (
          <>
            <section style={box}>
              <h2>Report Settings</h2>

              <label>
                Select Month
                <input
                  type="month"
                  value={month}
                  style={input}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    setReportReady(false);
                  }}
                />
              </label>

              <label>
                Class
                <select
                  style={input}
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value);
                    setSection("All");
                  }}
                >
                  <option value="All">All Classes</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Section
                <select
                  style={input}
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="All">All Sections</option>
                  {sections.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <button
                style={button}
                disabled={loading}
                onClick={generateReport}
              >
                {loading ? "Generating..." : "Generate Report"}
              </button>

              {reportReady && (
                <button
                  style={{
                    ...button,
                    background: "#ad853a",
                  }}
                  onClick={downloadCSV}
                >
                  Download CSV
                </button>
              )}
            </section>

            {reportReady && (
              <>
                <section style={box}>
                  <h2>Monthly Summary</h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",
                      gap: 12,
                    }}
                  >
                    {[
                      ["Students", report.length],
                      ["Present", totalPresent],
                      ["Absent", totalAbsent],
                      ["Marked Days", totalMarked],
                      ["Present Rate", overallPercentage + "%"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          background: "#f4f1e8",
                          padding: 16,
                          borderRadius: 10,
                          textAlign: "center",
                        }}
                      >
                        <strong
                          style={{
                            fontSize: 24,
                            display: "block",
                          }}
                        >
                          {value}
                        </strong>
                        {label}
                      </div>
                    ))}
                  </div>
                </section>

                <section style={box}>
                  <h2>Student Attendance Report</h2>

                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: 650,
                        textAlign: "left",
                      }}
                    >
                      <thead>
                        <tr>
                          {[
                            "Student",
                            "Class",
                            "Roll",
                            "Present",
                            "Absent",
                            "Late",
                            "Excused",
                            "Marked",
                            "Rate",
                          ].map((h) => (
                            <th
                              key={h}
                              style={{
                                padding: 10,
                                borderBottom:
                                  "2px solid #d3bf97",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {report.map((r) => (
                          <tr key={r.student.id}>
                            <td
                              style={{
                                padding: 10,
                                borderBottom:
                                  "1px solid #e8dfcc",
                              }}
                            >
                              <strong>
                                {r.student.full_name}
                              </strong>
                              <div style={{ fontSize: 12 }}>
                                {r.student.student_id}
                              </div>
                            </td>
                            <td>{r.student.class_name}</td>
                            <td>{r.student.roll_number}</td>
                            <td>{r.present}</td>
                            <td>{r.absent}</td>
                            <td>{r.late}</td>
                            <td>{r.excused}</td>
                            <td>{r.marked}</td>
                            <td>
                              {r.marked === 0
                                ? "N/A"
                                : r.percentage.toFixed(1) + "%"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {report.length === 0 && (
                    <p>No students found.</p>
                  )}
                </section>
              </>
            )}

            <button
              style={{
                ...button,
                background: "#785a4a",
              }}
              onClick={() => {
                setToken("");
                setStudents([]);
                setAttendance([]);
                setReportReady(false);
                setMessage("");
              }}
            >
              Logout
            </button>
          </>
        )}

        {message && (
          <div role="status" style={box}>
            {message}
          </div>
        )}

        <p style={{ fontSize: 13 }}>
          Attendance percentage is calculated from marked
          records only, not total school working days.
          Unmarked days are excluded.
        </p>

        <a
          href="/admin/attendance"
          style={{ color: "#064535" }}
        >
          Back to Daily Attendance
        </a>
      </div>
    </main>
  );
}
