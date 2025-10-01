import { StyleSheet } from "react-native";

export type ButtonType = "normal" | "danger";

type OutlinedButtonStyleParams = {
  buttonType: ButtonType;
};

const getBorderColor = (buttonType: ButtonType) => {
  switch (buttonType) {
    case "danger":
      return "#FF5A5F";
    case "normal":
      return "#DDDDDD";
    default:
      return "#DDDDDD";
  }
};

export default ({ buttonType }: OutlinedButtonStyleParams) =>
  StyleSheet.create({
    buttonContainer: {
      borderWidth: 1,
      borderColor: getBorderColor(buttonType),
      borderRadius: 8,
      paddingHorizontal: 24,
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "center",
    },
  });
