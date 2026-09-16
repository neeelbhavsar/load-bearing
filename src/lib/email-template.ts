/**
 * The notification email, styled to match the site.
 *
 * Email is not the web. Three constraints drive every choice here:
 *
 *  1. **No <style> block.** Gmail strips it in forwarded mail, Outlook's Word
 *     renderer ignores most of it. Every rule is inlined on the element.
 *  2. **No web fonts.** Instrument Serif and JetBrains Mono will not load, so
 *     each stack falls back to Georgia and a system monospace — chosen because
 *     they are the closest widely-installed match to the site's type.
 *  3. **Tables, not flex/grid.** Outlook lays out with Word, which supports
 *     neither. Nested tables are the only layout that survives everywhere.
 *
 * Colours are the literal values from globals.css rather than CSS variables,
 * which no mail client resolves. If the theme changes, update both.
 */

const C = {
  bg: "#06070a",
  elev: "#0c0e13",
  surface: "#11141b",
  fg: "#f4f6fa",
  muted: "#9aa3b5",
  faint: "#5d6577",
  border: "#1f242e",
  accent: "#b4ff39",
  onAccent: "#06070a",
};

const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,'Courier New',monospace";

/**
 * Escape before interpolating. The message, name and subject come from a
 * stranger on the internet; without this, `<img onerror=…>` in the message body
 * would be injected straight into an email rendered in your mail client.
 */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped first, then newlines become <br> — never the other way round. */
function paragraphs(message: string) {
  return esc(message).replace(/\r?\n/g, "<br />");
}

type Enquiry = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

/** A label/value row in the detail table. */
function row(label: string, valueHtml: string) {
  return `
    <tr>
      <td style="padding:0 0 14px 0;width:96px;vertical-align:top;font-family:${MONO};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${C.faint};">${esc(label)}</td>
      <td style="padding:0 0 14px 0;vertical-align:top;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.fg};">${valueHtml}</td>
    </tr>`;
}

export function contactEmail({ name, email, subject, message }: Enquiry) {
  const safeName = esc(name);
  const safeEmail = esc(email);
  const heading = subject?.trim() ? esc(subject.trim()) : `Enquiry from ${safeName}`;

  // Shown as the preview line in the inbox, then hidden in the body. Without it
  // clients preview whatever text comes first, which would be the label.
  const preheader = `${name} — ${message.slice(0, 120).replace(/\s+/g, " ")}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>${heading}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${C.elev};border:1px solid ${C.border};border-radius:16px;overflow:hidden;">

          <!-- accent rule: the one piece of brand that survives at any width -->
          <tr><td style="height:4px;background-color:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>

          <tr>
            <td style="padding:32px 32px 8px 32px;">
              <p style="margin:0;font-family:${MONO};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C.accent};">New enquiry</p>
              <h1 style="margin:14px 0 0 0;font-family:${SERIF};font-size:30px;line-height:1.2;font-weight:400;color:${C.fg};">${heading}</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${row("From", safeName)}
                ${row(
                  "Email",
                  `<a href="mailto:${safeEmail}" style="color:${C.accent};text-decoration:none;">${safeEmail}</a>`,
                )}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 32px 0 32px;">
              <div style="height:1px;background-color:${C.border};font-size:0;line-height:0;">&nbsp;</div>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 0 32px;">
              <p style="margin:0 0 12px 0;font-family:${MONO};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C.faint};">Message</p>
              <div style="background-color:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:20px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.fg};">${paragraphs(message)}</div>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <!-- Bulletproof-ish button: a padded anchor, since Outlook drops
                   button elements and background images entirely. -->
              <a href="mailto:${safeEmail}${subject ? `?subject=${encodeURIComponent(`Re: ${subject}`)}` : ""}"
                 style="display:inline-block;background-color:${C.accent};color:${C.onAccent};font-family:${MONO};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:14px 26px;border-radius:999px;">Reply to ${safeName}</a>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background-color:${C.bg};border-top:1px solid ${C.border};">
              <p style="margin:0;font-family:${MONO};font-size:10px;letter-spacing:0.14em;color:${C.faint};">Sent from the contact form on your portfolio</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Plain-text alternative. Not optional: some clients only render this, and a
  // multipart message with no text part scores worse with spam filters.
  const text = [
    `New enquiry — ${subject?.trim() || `from ${name}`}`,
    "",
    `From:  ${name}`,
    `Email: ${email}`,
    "",
    "Message",
    "-------",
    message,
    "",
    "—",
    "Sent from the contact form on your portfolio",
  ].join("\n");

  return { html, text, subject: subject?.trim() || `Portfolio enquiry from ${name}` };
}
