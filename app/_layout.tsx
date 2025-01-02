import { Stack } from "expo-router";
import {
  PaperProvider,
  Portal,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fffd",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Portal>
        <Stack />
      </Portal>
    </PaperProvider>
  );
}
