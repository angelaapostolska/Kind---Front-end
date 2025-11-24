import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TestIDs } from '@/constants/TestIDs';
import ThemeInput from '@/components/ThemeInput';

describe('ThemeInput', () => {
  it('renders correctly by default', () => {
    const { toJSON, getByText } = render(<ThemeInput value="" onChangeText={() => {}} placeholder="Enter your name" />);

    expect(getByText('Enter your name')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with error message', () => {
    const { toJSON, getByText } = render(<ThemeInput value="" onChangeText={() => {}} placeholder="Email" errorMessage="Invalid email" />);

    expect(getByText('Invalid email')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies error border style when isValid is false', () => {
    const { getByTestId } = render(<ThemeInput value="Value" onChangeText={() => {}} placeholder="Email" isValid={false} />);

    const container = getByTestId(TestIDs.Components.ThemeInput.Container);
    const containerStyle = container.props.style;
    const hasErrorBorder = containerStyle.some((style: any) => style?.borderBottomWidth === 3);

    expect(hasErrorBorder).toBe(true);
  });

  it('applies error border and error message', () => {
    const { getByTestId, getByText } = render(
      <ThemeInput value="test.test" onChangeText={() => {}} placeholder="Email" isValid={false} errorMessage="Invalid email" />,
    );

    const container = getByTestId(TestIDs.Components.ThemeInput.Container);
    const containerStyle = container.props.style;
    const hasErrorBorder = containerStyle.some((style: any) => style?.borderBottomWidth === 3);

    expect(hasErrorBorder).toBe(true);
    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('renders correctly with value (no placeholder)', () => {
    const { toJSON, queryByText } = render(<ThemeInput value="John" onChangeText={() => {}} placeholder="Enter your name" />);

    expect(queryByText('Enter your name')).toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();

    const { getByTestId } = render(<ThemeInput value="Initial text" onChangeText={mockOnChangeText} placeholder="Email" />);

    const input = getByTestId(TestIDs.Components.ThemeInput.TextInput);
    fireEvent.changeText(input, 'New Text');

    expect(mockOnChangeText).toHaveBeenCalledWith('New Text');
  });

  it('respects the editable prop', () => {
    const { getByDisplayValue } = render(<ThemeInput value="Non-editable" onChangeText={() => {}} placeholder="Email" editable={false} />);

    const input = getByDisplayValue('Non-editable');

    expect(input.props.editable).toBe(false);
  });
});
