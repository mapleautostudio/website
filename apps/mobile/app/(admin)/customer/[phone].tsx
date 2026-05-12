import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCustomerHistory } from "../../../src/hooks/useCustomerHistory";
import { STATUS_STYLES, formatStatus } from "../../../src/lib/status";
import { colors } from "../../../src/theme/tokens";
import type { BookingRow } from "@maple/core/supabase/types";

function HistoryRow({ item }: { item: BookingRow }) {
  const style = STATUS_STYLES[item.status] ?? STATUS_STYLES.declined;
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: colors.text, fontSize: 14, fontWeight: "600" }}>
          {item.service}
        </Text>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 3,
            backgroundColor: style.bg,
          }}
        >
          <Text style={{ color: style.text, fontSize: 10, fontWeight: "700", letterSpacing: 0.6 }}>
            {formatStatus(item.status)}
          </Text>
        </View>
      </View>
      <Text style={{ color: colors.fg3, fontSize: 11, marginTop: 3 }}>
        {new Date(item.created_at).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Text>
    </View>
  );
}

export default function CustomerHistoryScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const decoded = decodeURIComponent(phone ?? "");
  const { bookings, loading, error } = useCustomerHistory(decoded);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.surface, justifyContent: "center" }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 }}>
        <Text style={{ color: colors.fg2, fontSize: 12 }}>
          {decoded} · {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
        </Text>
      </View>
      {error ? (
        <Text style={{ color: colors.fg2, padding: 20 }}>{error}</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryRow item={item} />}
        />
      )}
    </View>
  );
}
