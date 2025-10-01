import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

type PriceBoxType = "boxPrice" | "unitPrice";

type Props = {
  boxType: PriceBoxType;
  price: string;
};

const getBoxTitle = (boxType: PriceBoxType) => {
  switch (boxType) {
    case "boxPrice":
      return "Preço da caixa";
    case "unitPrice":
      return "Preço da unidade";
    default:
      return "Preço";
  }
};

const getBoxDescription = (boxType: PriceBoxType) => {
  switch (boxType) {
    case "boxPrice":
      return "Preço por caixa";
    case "unitPrice":
      return "Preço por unidade";
    default:
      return "Preço";
  }
};

export function PriceBox({ boxType, price }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>{getBoxTitle(boxType)}</Text>
      <Text style={styles.boxPrice}>R$ {price}</Text>
      <Text style={styles.boxDescription}>{getBoxDescription(boxType)}</Text>
    </View>
  );
}
