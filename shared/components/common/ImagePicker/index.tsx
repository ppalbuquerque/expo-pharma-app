import React from "react";
import { View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";

import styles from "./styles";

import Button from "../Button";

interface IPharmaImagePicker {
  label: string;
  onPhotoTaken: (image: ImagePicker.ImagePickerResult) => Promise<void>;
}

export default function PharmaImagePicker({
  onPhotoTaken,
  label,
}: IPharmaImagePicker) {
  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const onImagePick = async () => {
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

    onPhotoTaken(result);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Feather
          name="upload-cloud"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.helperText}>Tire uma foto do medicamento</Text>
        <Button onPress={onImagePick} textColor="#FFFFFF" buttonColor="#222222">
          Tirar foto
        </Button>
      </View>
    </View>
  );
}
