import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "../../components/Card";
import { ProgressRing } from "../../components/ProgressRing";
import { colors } from "../../constants/colors";
import { getFoodSummary, type FoodSummary } from "../../services/meals";

function pct(n: number, d: number) {
  if (d <= 0) return 0;
  return Math.max(0, Math.min(1, n / d));
}

export default function FoodScreen() {
  const [data, setData] = useState<FoodSummary | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const next = await getFoodSummary();
      if (mounted) setData(next);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const rings = useMemo(() => {
    const m = data?.macros;
    const calP = m ? pct(m.calories, m.caloriesGoal) : 0;
    const proP = m ? pct(m.proteinG, m.proteinGoalG) : 0;
    const hydP = data ? pct(data.hydrationMl, data.hydrationGoalMl) : 0;
    return { calP, proP, hydP };
  }, [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Food</Text>
      <Text style={styles.sub}>Fuel for performance.</Text>

      <Card>
        <Text style={styles.sectionTitle}>Targets</Text>
        <View style={styles.ringsRow}>
          <View style={styles.ring}>
            <ProgressRing progress={rings.calP} label="Calories" color={colors.success} />
            <Text style={styles.kpi}>
              {data ? `${data.macros.calories}/${data.macros.caloriesGoal}` : "—"}
            </Text>
          </View>
          <View style={styles.ring}>
            <ProgressRing progress={rings.proP} label="Protein" color={colors.primary} />
            <Text style={styles.kpi}>{data ? `${data.macros.proteinG}g/${data.macros.proteinGoalG}g` : "—"}</Text>
          </View>
          <View style={styles.ring}>
            <ProgressRing progress={rings.hydP} label="Water" color={colors.warning} />
            <Text style={styles.kpi}>
              {data ? `${Math.round(data.hydrationMl / 100) / 10}L/${Math.round(data.hydrationGoalMl / 100) / 10}L` : "—"}
            </Text>
          </View>
        </View>
        {!!data && (
          <Text style={styles.meta}>
            Macros: {data.macros.carbsG}g carbs · {data.macros.fatG}g fat
          </Text>
        )}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Meals</Text>
        <View style={styles.list}>
          {(data?.meals ?? []).map((m) => (
            <View key={m.name} style={styles.listRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.listName}>{m.name}</Text>
                {!!m.note && <Text style={styles.listNote}>{m.note}</Text>}
              </View>
              <Text style={styles.listRight}>{m.calories} kcal</Text>
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
  sectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10
  },
  ringsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ring: {
    alignItems: "center",
    width: "32%"
  },
  kpi: {
    marginTop: 8,
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "700"
  },
  meta: {
    marginTop: 10,
    color: colors.mutedText
  },
  list: {
    marginTop: 4
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: 10
  },
  listName: {
    color: colors.text,
    fontWeight: "800"
  },
  listNote: {
    color: colors.mutedText,
    marginTop: 2
  },
  listRight: {
    color: colors.text,
    fontWeight: "800"
  }
});

