/**
 * Emits a JSON-LD graph into the document.
 *
 * A server component with no "use client", so the script lands in the initial
 * HTML and ships no JavaScript. Next's <Script> is deliberately not used —
 * ld+json is data, not code, and doesn't want a loading strategy.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own typed content, never user input. Stringify still
      // escapes `<` so a stray angle bracket in copy can't close the tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
