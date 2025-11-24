import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HeaderBackButton from '@/components/HeaderBackButton'; // adjust path if needed
import { TestIDs } from '@/constants/TestIDs';
import { useTypedTranslation } from '@/locales/useTypedTranslation';

describe('HeaderBackButton', () => {
  it('renders correctly', () => {
    const { t } = useTypedTranslation();

    const { toJSON, getByText } = render(<HeaderBackButton onPress={() => {}} />);

    expect(getByText('arrow-back')).toBeTruthy();
    expect(getByText(t('common.back'))).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<HeaderBackButton onPress={onPressMock} />);

    const backButton = getByTestId(TestIDs.Components.HeaderBackButton.Container);
    fireEvent.press(backButton);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
