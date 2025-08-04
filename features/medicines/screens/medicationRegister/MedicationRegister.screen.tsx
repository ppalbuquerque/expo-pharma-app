import React from "react";
import { View, ScrollView } from "react-native";
import { Controller } from "react-hook-form";
import { Stack } from "expo-router";

import TextInput from "@/shared/components/common/TextInput";
import Button from "@/shared/components/common/Button";

import { useMedicationRegisterViewModel } from "../../effects/useMedicationRegisterViewModel";

import styles from "./styles";

export default function MedicationRegisterScreen() {
  const {
    createMedicationLoading,
    control,
    formErrors,
    isFormValid,
    handleFormSubmit,
  } = useMedicationRegisterViewModel();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Registrar medicamento" }} />
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              label="Nome"
              error={!!formErrors.name}
              errorText={formErrors.name?.message}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="chemicalComposition"
          render={({ field }) => (
            <TextInput
              label="Composição química"
              error={!!formErrors.chemicalComposition}
              errorText={formErrors.chemicalComposition?.message}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="dosageInstructions"
          render={({ field }) => (
            <TextInput
              label="Posologia"
              error={!!formErrors.dosageInstructions}
              errorText={formErrors.dosageInstructions?.message}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="shelfLocation"
          render={({ field }) => (
            <TextInput
              label="Posição na prateleira"
              error={!!formErrors.shelfLocation}
              errorText={formErrors.shelfLocation?.message}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="boxPrice"
          render={({ field }) => (
            <TextInput
              label="Preço da caixa"
              error={!!formErrors.boxPrice}
              errorText={formErrors.boxPrice?.message}
              keyboardType="decimal-pad"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="unitPrice"
          render={({ field }) => (
            <TextInput
              label="Preço da unidade"
              error={!!formErrors.unitPrice}
              errorText={formErrors.unitPrice?.message}
              keyboardType="decimal-pad"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="usefulness"
          render={({ field }) => (
            <TextInput
              label="Uso da medicação"
              error={!!formErrors.usefulness}
              errorText={formErrors.usefulness?.message}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="stockAvailability"
          render={({ field }) => (
            <TextInput
              label="Estoque"
              error={!!formErrors.stockAvailability}
              errorText={formErrors.stockAvailability?.message}
              keyboardType="number-pad"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="plus"
          onPress={handleFormSubmit}
          loading={createMedicationLoading}
          disabled={createMedicationLoading || !isFormValid}
        >
          Adicionar
        </Button>
      </View>
    </ScrollView>
  );
}
