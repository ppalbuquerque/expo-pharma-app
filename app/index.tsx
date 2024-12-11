import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffd",
      }}
    >
      <Text style={{ color: "red" }}>I love you</Text>
    </View>
  );
}
