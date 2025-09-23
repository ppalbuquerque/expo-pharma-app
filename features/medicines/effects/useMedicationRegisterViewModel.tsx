import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
  } = useForm<CreateMedicationForm>({
    resolver: yupResolver(createMedicationFormSchema),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    createMedication.mutate(data);
  });

  const onPhotoTaken = async (photo: ImagePicker.ImagePickerResult) => {
    console.log(photo);
  };

  const onCancelPress = () => {
    showSuccessToast();
    // router.back();
  };

  const showSuccessToast = () =>
    Toast.show({
      type: "success",
      text1: "Medication Registered Successfully!",
      text2:
        "Aspirin has been added to your pharmacy inventory and is now available for dispensing.",
    });

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
    showSuccessToast,
  };
}
