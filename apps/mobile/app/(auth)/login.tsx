import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signIn } from "../../src/lib/auth";
import { colors } from "../../src/theme/tokens";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      // _layout.tsx handles redirect on session change
    } catch (e: any) {
      setError(e.message ?? "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.surface }}
    >
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 32 }}>
        <Text
          style={{
            color: colors.accent,
            fontSize: 28,
            fontWeight: "800",
            letterSpacing: 4,
            marginBottom: 4,
          }}
        >
          MAPLE
        </Text>
        <Text
          style={{
            color: colors.fg2,
            fontSize: 12,
            letterSpacing: 3,
            marginBottom: 48,
          }}
        >
          AUTO STUDIO
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.fg3}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: colors.elevated,
            color: colors.text,
            borderRadius: 6,
            padding: 14,
            marginBottom: 12,
            fontSize: 15,
          }}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.fg3}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: colors.elevated,
            color: colors.text,
            borderRadius: 6,
            padding: 14,
            marginBottom: 20,
            fontSize: 15,
          }}
        />

        {error && (
          <Text style={{ color: "#e07070", marginBottom: 12, fontSize: 13 }}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSignIn}
          disabled={loading}
          style={{
            backgroundColor: colors.accent,
            borderRadius: 6,
            padding: 16,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <Text
              style={{
                color: colors.surface,
                fontWeight: "700",
                fontSize: 14,
                letterSpacing: 1,
              }}
            >
              SIGN IN
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
