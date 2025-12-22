import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";
import { getMotivationQuote, type MotivationQuote as MotivationQuoteType } from "../services/ai";

type MotivationQuoteProps = {
  compact?: boolean;
};

export function MotivationQuote({ compact }: MotivationQuoteProps) {
  const [quote, setQuote] = useState<MotivationQuoteType | null>(null);

  async function refresh() {
    const next = await getMotivationQuote();
    setQuote(next);
  }

  useEffect(() => {
    void refresh();
  }, []);

  if (!quote) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.kicker}>Daily spark</Text>
        <Text style={styles.text}>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.kicker}>Daily spark</Text>
        {!compact && (
          <Pressable onPress={() => void refresh()} hitSlop={12}>
            <Text style={styles.refresh}>Refresh</Text>
          </Pressable>
        )}
      </View>
      <Text style={styles.text}>"{quote.text}"</Text>
      {!!quote.author && <Text style={styles.author}>— {quote.author}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  kicker: {
    color: colors.mutedText,
    fontSize: 12,
    letterSpacing: 0.3,
    textTransform: "uppercase"
  },
  refresh: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700"
  },
  text: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600"
  },
  author: {
    color: colors.mutedText,
    fontSize: 12
  }
});

