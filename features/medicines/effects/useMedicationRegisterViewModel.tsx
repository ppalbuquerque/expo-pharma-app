import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import { useMedicationModel } from "../state/medication.model";
import {
  type CreateMedicationForm,
  createMedicationFormSchema,
} from "../schemas/medication/create-medication-form.schema";

export function useMedicationRegisterViewModel() {
  const { createMedication } = useMedicationModel();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<CreateMedicationForm>({
    resolver: yupResolver(createMedicationFormSchema),
  });

  const onCreateMedicationSuccess = () => {
    showSuccessToast();
    setTimeout(() => router.back(), 1500);
  };

  const onCreateMedicationError = () => {
    showErrorToast();
  };

  const showSuccessToast = () => {
    const { name } = getValues();

    Toast.show({
      type: "success",
      text1: "Medicamento registrado com sucesso!",
      text2: `${name} foi adicionado ao sistema da farmácia e já pode ser utilizado.`,
    });
  };

  const showErrorToast = () => {
    const { name } = getValues();

    Toast.show({
      type: "error",
      text1: "Erro ao registrar o medicamento",
      text2: `Ocorreu um erro ao tentar registrar ${name} dentro do sistema`,
    });
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    createMedication.mutate(data, {
      onSuccess: onCreateMedicationSuccess,
      onError: onCreateMedicationError,
    });
  });

  const onPhotoTaken = async (photo: ImagePicker.ImagePickerResult) => {
    console.log(photo);
  };

  const onCancelPress = () => {
    router.back();
  };

  return {
    createMedication,
    createMedicationLoading: createMedication.isPending,
    control,
    formErrors: errors,
    isFormValid: isValid,
    handleFormSubmit,
    onPhotoTaken,
    onCancelPress,
    showSuccessToast,
  };
}
