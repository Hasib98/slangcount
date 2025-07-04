import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

export function useClerkSSO() {
  const { startSSOFlow } = useSSO();
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSSO = useCallback(async () => {
    setOauthError(null);
    setOauthLoading(true);

    if (typeof startSSOFlow !== "function") {
      setOauthError("Google SSO not available");
      setOauthLoading(false);
      return false;
    }

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // router.replace("/(tabs)/home");
        return true;
      } else {
        setOauthError("Additional steps required to complete sign in.");
        return false;
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Google authentication failed";
      setOauthError(errorMessage);
      return false;
    } finally {
      setOauthLoading(false);
    }
  }, [startSSOFlow, router]);

  const clearOAuthError = useCallback(() => {
    setOauthError(null);
  }, []);

  return {
    handleGoogleSSO,
    oauthError,
    oauthLoading,
    clearOAuthError,
  };
}
