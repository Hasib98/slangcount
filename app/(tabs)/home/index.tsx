import { StyleSheet, View } from "react-native";
import AvatarMenu from "../../../components/AvatarMenu";
import DonutChart from "../../../components/DonutChart";
import HomeSlangButton from "../../../components/HomeSlangButton";
import ProgressBar from "../../../components/ProgressBar";
import StatCard from "../../../components/StatCard";

export default function HomeScreen() {
  const slangCount = 4805;
  const slangGoal = 6000;

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View />
        <View />
        <AvatarMenu />
      </View>
      {/* Donut Chart Card */}
      <View style={styles.card}>
        <DonutChart value={slangCount} max={slangGoal} />
        <HomeSlangButton onPress={() => {}} style={styles.slangButton} />
      </View>
      {/* Stats Row */}
      <View style={styles.statsRow}>
        <StatCard label="Session" value="1h 14m" />
        <StatCard label="Words" value="360" />
        <StatCard label="Streak" value="5 days" />
      </View>
      {/* Progress Section */}
      <View style={styles.progressSection}>
        <ProgressBar data={[16, 17, 18, 19, 20, 21, 22]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#faf8ff" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 50,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    margin: 20,
    alignItems: "center",
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  slangButton: { position: "absolute", bottom: -30, alignSelf: "center" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  progressSection: { margin: 20 },
});
