import { Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

export default function DonutChart({ value, max }) {
  const radius = 60;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          stroke="#eee"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#7c3aed"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={{ position: "absolute", fontSize: 32, fontWeight: "bold" }}>
        {value}
      </Text>
    </View>
  );
}
