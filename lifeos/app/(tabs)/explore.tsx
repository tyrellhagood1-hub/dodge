import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "../../components/Card";
import { colors } from "../../constants/colors";

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Explore</Text>
      <Text style={styles.sub}>Quick links and ideas.</Text>

      <Card>
        <Text style={styles.title}>Starter sections</Text>
        <View style={styles.list}>
          <Text style={styles.item}>- Fitness</Text>
          <Text style={styles.item}>- Food</Text>
          <Text style={styles.item}>- Money</Text>
          <Text style={styles.item}>- Mindset</Text>
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
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10
  },
  list: {
    gap: 6
  },
  item: {
    color: colors.mutedText,
    fontWeight: "700"
  }
});

