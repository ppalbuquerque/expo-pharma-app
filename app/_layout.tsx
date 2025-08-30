import { Stack } from "expo-router";
import React from "react";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  Portal,
} from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fffd",
  },
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Portal>
          <Stack />
        </Portal>
      </PaperProvider>
    </QueryClientProvider>
  );
}
