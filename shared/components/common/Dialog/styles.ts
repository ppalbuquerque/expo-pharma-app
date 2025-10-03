import { StyleSheet } from "react-native";

export const dialogContainerStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialogBox: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    width: "85%",
  },
});

export const dialogTitleStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  iconContainer: {
    marginRight: 12,
    // marginBottom: 6,
  },
});

export const dialogBodyStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

export const dialogActionsStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
