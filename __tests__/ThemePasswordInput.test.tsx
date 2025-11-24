import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TestIDs } from '@/constants/TestIDs';
import ThemePasswordInput from '@/components/ThemePasswordInput'; // Adjust path

describe('ThemePasswordInput', () => {
  it('renders correctly by default', () => {
    const { toJSON, getByTestId, getByText } = render(<ThemePasswordInput value="" onChangeText={() => {}} placeholder="Password" />);

    expect(getByText('Password')).toBeTruthy();
    expect(getByTestId(TestIDs.Components.ThemePasswordInput.Container)).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with error message', () => {
    const { getByText, toJSON } = render(
      <ThemePasswordInput value="" onChangeText={() => {}} placeholder="Password" errorMessage="Invalid password" />,
    );

    expect(getByText('Invalid password')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when value is present', () => {
    const { toJSON, queryByText } = render(<ThemePasswordInput value="SecretPass" onChangeText={() => {}} placeholder="Password" />);

    expect(queryByText('Password')).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();

    const { getByTestId } = render(<ThemePasswordInput value="Initial" onChangeText={mockOnChangeText} placeholder="Password" />);

    const input = getByTestId(TestIDs.Components.ThemePasswordInput.TextInput);
    fireEvent.changeText(input, 'NewPass');

    expect(mockOnChangeText).toHaveBeenCalledWith('NewPass');
  });

  it('toggles eye icon on press', () => {
    const { getByText, getByTestId } = render(<ThemePasswordInput value="secret" onChangeText={() => {}} placeholder="Password" />);
    // It is not possible to give testID to the expo icons
    expect(getByText('eye')).toBeTruthy();

    const eyeButton = getByTestId(TestIDs.Components.ThemePasswordInput.EyeBtn);
    fireEvent.press(eyeButton);
    expect(getByText('eye-off')).toBeTruthy();
  });

  it('respects the editable prop', () => {
    const { getByTestId } = render(<ThemePasswordInput value="secret" onChangeText={() => {}} placeholder="Password" editable={false} />);

    const input = getByTestId(TestIDs.Components.ThemePasswordInput.TextInput);
    expect(input.props.editable).toBe(false);
  });
});
