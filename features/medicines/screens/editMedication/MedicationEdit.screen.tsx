import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Stack } from "expo-router";

import TextInput from "@/shared/components/common/TextInput";
import Button from "@/shared/components/common/Button";
import PharmaImagePicker from "@/shared/components/common/ImagePicker";
import PharmaDropdownPicker from "@/shared/components/common/DropdownPicker";
import CurrencyInput from "@/shared/components/common/CurrencyInput";

import { MedicationForm } from "../../forms/medication.form";

import { useMedicationEditViewModel } from "../../effects/useMedicationEditViewModel";

import styles from "./styles";

export function MedicationEditScreen() {
  const {
    control,
    formErrors,
    isFormValid,
    createMedicationLoading,
    samplePhotoUrl,
    onPhotoTaken,
    onCancelPress,
    handleFormSubmit,
  } = useMedicationEditViewModel();

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Stack.Screen options={{ title: "Editar medicamento" }} />
        <View style={styles.cardBackground}>
          <View>
            <Text style={styles.formTitle}>Edição de Medicamento</Text>
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
            Atualizar medicamento
          </Button>
        </View>
      </View>
    </>
  );
}
