import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome Home!</Text>
      <Text>
        {" "}
        {isLoaded ? user?.primaryEmailAddress?.emailAddress : "loading"}
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
