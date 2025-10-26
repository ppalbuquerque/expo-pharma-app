import React from "react";
import { View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";

import styles from "./styles";

import Button from "../Button";
import { useImagePicker } from "./useImagePicker.hook";

interface IPharmaImagePicker {
  label: string;
  onPhotoTaken: (image: ImagePicker.ImagePickerResult) => Promise<void>;
  image?: string;
}

export default function PharmaImagePicker({
  onPhotoTaken,
  label,
  image,
}: IPharmaImagePicker) {
  const { handleImagePick, imagePreview } = useImagePicker({
    onPhotoTaken,
  });

  const showImagePreview = !!imagePreview || !!image;
  const imageToShow = image || imagePreview;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        {showImagePreview ? (
          <Image
            source={imageToShow}
            style={styles.imageContainer}
            contentFit="contain"
          />
        ) : (
          <>
            <Feather
              name="upload-cloud"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.helperText}>Tire uma foto do medicamento</Text>
          </>
        )}
        <Button
          onPress={handleImagePick}
          textColor="#FFFFFF"
          buttonColor="#222222"
        >
          Tirar foto
        </Button>
      </View>
    </View>
  );
}
