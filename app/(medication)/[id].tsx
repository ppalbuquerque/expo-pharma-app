import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";

import Button from "@/components/common/Button";
import MedicationInfo from "@/components/Medications/MedicationInfo";

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    marginRight: 16,
  },
});

export default function Detail() {
  return (
    <ScrollView style={styles.container}>
      <MedicationInfo
        coverUrl="https://picsum.photos/700"
        medicationInfo={[
          {
            title: "Dexason",
            description: "Dexametasona",
          },
        ]}
      />
      <MedicationInfo
        medicationInfo={[
          {
            title: "Posologia",
            description: "Recomendar utilização de 1 comprimido a cada 8 horas",
          },
          {
            title: "Para que serve",
            description:
              "Ele é um anti-inflamatório de uso geral, ele pode ser indicado para dor no corpo, inflamação de garganta.",
          },
        ]}
      />
      <MedicationInfo
        medicationInfo={[
          {
            title: "Estoque",
            description: "20 Unidades",
          },
          {
            title: "Posição",
            description: "Prateleira 2F",
          },
        ]}
      />
      <MedicationInfo
        medicationInfo={[
          {
            title: "Preço Unitário",
            description: "R$ 40,00",
          },
          {
            title: "Preço Caixa",
            description: "R$ 40,00",
          },
        ]}
      />
      <Card mode="outlined">
        <Card.Content style={styles.buttonContainer}>
          <Button icon="pencil" mode="contained" style={styles.editButton}>
            Editar
          </Button>
          <Button icon="delete" mode="outlined">
            Cancelar
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
