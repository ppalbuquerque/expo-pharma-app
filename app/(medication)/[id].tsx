import { useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Card, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

import { useMedications } from "@/hooks/useMedications";
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
  const { id } = useLocalSearchParams<{ id: string }>();

  const { getMedication, selectedMedication, isLoading } = useMedications();

  useEffect(() => {
    getMedication(id);
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView style={styles.container}>
      <MedicationInfo
        coverUrl="https://picsum.photos/700"
        medicationInfo={[
          {
            title: selectedMedication?.name,
            description: selectedMedication?.chemicalComposition,
          },
        ]}
      />
      <MedicationInfo
        medicationInfo={[
          {
            title: "Posologia",
            description: selectedMedication?.dosageInstructions,
          },
          {
            title: "Para que serve",
            description: selectedMedication?.usefulness,
          },
        ]}
      />
      <MedicationInfo
        medicationInfo={[
          {
            title: "Estoque",
            description: `${selectedMedication?.stockAvailability} Unidades`,
          },
          {
            title: "Posição",
            description: `Prateleira ${selectedMedication?.shelfLocation}`,
          },
        ]}
      />
      <MedicationInfo
        medicationInfo={[
          {
            title: "Preço Unitário",
            description: `R$ ${selectedMedication?.unitPrice}`,
          },
          {
            title: "Preço Caixa",
            description: `R$ ${selectedMedication?.boxPrice}`,
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
