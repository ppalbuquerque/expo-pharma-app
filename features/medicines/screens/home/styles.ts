import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    padding: 16,
  },
  content: {
    flex: 1,
  },
  addNewButton: {
    position: "absolute",
    margin: 16,
    bottom: 60,
    right: 0,
  },
  fabButton: {
    borderRadius: "50%",
    backgroundColor: "#FF5A5F",
  },
  emptyMessageContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 16,
  },
  emptyMessageText: {
    fontWeight: "bold",
    color: "#DC2626",
    fontSize: 24,
    textAlign: "center",
  },
});

export default styles;
