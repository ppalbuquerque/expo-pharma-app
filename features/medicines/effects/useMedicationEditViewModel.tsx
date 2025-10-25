import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";

import { useUploadFile } from "@/shared/hooks/common/useUploadFile";
import { useMedicationModel } from "../state/medication.model";

import {
  type CreateMedicationForm,
  createMedicationFormSchema,
} from "../schemas/medication/create-medication-form.schema";

export function useMedicationEditViewModel() {
  const { id: medicationId } = useLocalSearchParams<{ id: string }>();
  const { createMedication, useGetMedicationById } = useMedicationModel();

  const { data } = useGetMedicationById(medicationId);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<CreateMedicationForm>({
    resolver: yupResolver(createMedicationFormSchema),
    values: data,
  });
  const { uploadFile } = useUploadFile();
  const photoRef = useRef<ImagePicker.ImagePickerAsset | undefined>();
  const { samplePhotoUrl } = getValues();

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
    if (photoRef.current) {
      uploadFile.mutate(photoRef.current, {
        onError: (error) => console.log("error", error),
        onSuccess: (response) => {
          const createMedicationPayload = {
            ...data,
            samplePhotoUrl: response.data.url,
          };
          createMedication.mutate(createMedicationPayload, {
            onSuccess: onCreateMedicationSuccess,
            onError: onCreateMedicationError,
          });
        },
      });
    }
  });

  return {
    createMedicationLoading: createMedication.isPending || uploadFile.isPending,
    control,
    formErrors: errors,
    isFormValid: isValid,
    samplePhotoUrl,
    onPhotoTaken,
    onCancelPress,
    handleFormSubmit,
  };
}
