import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useRef } from "react";

import { useUploadFile } from "@/shared/hooks/common/useUploadFile";
import { reaisToCents } from "@/shared/utils/money";

import { useMedicationModel } from "../state/medication.model";
import {
  type CreateMedicationForm,
  createMedicationFormSchema,
} from "../forms/create-medication-form.schema";

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
  const photoRef = useRef<ImagePicker.ImagePickerAsset | undefined>();

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
    try {
      if (photoRef.current) {
        const uploadResponse = await uploadFile.mutateAsync(photoRef.current);

        const createMedicationPayload = {
          ...data,
          boxPrice: reaisToCents(data.boxPrice),
          unitPrice: reaisToCents(data.unitPrice),
          samplePhotoUrl: uploadResponse.data.url,
        };

        await createMedication.mutateAsync(createMedicationPayload);
        onCreateMedicationSuccess();
      }
    } catch (error) {
      onCreateMedicationError();
    }
  });

  const onPhotoTaken = async (photo: ImagePicker.ImagePickerResult) => {
    const photoAsset = photo.assets?.at(0);

    if (photoAsset) {
      photoRef.current = photoAsset;
      setValue("samplePhotoUrl", photoRef.current.uri, {
        shouldValidate: true,
      });
    }
  };

  const onCancelPress = () => {
    router.back();
  };

  return {
    createMedicationLoading: createMedication.isPending || uploadFile.isPending,
    control,
    formErrors: errors,
    isFormValid: isValid,
    handleFormSubmit,
    onPhotoTaken,
    onCancelPress,
  };
}
