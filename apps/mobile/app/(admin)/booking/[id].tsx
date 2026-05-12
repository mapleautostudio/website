import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookingDetail } from "../../../src/hooks/useBookingDetail";
import { STATUS_STYLES, formatStatus } from "../../../src/lib/status";
import { colors } from "../../../src/theme/tokens";
import type { BookingStatus } from "@maple/core/supabase/types";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        backgroundColor: colors.elevated,
        borderRadius: 6,
        padding: 12,
      }}
    >
      <Text style={{ color: colors.fg3, fontSize: 10, letterSpacing: 0.8, marginBottom: 3 }}>
        {label}
      </Text>
      <Text style={{ color: colors.text, fontSize: 13 }}>{value}</Text>
    </View>
  );
}

function ActionButton({
  label,
  onPress,
  primary,
  disabled,
}: {
  label: string;
  onPress: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        flex: 1,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        backgroundColor: primary ? "rgba(212,165,116,0.15)" : "rgba(245,242,236,0.06)",
        borderWidth: 1,
        borderColor: primary ? "rgba(212,165,116,0.3)" : "rgba(245,242,236,0.1)",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Text
        style={{
          color: primary ? colors.accent : colors.fg2,
          fontWeight: "700",
          fontSize: 11,
          letterSpacing: 0.8,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { booking, loading, updating, error, updateStatus } = useBookingDetail(id);

  const confirm = useCallback((status: BookingStatus, label: string) => {
    Alert.alert(
      `${label}?`,
      `Mark this booking as ${label.toLowerCase()}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: label, onPress: () => updateStatus(status) },
      ],
    );
  }, [updateStatus]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.surface, justifyContent: "center" }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (error || !booking) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.surface, padding: 20 }}>
        <Text style={{ color: colors.fg2 }}>{error ?? "Booking not found."}</Text>
      </View>
    );
  }

  const statusStyle = STATUS_STYLES[booking.status] ?? STATUS_STYLES.declined;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.surface }}>
      <View style={{ padding: 20 }}>
        {/* Header */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: "700" }}>
            {booking.contact_name}
          </Text>
          <Text style={{ color: colors.fg2, fontSize: 13, marginTop: 2 }}>
            {booking.contact_phone} · {booking.contact_email}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 4,
                backgroundColor: statusStyle.bg,
              }}
            >
              <Text style={{ color: statusStyle.text, fontWeight: "700", fontSize: 11, letterSpacing: 0.6 }}>
                {formatStatus(booking.status)}
              </Text>
            </View>
          </View>
        </View>

        {/* Fields grid */}
        <View style={{ gap: 10, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Field label="SERVICE" value={booking.service} />
            </View>
            <View style={{ flex: 1 }}>
              <Field
                label="VEHICLE"
                value={`${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}`}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Field
                label="DATE"
                value={new Date(booking.preferred_date).toLocaleDateString("en-CA", {
                  weekday: "short", month: "short", day: "numeric",
                })}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Field label="TIME" value={booking.preferred_time_window.toUpperCase()} />
            </View>
          </View>
          {booking.notes && (
            <Field label="NOTES" value={booking.notes} />
          )}
          {booking.vehicle_notes && (
            <Field label="VEHICLE NOTES" value={booking.vehicle_notes} />
          )}
        </View>

        {/* Action buttons */}
        {updating ? (
          <ActivityIndicator color={colors.accent} />
        ) : (
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <ActionButton
                label="CONFIRM"
                primary
                onPress={() => confirm("confirmed", "Confirm")}
                disabled={booking.status === "confirmed"}
              />
              <ActionButton
                label="DECLINE"
                onPress={() => confirm("declined", "Decline")}
                disabled={booking.status === "declined"}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <ActionButton
                label="NO-SHOW"
                onPress={() => confirm("no_show", "No-show")}
                disabled={booking.status === "no_show"}
              />
              <ActionButton
                label="RESET TO NEW"
                onPress={() => confirm("new", "Reset to new")}
                disabled={booking.status === "new"}
              />
            </View>
          </View>
        )}

        {/* Customer history link */}
        <TouchableOpacity
          onPress={() => router.push(`/(admin)/customer/${encodeURIComponent(booking.contact_phone)}`)}
          style={{ marginTop: 24, alignItems: "center" }}
        >
          <Text style={{ color: colors.fg3, fontSize: 12, textDecorationLine: "underline" }}>
            View customer history
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
