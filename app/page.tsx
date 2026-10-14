
"use client";

import { useState, type FormEvent } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setAuthorized(false);

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        throw new Error("Supabase configuration is incomplete.");
      }

      const response = await fetch(
        `${url}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: key,
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const session = await response.json();

      if (!response.ok || !session.access_token) {
        throw new Error("Email or password is incorrect.");
      }

      const adminResponse = await fetch(
        `${url}/rest/v1/rpc/is_admin`,
        {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
          body: "{}",
        }
      );

      if (!adminResponse.ok) {
        throw new Error("Could not verify administrator access.");
      }

      const isAdmin = await adminResponse.json();

      if (isAdmin !== true) {
        throw new Error("This account is not an administrator.");
      }

      setAuthorized(true);
      setMessage("Administrator identity verified.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Login failed."
      );
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

        {!authorized ? (
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

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 14,
                background: "#064535",
                color: "#FFFFFF",
                border: 0,
                borderRadius: 7,
                cursor: "pointer",
              }}
            >
              {loading ? "Checking..." : "Login"}
            </button>
          </form>
        ) : (
          <p>
            Admin verified. Student management features
            will be added in the next step.
          </p>
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

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 12,
  marginTop: 8,
  marginBottom: 20,
  border: "1px solid #D8C6A0",
  borderRadius: 7,
};
