
"use client";

import { useState, type CSSProperties, type FormEvent } from "react";

type RecordRow = Record<string, unknown>;
type Tab = "students" | "attendance" | "fees" | "exams" | "results" | "guardians";
type Fields = Record<string, string>;

const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TODAY = new Date().toLocaleDateString("en-CA");

const TABS: { id: Tab; title: string }[] = [
  { id: "students", title: "Students" },
  { id: "attendance", title: "Attendance" },
  { id: "fees", title: "Fees" },
  { id: "exams", title: "Exams" },
  { id: "results", title: "Results" },
  { id: "guardians", title: "Guardians" },
];

const initial: Record<Tab, Fields> = {
  students: {
    student_id: "",
    full_name: "",
    class_name: "",
    section: "",
    roll_number: "",
    admission_date: TODAY,
  },
  attendance: {
    student_id: "",
    attendance_date: TODAY,
    status: "present",
    remarks: "",
  },
  fees: {
    student_id: "",
    title: "Monthly tuition",
    amount: "",
    amount_paid: "0",
    due_date: TODAY,
  },
  exams: {
    title: "",
    class_name: "",
    subject: "",
    exam_date: TODAY,
    total_marks: "100",
  },
  results: {
    exam_id: "",
    student_id: "",
    marks_obtained: "",
    remarks: "",
  },
  guardians: {
    guardian_id: "",
    student_id: "",
    relationship: "Parent",
  },
};

const card: CSSProperties = {
  background: "#fff",
  border: "1px solid #dfccaa",
  borderRadius: 15,
  padding: 20,
  marginBottom: 16,
};

const input: CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: 11,
  borderRadius: 8,
  border: "1px solid #cbb88d",
  marginTop: 6,
  marginBottom: 14,
  fontSize: 16,
};

const button: CSSProperties = {
  background: "#064535",
  color: "white",
  border: 0,
  borderRadius: 8,
  padding: "11px 15px",
  cursor: "pointer",
  marginRight: 8,
  marginBottom: 8,
};

function labelFor(k: string) {
  return k
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function str(v: unknown): string {
  return v == null ? "" : String(v);
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tab, setTab] = useState<Tab>("students");
  const [rows, setRows] = useState<
    Record<Tab, RecordRow[]>
  >({
    students: [],
    attendance: [],
    fees: [],
    exams: [],
    results: [],
    guardians: [],
  });

  const [draft, setDraft] = useState<Fields>({
    ...initial.students,
  });
  const [editingId, setEditingId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  function authHeaders(jwt: string): Record<string, string> {
    if (!API_KEY) {
      throw new Error("Supabase anon key missing.");
    }
    return {
      apikey: API_KEY,
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    };
  }

  async function request(
    path: string,
    jwt: string,
    options: RequestInit = {}
  ) {
    if (!BASE) {
      throw new Error("Supabase URL missing.");
    }

    const response = await fetch(`${BASE}${path}`, {
      ...options,
      headers: {
        ...authHeaders(jwt),
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const detail: { message?: string } =
        await response.json().catch(() => ({}));
      throw new Error(
        detail.message || `Request failed (${response.status})`
      );
    }

    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  function tableName(which: Tab) {
    if (which === "results") return "exam_results";
    if (which === "guardians") return "guardian_students";
    return which;
  }

  async function readTab(which: Tab, jwt: string) {
    const data = await request(
      `/rest/v1/${tableName(which)}?select=*&order=created_at.desc&limit=500`,
      jwt
    );

    setRows((old) => ({
      ...old,
      [which]: Array.isArray(data) ? data : [],
    }));
  }

  async function readAll(jwt: string) {
    const fetched = await Promise.allSettled(
      TABS.map(({ id }) => readTab(id, jwt))
    );

    const issues = fetched.flatMap((r, i) =>
      r.status === "rejected"
        ? [
            `${TABS[i].title}: ${
              r.reason instanceof Error
                ? r.reason.message
                : "Load failed"
            }`,
          ]
        : []
    );

    if (issues.length) {
      setMessage(`Some modules could not load. ${issues.join(" | ")}`);
    }
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const session = await request(
        "/auth/v1/token?grant_type=password",
        API_KEY || "",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      if (!session?.access_token) {
        throw new Error("Login failed.");
      }

      const jwt: string = session.access_token;

      const admin = await request(
        "/rest/v1/rpc/is_admin",
        jwt,
        { method: "POST", body: "{}" }
      );

      if (admin !== true) {
        throw new Error("Administrator access required.");
      }

      setToken(jwt);
      setPassword("");
      setMessage("Admin login successful.");

      await readAll(jwt);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Login failed."
      );
    } finally {
      setBusy(false);
    }
  }

  function chooseTab(next: Tab) {
    setTab(next);
    setShowForm(false);
    setEditingId("");
    setDraft({ ...initial[next] });
    setSearch("");
    setPage(1);
    setMessage("");
  }

  function editRow(row: RecordRow) {
    setEditingId(str(row.id));
    setDraft(
      Object.fromEntries(
        Object.keys(initial[tab]).map((key) => [
          key,
          str(row[key]),
        ])
      )
    );
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function payload(): Record<string, string | number | null> {
    const data: Record<string, string | number | null> = {};

    for (const [k, v] of Object.entries(draft)) {
      if (
        [
          "amount",
          "amount_paid",
          "total_marks",
          "marks_obtained",
        ].includes(k)
      ) {
        data[k] = Number(v);
      } else if (
        [
          "due_date",
          "exam_date",
          "remarks",
          "section",
          "roll_number",
          "class_name",
        ].includes(k) &&
        !v.trim()
      ) {
        data[k] = null;
      } else {
        data[k] = v.trim();
      }
    }

    return data;
  }

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;

    setBusy(true);
    setMessage("");

    try {
      if (tab === "results") {
        const exam = rows.exams.find(
          (x) => str(x.id) === draft.exam_id
        );

        if (
          exam &&
          Number(draft.marks_obtained) >
            Number(exam.total_marks)
        ) {
          throw new Error(
            "Marks cannot exceed exam total marks."
          );
        }
      }

      const suffix = editingId
        ? `?id=eq.${encodeURIComponent(editingId)}`
        : "";

      await request(
        `/rest/v1/${tableName(tab)}${suffix}`,
        token,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify(payload()),
        }
      );

      setMessage(
        editingId
          ? "Record updated successfully."
          : "Record added successfully."
      );

      setEditingId("");
      setDraft({ ...initial[tab] });
      setShowForm(false);

      await readTab(tab, token);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Save failed."
      );
    } finally {
      setBusy(false);
    }
  }

  async function remove(row: RecordRow) {
    if (!token) return;

    const name = str(
      row.full_name || row.title || row.student_id || row.id
    );

    if (
      !window.confirm(
        `Delete ${name}? This cannot be undone.`
      )
    ) {
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      await request(
        `/rest/v1/${tableName(tab)}?id=eq.${encodeURIComponent(
          str(row.id)
        )}`,
        token,
        {
          method: "DELETE",
          headers: { Prefer: "return=minimal" },
        }
      );

      setMessage("Record deleted.");
      await readTab(tab, token);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Delete failed."
      );
    } finally {
      setBusy(false);
    }
  }

  function optionText(row: RecordRow, field: string) {
    if (field === "exam_id") {
      return `${str(row.title)} — ${str(row.subject)} (${str(
        row.class_name
      )})`;
    }

    return `${str(row.full_name)} — ${str(
      row.student_id
    )} (${str(row.class_name)})`;
  }

  const filtered = rows[tab].filter((row) =>
    Object.values(row).some((v) =>
      str(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const pages = Math.max(
    1,
    Math.ceil(filtered.length / 10)
  );

  const current = Math.min(page, pages);
  const visible = filtered.slice(
    (current - 1) * 10,
    current * 10
  );

  return (
    <main
      style={{
        background: "#faf8f2",
        color: "#123f35",
        minHeight: "100vh",
        padding: "30px 14px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1050, margin: "auto" }}>
        <h1 style={{ marginBottom: 4, letterSpacing: 1 }}>
          ELVARIN ACADEMY
        </h1>

        <p style={{ color: "#a98036", marginTop: 5 }}>
          Administration Portal
        </p>

        {!token ? (
          <form onSubmit={login} style={card}>
            <h2>Administrator Login</h2>

            <label>
              Email
              <input
                style={input}
                required
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </label>

            <label>
              Password
              <input
                style={input}
                required
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </label>

            <button style={button} disabled={busy}>
              {busy ? "Checking..." : "Login"}
            </button>
          </form>
        ) : (
          <>
            <section style={card}>
              <h2 style={{ marginTop: 0 }}>
                Management Dashboard
              </h2>

              <p>
                Students: <strong>{rows.students.length}</strong>
                {" · "}
                Attendance records:{" "}
                <strong>{rows.attendance.length}</strong>
                {" · "}
                Fees: <strong>{rows.fees.length}</strong>
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => chooseTab(t.id)}
                    style={{
                      ...button,
                      background:
                        tab === t.id
                          ? "#064535"
                          : "#63796e",
                    }}
                  >
                    {t.title}
                  </button>
                ))}
              </div>

              <button
                style={{
                  ...button,
                  background: "#775848",
                }}
                onClick={() => {
                  setToken("");
                  setRows({
                    students: [],
                    attendance: [],
                    fees: [],
                    exams: [],
                    results: [],
                    guardians: [],
                  });
                  setMessage("");
                }}
              >
                Logout
              </button>

              <button
                style={button}
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  try {
                    await readAll(token);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Refresh All
              </button>
            </section>

            <section style={card}>
              <h2>
                {TABS.find((x) => x.id === tab)?.title} Management
              </h2>

              {tab === "guardians" && (
                <p style={{ color: "#825519" }}>
                  Guardian accounts must exist in Supabase Auth.
                  Enter their Auth User UUID. Linking
                  permissions depend on guardian_students
                  RLS policies.
                </p>
              )}

              <button
                style={button}
                onClick={() => {
                  setEditingId("");
                  setDraft({ ...initial[tab] });
                  setShowForm(!showForm);
                }}
              >
                {showForm
                  ? "Close Form"
                  : `+ Add ${
                      tab === "results"
                        ? "Result"
                        : tab === "guardians"
                          ? "Guardian Link"
                          : tab === "attendance"
                            ? "Attendance"
                            : tab === "fees"
                              ? "Fee"
                              : tab === "exams"
                                ? "Exam"
                                : "Student"
                    }`}
              </button>

              {showForm && (
                <form
                  onSubmit={save}
                  style={{
                    marginTop: 12,
                    borderTop: "1px solid #ddd",
                    paddingTop: 14,
                  }}
                >
                  <h3>
                    {editingId ? "Edit" : "Add"} Record
                  </h3>

                  {Object.entries(draft).map(
                    ([field, value]) => (
                      <label
                        key={field}
                        style={{ display: "block" }}
                      >
                        {labelFor(field)}

                        {field === "student_id" &&
                        tab !== "students" ? (
                          <select
                            style={input}
                            required
                            value={value}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                [field]: e.target.value,
                              })
                            }
                          >
                            <option value="">
                              Select student
                            </option>
                            {rows.students.map((s) => (
                              <option
                                key={str(s.id)}
                                value={str(s.id)}
                              >
                                {optionText(s, field)}
                              </option>
                            ))}
                          </select>
                        ) : field === "exam_id" ? (
                          <select
                            style={input}
                            required
                            value={value}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                [field]: e.target.value,
                              })
                            }
                          >
                            <option value="">
                              Select exam
                            </option>
                            {rows.exams.map((x) => (
                              <option
                                key={str(x.id)}
                                value={str(x.id)}
                              >
                                {optionText(x, field)}
                              </option>
                            ))}
                          </select>
                        ) : field === "status" ? (
                          <select
                            style={input}
                            value={value}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                [field]: e.target.value,
                              })
                            }
                          >
                            {[
                              "present",
                              "absent",
                              "late",
                              "excused",
                            ].map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            style={input}
                            type={
                              field.includes("date")
                                ? "date"
                                : [
                                      "amount",
                                      "amount_paid",
                                      "total_marks",
                                      "marks_obtained",
                                    ].includes(field)
                                  ? "number"
                                  : "text"
                            }
                            step={
                              [
                                "amount",
                                "amount_paid",
                                "total_marks",
                                "marks_obtained",
                              ].includes(field)
                                ? "0.01"
                                : undefined
                            }
                            min={
                              [
                                "amount",
                                "amount_paid",
                                "total_marks",
                                "marks_obtained",
                              ].includes(field)
                                ? "0"
                                : undefined
                            }
                            required={
                              ![
                                "remarks",
                                "section",
                                "roll_number",
                                "class_name",
                                "due_date",
                                "exam_date",
                              ].includes(field)
                            }
                            value={value}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                [field]: e.target.value,
                              })
                            }
                          />
                        )}
                      </label>
                    )
                  )}

                  <button
                    style={button}
                    disabled={busy}
                  >
                    {busy
                      ? "Saving..."
                      : editingId
                        ? "Save Changes"
                        : "Save Record"}
                  </button>
                </form>
              )}
            </section>

            <section style={card}>
              <h2>Directory</h2>

              <input
                style={input}
                placeholder={`Search ${tab}...`}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              <p style={{ fontSize: 13 }}>
                Showing {visible.length} of{" "}
                {filtered.length} matching records
                (up to 500 loaded per module).
              </p>

              {visible.length === 0 ? (
                <p>No records found.</p>
              ) : (
                visible.map((row, i) => (
                  <div
                    key={str(row.id || i)}
                    style={{
                      border: "1px solid #e1d3b8",
                      padding: 16,
                      borderRadius: 10,
                      marginBottom: 12,
                      overflowWrap: "anywhere",
                    }}
                  >
                    <h3>
                      {str(
                        row.full_name ||
                          row.title ||
                          row.student_id ||
                          `${tab} record`
                      )}
                    </h3>

                    {Object.entries(row)
                      .filter(
                        ([k]) =>
                          !["id", "created_at"].includes(k)
                      )
                      .map(([k, v]) => (
                        <p
                          key={k}
                          style={{
                            fontSize: 14,
                            margin: "8px 0",
                          }}
                        >
                          <strong>
                            {labelFor(k)}:
                          </strong>{" "}
                          {str(v) || "—"}
                        </p>
                      ))}

                    <button
                      style={button}
                      disabled={busy}
                      onClick={() => editRow(row)}
                    >
                      Edit
                    </button>

                    <button
                      style={{
                        ...button,
                        background: "#982f31",
                      }}
                      disabled={busy}
                      onClick={() => remove(row)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={button}
                  disabled={current <= 1}
                  onClick={() =>
                    setPage(current - 1)
                  }
                >
                  Previous
                </button>

                <span>
                  Page {current} of {pages}
                </span>

                <button
                  style={button}
                  disabled={current >= pages}
                  onClick={() =>
                    setPage(current + 1)
                  }
                >
                  Next
                </button>
              </div>
            </section>
          </>
        )}

        {message && (
          <p
            role="status"
            style={{
              ...card,
              borderColor: "#c4a45a",
            }}
          >
            {message}
          </p>
        )}

        <a
          href="/"
          style={{ color: "#064535" }}
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
