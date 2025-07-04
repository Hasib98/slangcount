import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#faf8ff", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
        Settings
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          elevation: 1,
        }}
      >
        <Text style={{ fontSize: 16 }}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          elevation: 1,
        }}
      >
        <Text style={{ fontSize: 16 }}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 20,
          elevation: 1,
        }}
        onPress={handleLogout}
      >
        <Text style={{ fontSize: 16, color: "#e74c3c" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
