import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Stack } from "expo-router";

import TextInput from "@/shared/components/common/TextInput";
import Button from "@/shared/components/common/Button";
import PharmaImagePicker from "@/shared/components/common/ImagePicker";
import PharmaDropdownPicker from "@/shared/components/common/DropdownPicker";

import { useMedicationRegisterViewModel } from "../../effects/useMedicationRegisterViewModel";

import styles from "./styles";
import CurrencyInput from "@/shared/components/common/CurrencyInput";

export default function MedicationRegisterScreen() {
  const {
    createMedicationLoading,
    control,
    formErrors,
    isFormValid,
    handleFormSubmit,
    onPhotoTaken,
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
                  helperText="Nome do remédio"
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
                  helperText="Adicione os compostos químicos"
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
                  helperText="Como o remédio deve ser usado"
                />
              )}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Controller
              control={control}
              name="shelfLocation"
              render={({ field }) => (
                // <TextInput
                //   error={!!formErrors.shelfLocation}
                //   errorText={formErrors.shelfLocation?.message}
                //   onBlur={field.onBlur}
                // />
                <PharmaDropdownPicker
                  label="Posição na prateleira"
                  items={[{ label: "teste", value: "test" }]}
                  value={field.value}
                  setValue={field.onChange}
                  helperText="Localização na prateleira"
                  placeholder="Selecione a posição na prateleira"
                />
              )}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Controller
              control={control}
              name="boxPrice"
              render={({ field }) => (
                // <TextInput
                //   error={!!formErrors.boxPrice}
                //   errorText={formErrors.boxPrice?.message}
                //   onBlur={field.onBlur}
                // />
                <CurrencyInput
                  label="Preço da caixa"
                  helperText="Preço da caixa"
                  value={field.value?.toString()}
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
                // <TextInput
                //   error={!!formErrors.unitPrice}
                //   errorText={formErrors.unitPrice?.message}
                //   onBlur={field.onBlur}
                // />
                <CurrencyInput
                  label="Preço da unidade "
                  helperText="Preço de uma unidade"
                  value={field.value?.toString()}
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
                  helperText="Para o que o medicamento serve"
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
                  helperText="A quantidade em estoque"
                  value={field.value?.toString()}
                />
              )}
            />
          </View>
          <PharmaImagePicker
            onPhotoTaken={onPhotoTaken}
            label="Foto do medicamento"
          />
        </View>
      </ScrollView>
      <View style={styles.fixedButtonAreaContainer}>
        <View style={styles.actionsContainer}>
          <View style={styles.cancelButtonContainer}>
            <Button
              mode="outlined"
              onPress={handleFormSubmit}
              loading={createMedicationLoading}
              disabled={createMedicationLoading || !isFormValid}
            >
              Cancelar
            </Button>
          </View>
          <Button
            mode="contained"
            onPress={handleFormSubmit}
            loading={createMedicationLoading}
            disabled={createMedicationLoading || !isFormValid}
          >
            Registra medicamento
          </Button>
        </View>
      </View>
    </>
  );
}
