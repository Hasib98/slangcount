import { useClerkOTPVerification } from "@/hooks/useClerkOTPVerification";
import { useSignUp } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OTPVerification = () => {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { code, setCode, onVerifyPress, onResendCode, loading, error } =
    useClerkOTPVerification();

  const emailAddress = signUp?.emailAddress || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slide in animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update the code state for the hook
    setCode(newOtp.join(""));

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      return;
    }

    const success = await onVerifyPress();
    if (success) {
      // Navigation will be handled by the hook
    }
  };

  const handleResendCode = async () => {
    const success = await onResendCode();
    if (success) {
      // Clear the OTP inputs
      setOtp(["", "", "", "", "", ""]);
      setCode("");
      // Focus the first input
      inputRefs.current[0]?.focus();
      setFocusedIndex(0);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <AntDesign name="arrowleft" size={24} color="#4574f5" />
          </TouchableOpacity>
          <Text style={styles.slangCountTitle}>Slang Count</Text>
          <View style={styles.placeholder} />
        </View>

        {/* App Icon */}
        <Image
          source={require("../../assets/images/appicon.png")}
          style={styles.avatar}
          contentFit="contain"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.formContainer}>
            {/* Title and Description */}
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.description}>
              We&apos;ve sent a verification code to{" "}
              <Text style={styles.email}>{emailAddress}</Text>
            </Text>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    focusedIndex === index && styles.otpInputFocused,
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  placeholderTextColor="#aaa"
                />
              ))}
            </View>

            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <AntDesign
                  name="exclamationcircleo"
                  size={16}
                  color="#e74c3c"
                />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Verify Button */}
            <TouchableHighlight
              style={[
                styles.button,
                otp.join("").length !== 6 && styles.buttonDisabled,
              ]}
              underlayColor="#2531ba"
              onPress={handleVerify}
              activeOpacity={0.7}
              disabled={otp.join("").length !== 6 || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify Email</Text>
              )}
            </TouchableHighlight>

            {/* Resend Code */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Didn&apos;t receive the code?{" "}
              </Text>
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.resendLink}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  slangCountTitle: {
    color: "#5fa8ff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  placeholder: {
    width: 40,
  },
  avatar: {
    height: 100,
    width: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  keyboardView: {
    width: "100%",
    alignItems: "center",
  },
  formContainer: {
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  email: {
    fontWeight: "bold",
    color: "#4574f5",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    backgroundColor: "#fff",
  },
  otpInputFocused: {
    borderColor: "#4574f5",
    backgroundColor: "#f0f8ff",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdecea",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    width: "100%",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  button: {
    backgroundColor: "#4574f5",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 2,
    width: "100%",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resendText: {
    color: "#666",
    fontSize: 15,
  },
  resendLink: {
    color: "#4574f5",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default OTPVerification;
