import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

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
  } = useForm<CreateMedicationForm>({
    resolver: yupResolver(createMedicationFormSchema),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    console.log("Submit");
    createMedication.mutate(data);
  });

  const onPhotoTaken = async (photo: ImagePicker.ImagePickerResult) => {
    console.log(photo);
  };

  const onCancelPress = () => {
    router.back();
  };

  useEffect(() => {
    if (createMedication.isSuccess) {
      router.back();
    }
  }, [createMedication.isSuccess]);

  return {
    createMedication,
    createMedicationLoading: createMedication.isPending,
    control,
    formErrors: errors,
    isFormValid: isValid,
    handleFormSubmit,
    onPhotoTaken,
    onCancelPress,
  };
}
