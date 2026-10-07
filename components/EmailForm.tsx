"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { LINKS, SUBSCRIBE } from "@/lib/config";

type Status = "idle" | "sending" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // honeypot: bots fill hidden fields

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Enter a valid email address, like name@example.com.");
      return;
    }

    setStatus("sending");
    try {
      if (SUBSCRIBE.endpoint) {
        const res = await fetch(SUBSCRIBE.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: value }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[Revaliyo] No subscribe endpoint configured. Set NEXT_PUBLIC_SUBSCRIBE_ENDPOINT. Email was not stored.",
        );
      }
      setStatus("done");
      setMessage("You’re on the list. Thanks!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-xl">
      <label htmlFor="email" className="display block text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.05] tracking-[-0.02em]">
        Want more updates? Share your email for spam-free updates.
      </label>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby="email-help"
          disabled={status === "sending" || status === "done"}
          className="min-h-14 flex-1 rounded-full border-2 border-on-gold bg-paper px-6 text-base text-ink placeholder:text-muted focus-visible:outline-blue focus-visible:outline-offset-2"
        />
        {/* Honeypot, hidden from people and assistive tech. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "done"}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue px-7 font-semibold whitespace-nowrap text-on-blue transition-transform duration-150 ease-[var(--ease-out)] enabled:active:scale-[0.97] disabled:opacity-70"
        >
          {status === "done" ? (
            <>
              Subscribed <Check size={20} weight="bold" aria-hidden />
            </>
          ) : status === "sending" ? (
            "Sending..."
          ) : (
            <>
              Sign me up <ArrowRight size={20} weight="bold" aria-hidden />
            </>
          )}
        </button>
      </div>

      <p
        id="email-help"
        role={status === "error" ? "alert" : "status"}
        className={`mt-3 min-h-6 text-sm ${status === "error" ? "font-semibold text-on-gold underline decoration-wavy underline-offset-4" : "text-on-gold/80"}`}
      >
        {message || (
          <>
            See our{" "}
            <a href={LINKS.privacy} className="underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
