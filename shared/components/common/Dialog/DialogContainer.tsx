import React from "react";
import { Modal, View } from "react-native";

import { dialogContainerStyles as styles } from "./styles";

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
};

export function DialogContainer({ children, isVisible }: Props) {
  return (
    <Modal
      visible={isVisible}
      style={styles.container}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.dialogBox}>{children}</View>
      </View>
    </Modal>
  );
}
