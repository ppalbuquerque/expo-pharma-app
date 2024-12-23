import { Card, TouchableRipple } from "react-native-paper";
import { Image } from "expo-image";

import styles from "./styles";

type Props = {
  medicationTitle: string;
  chemicalComposition: string;
};

export default function MedicationCard({
  chemicalComposition,
  medicationTitle,
}: Props) {
  return (
    <TouchableRipple>
      <Card>
        <Card.Title
          title={medicationTitle}
          subtitle={chemicalComposition}
          right={(props) => (
            <Image style={styles.image} source="https://picsum.photos/200" />
          )}
        />
      </Card>
    </TouchableRipple>
  );
}
