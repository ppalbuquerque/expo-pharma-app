import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { ImagePickerResult } from "expo-image-picker";

import TextInput from "@/shared/components/common/TextInput";
import PharmaImagePicker from "@/shared/components/common/ImagePicker";
import PharmaDropdownPicker from "@/shared/components/common/DropdownPicker";
import CurrencyInput from "@/shared/components/common/CurrencyInput";

import { type CreateMedicationForm } from "../schemas/medication/create-medication-form.schema";

import styles from "./styles";

interface MedicationFormProps {
  control: Control<CreateMedicationForm>;
  formErrors: FieldErrors<CreateMedicationForm>;
  onPhotoTaken: (photo: ImagePickerResult) => Promise<void>;
}

export function MedicationForm({
  control,
  formErrors,
  onPhotoTaken,
}: MedicationFormProps) {
  return (
    <>
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
            <PharmaDropdownPicker
              label="Posição na prateleira"
              items={[{ label: "teste", value: "test" }]}
              onChangeValue={field.onChange}
              helperText="Localização na prateleira"
              placeholder="Selecione a posição na prateleira"
              hasError={!!formErrors.shelfLocation}
              errorMessage={formErrors.shelfLocation?.message}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="boxPrice"
          render={({ field }) => (
            <CurrencyInput
              label="Preço da caixa"
              helperText="Preço da caixa"
              value={field.value?.toString()}
              onChangeText={field.onChange}
              hasError={!!formErrors.boxPrice}
              onBlur={field.onBlur}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="unitPrice"
          render={({ field }) => (
            <CurrencyInput
              label="Preço da unidade "
              helperText="Preço de uma unidade"
              value={field.value?.toString()}
              onChangeText={field.onChange}
              hasError={!!formErrors.unitPrice}
              onBlur={field.onBlur}
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
    </>
  );
}
