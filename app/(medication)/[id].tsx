import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, ActivityIndicator } from "react-native-paper";
import { router, useLocalSearchParams, Stack } from "expo-router";

import { useMedications } from "@/hooks/useMedications";

import Button from "@/components/common/Button";
import MedicationInfo from "@/components/Medications/MedicationInfo";
import Dialog from "@/components/common/Dialog";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { getMedication, deleteMedication, selectedMedication, isLoading } =
    useMedications();

  useEffect(() => {
    getMedication(id);
  }, []);

  if (isLoading.getMedicationLoading) {
    return <ActivityIndicator size="large" />;
  }

  const handleDeleteMedicationToggle = () => {
    setIsDeleteDialogOpen((actualState) => !actualState);
  };

  const onEraseButtonPress = async () => {
    await deleteMedication(id);
    router.back();
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: selectedMedication?.name ?? "Detalhes do medicamento",
        }}
      />
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
            <Button
              icon="delete"
              mode="outlined"
              onPress={handleDeleteMedicationToggle}
            >
              Apagar
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
      <Dialog
        visible={isDeleteDialogOpen}
        type="error"
        title="Apagar medicamento"
        description="Você tem certeza que deseja apagar esse medicamento do sistema?"
        onDismiss={handleDeleteMedicationToggle}
      >
        <Button
          mode="outlined"
          buttonColor=""
          onPress={handleDeleteMedicationToggle}
        >
          Cancelar
        </Button>
        <Button
          buttonColor=""
          onPress={onEraseButtonPress}
          loading={isLoading.deleteMedicationLoading}
          disabled={isLoading.deleteMedicationLoading}
        >
          Apagar
        </Button>
      </Dialog>
    </View>
  );
}
