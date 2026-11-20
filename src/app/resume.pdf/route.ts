import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { profile, resume } from "@/content/portfolio";

/**
 * /resume.pdf: the résumé as an ATS-friendly file, for HR teams that need
 * something to upload or forward.
 *
 * Generated from the same `resume` object as the /resume page, so there is one
 * copy of the content and the file can never lag behind the page. Prerendered at
 * build time (force-static), so it costs nothing per request.
 *
 * ATS rules followed on purpose: one column, real selectable text, a standard
 * font (Helvetica), plain section headings, no tables, icons, images or text
 * boxes, and contact details as text in the body rather than in a header.
 */
export const dynamic = "force-static";

// A4, the default paper size in India.
const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = { x: 44, top: 40, bottom: 40 };
const WIDTH = PAGE.width - MARGIN.x * 2;

const INK = rgb(0.1, 0.1, 0.12);
const MUTED = rgb(0.32, 0.32, 0.36);
const RULE = rgb(0.75, 0.75, 0.78);

/**
 * Standard PDF fonts only cover WinAnsi. Map the few characters the content
 * uses outside it, and drop anything else rather than throw at build time.
 */
function clean(text: string) {
  return text
    .replace(/→/g, "->")
    .replace(/≈/g, "~")
    .replace(/[   ]/g, " ")
    .replace(/[^\x20-\x7e -ÿ–—‘’“”•…€™]/g, "");
}

class Writer {
  private page!: PDFPage;
  private y = 0;

  constructor(
    private doc: PDFDocument,
    private regular: PDFFont,
    private bold: PDFFont,
  ) {
    this.addPage();
  }

  private addPage() {
    this.page = this.doc.addPage([PAGE.width, PAGE.height]);
    this.y = PAGE.height - MARGIN.top;
  }

  /** Break to a new page now unless `height` points still fit (keep-with-next). */
  keep(height: number) {
    this.ensure(height);
  }

  private ensure(height: number) {
    if (this.y - height < MARGIN.bottom) this.addPage();
  }

  /** Greedy word wrap against the font's real glyph widths. */
  private wrap(text: string, font: PDFFont, size: number, width: number) {
    const lines: string[] = [];
    let line = "";
    for (const word of clean(text).split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= width || !line) {
        line = next;
      } else {
        lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  gap(points: number) {
    this.y -= points;
  }

  text(
    text: string,
    {
      size = 10,
      bold = false,
      color = INK,
      indent = 0,
      leading = 1.35,
    }: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb>; indent?: number; leading?: number } = {},
  ) {
    const font = bold ? this.bold : this.regular;
    const lineHeight = size * leading;
    for (const line of this.wrap(text, font, size, WIDTH - indent)) {
      this.ensure(lineHeight);
      this.y -= lineHeight;
      this.page.drawText(line, { x: MARGIN.x + indent, y: this.y, size, font, color });
    }
  }

  /** Bold left text with a right-aligned muted date on the same line. */
  titleRow(left: string, right: string, size = 10.5) {
    const lineHeight = size * 1.4;
    const rightText = clean(right);
    const rightWidth = this.regular.widthOfTextAtSize(rightText, size - 1);
    const leftLines = this.wrap(left, this.bold, size, WIDTH - rightWidth - 12);
    this.ensure(lineHeight * leftLines.length);
    leftLines.forEach((line, i) => {
      this.y -= lineHeight;
      this.page.drawText(line, { x: MARGIN.x, y: this.y, size, font: this.bold, color: INK });
      if (i === 0) {
        this.page.drawText(rightText, {
          x: MARGIN.x + WIDTH - rightWidth,
          y: this.y,
          size: size - 1,
          font: this.regular,
          color: MUTED,
        });
      }
    });
  }

  bullet(text: string) {
    const size = 9.5;
    const lineHeight = size * 1.34;
    // The bullet is drawn in the same text run as the first line: drawn on its
    // own, text extractors (and so ATS parsers) put it on a line by itself.
    const marker = "•  ";
    const indent = this.regular.widthOfTextAtSize(marker, size);
    const lines = this.wrap(text, this.regular, size, WIDTH - indent);
    lines.forEach((line, i) => {
      this.ensure(lineHeight);
      this.y -= lineHeight;
      this.page.drawText(i === 0 ? `${marker}${line}` : line, {
        x: MARGIN.x + (i === 0 ? 0 : indent),
        y: this.y,
        size,
        font: this.regular,
        color: INK,
      });
    });
  }

  section(label: string) {
    this.ensure(40);
    this.gap(10);
    this.text(label.toUpperCase(), { size: 10.5, bold: true });
    this.gap(3);
    this.page.drawLine({
      start: { x: MARGIN.x, y: this.y },
      end: { x: MARGIN.x + WIDTH, y: this.y },
      thickness: 0.6,
      color: RULE,
    });
    this.gap(2);
  }
}

export async function GET() {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  doc.setTitle(`${profile.name} — ${resume.title} — Résumé`);
  doc.setAuthor(profile.name);
  doc.setSubject(`Résumé of ${profile.name}, ${resume.title}`);
  doc.setKeywords([...resume.headline, resume.title, "Résumé"]);
  doc.setCreator(profile.name);

  const w = new Writer(doc, regular, bold);
  const { contact } = resume;

  // ── header ──
  w.text(profile.name, { size: 20, bold: true, leading: 1.1 });
  w.gap(2);
  w.text(`${resume.title} | ${resume.headline.join(", ")}`, { size: 11 });
  w.gap(2);
  w.text(
    [contact.location, contact.phone, contact.email, contact.linkedin, contact.github]
      .filter(Boolean)
      .join(" | "),
    { size: 9.5, color: MUTED },
  );
  w.text(resume.availability, { size: 9.5, bold: true });

  // ── summary ──
  w.section("Summary");
  w.text(resume.summary, { size: 9.5, leading: 1.32 });

  // ── experience ──
  w.section("Experience");
  for (const job of resume.experience) {
    w.titleRow(`${job.role} — ${job.company}`, job.period);
    w.text(job.location, { size: 9.5, color: MUTED });
    w.text(
      `Career progression: ${job.progression
        .map((step) =>
          "promoted" in step && step.promoted
            ? `Promoted to ${step.title} (${step.year})`
            : `${step.title} (${step.year})`,
        )
        .join(" -> ")}`,
      { size: 9.5, bold: true },
    );
    w.gap(2);
    job.bullets.forEach((b) => w.bullet(b));
  }

  // ── projects ──
  w.section(`Projects — ${resume.projectsNote}`);
  resume.projects.forEach((project, i) => {
    if (i > 0) w.gap(4);
    // Heading, stack line and first bullet stay together across a page break.
    w.keep(60);
    w.titleRow(`${project.name} — ${project.kind}`, project.period);
    w.text(`${project.role} | Stack: ${project.stack}`, { size: 9.25, color: MUTED });
    w.gap(1);
    project.bullets.forEach((b) => w.bullet(b));
  });

  // ── personal project ──
  w.section("Personal project");
  for (const project of resume.sideProjects) {
    w.titleRow(`${project.name} — ${project.kind}`, project.period);
    w.text(`Stack: ${project.stack} | ${project.links.join(" | ")}`, { size: 9.25, color: MUTED });
    w.gap(1);
    project.bullets.forEach((b) => w.bullet(b));
  }

  // ── skills ──
  w.section("Skills");
  for (const group of resume.skills) {
    w.text(`${group.group}: ${group.items.join(", ")}`, { size: 9.25, leading: 1.32 });
  }

  // ── education ──
  w.section("Education");
  for (const entry of resume.education) {
    w.titleRow(entry.degree, entry.year);
    w.text(entry.school, { size: 9.5, color: MUTED });
  }

  // ── languages ──
  w.section("Languages");
  w.text(resume.languages.map((l) => `${l.name} (${l.level})`).join(", "), { size: 9.5 });

  w.gap(10);
  w.text(`Last updated ${resume.updated}`, { size: 8.5, color: MUTED });

  const bytes = await doc.save();

  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      // inline: opens in the browser's viewer on a plain click; the download
      // attribute on the site's buttons saves it under this name instead.
      "Content-Disposition": `inline; filename="${profile.resumePdfName}"`,
    },
  });
}
