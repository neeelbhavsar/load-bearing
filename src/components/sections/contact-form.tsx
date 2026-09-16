"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, Check, Copy, Mail } from "lucide-react";
import { contact, profile } from "@/content/portfolio";

type Status = "idle" | "sending" | "sent" | "error" | "fallback";

const FIELDS = [
  {
    name: "name",
    label: "Your name",
    type: "text",
    placeholder: "Neel Bhavsar",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    required: true,
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Backend for a rental platform",
    required: false,
  },
] as const;

/**
 * Contact form.
 *
 * Posts to `contact.formEndpoint` when one is set, otherwise to this site's own
 * /api/contact route.
 *
 * The important rule here is that the form never reports success it cannot
 * verify. The previous version opened a `mailto:` draft and said "Sent" — with
 * no registered mail client nothing opened, the message was lost, and the
 * visitor was told it had gone through. So when delivery isn't available the
 * status becomes `fallback`, not `sent`, and the message is handed back to the
 * visitor with a way to actually send it.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // State, not a ref: the fallback panel renders from this, and reading a ref
  // during render is a correctness bug waiting for a concurrent re-render.
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("sending");
    setError(null);
    setCopied(false);

    setDraft({
      subject: data.subject?.trim() || `Project enquiry from ${data.name}`,
      body: `${data.message}\n\n—\n${data.name}\n${data.email}`,
    });

    try {
      const res = await fetch(contact.formEndpoint || "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        setStatus("sent");
        return;
      }

      // 503 = delivery isn't configured. Not the visitor's problem and not
      // worth showing as an error; give them the fallback instead.
      const payload = await res.json().catch(() => null);
      if (res.status === 503 || payload?.configured === false) {
        setStatus("fallback");
        return;
      }

      setStatus("error");
      setError(payload?.error ?? `Couldn't send (${res.status}).`);
    } catch {
      // Offline, blocked, or the route is unreachable. Same treatment — the
      // message still exists and the visitor should be able to send it.
      setStatus("fallback");
    }
  }

  async function copyMessage() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the message is on screen either way.
    }
  }

  const sending = status === "sending";
  const mailHref = draft
    ? `mailto:${profile.email}?subject=${encodeURIComponent(
        draft.subject,
      )}&body=${encodeURIComponent(draft.body)}`
    : `mailto:${profile.email}`;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f, i) => (
          <label key={f.name} className={"flex flex-col gap-2" + (i === 2 ? " sm:col-span-2" : "")}>
            <span className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
              {f.label}
              {f.required && <span className="ml-1 text-accent">*</span>}
            </span>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              autoComplete={f.name === "name" ? "name" : f.name === "email" ? "email" : "off"}
              className="rounded-xl border border-border bg-bg-elev px-4 py-3.5 text-fg transition-colors duration-300 outline-none placeholder:text-fg-faint/60 hover:border-border-strong focus:border-accent"
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
          Message<span className="ml-1 text-accent">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you building, and where does it hurt?"
          className="resize-y rounded-xl border border-border bg-bg-elev px-4 py-3.5 leading-relaxed text-fg transition-colors duration-300 outline-none placeholder:text-fg-faint/60 hover:border-border-strong focus:border-accent"
        />
      </label>

      {/* Honeypot. Hidden from people, irresistible to bots; the server drops
          any submission that fills it. Not `display:none` — some bots skip
          those — and kept out of the tab order and the accessibility tree. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company (leave empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-1 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          disabled={sending}
          data-cursor="send"
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-4 font-mono text-[11px] tracking-[0.2em] text-on-accent uppercase transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 sm:w-fit"
        >
          {sending ? (
            <Loader2 size={14} className="animate-spin" aria-hidden />
          ) : status === "sent" ? (
            <Check size={14} aria-hidden />
          ) : null}
          {sending ? "Sending" : status === "sent" ? "Sent" : "Send message"}
          {status === "idle" && (
            <ArrowUpRight
              size={14}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          )}
        </button>

        <p aria-live="polite" className="font-mono text-[11px] tracking-wide text-fg-faint">
          {status === "sent" && "Thanks — I'll come back to you within 24 hours."}
          {status === "error" && <span className="text-cyan">{error}</span>}
        </p>
      </div>

      {/* Delivery unavailable. The message is not lost and is not claimed sent —
          it is handed back with two ways to deliver it. */}
      {status === "fallback" && (
        <div
          role="status"
          className="rounded-2xl border border-border-strong bg-bg-elev p-5 sm:p-6"
        >
          <p className="text-[15px] leading-relaxed text-fg">
            I couldn&apos;t send this from the site. Your message is safe — send it directly and
            it&apos;ll reach me just the same.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={copyMessage}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied ? "Copied" : "Copy message"}
            </button>

            <a
              href={mailHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Mail size={14} aria-hidden />
              Open mail app
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-[11px] tracking-wide text-fg-muted underline underline-offset-4 transition-colors duration-300 hover:text-accent"
            >
              {profile.email}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
