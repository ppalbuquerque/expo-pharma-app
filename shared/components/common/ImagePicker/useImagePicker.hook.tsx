import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

interface IUseImagePicker {
  onPhotoTaken: (image: ImagePicker.ImagePickerResult) => Promise<void>;
}

export function useImagePicker({ onPhotoTaken }: IUseImagePicker) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const handleImagePick = async () => {
    if (
      cameraPermissionStatus?.status !== ImagePicker.PermissionStatus.GRANTED
    ) {
      requestCameraPermission();
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      cameraType: ImagePicker.CameraType.back,
      quality: 0.5,
    });

    if (!result.canceled) {
      onPhotoTaken(result);
      setImagePreview(result.assets[0].uri);
    }
  };

  return {
    handleImagePick,
    imagePreview,
  };
}
