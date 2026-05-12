import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useBookings, type BookingFilter } from "../../src/hooks/useBookings";
import { STATUS_STYLES, formatStatus } from "../../src/lib/status";
import { colors } from "../../src/theme/tokens";

const FILTERS: BookingFilter[] = ["all", "new", "confirmed", "declined", "no_show"];

export default function BookingsScreen() {
  const [filter, setFilter] = useState<BookingFilter>("all");
  const { bookings, loading, refetch } = useBookings(filter);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Stack.Screen options={{ title: "Bookings" }} />
      {/* Filter tabs */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderRadius: 4,
              backgroundColor:
                filter === f ? "rgba(212,165,116,0.15)" : "rgba(245,242,236,0.06)",
              borderWidth: filter === f ? 1 : 0,
              borderColor: filter === f ? "rgba(212,165,116,0.3)" : "transparent",
            }}
          >
            <Text
              style={{
                color: filter === f ? colors.accent : colors.fg2,
                fontSize: 11,
                fontWeight: "600",
                letterSpacing: 0.8,
              }}
            >
              {formatStatus(f)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && bookings.length === 0 ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              tintColor={colors.accent}
            />
          }
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.border }} />
          )}
          renderItem={({ item }) => {
            const style = STATUS_STYLES[item.status] ?? STATUS_STYLES.declined;
            return (
              <TouchableOpacity
                onPress={() => router.push(`/(admin)/booking/${item.id}`)}
                style={{ paddingHorizontal: 20, paddingVertical: 14 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 15,
                      fontWeight: "600",
                    }}
                  >
                    {item.contact_name}
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 3,
                      backgroundColor: style.bg,
                    }}
                  >
                    <Text
                      style={{
                        color: style.text,
                        fontSize: 10,
                        fontWeight: "700",
                        letterSpacing: 0.6,
                      }}
                    >
                      {formatStatus(item.status)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: colors.fg2,
                    fontSize: 12,
                    marginTop: 3,
                  }}
                >
                  {item.service} ·{" "}
                  {new Date(item.preferred_date).toLocaleDateString("en-CA", {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
