"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";

type Student = {
  id: string;
  student_id: string;
  full_name: string;
  class_name: string | null;
  section: string | null;
  roll_number: string | null;
  admission_date: string | null;
  created_at: string | null;
};

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
const PAGE_SIZE = 10;

function localDate() {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function blankForm(): StudentForm {
  return {
    student_id: "",
    full_name: "",
    class_name: "",
    section: "",
    roll_number: "",
    admission_date: localDate(),
  };
}

const inputStyle: CSSProperties = {
  width: "100%",
  padding: 12,
  marginTop: 8,
  marginBottom: 16,
  border: "1px solid #D8C6A0",
  borderRadius: 8,
  boxSizing: "border-box",
  fontSize: 15,
};
const buttonStyle: CSSProperties = {
  padding: "12px 18px",
  border: "none",
  borderRadius: 8,
  background: "#064535",
  color: "white",
  cursor: "pointer",
};
const cardStyle: CSSProperties = {
  background: "#FFFFFF",
  padding: 20,
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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState<StudentForm>(blankForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function headers(accessToken: string): Record<string, string> {
    if (!key) throw new Error("Supabase key missing.");
    return {
      apikey: key,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }

  async function errorText(response: Response, fallback: string) {
    const body = await response.json().catch(() => null);
    return body?.message || body?.error_description || fallback;
  }

  async function loadStudents(accessToken: string, pageNumber: number, query: string) {
    if (!url) throw new Error("Supabase URL missing.");
    const params = new URLSearchParams({
      select: "id,student_id,full_name,class_name,section,roll_number,admission_date,created_at",
      order: "created_at.desc",
      limit: String(PAGE_SIZE),
      offset: String((pageNumber - 1) * PAGE_SIZE),
    });
    // Escape PostgREST filter operators from user input.
    const clean = query.trim().replace(/[(),.%*\\]/g, "");
    if (clean) {
      params.set(
        "or",
        `(student_id.ilike.*${clean}*,full_name.ilike.*${clean}*,class_name.ilike.*${clean}*,section.ilike.*${clean}*,roll_number.ilike.*${clean}*)`
      );
    }
    const response = await fetch(`${url}/rest/v1/students?${params.toString()}`, {
      headers: { ...headers(accessToken), Prefer: "count=exact" },
      cache: "no-store",
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error("Session expired. Please log out and log in again.");
      throw new Error(await errorText(response, "Student loading failed."));
    }
    const rows = (await response.json()) as Student[];
    const contentRange = response.headers.get("content-range");
    const count = contentRange?.split("/")[1];
    setStudents(rows);
    setTotal(count && count !== "*" ? Number(count) : rows.length);
  }

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        // loadStudents updates state only for current mounted view.
        if (!cancelled) await loadStudents(token, page, search);
      } catch (error) {
        if (!cancelled) setMessage(error instanceof Error ? error.message : "Loading failed.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, page, search]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (!url || !key) throw new Error("Supabase configuration missing.");
      const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { apikey: key, "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const session = await response.json();
      if (!response.ok || !session.access_token) throw new Error("Invalid email or password.");
      const accessToken: string = session.access_token;
      const adminResponse = await fetch(`${url}/rest/v1/rpc/is_admin`, {
        method: "POST",
        headers: headers(accessToken),
        body: "{}",
      });
      if (!adminResponse.ok) throw new Error("Administrator verification failed.");
      if ((await adminResponse.json()) !== true) throw new Error("Administrator access required.");
      setPage(1);
      setSearch("");
      setToken(accessToken);
      setPassword("");
      setMessage("Administrator login successful.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof StudentForm, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function startAdd() {
    setEditId(null);
    setForm(blankForm());
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(student: Student) {
    setEditId(student.id);
    setForm({
      student_id: student.student_id,
      full_name: student.full_name,
      class_name: student.class_name ?? "",
      section: student.section ?? "",
      roll_number: student.roll_number ?? "",
      admission_date: student.admission_date ?? localDate(),
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setForm(blankForm());
  }

  async function saveStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || !url || saving) return;
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        student_id: form.student_id.trim(),
        full_name: form.full_name.trim(),
        class_name: form.class_name.trim() || null,
        section: form.section.trim() || null,
        roll_number: form.roll_number.trim() || null,
        admission_date: form.admission_date || null,
      };
      if (!payload.student_id || !payload.full_name) throw new Error("Student ID and Name are required.");
      const editing = Boolean(editId);
      const endpoint = editing
        ? `${url}/rest/v1/students?id=eq.${encodeURIComponent(editId!)}`
        : `${url}/rest/v1/students`;
      const response = await fetch(endpoint, {
        method: editing ? "PATCH" : "POST",
        headers: { ...headers(token), Prefer: "return=representation" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(await errorText(response, "Could not save student."));
      const result = (await response.json()) as Student[];
      if (result.length !== 1) throw new Error("No record was changed. Check database permissions.");
      closeForm();
      setPage(1);
      setSearch("");
      await loadStudents(token, 1, "");
      setMessage(editing ? "Student updated successfully." : "Student added successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteStudent(student: Student) {
    if (!token || !url || saving) return;
    const agreed = window.confirm(`Delete ${student.full_name} (${student.student_id})? This cannot be undone.`);
    if (!agreed) return;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(
        `${url}/rest/v1/students?id=eq.${encodeURIComponent(student.id)}`,
        { method: "DELETE", headers: { ...headers(token), Prefer: "return=representation" } }
      );
      if (!response.ok) throw new Error(await errorText(response, "Delete failed."));
      const result = (await response.json()) as Student[];
      if (result.length !== 1) throw new Error("No record was deleted. Check database permissions.");
      const newPage = students.length === 1 && page > 1 ? page - 1 : page;
      setPage(newPage);
      await loadStudents(token, newPage, search);
      setMessage("Student deleted successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setSaving(false);
    }
  }

  async function refreshStudents() {
    if (!token) return;
    setLoading(true);
    try {
      await loadStudents(token, page, search);
      setMessage("Student list refreshed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Refresh failed.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken("");
    setStudents([]);
    setTotal(0);
    setPassword("");
    setSearch("");
    setPage(1);
    closeForm();
    setMessage("");
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main style={{ minHeight: "100vh", background: "#FAF8F2", color: "#063D32", padding: "32px 16px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 950, margin: "auto" }}>
        <h1>ELVARIN ACADEMY</h1>
        <p style={{ color: "#B58A40" }}>Administration Portal</p>
        {!token ? (
          <form onSubmit={handleLogin} style={cardStyle}>
            <h2>Administrator Login</h2>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            <button type="submit" disabled={loading} style={buttonStyle}>{loading ? "Checking..." : "Login"}</button>
          </form>
        ) : (
          <>
            <section style={cardStyle}>
              <h2>Student Management</h2>
              <p>Welcome, Administrator</p>
              <p>Matching students: <strong>{total}</strong></p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={showForm ? closeForm : startAdd} style={buttonStyle}>{showForm ? "Close Form" : "+ Add Student"}</button>
                <button onClick={refreshStudents} disabled={loading} style={buttonStyle}>Refresh</button>
                <button onClick={logout} style={{ ...buttonStyle, background: "#795548" }}>Logout</button>
              </div>
            </section>
            {showForm && (
              <section style={cardStyle}>
                <h2>{editId ? "Edit Student" : "Add New Student"}</h2>
                <form onSubmit={saveStudent}>
                  <label htmlFor="student_id">Student ID</label>
                  <input id="student_id" required maxLength={60} value={form.student_id} onChange={(e) => updateField("student_id", e.target.value)} style={inputStyle} placeholder="ELV-2026-002" />
                  <label htmlFor="full_name">Full Name</label>
                  <input id="full_name" required value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)} style={inputStyle} />
                  <label htmlFor="class_name">Class</label>
                  <input id="class_name" value={form.class_name} onChange={(e) => updateField("class_name", e.target.value)} style={inputStyle} placeholder="Class 5" />
                  <label htmlFor="section">Section</label>
                  <input id="section" value={form.section} onChange={(e) => updateField("section", e.target.value)} style={inputStyle} placeholder="A" />
                  <label htmlFor="roll_number">Roll Number</label>
                  <input id="roll_number" value={form.roll_number} onChange={(e) => updateField("roll_number", e.target.value)} style={inputStyle} placeholder="02" />
                  <label htmlFor="admission_date">Admission Date</label>
                  <input id="admission_date" type="date" value={form.admission_date} onChange={(e) => updateField("admission_date", e.target.value)} style={inputStyle} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="submit" disabled={saving} style={buttonStyle}>{saving ? "Saving..." : editId ? "Save Changes" : "Save Student"}</button>
                    <button type="button" onClick={closeForm} style={{ ...buttonStyle, background: "#795548" }}>Cancel</button>
                  </div>
                </form>
              </section>
            )}
            <section style={cardStyle}>
              <h2>Student Directory</h2>
              <label htmlFor="student-search">Search by ID, name, class, section or roll</label>
              <input id="student-search" placeholder="Search students..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={inputStyle} />
              {loading ? <p>Loading students...</p> : students.length === 0 ? <p>No matching student records.</p> : students.map((student) => (
                <div key={student.id} style={{ padding: 16, marginBottom: 12, border: "1px solid #E4D9C2", borderRadius: 8 }}>
                  <h3>{student.full_name}</h3>
                  <p><strong>Student ID:</strong> {student.student_id}</p>
                  <p><strong>Class:</strong> {student.class_name || "—"} | <strong>Section:</strong> {student.section || "—"}</p>
                  <p><strong>Roll:</strong> {student.roll_number || "—"}</p>
                  <p><strong>Admission:</strong> {student.admission_date || "—"}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button type="button" onClick={() => startEdit(student)} disabled={saving} style={buttonStyle}>Edit</button>
                    <button type="button" onClick={() => deleteStudent(student)} disabled={saving} style={{ ...buttonStyle, background: "#9C2F2F" }}>Delete</button>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <button type="button" style={buttonStyle} disabled={page === 1 || loading} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button>
                <span>Page {page} of {pages}</span>
                <button type="button" style={buttonStyle} disabled={page >= pages || loading} onClick={() => setPage((current) => current + 1)}>Next</button>
              </div>
            </section>
          </>
        )}
        {message && <p role="status" style={{ marginTop: 16 }}>{message}</p>}
        <a href="/" style={{ display: "inline-block", marginTop: 20, color: "#064535" }}>Back to Home</a>
      </div>
    </main>
  );
}
