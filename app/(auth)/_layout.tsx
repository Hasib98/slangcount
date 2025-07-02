import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
    </Stack>
  );
}
