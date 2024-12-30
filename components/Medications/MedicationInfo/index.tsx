import { View } from "react-native";
import { Card, Text } from "react-native-paper";

import styles from "./styles";

type MedicationInfo = {
  title: string;
  description: string;
};

type Props = {
  medicationInfo: MedicationInfo[];
  coverUrl?: string;
};

export default function MedicationInfo({ medicationInfo, coverUrl }: Props) {
  return (
    <Card style={styles.container} mode="outlined">
      {coverUrl && (
        <Card.Cover source={{ uri: coverUrl }} style={styles.coverImage} />
      )}
      <Card.Content>
        {medicationInfo.map((medicationInfo) => (
          <View key={medicationInfo.title} style={styles.infoContainer}>
            <Text variant="titleMedium">{medicationInfo.title}</Text>
            <Text>{medicationInfo.description}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}
