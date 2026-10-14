"use client";

import {
  useEffect,
  useState,
  type FormEvent,
  type CSSProperties,
} from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const features = [
  "Student Management",
  "Teacher Management",
  "Student Attendance",
  "Homework & Learning",
  "Examinations & Results",
  "Academic Progress",
  "Guardian Communication",
  "Character Development",
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      if (!supabase) {
        if (active) {
          setMessage("Supabase configuration is incomplete.");
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
          if (active) setAuthorized(false);
          return;
        }

        const { data: isAdmin, error: adminError } =
          await supabase.rpc("is_admin");

        if (!active) return;

        if (adminError || isAdmin !== true) {
          setAuthorized(false);
          setMessage("Administrator access denied.");
          return;
        }

        setAuthorized(true);
        setMessage("Administrator identity verified.");
      } catch {
        if (active) {
          setAuthorized(false);
          setMessage("Could not restore administrator session.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setAuthorized(false);

    try {
      if (!supabase) {
        throw new Error("Supabase configuration is incomplete.");
      }

      const { error: loginError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (loginError) {
        throw new Error("Email or password is incorrect.");
      }

      const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_admin");

      if (adminError) {
        await supabase.auth.signOut();
        throw new Error("Could not verify administrator access.");
      }

      if (isAdmin !== true) {
        await supabase.auth.signOut();
        throw new Error("This account is not an administrator.");
      }

      setAuthorized(true);
      setPassword("");
      setMessage("Administrator identity verified.");
    } catch (error) {
      setAuthorized(false);
      setMessage(
        error instanceof Error ? error.message : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    if (!supabase) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setAuthorized(false);
      setEmail("");
      setPassword("");
      setMessage("Successfully logged out.");
    } catch {
      setMessage("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FAF8F2",
        color: "#063D32",
        padding: "70px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: authorized ? 850 : 430,
          margin: "auto",
          padding: 32,
          background: "#FFFFFF",
          border: "1px solid #D8C6A0",
          borderRadius: 14,
        }}
      >
        <h1 style={{ color: "#064535" }}>ELVARIN ACADEMY</h1>

        <p style={{ color: "#B58A40" }}>Administrator Login</p>

        {loading ? (
          <p role="status">Checking...</p>
        ) : !authorized ? (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={inputStyle}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={inputStyle}
            />

            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? "Checking..." : "Login"}
            </button>
          </form>
        ) : (
          <section>
            <h2 style={{ color: "#064535" }}>Admin Dashboard</h2>
            <p>Welcome to ELVARIN Academy.</p>
            <p>Administrator identity verified.</p>

            <h3 style={{ marginTop: 30, color: "#B58A40" }}>
              Academy Management
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                gap: 16,
                marginTop: 20,
              }}
            >
              {features.map((feature, index) => (
                <article
                  key={feature}
                  style={{
                    background: "#FAF8F2",
                    padding: 20,
                    border: "1px solid #D8C6A0",
                    borderTop: "3px solid #D4AF62",
                    borderRadius: 10,
                  }}
                >
                  <div style={{ color: "#B58A40", fontSize: 23 }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontSize: 16, color: "#064535" }}>
                    {feature}
                  </h3>
                  <p style={{ fontSize: 13, color: "#52675D" }}>
                    Coming Soon
                  </p>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              style={{ ...buttonStyle, marginTop: 30 }}
            >
              Logout
            </button>
          </section>
        )}

        {message && (
          <p role="status" style={{ marginTop: 20, lineHeight: 1.6 }}>
            {message}
          </p>
        )}

        <a
          href="/"
          style={{ display: "block", marginTop: 25, color: "#064535" }}
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: 12,
  marginTop: 8,
  marginBottom: 20,
  border: "1px solid #D8C6A0",
  borderRadius: 7,
  fontSize: 16,
};

const buttonStyle: CSSProperties = {
  width: "100%",
  padding: 14,
  background: "#064535",
  color: "#FFFFFF",
  border: 0,
  borderRadius: 7,
  cursor: "pointer",
  fontSize: 16,
};
