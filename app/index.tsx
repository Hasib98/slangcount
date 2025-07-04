import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  const handleGetStarted = () => {
    router.replace("/(auth)/sign-in");
  };

  return (
    <LinearGradient
      colors={["#f7f7f7", "#eaeaea", "#f7f7f7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <LottieView
          style={styles.lottie}
          source={require("../assets/lottie/confetti.json")}
          autoPlay
          loop={false}
        />

        <Image
          source={require("../assets/images/appicon.png")}
          style={styles.appIcon}
          contentFit="contain"
        />

        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.tagline}>The app your mom wishes you had. 💙</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#2531ba"
            onPress={handleGetStarted}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    position: "absolute",
    width: 500,
    height: 500,
    marginBottom: 24,
  },
  title: {
    color: "#222",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 32,
    textShadowColor: "#fff8",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    color: "#4574f5",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    marginTop: -16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#4574f5",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 2,
    width: 300,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  appIcon: {
    position: "relative",
    top: -50,
    width: 220,
    height: 220,
    marginBottom: 24,
    opacity: 0.8,
    alignSelf: "center",
  },
});

export default Index;
