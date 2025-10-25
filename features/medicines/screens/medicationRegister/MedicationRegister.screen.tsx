import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Stack } from "expo-router";

import Button from "@/shared/components/common/Button";
import { MedicationForm } from "../../forms/medication.form";

import { useMedicationRegisterViewModel } from "../../effects/useMedicationRegisterViewModel";

import styles from "./styles";

export default function MedicationRegisterScreen() {
  const {
    createMedicationLoading,
    control,
    formErrors,
    isFormValid,
    handleFormSubmit,
    onPhotoTaken,
    onCancelPress,
  } = useMedicationRegisterViewModel();

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Stack.Screen options={{ title: "Registrar medicamento" }} />
        <View style={styles.cardBackground}>
          <View>
            <Text style={styles.formTitle}>Registro de Medicamento</Text>
            <Text style={styles.formDescription}>
              Por favor, preencha os campos abaixo
            </Text>
          </View>
          <MedicationForm
            control={control}
            formErrors={formErrors}
            onPhotoTaken={onPhotoTaken}
          />
        </View>
      </ScrollView>
      <View style={styles.fixedButtonAreaContainer}>
        <View style={styles.actionsContainer}>
          <View style={styles.cancelButtonContainer}>
            <Button mode="outlined" onPress={onCancelPress} buttonColor="white">
              Voltar
            </Button>
          </View>
          <Button
            mode="contained"
            onPress={handleFormSubmit}
            loading={createMedicationLoading}
            disabled={createMedicationLoading || !isFormValid}
            buttonColor="#FF5A5F"
            textColor="white"
          >
            Registrar medicamento
          </Button>
        </View>
      </View>
    </>
  );
}
