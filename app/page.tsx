
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 12,
  marginTop: 8,
  marginBottom: 20,
  border: "1px solid #D8C6A0",
  borderRadius: 7,
};

const buttonStyle = {
  width: "100%",
  padding: 14,
  background: "#064535",
  color: "#FFFFFF",
  border: 0,
  borderRadius: 7,
  cursor: "pointer",
};

export default function AdminLogin() {
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
  }, []);

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
          setMessage("Supabase configuration is missing.");
          setLoading(false);
        }
        return;
      }

      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData.user) {
          if (active) setAuthorized(false);
          return;
        }

        const { data: isAdmin, error: roleError } =
          await supabase.rpc("is_admin");

        if (roleError || isAdmin !== true) {
          if (active) {
            setAuthorized(false);
            setMessage("Administrator access denied.");
          }
          return;
        }

        if (active) {
          setAuthorized(true);
          setMessage("Administrator identity verified.");
        }
      } catch {
        if (active) {
          setAuthorized(false);
          setMessage("Could not restore admin session.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, [supabase]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("Supabase configuration is missing.");
      return;
    }

    setLoading(true);
    setMessage("");
    setAuthorized(false);

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        throw new Error("Email or password is incorrect.");
      }

      const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_admin");

      if (adminError || isAdmin !== true) {
        await supabase.auth.signOut();
        throw new Error("Administrator access denied.");
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
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage("Logout failed. Please try again.");
    } else {
      setAuthorized(false);
      setEmail("");
      setPassword("");
      setMessage("You have successfully logged out.");
    }

    setLoading(false);
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
          maxWidth: 430,
          margin: "auto",
          padding: 32,
          background: "#FFFFFF",
          border: "1px solid #D8C6A0",
          borderRadius: 14,
        }}
      >
        <h1 style={{ color: "#064535" }}>
          ELVARIN ACADEMY
        </h1>

        <p style={{ color: "#B58A40" }}>
          Administrator Login
        </p>

        {loading ? (
          <p role="status">Please wait...</p>
        ) : !authorized ? (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Login
            </button>
          </form>
        ) : (
          <section>
            <h2>Admin Dashboard</h2>
            <p>Welcome to ELVARIN Academy.</p>
            <p>Administrator identity verified.</p>

            <div
              style={{
                background: "#FAF8F2",
                padding: 20,
                border: "1px solid #D8C6A0",
                borderRadius: 8,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <strong>Management Modules</strong>
              <p>Student Management — Coming Soon</p>
              <p>Teacher Management — Coming Soon</p>
              <p>Attendance — Coming Soon</p>
              <p>Examinations — Coming Soon</p>
              <p>Guardian Management — Coming Soon</p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              style={buttonStyle}
            >
              Logout
            </button>
          </section>
        )}

        {message && (
          <p role="status" style={{ marginTop: 20 }}>
            {message}
          </p>
        )}

        <a
          href="/"
          style={{
            display: "block",
            marginTop: 25,
            color: "#064535",
          }}
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
