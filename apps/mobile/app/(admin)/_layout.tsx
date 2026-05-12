import { useEffect } from "react";
import { Stack } from "expo-router";
import { AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function AdminLayout() {
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
