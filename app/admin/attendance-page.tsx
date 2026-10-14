"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

type Student = { id: string; student_id: string; full_name: string; class_name: string | null; section: string | null; roll_number: string | null };
type Attendance = { id: string; student_id: string; status: "present" | "absent" };
type Status = Attendance["status"];
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};
const inputStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", padding: 12, border: "1px solid #cbb88d", borderRadius: 9, background: "white", fontSize: 16 };
const buttonStyle: React.CSSProperties = { padding: "11px 15px", border: 0, borderRadius: 9, background: "#064535", color: "white", cursor: "pointer" };

export default function AttendancePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<Record<string, Status>>({});
  const [date, setDate] = useState(today);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const api = useCallback(async (path: string, jwt: string, init: RequestInit = {}) => {
    if (!URL || !KEY) throw new Error("Supabase environment variables missing.");
    const res = await fetch(`${URL}${path}`, {
      ...init,
      headers: { apikey: KEY, Authorization: `Bearer ${jwt}`, "Content-Type": "application/json", ...init.headers },
      cache: "no-store",
    });
    const raw = await res.text();
    let data: any = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }
    if (!res.ok) throw new Error(data?.message || data?.error_description || `Request failed (${res.status})`);
    return data;
  }, []);

  const loadStudents = useCallback(async (jwt: string) => {
    const all: Student[] = [];
    for (let start = 0; ; start += 500) {
      const batch = await api(`/rest/v1/students?select=id,student_id,full_name,class_name,section,roll_number&order=student_id.asc&limit=500&offset=${start}`, jwt) as Student[];
      all.push(...batch);
      if (batch.length < 500) break;
    }
    setStudents(all);
  }, [api]);

  const loadAttendance = useCallback(async (jwt: string, day: string) => {
    const next: Record<string, Status> = {};
    for (let start = 0; ; start += 500) {
      const batch = await api(`/rest/v1/attendance?select=id,student_id,status&attendance_date=eq.${day}&limit=500&offset=${start}`, jwt) as Attendance[];
      for (const item of batch) next[item.student_id] = item.status;
      if (batch.length < 500) break;
    }
    setRecords(next);
  }, [api]);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage("");
    try {
      if (!URL || !KEY) throw new Error("Supabase environment variables missing.");
      const res = await fetch(`${URL}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: KEY, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const session = await res.json();
      if (!res.ok || !session.access_token) throw new Error(session.msg || session.error_description || "Login failed");
      const isAdmin = await api("/rest/v1/rpc/is_admin", session.access_token, { method: "POST", body: "{}" });
      if (isAdmin !== true) throw new Error("Administrator access required.");
      await Promise.all([loadStudents(session.access_token), loadAttendance(session.access_token, date)]);
      setToken(session.access_token); setPassword("");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Login failed"); }
    finally { setBusy(false); }
  }

  useEffect(() => {
    if (!token) return;
    let active = true;
    loadAttendance(token, date).catch(e => { if (active) setMessage(e instanceof Error ? e.message : "Could not load attendance"); });
    return () => { active = false; };
  }, [date, token, loadAttendance]);

  const classes = useMemo(() => [...new Set(students.map(s => s.class_name || ""))].sort(), [students]);
  const sections = useMemo(() => [...new Set(students.filter(s => !className || (s.class_name || "") === className).map(s => s.section || ""))].sort(), [students, className]);
  const visible = students.filter(s => (!className || (s.class_name || "") === className) && (!section || (s.section || "") === section));
  const present = visible.filter(s => records[s.id] === "present").length;
  const absent = visible.filter(s => records[s.id] === "absent").length;

  async function mark(student: Student, status: Status) {
    if (!token || pending[student.id]) return;
    setMessage(""); setPending(old => ({ ...old, [student.id]: true }));
    try {
      const result = await api("/rest/v1/attendance?on_conflict=student_id,attendance_date", token, {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify({ student_id: student.id, attendance_date: date, status }),
      }) as Attendance[];
      if (!Array.isArray(result) || result.length !== 1) throw new Error("Attendance not confirmed. Check RLS permissions.");
      setRecords(old => ({ ...old, [student.id]: status }));
    } catch (e) { setMessage(`${student.full_name}: ${e instanceof Error ? e.message : "Save failed"}`); }
    finally { setPending(old => ({ ...old, [student.id]: false })); }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#faf8f2", color: "#123f35", fontFamily: "Arial, sans-serif", padding: "28px 16px" }}>
      <div style={{ maxWidth: 950, margin: "auto" }}>
        <h1>ELVARIN ACADEMY</h1><p style={{ color: "#a98036" }}>Daily Attendance</p>
        {!token ? <form onSubmit={login} style={{ background: "white", padding: 22, borderRadius: 14, border: "1px solid #dfccaa" }}>
          <h2>Administrator Login</h2>
          <label>Email<input required type="email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} /></label>
          <label>Password<input required type="password" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} /></label>
          <button disabled={busy} style={{ ...buttonStyle, marginTop: 15 }}>{busy ? "Signing in..." : "Login"}</button>
        </form> : <>
          <section style={{ background: "white", padding: 20, borderRadius: 14, border: "1px solid #dfccaa", marginBottom: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))", gap: 12 }}>
              <label>Date<input type="date" style={inputStyle} value={date} onChange={e => setDate(e.target.value)} /></label>
              <label>Class<select style={inputStyle} value={className} onChange={e => {setClassName(e.target.value);setSection("");}}><option value="">All classes</option>{classes.map(v => <option key={v} value={v}>{v || "Unassigned"}</option>)}</select></label>
              <label>Section<select style={inputStyle} value={section} onChange={e => setSection(e.target.value)}><option value="">All sections</option>{sections.map(v => <option key={v} value={v}>{v || "Unassigned"}</option>)}</select></label>
            </div>
            <p>Students: <b>{visible.length}</b> · Present: <b>{present}</b> · Absent: <b>{absent}</b> · Pending: <b>{visible.length - present - absent}</b></p>
            <button style={buttonStyle} onClick={() => loadAttendance(token,date).catch(e => setMessage(String(e)))}>Refresh</button>{" "}
            <button style={{ ...buttonStyle, background: "#785649" }} onClick={() => {setToken("");setStudents([]);setRecords({});}}>Logout</button>
          </section>
          {visible.map(s => <section key={s.id} style={{ background: "white", padding: 18, borderRadius: 13, border: "1px solid #dfccaa", marginBottom: 10 }}>
            <strong>{s.full_name}</strong><div style={{ fontSize: 13, color: "#5b726a", marginTop: 4 }}>{s.student_id} · {s.class_name || "No class"} · {s.section || "No section"} · Roll {s.roll_number || "—"}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <button disabled={!!pending[s.id]} onClick={() => mark(s,"present")} style={{ ...buttonStyle, background: records[s.id] === "present" ? "#087145" : "#75867c", opacity: pending[s.id] ? .6 : 1 }}>✓ Present</button>
              <button disabled={!!pending[s.id]} onClick={() => mark(s,"absent")} style={{ ...buttonStyle, background: records[s.id] === "absent" ? "#b12e36" : "#98807b", opacity: pending[s.id] ? .6 : 1 }}>✕ Absent</button>
              <span style={{ alignSelf: "center", fontSize: 13 }}>{pending[s.id] ? "Saving..." : records[s.id] || "Not marked"}</span>
            </div>
          </section>)}
        </>}
        {message && <p role="alert" style={{ padding: 12, color: "#9b2525", background: "#fff4ef", borderRadius: 9 }}>{message}</p>}
        <p><a href="/admin" style={{ color: "#064535" }}>← Back to Management Dashboard</a></p>
      </div>
    </main>
  );
}
