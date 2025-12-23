export const colors = {
  bg: "#0B1220",
  card: "#111B2E",
  text: "#EAF0FF",
  mutedText: "rgba(234,240,255,0.72)",
  border: "rgba(234,240,255,0.10)",
  primary: "#6EE7F9",
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#FB7185"
} as const;

export type AppColors = typeof colors;
