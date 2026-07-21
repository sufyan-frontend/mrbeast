"use client";

import { useId, useState, type FormEvent } from "react";
import { Reveal } from "./reveal";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string }
  | { kind: "notice"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const loading = status.kind === "loading";
  const invalid = status.kind === "error";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    // Validate on the client first so the common mistake never costs a round trip.
    if (!EMAIL_RE.test(value)) {
      setStatus({ kind: "error", message: "Enter a valid email address." });
      return;
    }

    setStatus({ kind: "loading" });

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await response.json();

      if (data.ok) {
        setStatus({ kind: "success", message: data.message ?? "You’re on the list." });
        setEmail("");
      } else if (data.code === "not_configured") {
        // Not a user error — the site owner hasn't connected a provider yet.
        setStatus({ kind: "notice", message: data.message });
      } else {
        setStatus({ kind: "error", message: data.message ?? "Something went wrong." });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Network problem — check your connection and try again.",
      });
    }
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="glow left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 bg-brand/25" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
            Never miss a video
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Get an email the moment something new drops. No spam, unsubscribe any time.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor={inputId} className="sr-only">
                  Email address
                </label>
                <input
                  id={inputId}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  disabled={loading}
                  aria-invalid={invalid}
                  aria-describedby={status.kind === "idle" ? undefined : messageId}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    // Clear a stale message as soon as the user starts fixing it.
                    if (status.kind !== "idle" && status.kind !== "loading") {
                      setStatus({ kind: "idle" });
                    }
                  }}
                  className={`w-full rounded-full border bg-surface px-5 py-3.5 text-base text-foreground transition-colors placeholder:text-muted/70 disabled:cursor-not-allowed disabled:opacity-60 ${
                    invalid ? "border-accent" : "border-line focus:border-brand-400"
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70 sm:shrink-0"
              >
                {loading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    Signing up…
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            {/* One live region for every outcome, so it is announced once */}
            <p
              id={messageId}
              role="status"
              aria-live="polite"
              className={`mt-3 min-h-5 text-sm font-medium ${
                status.kind === "success"
                  ? "text-emerald-400"
                  : status.kind === "error"
                    ? "text-accent-400"
                    : "text-muted"
              }`}
            >
              {status.kind === "success" || status.kind === "error" || status.kind === "notice"
                ? status.message
                : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
