import { View } from "react-native";
import {
  TextInput as PaperTextInput,
  TextInputProps,
  Text,
  useTheme,
} from "react-native-paper";

import styles from "./styles";

interface Props extends TextInputProps {
  supportingText: string;
}

export default function TextInput({ supportingText, ...props }: Props) {
  const { colors } = useTheme();

  return (
    <View>
      <PaperTextInput {...props} />
      <Text style={{ color: colors.scrim }}>{supportingText}</Text>
    </View>
  );
}
