import React from "react";

/**
 * Parses a string with _word_ markers and returns React nodes
 * with those segments wrapped in <em>.
 * Example: "Own the interface you _ship_."
 *   => ["Own the interface you ", <em>ship</em>, "."]
 */
export function editorial(text: string): React.ReactNode[] {
  const parts = text.split(/_(.*?)_/g);
  return parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}
