import { Stack } from "expo-router";
import React from "react";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { toastsConfig } from "@/shared/components/common/Toasts/toastConfig";

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
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <Stack />
        </PaperProvider>
      </QueryClientProvider>
      <Toast config={toastsConfig} />
    </>
  );
}
