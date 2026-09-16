import nodemailer from "nodemailer";
import { profile } from "@/content/portfolio";
import { contactEmail } from "@/lib/email-template";

/**
 * Contact form delivery over Gmail SMTP.
 *
 * The form previously had no server: it opened a `mailto:` draft and then
 * reported "Sent". Where no mail client is registered — common on Windows and
 * in most browsers — nothing opened and the message was lost while the UI
 * claimed success. This route makes the send real.
 *
 * Setup (five minutes, no billing):
 *
 *  1. Turn on 2-Step Verification for the Google account.
 *     https://myaccount.google.com/security
 *  2. Create an App Password: https://myaccount.google.com/apppasswords
 *     Google shows a 16-character code — that is the "code" this needs.
 *  3. Set two environment variables in Vercel (and .env.local for dev):
 *
 *       GMAIL_USER=you@gmail.com
 *       GMAIL_APP_PASSWORD=abcdefghijklmnop
 *
 * Your normal Google password will NOT work. Google removed password-based
 * SMTP ("less secure apps") — an App Password is the supported route, and it is
 * revocable on its own without touching the account password.
 *
 * Until both variables exist this returns 503 with `configured: false`, and the
 * form falls back to a path that never claims a message was sent. A contact
 * form that lies is worse than one that is plainly unavailable, because the
 * visitor has no reason to try another way.
 */

// Nodemailer opens a TCP socket, so this cannot run on the Edge runtime.
export const runtime = "nodejs";
// Never cache a POST endpoint's responses.
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot — see below. */
  company?: string;
};

const MAX = { name: 120, email: 200, subject: 200, message: 5000 };

// Deliberately permissive. Strict email regexes reject valid addresses, and the
// real validation is whether the reply ever arrives.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(error: string, status = 400) {
  return Response.json({ ok: false, error }, { status });
}

/** Strip CR/LF so a crafted name or subject can't inject extra mail headers. */
function headerSafe(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed request.");
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // A bot fills every field it finds, including one hidden from people. A real
  // submission always leaves this empty. Returning 200 rather than an error
  // means the bot sees success and doesn't retry with a different shape.
  if (body.company) return Response.json({ ok: true });

  if (!name || !email || !message) return bad("Name, email and message are required.");
  if (!EMAIL.test(email)) return bad("That email address doesn't look right.");
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    subject.length > MAX.subject ||
    message.length > MAX.message
  ) {
    return bad("That's longer than this form accepts.");
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    // Not an error the visitor caused — say so honestly and let the client
    // offer the fallback rather than pretending the message was delivered.
    return Response.json(
      { ok: false, configured: false, error: "Email delivery isn't configured yet." },
      { status: 503 },
    );
  }

  // Google issues App Passwords displayed in four groups of four. People paste
  // them with the spaces; SMTP auth fails cryptically if we pass those through.
  const appPassword = pass.replace(/\s+/g, "");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: appPassword },
  });

  const to = process.env.CONTACT_TO ?? profile.email;

  // The template escapes every interpolated value, so the message body cannot
  // inject markup into the mail your client renders.
  const mail = contactEmail({ name, email, subject, message });

  try {
    await transporter.sendMail({
      // Gmail rewrites From to the authenticated account regardless, so putting
      // the visitor's address here would only look like a spoof to spam
      // filters. Their name goes in the display name, their address in replyTo.
      from: `"${headerSafe(name)} (portfolio)" <${user}>`,
      to,
      replyTo: `"${headerSafe(name)}" <${email}>`,
      subject: headerSafe(mail.subject),
      // Both parts: some clients render only text, and a multipart message with
      // no text alternative scores worse with spam filters.
      text: mail.text,
      html: mail.html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    // Log the real reason server-side; never leak credentials or SMTP detail
    // to the page.
    console.error("Gmail send failed:", err);
    return bad("The message couldn't be sent. Please email me directly.", 502);
  }
}
