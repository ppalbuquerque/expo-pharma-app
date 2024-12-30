import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";

import Button from "@/components/common/Button";

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

export default function Detail() {
  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Text variant="titleMedium">Dexason</Text>
          <Text>Dexametasona</Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <View>
            <Text variant="titleMedium">Posologia</Text>
            <Text>Recomendar utilização de 1 comprimido a cada 8 horas</Text>
          </View>
          <View>
            <Text variant="titleMedium">Para que serve</Text>
            <Text>
              Ele é um anti-inflamatório de uso geral, ele pode ser indicado
              para dor no corpo, inflamação de garganta.
            </Text>
          </View>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <View>
            <Text variant="titleMedium">Estoque</Text>
            <Text>20 Unidades</Text>
          </View>
          <View>
            <Text variant="titleMedium">Posição</Text>
            <Text>Prateleira 2F</Text>
          </View>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <View>
            <Text variant="titleMedium">Preço Unitário</Text>
            <Text>R$ 40,00</Text>
          </View>
          <View>
            <Text variant="titleMedium">Preço Caixa</Text>
            <Text>R$ 40,00</Text>
          </View>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Button>Editar</Button>
          <Button>Cancelar</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
