import { useEffect } from "react";
import { Stack } from "expo-router";
import { AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

export default function AdminLayout() {
  const router = useRouter();

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
    const sub = AppState.addEventListener("change", async (state) => {
      if (state === "active") {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) return;
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) return;
        await LocalAuthentication.authenticateAsync({
          promptMessage: "Confirm it's you",
          cancelLabel: "Cancel",
        });
      }
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
