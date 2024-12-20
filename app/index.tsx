import { useState } from "react";
import { Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

export default function Index() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffd",
      }}
    >
      <Searchbar
        placeholder="Nome, composto ou função"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <Text style={{ color: "red" }}>I love you</Text>
    </View>
  );
}
