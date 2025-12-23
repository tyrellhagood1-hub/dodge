export type MotivationQuote = {
  text: string;
  author?: string;
};

const QUOTES: MotivationQuote[] = [
  { text: "Small steps, daily — consistency is the real flex.", author: "LifeOS" },
  { text: "Don’t wait for motivation. Build systems.", author: "James Clear (paraphrased)" },
  { text: "Discipline is choosing what you want most over what you want now.", author: "Abraham Lincoln (attributed)" },
  { text: "You can do hard things — especially the boring ones.", author: "LifeOS" },
  { text: "Focus on the next rep, the next bite, the next choice.", author: "LifeOS" }
];

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function getMotivationQuote(): Promise<MotivationQuote> {
  // Placeholder “AI” service: deterministic-ish selection by day.
  const day = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < day.length; i++) hash = (hash * 31 + day.charCodeAt(i)) >>> 0;
  const idx = hash % QUOTES.length;
  await delay(150);
  return QUOTES[idx] ?? QUOTES[0]!;
}

