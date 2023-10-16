import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RedButton from '../../../src/components/ui/RedButton';
import {Colors} from '../../../src/constants/styles';

describe('RedButton', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <RedButton onPress={() => console.log('Button Pressed')}>Test</RedButton>,
    );

    expect(getByText('Test')).toBeTruthy();
  });

  it('handles press events', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <RedButton onPress={mockOnPress}>Test</RedButton>,
    );

    fireEvent.press(getByText('Test'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loader when validating prop is true', () => {
    const {getByTestId} = render(
      <RedButton onPress={() => console.log('Button Pressed')} validating>
        Test
      </RedButton>,
    );

    expect(getByTestId('redButtonActivityIndicator')).toBeTruthy();
  });

  it('disables the button when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <RedButton onPress={onPressMock} disabled={true}>
        Click Me
      </RedButton>,
    );
    const button = getByTestId('redButtonView');

    expect(button.props.style).toContainEqual({
      backgroundColor: Colors.gray_900,
    });
  });
});
