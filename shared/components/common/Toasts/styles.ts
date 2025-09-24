import { StyleSheet } from "react-native";

type ToastTypes = "successs" | "error";

const getBackgroundColor = (type: ToastTypes) => {
  switch (type) {
    case "error":
      return "#FF5A5F";
    case "successs":
      return "#10B981";
    default:
      return "#10B981";
  }
};

export const buildStyles = (type: ToastTypes) =>
  StyleSheet.create({
    modalContainer: {
      backgroundColor: getBackgroundColor(type),
      paddingVertical: 20,
      paddingHorizontal: 26,
      borderRadius: 12,
      flexDirection: "row",
      maxWidth: "95%",
    },
    textsContainer: {
      marginLeft: 12,
    },
    title: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: 16,
    },
    description: {
      marginTop: 8,
      color: "#FFFFFF",
    },
  });
