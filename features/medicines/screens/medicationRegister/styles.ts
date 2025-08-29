import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  cardBackground: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 12,
  },
  formDescription: {
    marginBottom: 24,
    color: "#717171",
  },
  textInputContainer: {
    marginBottom: 24,
  },
  fixedButtonAreaContainer: {
    backgroundColor: "#FFFFFF",
    position: "fixed",
    height: 150,
    bottom: 0,
    width: "100%",
    padding: 24,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  cancelButtonContainer: {
    marginBottom: 16,
  },
});
