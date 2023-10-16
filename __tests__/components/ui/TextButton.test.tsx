import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TextButton from '../../../src/components/ui/TextButton';

describe('TextButton Component', () => {
  it('renders the button text correctly', () => {
    const {getByText} = render(
      <TextButton onPress={() => {}}>Click Me</TextButton>,
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls the onPress function when the button is pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <TextButton onPress={onPressMock}>Click Me</TextButton>,
    );

    // Find and press the button
    const button = getByText('Click Me');
    fireEvent.press(button);

    // Assert that the onPress function was called
    expect(onPressMock).toHaveBeenCalled();
  });
});
