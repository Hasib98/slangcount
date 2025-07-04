import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useCallback, useState } from "react";

export function useClerkSSO() {
  const { startSSOFlow } = useSSO();
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState(false);

  const handleGoogleSSO = useCallback(async () => {
    setOauthError(null);
    setOauthLoading(true);

    if (typeof startSSOFlow !== "function") {
      setOauthError("Google SSO not available");
      setOauthLoading(false);
      return false;
    }

    try {
      const redirectUrl = AuthSession.makeRedirectUri();
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err?.message || "Google authentication failed";
      setOauthError(errorMessage);
      return false;
    } finally {
      setOauthLoading(false);
    }
  }, [startSSOFlow]);

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
