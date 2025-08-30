import { StyleSheet } from "react-native";

export default (hasError: boolean) =>
  StyleSheet.create({
    errorMessage: {
      marginLeft: 16,
    },
    helperText: {
      color: "#717171",
      marginTop: 8,
      marginLeft: 2,
    },
    inputLabel: {
      marginBottom: 8,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: hasError ? "#FF5A5F" : "#DDDDDD",
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
