import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";

import { useUploadFile } from "@/shared/hooks/common/useUploadFile";
import { centsToReais, reaisToCents } from "@/shared/utils/money";
import { useMedicationModel } from "../state/medication.model";

import {
  type CreateMedicationForm,
  createMedicationFormSchema,
} from "../forms/create-medication-form.schema";

export function useMedicationEditViewModel() {
  const { id: medicationId } = useLocalSearchParams<{ id: string }>();
  const { updateMedication, useGetMedicationById } = useMedicationModel();

  const { data } = useGetMedicationById(medicationId);

  const formValues = useMemo(() => {
    if (!data) return undefined;

    return {
      ...data,
      boxPrice: centsToReais(data.boxPrice),
      unitPrice: centsToReais(data.unitPrice),
    };
  }, [data]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<CreateMedicationForm>({
    resolver: yupResolver(createMedicationFormSchema),
    values: formValues,
    reValidateMode: "onBlur",
  });
  const { uploadFile } = useUploadFile();
  const photoRef = useRef<ImagePicker.ImagePickerAsset | undefined>();
  const [isPhotoUpdated, setIsPhotoUpdated] = useState(false);

  const onPhotoTaken = async (photo: ImagePicker.ImagePickerResult) => {
    const photoAsset = photo.assets?.at(0);

    if (photoAsset) {
      photoRef.current = photoAsset;
      setValue("samplePhotoUrl", photoRef.current.uri, {
        shouldValidate: true,
      });
      setIsPhotoUpdated(true);
    }
  };

  const onCancelPress = () => {
    router.back();
  };

  const onUpdateMedicationSuccess = () => {
    showSuccessToast();
    setTimeout(() => router.back(), 1500);
  };

  const onUpdateMedicationError = () => {
    showErrorToast();
  };

  const showSuccessToast = () => {
    const { name } = getValues();

    Toast.show({
      type: "success",
      text1: "Medicamento atualizado com sucesso!",
      text2: `${name} foi atualizado no sistema da farmácia e já pode ser utilizado.`,
    });
  };

  const showErrorToast = () => {
    const { name } = getValues();

    Toast.show({
      type: "error",
      text1: "Erro ao atualizar o medicamento",
      text2: `Ocorreu um erro ao tentar atualizar ${name} dentro do sistema`,
    });
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      let samplePhotoUrl = data.samplePhotoUrl;

      if (photoRef.current && isPhotoUpdated) {
        const uploadResponse = await uploadFile.mutateAsync(photoRef.current);
        samplePhotoUrl = uploadResponse.data.url;
      }

      await updateMedication.mutateAsync({
        ...data,
        boxPrice: reaisToCents(data.boxPrice),
        unitPrice: reaisToCents(data.unitPrice),
        samplePhotoUrl,
      });

      onUpdateMedicationSuccess();
    } catch (error) {
      console.log("error", error);
      onUpdateMedicationError();
    }
  });

  return {
    createMedicationLoading: updateMedication.isPending || uploadFile.isPending,
    control,
    formErrors: errors,
    isFormValid: isValid,
    onPhotoTaken,
    onCancelPress,
    handleFormSubmit,
  };
}
