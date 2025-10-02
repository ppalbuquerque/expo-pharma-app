import React, { useState } from "react";
import { View, Text } from "react-native";
import DropdownPicker from "react-native-dropdown-picker";

import { useDropDownPicker } from "./useDropDownPicker";
import buildStyles from "./styles";

type PharmaDropDownPickerItem = {
  label: string;
  value: string;
};

interface IPharmaDropdownPicker {
  items: PharmaDropDownPickerItem[];
  onChangeValue: (value: string | null) => void;
  label: string;
  helperText: string;
  placeholder?: string;
  hasError: boolean;
  errorMessage: string | undefined;
}

export default function PharmaDropdownPicker({
  items,
  label,
  helperText,
  placeholder,
  hasError,
  onChangeValue,
}: IPharmaDropdownPicker) {
  const [value, setValue] = useState(null);
  const { isOpen, setIsOpen } = useDropDownPicker();
  const styles = buildStyles(hasError);

  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <DropdownPicker
        open={isOpen}
        setOpen={setIsOpen}
        items={items}
        multiple={false}
        onChangeValue={onChangeValue}
        setValue={setValue}
        value={value}
        style={[styles.inputContainer]}
        placeholder={placeholder}
      />
      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}
