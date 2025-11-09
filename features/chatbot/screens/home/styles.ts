import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 24,
  },
  completionBubble: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
  },
  completionText: {
    lineHeight: 24,
    letterSpacing: 0.1,
    fontSize: 16,
  },
  completionAgentTitle: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputArea: {
    backgroundColor: "#FFF",
  },
  inputContainer: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
});
