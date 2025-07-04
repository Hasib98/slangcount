import { Text, View } from "react-native";

export default function ProgressBar({ data }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
      }}
    >
      {data.map((day, idx) => (
        <View key={idx} style={{ alignItems: "center", marginHorizontal: 4 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: "#7c3aed",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: idx === data.length - 1 ? "#7c3aed" : "#fff",
            }}
          >
            <Text
              style={{
                color: idx === data.length - 1 ? "#fff" : "#7c3aed",
                fontWeight: "bold",
              }}
            >
              {day}
            </Text>
          </View>
          <Text style={{ fontSize: 10, color: "#aaa" }}>Mon</Text>
        </View>
      ))}
    </View>
  );
}
