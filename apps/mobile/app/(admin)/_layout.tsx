import { useEffect, useRef } from "react";
import { Stack } from "expo-router";
import { AppState } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import * as LocalAuthentication from "expo-local-authentication";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

const BIOMETRIC_LOCK_AFTER_MS = 60_000;

export default function AdminLayout() {
  const router = useRouter();
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const bookingId = response.notification.request.content.data?.bookingId as string | undefined;
      if (bookingId) {
        router.push(`/(admin)/booking/${bookingId}`);
      }
    });

    Notifications.getLastNotificationResponseAsync().then((response) => {
      const bookingId = response?.notification.request.content.data?.bookingId as string | undefined;
      if (bookingId) {
        router.push(`/(admin)/booking/${bookingId}`);
      }
    });

    return () => sub.remove();
  }, []);

  useEffect(() => {
    // Skip biometric lock in Expo Go / dev — meant only for production installs
    if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) return;
    if (__DEV__) return;

    const sub = AppState.addEventListener("change", async (state) => {
      if (state === "background" || state === "inactive") {
        backgroundedAt.current = Date.now();
        return;
      }
      if (state !== "active") return;

      // Only prompt after being backgrounded for BIOMETRIC_LOCK_AFTER_MS+
      const away = backgroundedAt.current
        ? Date.now() - backgroundedAt.current
        : 0;
      backgroundedAt.current = null;
      if (away < BIOMETRIC_LOCK_AFTER_MS) return;

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) return;
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) return;
      // Prompt but don't sign out on failure — user will see it again next time
      // they return from a long background. Signing out was too destructive.
      await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirm it's you",
        cancelLabel: "Cancel",
      });
    });
    return () => sub.remove();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B0B0D" },
        headerTintColor: "#F5F2EC",
        headerTitleStyle: { fontWeight: "700", letterSpacing: 1 },
      }}
    />
  );
}
