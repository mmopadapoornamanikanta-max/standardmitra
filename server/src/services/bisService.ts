/**
 * BIS knowledge source adapter.
 *
 * Defines the interface that all BIS data sources must implement.
 * The retrieval service uses this interface — it never knows whether
 * it is talking to a mock, a vector index, or a live BIS API.
 *
 * IMPORTANT: Do NOT assume a public BIS API exists.
 * When an official BIS data source is available, create a concrete
 * implementation of BisSource and register it in createBisSource().
 */

import type { RetrievalSource } from "../types/retrieval.js";

/** Contract every BIS source adapter must satisfy. */
export interface BisSource {
  search(query: string): Promise<RetrievalSource[]>;
}

/* ── Mock implementation ──────────────────────────────────── */

/**
 * Sample retrieval results used in mock mode.
 * Content mirrors the frontend mock responses — clearly prototype-level.
 * IS numbers are intentionally left as "IS XXXX" (no real standard invented).
 */
const MOCK_SOURCES: RetrievalSource[] = [
  {
    id: "src-1",
    standardNumber: "IS XXXX",
    title: "BIS Product Certification — General Requirements",
    clause: "Clause 6.2 — Licensing Conditions",
    snippet:
      "Products under this scheme shall bear the Standard Mark only when the manufacturer holds a valid BIS licence. The mark shall not be used on any product that does not conform to the relevant Indian Standard.",
    relevanceScore: 0.92,
    sourceIdentifier: "mock:certification-general",
  },
  {
    id: "src-2",
    standardNumber: "IS XXXX",
    title: "Grades of Gold and Gold Alloys — Jewellery and Artefacts",
    clause: "Clause 3 — Hallmarking",
    snippet:
      "Hallmarking provides an assurance of purity of gold jewellery to the consumer. A BIS hallmark includes the BIS logo, fineness number, Assaying and Hallmarking Centre mark, and jeweller's identification mark.",
    relevanceScore: 0.89,
    sourceIdentifier: "mock:gold-hallmarking",
  },
  {
    id: "src-3",
    standardNumber: "IS XXXX",
    title: "Steel Tubes for Structural Purposes",
    clause: "Clause 4.1 — General Requirements",
    snippet:
      "Every tube shall conform to the chemical composition and mechanical properties laid down in this standard. The manufacturer shall ensure full traceability of each batch.",
    relevanceScore: 0.74,
    sourceIdentifier: "mock:steel-tubes",
  },
  {
    id: "src-4",
    standardNumber: "IS XXXX",
    title: "Criteria for BIS Product Certification Scheme",
    clause: "Clause 5 — Scope of Coverage",
    snippet:
      "Certain categories of products are mandatorily required to carry the Standard Mark. The list of mandatory products is notified under the relevant Ministry order.",
    relevanceScore: 0.85,
    sourceIdentifier: "mock:certification-scope",
  },
];

const HALLMARK_KEYWORDS = ["hallmark", "gold", "huid", "purity", "jewellery", "fineness"];
const COVERAGE_KEYWORDS = ["mandatory", "covered", "which product", "scope"];
const CERTIFICATION_KEYWORDS = ["certif", "isi mark", "isi", "licence", "standard mark"];

class MockBisSource implements BisSource {
  async search(query: string): Promise<RetrievalSource[]> {
    const q = query.toLowerCase();

    let scored = MOCK_SOURCES.map((src) => ({ ...src }));

    if (HALLMARK_KEYWORDS.some((k) => q.includes(k))) {
      scored = scored.map((s) =>
        s.id === "src-2" ? { ...s, relevanceScore: 0.97 } : s,
      );
    } else if (COVERAGE_KEYWORDS.some((k) => q.includes(k))) {
      scored = scored.map((s) =>
        s.id === "src-4" ? { ...s, relevanceScore: 0.97 } : s,
      );
    } else if (CERTIFICATION_KEYWORDS.some((k) => q.includes(k))) {
      scored = scored.map((s) =>
        s.id === "src-1" ? { ...s, relevanceScore: 0.97 } : s,
      );
    }

    return scored
      .filter((s) => s.relevanceScore >= 0.7)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);
  }
}

/* ── Factory ──────────────────────────────────────────────── */

export function createBisSource(mode: "mock" | "index"): BisSource {
  if (mode === "mock") return new MockBisSource();

  /* When BIS_SOURCE_MODE=index, a real vector-index adapter should be
   * returned here. Throw clearly rather than silently falling back. */
  throw new Error(
    'BIS_SOURCE_MODE="index" is not yet implemented. ' +
      "Set BIS_SOURCE_MODE=mock to run with sample data.",
  );
}
