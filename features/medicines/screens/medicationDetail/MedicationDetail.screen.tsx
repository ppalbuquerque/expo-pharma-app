import React from "react";
import { ScrollView, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useMedicationDetailViewModel } from "@/features/medicines/effects/useMedicationDetailViewModel";

import Button from "@/shared/components/common/Button";
import { Dialog } from "@/shared/components/common/Dialog";

import MedicationCoverImage from "../../components/MedicineCoverImage";
import { GeneralInfoSection } from "./sections/GeneralInfo.section";
import { MedicationInformationSection } from "./sections/MedicationInformation.section";
import { QuickActionSections } from "./sections/QuickActions.section";

import styles from "./styles";

export default function MedicationDetail() {
  const {
    isDeleteDialogOpen,
    medication,
    getMedicationLoading,
    deleteMedicationLoading,
    handleDeleteMedicationToggle,
    handleDeleteMedication,
  } = useMedicationDetailViewModel();

  if (getMedicationLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (medication === undefined) return null;

  return (
    <View>
      <Stack.Screen
        options={{
          title: medication.name,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <MedicationCoverImage imageSource={medication.samplePhotoUrl} />
        <GeneralInfoSection
          medicationName={medication.name}
          stock={!!medication.stockAvailability}
          shelfLocation={medication.shelfLocation}
          boxPrice={medication.boxPrice}
          unitPrice={medication.unitPrice}
          usefulness={medication.usefulness}
        />
        <MedicationInformationSection
          chemicalComposition={medication.chemicalComposition}
          posology={medication.dosageInstructions}
          shelfLocation={medication.shelfLocation}
          stock={medication.stockAvailability}
        />
        <QuickActionSections
          onDeleteMedicationPress={handleDeleteMedicationToggle}
        />
      </ScrollView>
      <Dialog.Container isVisible={isDeleteDialogOpen}>
        <Dialog.Title
          title="Apagar Medicamento"
          icon={<AntDesign name="warning" size={24} color="orange" />}
        />
        <Dialog.Body>
          <Text>
            Você tem certeza que quer deletar {medication.name}? Essa ação não
            pode ser desfeita
          </Text>
        </Dialog.Body>
        <Dialog.Actions>
          <Button
            mode="outlined"
            buttonColor="white"
            style={styles.cancelDeleteMedicationDialogButton}
            onPress={handleDeleteMedicationToggle}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            buttonColor="#FF5A5F"
            textColor="white"
            onPress={handleDeleteMedication}
            loading={deleteMedicationLoading}
          >
            Apagar
          </Button>
        </Dialog.Actions>
      </Dialog.Container>
    </View>
  );
}
