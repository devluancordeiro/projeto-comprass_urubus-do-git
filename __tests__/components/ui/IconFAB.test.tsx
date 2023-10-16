import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import IconFAB from '../../../src/components/ui/IconFAB';

describe('IconFAB Component', () => {
  const mockOnPress = jest.fn();

  it('renders correctly', () => {
    const {getByTestId} = render(
      <IconFAB onPress={mockOnPress} icon="test-icon" color="blue" size={30} />,
    );

    const touchableComponent = getByTestId('touchable-component');
    expect(touchableComponent).toBeTruthy();

    fireEvent.press(touchableComponent);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('renders the correct icon', () => {
    const {getByTestId} = render(
      <IconFAB onPress={mockOnPress} icon="test-icon" color="blue" size={30} />,
    );

    const iconComponent = getByTestId('icon-component');
    expect(iconComponent).toBeTruthy();
  });
});
