import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingOverlay from '../../../src/components/ui/LoadingOverlay';

describe('LoadingOverlay Component', () => {
  it('renders correctly with message', () => {
    const {getByText, getByTestId} = render(
      <LoadingOverlay message="Loading..." />,
    );

    const messageElement = getByText('Loading...');
    expect(messageElement).toBeTruthy();

    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });
});
