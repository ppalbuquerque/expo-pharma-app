import React from "react";
import { ToastConfig } from "react-native-toast-message";

import SuccessToast from "./SuccessToast";

export const toastsConfig: ToastConfig = {
  success: (props) => <SuccessToast {...props} />,
};
