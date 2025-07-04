import { Text, View } from "react-native";

export default function StatCard({ label, value }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 16,
        marginHorizontal: 4,
        elevation: 1,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{value}</Text>
      <Text style={{ color: "#aaa", fontSize: 13 }}>{label}</Text>
    </View>
  );
}
