import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";

export function useClerkSignUp() {
  const { isLoaded, signUp } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async (): Promise<boolean> => {
    if (!isLoaded) return false;
    setLoading(true);
    setError(null);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      return true;
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Sign up failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    onSignUpPress,
    loading,
    error,
  };
}
