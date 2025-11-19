import { Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      // Delay navigation until navigation tree mounts
      router.replace("/(tabs)");
    }
  }, [isSignedIn]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
