import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a"
      }}
    >
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
        🚀 My App Is Live
      </Text>
      <Text style={{ color: "#94a3b8", marginTop: 12 }}>
        Built with Expo + Cursor
      </Text>
    </View>
  );
}

