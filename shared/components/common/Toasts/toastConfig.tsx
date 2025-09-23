import React from "react";
import { ToastConfig } from "react-native-toast-message";

import SuccessToast from "./SuccessToast";
import ErrorToast from "./ErrorToast";

export const toastsConfig: ToastConfig = {
  success: (props) => <SuccessToast {...props} />,
  error: (props) => <ErrorToast {...props} />,
};
