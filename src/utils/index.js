import Toast from 'react-native-toast-message';

export const showErrorToast = (title, message) => {
  Toast.show({ type: 'error', text1: title, text2: message });
};

export const showSuccessToast = (title, message) => {
  Toast.show({ type: 'success', text1: title, text2: message });
};

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  const re = /^.{8,}$/;
  return re.test(password);
};
