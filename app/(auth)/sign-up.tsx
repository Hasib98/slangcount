import { useClerkSignUp } from "@/hooks/useClerkSignUp";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerkSSO } from "../../hooks/useClerkSSO";

const SignUp = () => {
  const router = useRouter();
  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    onSignUpPress,
    loading,
    error,
  } = useClerkSignUp();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const { handleGoogleSSO, oauthError, oauthLoading, clearOAuthError } =
    useClerkSSO();

  const { width, height } = Dimensions.get("window");
  const baseFont = Math.max(width * 0.05, 16);
  const smallFont = Math.max(width * 0.04, 14);
  const paddingH = Math.max(width * 0.05, 10);
  const paddingV = Math.max(height * 0.05, 10);

  // Validate name before sign up
  const handleSignUp = async () => {
    if (!name || name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return;
    }
    setNameError(null);

    // Call the sign up function and navigate to OTP screen on success
    const success = await onSignUpPress();
    if (success) {
      router.push("/(auth)/otp-verification");
    }
  };

  const handleGoogleSignUp = async () => {
    clearOAuthError();
    const success = await handleGoogleSSO();
    if (success) {
      // Navigation will be handled automatically by Clerk
      // The user will be redirected to the home screen
    }
  };

  return (
    <>
      <Text
        style={[
          styles.slangCountTitle,
          { fontSize: baseFont, backgroundColor: "transparent" },
        ]}
      >
        Slang Count
      </Text>
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: paddingH,
            paddingVertical: paddingV,
          }}
        >
          <Image
            source={require("../../assets/images/appicon.png")}
            style={[styles.avatar, { height: width * 0.3, width: width * 0.3 }]}
            contentFit="contain"
          />
          <View style={[styles.formContainer, { width: 300, maxWidth: "90%" }]}>
            {/* Main Error at Top */}
            {error && (
              <View style={styles.topErrorBox}>
                <Text style={styles.topErrorText}>{error}</Text>
              </View>
            )}
            {oauthError && (
              <View style={styles.topErrorBox}>
                <Text style={styles.topErrorText}>{oauthError}</Text>
              </View>
            )}
            <TextInput
              style={[styles.input, { fontSize: smallFont, width: "100%" }]}
              placeholder="Name"
              autoCapitalize="words"
              onBlur={() => {
                if (!name || name.trim().length < 2) {
                  setNameError("Name must be at least 2 characters");
                } else {
                  setNameError(null);
                }
              }}
              onChangeText={setName}
              value={name}
              placeholderTextColor="#aaa"
            />
            {nameError && (
              <Text style={[styles.errorText, { fontSize: smallFont }]}>
                {nameError}
              </Text>
            )}
            <TextInput
              style={[styles.input, { fontSize: smallFont, width: "100%" }]}
              placeholder="Email Address"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmailAddress}
              value={emailAddress}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={[styles.input, { fontSize: smallFont, width: "100%" }]}
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
              placeholderTextColor="#aaa"
            />
            <TouchableHighlight
              style={styles.button}
              underlayColor="#2531ba"
              onPress={handleSignUp}
              activeOpacity={0.7}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={[styles.buttonText, { fontSize: smallFont }]}>
                  Sign Up
                </Text>
              )}
            </TouchableHighlight>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={[styles.separatorText, { fontSize: smallFont }]}>
                Sign up with
              </Text>
              <View style={styles.separatorLine} />
            </View>
            <TouchableHighlight
              style={[styles.socialButton, styles.appleButton]}
              underlayColor="#222"
              onPress={() => {}}
            >
              <View style={styles.socialButtonContent}>
                <AntDesign
                  name="apple1"
                  size={24}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={[styles.socialButtonText, { fontSize: smallFont }]}
                >
                  Continue with Apple
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.socialButton, styles.googleButton]}
              underlayColor="#e0e0e0"
              onPress={handleGoogleSignUp}
              disabled={oauthLoading}
            >
              <View style={styles.socialButtonContent}>
                {oauthLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#222"
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <AntDesign
                    name="google"
                    size={24}
                    color="#222"
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text
                  style={[
                    styles.socialButtonText,
                    { color: "#222", fontSize: smallFont },
                  ]}
                >
                  {" "}
                  {oauthLoading ? "Signing up..." : "Continue with Google"}{" "}
                </Text>
              </View>
            </TouchableHighlight>
            <View style={styles.bottomTextContainer}>
              <Text style={[styles.bottomText, { fontSize: smallFont }]}>
                {" "}
                Already have an account?{" "}
                <Text
                  style={[styles.loginLink, { fontSize: smallFont }]}
                  onPress={() => router.push("/(auth)/sign-in")}
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  avatar: {
    height: 120,
    width: 120,
    marginTop: -10,
    marginBottom: 8,
  },
  slangCountTitle: {
    color: "#5fa8ff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 18,
  },
  formContainer: {
    marginTop: 40,
    width: "85%",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 48,
    borderColor: "#4574f5",
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#222",
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 8,
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#4574f5",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 2,
    width: 300,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    width: 300,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  separatorText: {
    marginHorizontal: 12,
    color: "#aaa",
    fontSize: 16,
    fontWeight: "500",
  },
  socialButton: {
    width: 300,
    borderRadius: 30,
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 1,
  },
  appleButton: {
    backgroundColor: "#222",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTextContainer: {
    marginTop: 18,
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  bottomText: {
    color: "#888",
    fontSize: 15,
  },
  loginLink: {
    color: "#5e89ff",
    fontWeight: "bold",
  },
  topErrorBox: {
    backgroundColor: "#fdecea",
    borderColor: "#f5c6cb",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 18,
    alignItems: "center",
    width: 300,
    alignSelf: "center",
  },
  topErrorText: {
    color: "#e94e3d",
    fontSize: 15,
    textAlign: "center",
  },
});

WebBrowser.maybeCompleteAuthSession();
