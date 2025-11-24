import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThemeButton from '@/components/ThemeButton';
import { TestIDs } from '@/constants/TestIDs';

describe('ThemeButton', () => {
  it('renders correctly default', () => {
    const { toJSON } = render(<ThemeButton title="Default Fill Button" onPress={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly in outline mode', () => {
    const { toJSON } = render(<ThemeButton title="Outline Button" onPress={() => {}} type="outline" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with correct title and type', () => {
    const { getByText } = render(<ThemeButton title="My Button" onPress={() => {}} type="outline" />);
    expect(getByText('My Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();

    const { getByTestId } = render(<ThemeButton title="Press Me" onPress={mockOnPress} />);

    const button = getByTestId(TestIDs.Components.ThemeButton.Container);
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();

    const { getByTestId } = render(<ThemeButton title="Disabled BTN" onPress={mockOnPress} disabled />);

    const button = getByTestId(TestIDs.Components.ThemeButton.Container);
    fireEvent.press(button);

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading is true', () => {
    const { getByTestId } = render(<ThemeButton title="Loading BTN" onPress={() => {}} loading />);

    const activityIndicator = getByTestId(TestIDs.Components.ThemeButton.ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
  });
});
