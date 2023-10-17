import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ExpansableItem from '../../../src/components/ui/ExpansableItem';

describe('ExpansableItem component', () => {
  it('renders correctly with provided props', () => {
    const {queryByText, getByText, getByAccessibilityHint} = render(
      <ExpansableItem label="label" details="details" />,
    );
    const toggleButton = getByAccessibilityHint('toggle-expansable-item');
    expect(queryByText('details')).not.toBeTruthy();
    fireEvent.press(toggleButton);
    expect(getByText('details')).toBeTruthy();
  });
});
