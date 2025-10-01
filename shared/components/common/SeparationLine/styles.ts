import { StyleSheet } from "react-native";

type SeparationLineStyleParams = {
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
};

export default ({
  marginBottom,
  marginTop,
  backgroundColor,
}: SeparationLineStyleParams) =>
  StyleSheet.create({
    container: {
      height: 1,
      width: "100%",
      backgroundColor: backgroundColor ? backgroundColor : "#DDDDDD",
      marginTop: marginTop ? marginTop : 4,
      marginBottom: marginBottom ? marginBottom : 4,
    },
  });
