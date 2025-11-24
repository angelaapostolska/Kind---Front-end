import Toast from 'react-native-toast-message';

export const showErrorToast = (title: string, message?: string) => {
  Toast.show({ type: 'error', text1: title, text2: message });
};

export const showSuccessToast = (title: string, message?: string) => {
  Toast.show({ type: 'success', text1: title, text2: message });
};

// TODO: Check with the BE
export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
  return re.test(String(email).toLowerCase());
};

// TODO: Check with the BE
export const validatePassword = (password: string) => {
  const re = /^.{8,}$/;
  return re.test(password);
};
