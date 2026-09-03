import type { Citation } from "../types/chat";
import { SAMPLE_CITATIONS } from "./mockCitations";

export type SimulatedResponse = {
  content: string;
  citations?: Citation[];
  suggestions?: string[];
};

const RESPONSE_INDIAN_STANDARD: SimulatedResponse = {
  content:
    "An Indian Standard (IS) is a documented technical standard developed or adopted by the Bureau of Indian Standards (BIS).\n\nIndian Standards establish requirements, specifications, test methods, and guidance for products, services, processes, or systems. They help ensure:\n\n• Quality and safety of products\n• Consistency across manufacturers\n• Consumer protection\n• Fair trade practices\n\nEach Indian Standard is identified by an IS number — for example, IS XXXX:20XX.\n\nDemo response — verified BIS source information will appear here when the live knowledge service is connected.",
  citations: [SAMPLE_CITATIONS[4]],
  suggestions: [
    "What does BIS certification mean?",
    "How do I find the right BIS standard?",
    "Help me understand a standard clause",
  ],
};

const RESPONSE_FIND_STANDARD: SimulatedResponse = {
  content:
    "To find the right Indian Standard for your product or requirement, you can:\n\n• Visit the BIS website and use the IS catalogue or search function\n• Search by product category or keyword\n• Contact your nearest BIS regional or branch office\n• Check the relevant Ministry's notification for mandatory standards\n\nIf you know the product type, BIS typically lists the applicable IS number in its published catalogue. For mandatory certification products, the IS number and scope are specified in the corresponding Ministry order.\n\nDemo response — verified BIS source information will appear here when the live knowledge service is connected.",
  citations: [SAMPLE_CITATIONS[1]],
  suggestions: [
    "What is BIS certification?",
    "What does a BIS certification mark mean?",
    "Which products need mandatory certification?",
  ],
};

const RESPONSE_CERTIFICATION: SimulatedResponse = {
  content:
    "BIS certification indicates that a product conforms to the applicable Indian Standard and the relevant BIS certification scheme requirements.\n\nWhen a product carries the ISI mark, it means:\n\n• The manufacturer holds a valid BIS licence\n• The product has been tested to comply with the specified Indian Standard\n• BIS conducts periodic surveillance to verify ongoing compliance\n\nBIS operates several certification schemes, including:\n\n• Product certification (Scheme I)\n• Management system certification\n• Hallmarking for precious metals\n\nDemo response — verified BIS source information will appear here when the live knowledge service is connected.",
  citations: [SAMPLE_CITATIONS[1]],
  suggestions: [
    "What does a BIS certification mark mean?",
    "Which products need mandatory BIS certification?",
    "How do I verify a product's BIS certification?",
  ],
};

const RESPONSE_CERTIFICATION_MARK: SimulatedResponse = {
  content:
    "A BIS certification mark — commonly known as the ISI mark — is a quality certification mark issued by the Bureau of Indian Standards.\n\nThe ISI mark on a product indicates:\n\n• The manufacturer is licensed by BIS\n• The product conforms to the specified Indian Standard\n• The product has been tested in a recognised laboratory\n\nFor gold jewellery, BIS uses a separate hallmark rather than the ISI mark.\n\nFor some product categories, carrying the ISI mark is mandatory under government orders. For others, it is voluntary but carries significant consumer trust value.\n\nDemo response — verified BIS source information will appear here when the live knowledge service is connected.",
  citations: [SAMPLE_CITATIONS[1]],
  suggestions: [
    "How do I verify a BIS certified product?",
    "What is mandatory BIS certification?",
    "What is a BIS hallmark?",
  ],
};

const RESPONSE_STANDARD_CLAUSE: SimulatedResponse = {
  content:
    "A standard clause is a numbered section within an Indian Standard that specifies a particular requirement, test method, or item of guidance.\n\nA typical Indian Standard contains clauses covering:\n\n• Scope — what the standard applies to\n• Definitions — key terms used\n• Materials — permitted materials and compositions\n• Dimensions and tolerances\n• Performance requirements\n• Test methods\n• Marking and labelling\n\nWhen a BIS citation references a clause, it identifies the specific part of the standard that applies to your question.\n\nDemo response — verified BIS source information will appear here when the live knowledge service is connected.",
  citations: [SAMPLE_CITATIONS[4]],
  suggestions: [
    "What is an Indian Standard?",
    "How do I find the right BIS standard?",
    "What does BIS certification mean?",
  ],
};

const RESPONSE_HALLMARK: SimulatedResponse = {
  content:
    "A BIS hallmark on gold jewellery includes:\n\n• BIS logo (triangular mark)\n• Fineness or purity (e.g. 916 for 22-karat gold)\n• Assaying and Hallmarking Centre (AHC) identifier\n• Jeweller's BIS registration mark\n• HUID — Hallmark Unique Identification (6-character alphanumeric)\n\nYou can verify a hallmark by entering the HUID on the BIS Care mobile app or the official BIS portal. Each HUID is registered and uniquely traceable.\n\nDemo response — verified BIS source information will appear here when the live knowledge service is connected.",
  citations: [SAMPLE_CITATIONS[2]],
  suggestions: [
    "Is hallmarking mandatory for gold jewellery?",
    "What purity levels exist for gold?",
    "What is an Indian Standard?",
  ],
};

const RESPONSE_MANDATORY: SimulatedResponse = {
  content:
    "Certain product categories are mandatorily required to carry the ISI mark (BIS certification) before they can be sold in India.\n\nThese mandatory products are notified by the relevant Ministry under specific orders. Manufacturers must:\n\n• Obtain a valid BIS licence before placing goods on the market\n• Ensure products conform to the applicable Indian Standard\n• Display the ISI mark only on certified products\n\nSelling mandatory products without valid BIS certification is prohibited under the BIS Act.\n\nDemo response — verified BIS source information will appear here when the live knowledge service is connected.",
  citations: [SAMPLE_CITATIONS[3]],
  suggestions: [
    "How do I apply for BIS certification?",
    "What is the ISI mark?",
    "How do I find the right BIS standard?",
  ],
};

const RESPONSE_DEFAULT: SimulatedResponse = {
  content:
    "I'm currently running in demo mode.\n\nThis question will be answered using verified BIS source information when the live knowledge service is connected.\n\nIn the meantime, I can help you with questions about:\n\n• What an Indian Standard is\n• How BIS certification works\n• What the ISI mark means\n• Understanding standard clauses\n• Gold hallmarking and verification",
  citations: [],
  suggestions: [
    "What is an Indian Standard?",
    "What does BIS certification mean?",
    "How do I verify a hallmark?",
  ],
};

/* Ordered by priority — first match wins */
const RESPONSE_MAP: Array<{ keywords: string[]; response: SimulatedResponse }> = [
  {
    keywords: ["hallmark", "gold", "huid", "purity", "jewellery", "jewelry", "karat"],
    response: RESPONSE_HALLMARK,
  },
  {
    keywords: ["mandatory", "compulsory", "which product", "must certif", "required certif"],
    response: RESPONSE_MANDATORY,
  },
  {
    keywords: ["certification mark", "isi mark", "what is the mark", "what does the mark", "what does a bis cert"],
    response: RESPONSE_CERTIFICATION_MARK,
  },
  {
    keywords: ["certif", "licence", "license", "what is bis", "what does bis"],
    response: RESPONSE_CERTIFICATION,
  },
  {
    keywords: ["clause", "section", "understand a standard"],
    response: RESPONSE_STANDARD_CLAUSE,
  },
  {
    keywords: ["find", "search", "look up", "locate", "right standard", "which standard"],
    response: RESPONSE_FIND_STANDARD,
  },
  {
    keywords: ["indian standard", "what is is", "is number", "is xxxx"],
    response: RESPONSE_INDIAN_STANDARD,
  },
];

export function getSimulatedResponse(query: string): SimulatedResponse {
  const q = query.toLowerCase();
  for (const { keywords, response } of RESPONSE_MAP) {
    if (keywords.some((kw) => q.includes(kw))) {
      return response;
    }
  }
  return RESPONSE_DEFAULT;
}
