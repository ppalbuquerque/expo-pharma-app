import React from "react";
import {
  Dialog as PaperDialog,
  DialogProps,
  Text,
  Divider,
  useTheme,
} from "react-native-paper";

import { MD3Colors } from "react-native-paper/lib/typescript/types";

import styles from "./styles";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type DialogTypes = "error" | "success" | "default";

interface Props extends DialogProps {
  title: string;
  type: DialogTypes;
  description: string;
}

function getDialogBackgroundColor(
  type: DialogTypes,
  colors: MD3Colors
): string {
  switch (type) {
    case "error":
      return colors.errorContainer;
    case "success":
      return colors.surface;
    case "default":
      return colors.background;
  }
}

function getDialogIcon(type: DialogTypes): IconSource {
  switch (type) {
    case "error":
      return "delete";
    case "success":
      return "check-circle-outline";
    case "default":
      return "pill";
  }
}

export default function Dialog({
  title,
  type,
  description,
  children,
  ...props
}: Props) {
  const { colors } = useTheme();

  const backgroundColor = getDialogBackgroundColor(type, colors);
  const dialogIcon = getDialogIcon(type);

  return (
    <PaperDialog {...props} style={{ backgroundColor }}>
      <PaperDialog.Icon icon={dialogIcon} />
      <PaperDialog.Title style={styles.title}>{title}</PaperDialog.Title>
      <PaperDialog.Content>
        <Text>{description}</Text>
      </PaperDialog.Content>
      <Divider />
      <PaperDialog.Actions style={styles.actionsContainer}>
        {children}
      </PaperDialog.Actions>
    </PaperDialog>
  );
}
