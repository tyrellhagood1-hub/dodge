import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "../../components/Card";
import { MotivationQuote } from "../../components/MotivationQuote";
import { ProgressRing } from "../../components/ProgressRing";
import { colors } from "../../constants/colors";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function MindsetScreen() {
  // Simple placeholders until you wire real data.
  const meditationMinutes = 8;
  const meditationGoal = 12;
  const journalingDone = true;
  const gratitudeDone = false;

  const medP = useMemo(() => clamp01(meditationMinutes / meditationGoal), [meditationMinutes, meditationGoal]);
  const habitsDone = (journalingDone ? 1 : 0) + (gratitudeDone ? 1 : 0);
  const habitsP = useMemo(() => clamp01(habitsDone / 2), [habitsDone]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Mindset</Text>
      <Text style={styles.sub}>Win the inner game.</Text>

      <Card style={styles.rowCard}>
        <View style={styles.row}>
          <ProgressRing progress={medP} label="Meditate" color={colors.danger} />
          <View style={styles.rowText}>
            <Text style={styles.kpiTitle}>Meditation</Text>
            <Text style={styles.kpiValue}>
              {meditationMinutes} / {meditationGoal} minutes
            </Text>
            <Text style={styles.kpiMeta}>Keep it simple: breathe + notice.</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.rowCard}>
        <View style={styles.row}>
          <ProgressRing progress={habitsP} label="Habits" color={colors.primary} />
          <View style={styles.rowText}>
            <Text style={styles.kpiTitle}>Micro-habits</Text>
            <Text style={styles.kpiValue}>{habitsDone}/2 completed</Text>
            <Text style={styles.kpiMeta}>
              Journaling: {journalingDone ? "Done" : "Pending"} · Gratitude: {gratitudeDone ? "Done" : "Pending"}
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <MotivationQuote compact />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: colors.bg
  },
  h1: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800"
  },
  sub: {
    color: colors.mutedText,
    marginTop: -6,
    marginBottom: 6
  },
  rowCard: {
    padding: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  rowText: {
    flex: 1
  },
  kpiTitle: {
    color: colors.mutedText,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.3
  },
  kpiValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2
  },
  kpiMeta: {
    color: colors.mutedText,
    marginTop: 2
  }
});

