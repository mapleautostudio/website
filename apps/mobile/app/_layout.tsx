import "../global.css";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";
import * as Notifications from "expo-notifications";
import { supabase } from "../src/lib/supabase";
import type { Session } from "@supabase/supabase-js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function registerPushToken() {
    if (Platform.OS === "web") return;
    const { status: existing } = await Notifications.getPermissionsAsync();
    let finalStatus = existing;
    if (existing !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") return;

    try {
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const token = tokenData.data;
      await supabase
        .from("push_tokens")
        .upsert({ token }, { onConflict: "token" });
    } catch {
      // EAS projectId not yet configured — skip silently during development
    }
  }

  useEffect(() => {
    if (session === undefined) return; // still loading
    const inAuthGroup = segments[0] === "(auth)";
    if (!session && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (session && inAuthGroup) {
      router.replace("/(admin)/bookings");
      registerPushToken();
    }
  }, [session, segments]);

  return <Slot />;
}
