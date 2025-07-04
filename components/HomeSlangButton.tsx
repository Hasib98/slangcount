import { Text, TouchableOpacity } from "react-native";

export default function HomeSlangButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#7c3aed",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold" }}>+</Text>
    </TouchableOpacity>
  );
}
