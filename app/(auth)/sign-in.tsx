import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerkSignIn } from "../../hooks/useClerkSignIn";

const SignIn = () => {
  const router = useRouter();
  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    onSignInPress,
    loading,
    error,
  } = useClerkSignIn();

  return (
    <>
      <Text style={styles.slangCountTitle}>Slang Count</Text>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/appicon.svg")}
          style={styles.avatar}
          contentFit="contain"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%", alignItems: "center" }}
        >
          <View style={styles.formContainer}>
            {/* Main Error at Top */}
            {error && (
              <View style={styles.topErrorBox}>
                <Text style={styles.topErrorText}>{error}</Text>
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
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

            {/* Forgot Password Link */}
            <View style={styles.forgotPasswordContainer}>
              <Text
                style={styles.forgotPasswordLink}
                onPress={() => {
                  /* TODO: handle forgot password */
                }}
              >
                Forgot password?
              </Text>
            </View>

            <TouchableHighlight
              style={styles.button}
              underlayColor="#2531ba"
              onPress={onSignInPress}
              activeOpacity={0.7}
            >
              {loading ? (
                <Text style={styles.buttonText}>Signing In...</Text>
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableHighlight>

            {/* Separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
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

            {/* Bottom Sign Up Link */}
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>
                Don&apos;t have an account?{" "}
                <Text
                  style={styles.signUpLink}
                  onPress={() => router.push("/(auth)/sign-up")}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;

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
    backgroundColor: "#fdecea",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 6,
    fontSize: 13,
    textAlign: "left",
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
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomText: {
    color: "#888",
    fontSize: 15,
  },
  signUpLink: {
    color: "#5e89ff",
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    width: 300,
    alignItems: "flex-end",
    marginBottom: 8,
  },
  forgotPasswordLink: {
    color: "#5e89ff",
    fontWeight: "bold",
    fontSize: 15,
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
