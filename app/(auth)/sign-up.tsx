import { useClerkSignUp } from "@/hooks/useClerkSignUp";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const router = useRouter();
  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    code,
    setCode,
    pendingVerification,
    onSignUpPress,
    onVerifyPress,
    loading,
    error,
  } = useClerkSignUp();

  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState<string | null>(null);

  // Validate name before sign up
  const handleSignUp = () => {
    if (!name || name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return;
    }
    setNameError(null);
    onSignUpPress();
  };

  if (pendingVerification) {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.slangCountTitle}>Verify your email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          placeholderTextColor="#aaa"
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="#2531ba"
          onPress={onVerifyPress}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableHighlight>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  return (
    <>
      <Text style={styles.slangCountTitle}>Slang Count</Text>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/appicon.png")}
          style={styles.avatar}
          contentFit="contain"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%", alignItems: "center" }}
        >
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
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
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmailAddress}
              value={emailAddress}
              placeholderTextColor="#aaa"
            />

            <TextInput
              style={styles.input}
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
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableHighlight>
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>Sign up with</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Social Buttons */}
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
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.socialButton, styles.googleButton]}
              underlayColor="#e0e0e0"
              onPress={() => {}}
            >
              <View style={styles.socialButtonContent}>
                <AntDesign
                  name="google"
                  size={24}
                  color="#222"
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.socialButtonText, { color: "#222" }]}>
                  Continue with Google
                </Text>
              </View>
            </TouchableHighlight>

            {/* Bottom Login Link */}
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>
                Already have an account?{" "}
                <Text
                  style={styles.loginLink}
                  onPress={() => router.push("/(auth)/sign-in")}
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
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
});
