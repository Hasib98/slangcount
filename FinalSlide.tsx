import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Final() {
  const router = useRouter();
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    router.replace("/(tabs)/home"); // Go to main app
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">You&apos;re all set!</Text>
      <Text className="mb-8 text-center">Enjoy using the app.</Text>
      <Button title="Get Started" onPress={finishOnboarding} />
    </View>
  );
}
