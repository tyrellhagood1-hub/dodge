import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "../../components/Card";
import { ProgressRing } from "../../components/ProgressRing";
import { colors } from "../../constants/colors";
import { getFitnessSummary, type FitnessSummary } from "../../services/workouts";

export default function FitnessScreen() {
  const [data, setData] = useState<FitnessSummary | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const next = await getFitnessSummary();
      if (mounted) setData(next);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Fitness</Text>
      <Text style={styles.sub}>Train smart. Recover hard.</Text>

      <Card style={styles.rowCard}>
        <View style={styles.row}>
          <ProgressRing progress={data?.weeklyProgress ?? 0} label="Week" color={colors.primary} />
          <View style={styles.rowText}>
            <Text style={styles.kpiTitle}>Weekly consistency</Text>
            <Text style={styles.kpiValue}>
              {Math.round((data?.weeklyProgress ?? 0) * 100)}% of target
            </Text>
            <Text style={styles.kpiMeta}>
              {data ? `${data.steps.toLocaleString()} steps · ${data.caloriesBurned} kcal` : "Loading…"}
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Today’s session</Text>
        <Text style={styles.workoutTitle}>{data?.today.title ?? "Loading…"}</Text>
        {!!data && (
          <Text style={styles.workoutMeta}>
            {data.today.durationMinutes} min · {data.today.completed ? "Completed" : "Planned"}
          </Text>
        )}
        <View style={styles.list}>
          {(data?.today.items ?? []).map((it) => (
            <View key={it.name} style={styles.listRow}>
              <Text style={styles.listName}>{it.name}</Text>
              <Text style={styles.listSets}>{it.sets}</Text>
            </View>
          ))}
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
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10
  },
  workoutTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800"
  },
  workoutMeta: {
    color: colors.mutedText,
    marginTop: 2,
    marginBottom: 10
  },
  list: {
    gap: 10,
    marginTop: 4
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopColor: colors.border,
    borderTopWidth: 1
  },
  listName: {
    color: colors.text,
    fontWeight: "700"
  },
  listSets: {
    color: colors.mutedText,
    fontWeight: "700"
  }
});

