import Toast from 'react-native-toast-message';
import { showErrorToast } from '@/utils';

describe('showErrorToast', () => {
  it('should call Toast.show with type "error" and provided title and message', () => {
    const title = 'Error';
    const message = 'Something went wrong';

    showErrorToast(title, message);

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: title,
      text2: message,
    });
  });

  it('should call Toast.show with type "error" with only title', () => {
    const title = 'Error';

    showErrorToast(title);

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: title,
      text2: undefined,
    });
  });
});
