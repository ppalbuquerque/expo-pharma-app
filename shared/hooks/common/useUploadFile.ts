import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";

import { FileService } from "@/services/files.service";

export function useUploadFile() {
  const _buildFormData = (file: ImagePicker.ImagePickerAsset): FormData => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.mimeType || "image/jpeg",
      name: file.fileName || "photo.jpg",
    } as any);

    return formData;
  };

  const uploadFile = useMutation({
    mutationFn: (data: ImagePicker.ImagePickerAsset) =>
      FileService.uploadFile(_buildFormData(data)),
  });

  return {
    uploadFile,
  };
}
