import React from "react";
import { View, Text } from "react-native";
import DropdownPicker, { ValueType } from "react-native-dropdown-picker";

import { useDropDownPicker } from "./useDropDownPicker";
import styles from "./styles";

type PharmaDropDownPickerItem = {
  label: string;
  value: string;
};

interface IPharmaDropdownPicker {
  items: PharmaDropDownPickerItem[];
  value: ValueType;
  setValue: () => void;
  label: string;
  helperText: string;
  placeholder?: string;
}

export default function PharmaDropdownPicker({
  items,
  value,
  setValue,
  label,
  helperText,
  placeholder,
}: IPharmaDropdownPicker) {
  const { isOpen, setIsOpen } = useDropDownPicker();

  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <DropdownPicker
        open={isOpen}
        setOpen={setIsOpen}
        items={items}
        multiple={false}
        setValue={setValue}
        value={value}
        style={styles.inputContainer}
        placeholder={placeholder}
      />
      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}
