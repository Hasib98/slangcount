import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useClerkOTPVerification() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle submission of verification form
  const onVerifyPress = async (): Promise<boolean> => {
    if (!isLoaded) return false;
    setLoading(true);
    setError(null);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(home)");
        return true;
      } else {
        setError("Verification not complete. Please check your code.");
        return false;
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Verification failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle resend verification code
  const onResendCode = async (): Promise<boolean> => {
    if (!isLoaded) return false;
    setLoading(true);
    setError(null);
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setError(null);
      return true;
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Failed to resend code");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    code,
    setCode,
    onVerifyPress,
    onResendCode,
    loading,
    error,
  };
}
