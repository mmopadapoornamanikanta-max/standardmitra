import type { Conversation, Message } from "../types/chat";
import { SAMPLE_CITATIONS } from "./mockCitations";

let seq = 200;
const uid = () => `demo${++seq}`;
const ts = (minsAgo: number) => new Date(Date.now() - minsAgo * 60_000);

const DEMO_NOTE = "Demo response — verified BIS source information will appear here when the live knowledge service is connected.";

export const DEMO_CONVERSATIONS: Conversation[] = [
  /* ── Understanding Indian Standards ──────────────────────── */
  {
    id: "conv1",
    title: "Understanding Indian Standards",
    messages: [
      {
        id: uid(),
        role: "user",
        content: "What is an Indian Standard?",
        timestamp: ts(32),
      } satisfies Message,
      {
        id: uid(),
        role: "assistant",
        content:
          "An Indian Standard (IS) is a documented technical standard developed or adopted by the Bureau of Indian Standards (BIS).\n\nIndian Standards establish requirements, specifications, test methods, and guidance for products, services, processes, or systems. They help ensure:\n\n• Quality and safety of products\n• Consistency across manufacturers\n• Consumer protection\n• Fair trade practices\n\nEach Indian Standard is identified by an IS number — for example, IS XXXX:20XX.\n\n" + DEMO_NOTE,
        citations: [SAMPLE_CITATIONS[4]],
        suggestions: [
          "What does BIS certification mean?",
          "How do I find the right BIS standard?",
          "Help me understand a standard clause",
        ],
        timestamp: ts(31),
      } satisfies Message,
      {
        id: uid(),
        role: "user",
        content: "What does BIS certification mean?",
        timestamp: ts(30),
      } satisfies Message,
      {
        id: uid(),
        role: "assistant",
        content:
          "BIS certification indicates that a product conforms to the applicable Indian Standard and the relevant BIS certification scheme requirements.\n\nWhen a product carries the ISI mark, it means:\n\n• The manufacturer holds a valid BIS licence\n• The product has been tested to comply with the specified Indian Standard\n• BIS conducts periodic surveillance to verify ongoing compliance\n\n" + DEMO_NOTE,
        citations: [SAMPLE_CITATIONS[1]],
        suggestions: [
          "What does a BIS certification mark mean?",
          "Which products need mandatory BIS certification?",
        ],
        timestamp: ts(29),
      } satisfies Message,
    ],
  },

  /* ── BIS certification basics ─────────────────────────────── */
  {
    id: "conv2",
    title: "BIS certification basics",
    messages: [
      {
        id: uid(),
        role: "user",
        content: "What does a BIS certification mark mean?",
        timestamp: ts(125),
      } satisfies Message,
      {
        id: uid(),
        role: "assistant",
        content:
          "A BIS certification mark — commonly known as the ISI mark — is a quality certification mark issued by the Bureau of Indian Standards.\n\nThe ISI mark on a product indicates:\n\n• The manufacturer is licensed by BIS\n• The product conforms to the specified Indian Standard\n• The product has been tested in a recognised laboratory\n\nFor gold jewellery, BIS uses a separate hallmark rather than the ISI mark. For some product categories, carrying the ISI mark is mandatory under government orders.\n\n" + DEMO_NOTE,
        citations: [SAMPLE_CITATIONS[1]],
        suggestions: [
          "How do I verify a BIS certified product?",
          "What is mandatory BIS certification?",
          "What is a BIS hallmark?",
        ],
        timestamp: ts(124),
      } satisfies Message,
    ],
  },

  /* ── Finding a product standard ───────────────────────────── */
  {
    id: "conv3",
    title: "Finding a product standard",
    messages: [
      {
        id: uid(),
        role: "user",
        content: "How do I find the right BIS standard for my product?",
        timestamp: ts(1445),
      } satisfies Message,
      {
        id: uid(),
        role: "assistant",
        content:
          "To find the right Indian Standard for your product, you can:\n\n• Visit the BIS website and use the IS catalogue or search function\n• Search by product category or keyword\n• Contact your nearest BIS regional or branch office\n• Check the relevant Ministry's notification for mandatory standards\n\nFor mandatory certification products, the applicable IS number and scope are specified in the corresponding Ministry order.\n\n" + DEMO_NOTE,
        citations: [SAMPLE_CITATIONS[3]],
        suggestions: [
          "What is BIS certification?",
          "What does a BIS certification mark mean?",
        ],
        timestamp: ts(1444),
      } satisfies Message,
    ],
  },

  /* ── Understanding a standard clause ──────────────────────── */
  {
    id: "conv4",
    title: "Understanding a standard clause",
    messages: [
      {
        id: uid(),
        role: "user",
        content: "Help me understand a standard clause",
        timestamp: ts(2885),
      } satisfies Message,
      {
        id: uid(),
        role: "assistant",
        content:
          "A standard clause is a numbered section within an Indian Standard that specifies a particular requirement, test method, or item of guidance.\n\nA typical Indian Standard contains clauses covering:\n\n• Scope — what the standard applies to\n• Definitions — key terms used\n• Materials — permitted materials and compositions\n• Dimensions and tolerances\n• Performance requirements\n• Test methods\n• Marking and labelling\n\nWhen a BIS citation references a clause, it identifies the specific part of the standard relevant to your question.\n\n" + DEMO_NOTE,
        citations: [SAMPLE_CITATIONS[4]],
        suggestions: [
          "What is an Indian Standard?",
          "What does BIS certification mean?",
        ],
        timestamp: ts(2884),
      } satisfies Message,
    ],
  },

  /* ── Hallmarking questions ─────────────────────────────────── */
  {
    id: "conv5",
    title: "Hallmarking questions",
    messages: [
      {
        id: uid(),
        role: "user",
        content: "How do I verify a gold hallmark?",
        timestamp: ts(4325),
      } satisfies Message,
      {
        id: uid(),
        role: "assistant",
        content:
          "A BIS hallmark on gold jewellery includes:\n\n• BIS logo (triangular mark)\n• Fineness or purity (e.g. 916 for 22-karat gold)\n• Assaying and Hallmarking Centre (AHC) identifier\n• Jeweller's BIS registration mark\n• HUID — Hallmark Unique Identification (6-character alphanumeric)\n\nYou can verify a hallmark by entering the HUID on the BIS Care mobile app or the official BIS portal. Each HUID is registered and uniquely traceable.\n\n" + DEMO_NOTE,
        citations: [SAMPLE_CITATIONS[2]],
        suggestions: [
          "Is hallmarking mandatory for gold jewellery?",
          "What purity levels exist for gold?",
        ],
        timestamp: ts(4324),
      } satisfies Message,
    ],
  },
];
