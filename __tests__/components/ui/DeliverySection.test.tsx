import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import DeliverySection from '../../../src/components/ui/DeliverySection';

describe('DeliverySection Component', () => {
  it('renders without errors', () => {
    const {getByAccessibilityHint} = render(
      <DeliverySection onPress={() => {}} />,
    );
    expect(getByAccessibilityHint('delivery-section')).toBeTruthy();
  });

  it('selects a delivery method on press', () => {
    const onPressMock = jest.fn();
    const {getAllByAccessibilityHint} = render(
      <DeliverySection onPress={onPressMock} />,
    );

    const firstItem = getAllByAccessibilityHint('delivery-method-item')[0];
    fireEvent.press(firstItem);

    expect(onPressMock).toHaveBeenCalled();
  });
});
