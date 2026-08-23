"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, Check } from "lucide-react";
import { contact, profile } from "@/content/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

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
 * Contact form with no server of its own. If contact.formEndpoint is set it
 * POSTs JSON there; otherwise it composes a pre-filled mail draft to
 * profile.email — so the form always does something real rather than
 * pretending to submit into a void.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("sending");
    setError(null);

    if (contact.formEndpoint) {
      try {
        const res = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        form.reset();
        setStatus("sent");
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
      return;
    }

    // mail-draft fallback
    const subject = data.subject?.trim() || `Project enquiry from ${data.name}`;
    const body = `${data.message}\n\n—\n${data.name}\n${data.email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  const sending = status === "sending";

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
          {status === "sent" &&
            (contact.formEndpoint
              ? "Thanks — I'll come back to you within 24 hours."
              : "Your mail app should be open with the message ready to send.")}
          {status === "error" && <span className="text-cyan">{error}</span>}
        </p>
      </div>
    </form>
  );
}
