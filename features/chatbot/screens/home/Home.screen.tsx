import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";

import TextInput from "@/shared/components/common/TextInput";
import Button from "@/shared/components/common/Button";

import { styles } from "./styles";

import { useChatbotHomeViewModel } from "../../effects/useChatbotHomeViewModel";

export function ChatbotHomeScreen() {
  const {
    completion,
    input,
    isLoading,
    shouldShowCompletion,
    onSendButtonPress,
    setInput,
  } = useChatbotHomeViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Perguntar para IA" }} />
      <ScrollView style={styles.content}>
        {shouldShowCompletion ? (
          <View style={styles.completionBubble}>
            <Text style={styles.completionAgentTitle}>Resposta do agente</Text>
            <Text style={styles.completionText}>{completion}</Text>
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            label="Digite sua pergunta"
          />
          <Button
            mode="contained"
            buttonColor="#FF5A5F"
            textColor="white"
            onPress={onSendButtonPress}
            disabled={isLoading}
            loading={isLoading}
          >
            Fazer Pergunta
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
