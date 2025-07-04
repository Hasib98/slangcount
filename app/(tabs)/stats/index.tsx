import { Text, View } from "react-native";
// You can use a real chart library like react-native-svg-charts for production

export default function StatsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#faf8ff",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
        Stats
      </Text>
      {/* Placeholder for line chart */}
      <View
        style={{
          width: 300,
          height: 180,
          backgroundColor: "#fff",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
          elevation: 2,
        }}
      >
        <Text style={{ color: "#aaa" }}>[Line Chart Here]</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 300,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>123</Text>
          <Text style={{ color: "#aaa", fontSize: 13 }}>Slangs</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>5d</Text>
          <Text style={{ color: "#aaa", fontSize: 13 }}>Streak</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>12</Text>
          <Text style={{ color: "#aaa", fontSize: 13 }}>Sessions</Text>
        </View>
      </View>
    </View>
  );
}
