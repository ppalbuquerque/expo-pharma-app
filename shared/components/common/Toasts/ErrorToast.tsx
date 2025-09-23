import React from "react";
import { View, Text } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { buildStyles } from "./styles";

export default function ErrorToast(props: BaseToastProps) {
  const styles = buildStyles("error");

  return (
    <View style={styles.modalContainer}>
      <FontAwesome name="check-circle" size={24} color="white" />
      <View style={styles.textsContainer}>
        <Text style={styles.title}>{props.text1}</Text>
        <Text style={styles.description}>{props.text2}</Text>
      </View>
    </View>
  );
}
