import React from "react";
import { TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import styles from "./styles";

interface ISearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
  placeholder,
  value,
  onChangeText,
}: ISearchBarProps) {
  return (
    <View style={styles.container}>
      <AntDesign
        name="search1"
        size={24}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
