import { View, ScrollView } from "react-native";

import TextInput from "@/components/TextInput";

import styles from "./styles";

export default function Register() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput label="Nome" supportingText="Nome fantasia do remédio" />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Posologia"
          supportingText="Como o remédio deve ser tomado"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Composição química"
          supportingText="Nomes dos compostos químicos"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Posição na prateleira"
          supportingText="Selecione qual é a posição do remédio na prateleira"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Preço da caixa"
          supportingText="Preço do remédio vendido em caixa"
          keyboardType="decimal-pad"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Preço da unidade"
          supportingText="Preço de uma unidade do remédio"
          keyboardType="decimal-pad"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Uso da medicação"
          supportingText="Qual é o uso indicado dessa medicação"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Estoque"
          supportingText="Quantidade de unidades do remédio"
          keyboardType="number-pad"
        />
      </View>
    </ScrollView>
  );
}
