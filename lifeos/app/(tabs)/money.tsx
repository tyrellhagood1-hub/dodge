import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "../../components/Card";
import { ProgressRing } from "../../components/ProgressRing";
import { colors } from "../../constants/colors";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function MoneyScreen() {
  // Simple placeholders until you plug in real finance data.
  const monthBudget = 2400;
  const spent = 1260;
  const saved = 320;
  const billsUpcoming = 3;

  const budgetP = useMemo(() => clamp01(spent / monthBudget), [spent, monthBudget]);
  const saveP = useMemo(() => clamp01(saved / 600), [saved]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Money</Text>
      <Text style={styles.sub}>Make the plan. Follow the plan.</Text>

      <Card style={styles.rowCard}>
        <View style={styles.row}>
          <ProgressRing progress={budgetP} label="Budget" color={colors.warning} />
          <View style={styles.rowText}>
            <Text style={styles.kpiTitle}>Month spend</Text>
            <Text style={styles.kpiValue}>
              ${spent} / ${monthBudget}
            </Text>
            <Text style={styles.kpiMeta}>{billsUpcoming} bills upcoming</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.rowCard}>
        <View style={styles.row}>
          <ProgressRing progress={saveP} label="Savings" color={colors.success} />
          <View style={styles.rowText}>
            <Text style={styles.kpiTitle}>Monthly savings</Text>
            <Text style={styles.kpiValue}>${saved} saved</Text>
            <Text style={styles.kpiMeta}>Goal: $600</Text>
          </View>
        </View>
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

