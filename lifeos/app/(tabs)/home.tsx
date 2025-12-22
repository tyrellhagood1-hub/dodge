import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "../../components/Card";
import { MotivationQuote } from "../../components/MotivationQuote";
import { ProgressRing } from "../../components/ProgressRing";
import { colors } from "../../constants/colors";
import { getFoodSummary } from "../../services/meals";
import { getFitnessSummary } from "../../services/workouts";

type HomeSnapshot = {
  fitness: number;
  food: number;
  money: number;
  mindset: number;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function HomeScreen() {
  const [snapshot, setSnapshot] = useState<HomeSnapshot | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [fitness, food] = await Promise.all([getFitnessSummary(), getFoodSummary()]);
      const fitnessP = clamp01(fitness.weeklyProgress);
      const foodP = clamp01(food.macros.calories / food.macros.caloriesGoal);

      // placeholders until real modules exist for money/mindset
      const moneyP = 0.52;
      const mindsetP = 0.68;

      if (mounted) setSnapshot({ fitness: fitnessP, food: foodP, money: moneyP, mindset: mindsetP });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const rings = useMemo(() => {
    const s = snapshot ?? { fitness: 0, food: 0, money: 0, mindset: 0 };
    return [
      { key: "Fitness", p: s.fitness, color: colors.primary },
      { key: "Food", p: s.food, color: colors.success },
      { key: "Money", p: s.money, color: colors.warning },
      { key: "Mindset", p: s.mindset, color: colors.danger }
    ];
  }, [snapshot]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>LifeOS</Text>
      <Text style={styles.sub}>Your day, at a glance.</Text>

      <Card>
        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.ringRow}>
          {rings.map((r) => (
            <View key={r.key} style={styles.ringItem}>
              <ProgressRing progress={r.p} label={r.key} color={r.color} />
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <MotivationQuote />
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
    fontSize: 30,
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
  ringRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  ringItem: {
    width: "48%"
  }
});

