/* Re-export shared types so existing component imports don't break */
export type { Citation, Message, Conversation } from "../types/chat";

/* Re-export data from dedicated modules */
export { SAMPLE_CITATIONS } from "./mockCitations";
export { DEMO_CONVERSATIONS, DEMO_CONVERSATIONS as SAMPLE_CONVERSATIONS } from "./mockConversations";
export { getSimulatedResponse } from "./mockResponses";
export type { SimulatedResponse } from "./mockResponses";

/* ── UI constants ───────────────────────────────────────────── */

export const QUICK_ACTIONS = [
  "BIS certification",
  "Hallmark",
  "Product standard",
  "IS number",
  "Consumer rights",
  "ISI mark",
];

export const PROMPT_CARDS = [
  { id: "p1", title: "What is an Indian Standard?",           icon: "file"   },
  { id: "p2", title: "How do I find the right BIS standard?", icon: "search" },
  { id: "p3", title: "What does a BIS certification mark mean?", icon: "badge" },
  { id: "p4", title: "Help me understand a standard clause",  icon: "check"  },
];
