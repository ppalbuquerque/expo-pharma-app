import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import { useUploadFile } from "@/shared/hooks/common/useUploadFile";

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
    setValue,
  } = useForm<CreateMedicationForm>({
    resolver: yupResolver(createMedicationFormSchema),
  });
  const { uploadFile } = useUploadFile();

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
    const photoAsset = photo.assets?.at(0);

    if (photoAsset) {
      uploadFile.mutate(photoAsset, {
        onError: (error) => console.log("error", error),
        onSuccess: (response) => {
          setValue("samplePhotoUrl", response.data.url, {
            shouldValidate: true,
          });
        },
      });
    }
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
