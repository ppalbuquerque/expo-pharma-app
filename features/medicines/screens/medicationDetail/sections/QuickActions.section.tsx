import React from "react";
import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import PharmaCard from "@/shared/components/common/Card";
import { OutlinedButton } from "@/shared/components/common/OutlinedButton";

import styles from "./QuickActions.styles";

type Props = {
  onDeleteMedicationPress: () => void;
};

export function QuickActionSections({ onDeleteMedicationPress }: Props) {
  return (
    <PharmaCard style={styles.container}>
      <Text style={styles.cardTitle}>Ações Rápidas</Text>
      <OutlinedButton>
        <Feather name="edit" size={24} color="black" style={styles.icon} />
        <View>
          <Text style={styles.buttonTitle}>Editar medicamento</Text>
          <Text style={styles.buttonDescription}>
            Atualizar as informações do medicamento
          </Text>
        </View>
      </OutlinedButton>
      <View style={styles.buttonContainer}>
        <OutlinedButton>
          <Feather
            name="shopping-cart"
            size={24}
            color="black"
            style={styles.icon}
          />
          <View>
            <Text style={styles.buttonTitle}>Atualizar estoque</Text>
            <Text style={styles.buttonDescription}>
              Modificar a sua quantidade em estoque
            </Text>
          </View>
        </OutlinedButton>
      </View>
      <View style={styles.buttonContainer}>
        <OutlinedButton type="danger" onPress={onDeleteMedicationPress}>
          <Feather name="trash-2" size={24} color="black" style={styles.icon} />
          <View>
            <Text style={styles.buttonTitle}>Apagar medicamento</Text>
            <Text style={styles.buttonDescription}>
              Apagar o registro do medicamento
            </Text>
          </View>
        </OutlinedButton>
      </View>
    </PharmaCard>
  );
}
