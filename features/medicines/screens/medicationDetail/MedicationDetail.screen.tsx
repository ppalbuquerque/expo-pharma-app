import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, ActivityIndicator } from "react-native-paper";
import { Stack } from "expo-router";

import { useMedicationDetailViewModel } from "@/features/medicines/effects/useMedicationDetailViewModel";

import Button from "@/shared/components/common/Button";
// import Dialog from "@/shared/components/common/Toasts/";

import MedicationInfo from "../../components/MedicationInfo";

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

export default function MedicationDetail() {
  const {
    isDeleteDialogOpen,
    medication,
    getMedicationLoading,
    deleteMedicationLoading,
    handleDeleteMedicationToggle,
    handleDeleteMedication,
  } = useMedicationDetailViewModel();

  if (getMedicationLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: medication?.name ?? "Detalhes do medicamento",
        }}
      />
      <ScrollView style={styles.container}>
        <MedicationInfo
          coverUrl="https://picsum.photos/700"
          medicationInfo={[
            {
              title: medication?.name,
              description: medication?.chemicalComposition,
            },
          ]}
        />
        <MedicationInfo
          medicationInfo={[
            {
              title: "Posologia",
              description: medication?.dosageInstructions,
            },
            {
              title: "Para que serve",
              description: medication?.usefulness,
            },
          ]}
        />
        <MedicationInfo
          medicationInfo={[
            {
              title: "Estoque",
              description: `${medication?.stockAvailability} Unidades`,
            },
            {
              title: "Posição",
              description: `Prateleira ${medication?.shelfLocation}`,
            },
          ]}
        />
        <MedicationInfo
          medicationInfo={[
            {
              title: "Preço Unitário",
              description: `R$ ${medication?.unitPrice}`,
            },
            {
              title: "Preço Caixa",
              description: `R$ ${medication?.boxPrice}`,
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
      {/* <Dialog
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
          onPress={handleDeleteMedication}
          loading={deleteMedicationLoading}
          disabled={deleteMedicationLoading}
        >
          Apagar
        </Button>
      </Dialog> */}
    </View>
  );
}
