import { useState } from "react";
import { View, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Stack, router } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";

import TextInput from "@/components/common/TextInput";
import Button from "@/components/common/Button";
import ImagePicker from "@/components/common/ImagePicker";
import {
  type CreateMedicationForm,
  createMedicationFormSchema,
} from "@schemas/medication/create-medication-form.schema";
import { useMedications } from "@/hooks/useMedications";

import styles from "./styles";

export default function Register() {
  const [isLoadingCreation, setIsLoadingCreation] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateMedicationForm>({
    resolver: yupResolver(createMedicationFormSchema),
  });

  const { createMedication } = useMedications();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoadingCreation(true);
    await createMedication(data);
    setIsLoadingCreation(false);
    router.back();
  });

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
              error={!!errors.name}
              errorText={errors.name?.message}
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
              error={!!errors.chemicalComposition}
              errorText={errors.chemicalComposition?.message}
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
              error={!!errors.dosageInstructions}
              errorText={errors.dosageInstructions?.message}
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
              error={!!errors.shelfLocation}
              errorText={errors.shelfLocation?.message}
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
              error={!!errors.boxPrice}
              errorText={errors.boxPrice?.message}
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
              error={!!errors.unitPrice}
              errorText={errors.unitPrice?.message}
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
              error={!!errors.usefulness}
              errorText={errors.usefulness?.message}
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
              error={!!errors.stockAvailability}
              errorText={errors.stockAvailability?.message}
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
          onPress={onSubmit}
          loading={isLoadingCreation}
          disabled={isLoadingCreation || !isValid}
        >
          Adicionar
        </Button>
      </View>
    </ScrollView>
  );
}
