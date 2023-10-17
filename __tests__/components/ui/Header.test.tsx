import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../../../src/components/ui/Header';

describe('Header Component', () => {
  it('renders the title correctly', () => {
    const {getByText} = render(<Header title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('calls goBack function when the back button is pressed', () => {
    const goBackMock = jest.fn();
    const {getByAccessibilityHint} = render(
      <Header title="Test Title" goBack={goBackMock} />,
    );

    const backButton = getByAccessibilityHint('back-button');
    fireEvent.press(backButton);

    expect(goBackMock).toHaveBeenCalled();
  });

  it('does not render the back button when goBack is not provided', () => {
    const {queryByTestId} = render(<Header title="Test Title" />);
    const backButton = queryByTestId('back-button');
    expect(backButton).toBeNull();
  });
});
