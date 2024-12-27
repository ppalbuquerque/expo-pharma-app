import { View, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";

import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { MedicationRegisterForm } from "@types";

import styles from "./styles";

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicationRegisterForm>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              label="Nome"
              supportingText="Nome fantasia do remédio"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="dosageInstructions"
          render={({ field }) => (
            <TextInput
              label="Posologia"
              supportingText="Como o remédio deve ser tomado"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="chemicalComposition"
          render={({ field }) => (
            <TextInput
              label="Composição química"
              supportingText="Nomes dos compostos químicos"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="shelfLocation"
          render={({ field }) => (
            <TextInput
              label="Posição na prateleira"
              supportingText="Selecione qual é a posição do remédio na prateleira"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="boxPrice"
          render={({ field }) => (
            <TextInput
              label="Preço da caixa"
              supportingText="Preço do remédio vendido em caixa"
              keyboardType="decimal-pad"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="unitPrice"
          render={({ field }) => (
            <TextInput
              label="Preço da unidade"
              supportingText="Preço de uma unidade do remédio"
              keyboardType="decimal-pad"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="usefulness"
          render={({ field }) => (
            <TextInput
              label="Uso da medicação"
              supportingText="Qual é o uso indicado dessa medicação"
              keyboardType="decimal-pad"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          name="stockAvailability"
          render={({ field }) => (
            <TextInput
              label="Estoque"
              supportingText="Quantidade de unidades do remédio"
              keyboardType="number-pad"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" icon="plus" onPress={onSubmit}>
          Adicionar
        </Button>
      </View>
    </ScrollView>
  );
}
