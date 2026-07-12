import { View, ActivityIndicator } from "react-native";
import { colors } from "../src/theme/tokens";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color={colors.accent} />
    </View>
  );
}
