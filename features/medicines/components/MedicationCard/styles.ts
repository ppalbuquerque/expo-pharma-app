import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contentLeftContainer: {
    flex: 1,
    flexDirection: "row",
  },
  infoContainer: {
    marginLeft: 16,
  },
  medicationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  medicationDescription: {
    marginTop: 10,
    marginBottom: 10,
  },
  shelfLocationContainer: {
    flexDirection: "row",
  },
  shelfLocationText: {
    marginLeft: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  stockIndicator: {
    width: 12,
    height: 12,
    backgroundColor: "green",
    borderRadius: "50%",
  },
});
