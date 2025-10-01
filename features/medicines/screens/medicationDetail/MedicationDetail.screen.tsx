import React from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Stack } from "expo-router";

import { useMedicationDetailViewModel } from "@/features/medicines/effects/useMedicationDetailViewModel";

import Button from "@/shared/components/common/Button";
// import Dialog from "@/shared/components/common/Toasts/";

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
        <QuickActionSections />
      </ScrollView>
      {/* <Dialog
        visible={isDeleteDialogOpen}
        type="error"
        title="Apagar medicamento"
        description="Você tem certeza que deseja apagar esse medicamento do sistema?"
        onDismiss={handleDeleteMedicationToggle}
      >
        <Button
          mode="outlined"
          buttonColor=""
          onPress={handleDeleteMedicationToggle}
        >
          Cancelar
        </Button>
        <Button
          buttonColor=""
          onPress={handleDeleteMedication}
          loading={deleteMedicationLoading}
          disabled={deleteMedicationLoading}
        >
          Apagar
        </Button>
      </Dialog> */}
    </View>
  );
}
