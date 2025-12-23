import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { colors } from "../constants/colors";

type ProgressRingProps = {
  /** 0..1 */
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function ProgressRing({
  progress,
  size = 64,
  strokeWidth = 10,
  label,
  color = colors.primary
}: ProgressRingProps) {
  const p = clamp01(progress);
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const dashOffset = c * (1 - p);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={dashOffset}
          fill="none"
          rotation={-90}
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.value}>{Math.round(p * 100)}%</Text>
        {!!label && <Text style={styles.label}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  value: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700"
  },
  label: {
    marginTop: 2,
    color: colors.mutedText,
    fontSize: 10
  }
});

