import { StyleSheet } from "react-native";

type GeneralInfoStyleParams = {
  stockAvailability: boolean;
};

const getStockAvailabilityColor = (stockAvailability: boolean) =>
  stockAvailability ? "#00A699" : "#FF5A5F";

export default ({ stockAvailability }: GeneralInfoStyleParams) =>
  StyleSheet.create({
    container: {
      marginTop: 24,
    },
    medicationName: {
      fontSize: 24,
      lineHeight: 48,
    },
    subInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    stockAvailabilityContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    stockAvailabilityDot: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      marginRight: 4,
      backgroundColor: getStockAvailabilityColor(stockAvailability),
    },
    stockAvailaibilityText: {
      color: getStockAvailabilityColor(stockAvailability),
    },
    grayDot: {
      width: 4,
      height: 4,
      borderRadius: "50%",
      backgroundColor: "#DDDDDD",
      marginLeft: 8,
      marginRight: 8,
    },
    priceBoxContainer: {
      marginTop: 24,
      marginBottom: 24,
    },
    usefulnessTitle: {
      fontSize: 20,
      marginBottom: 20,
    },
    usefulnessTextArea: {
      lineHeight: 26,
    },
  });
