import React from "react";
import { Image } from "expo-image";

import styles from "./styles";

type Props = {
  imageSource?: string;
};

export default function MedicationCoverImage({ imageSource }: Props) {
  return <Image source={imageSource} style={styles.imageContainer} />;
}
