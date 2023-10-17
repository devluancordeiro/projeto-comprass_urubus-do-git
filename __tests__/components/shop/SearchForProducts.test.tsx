import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchForProducts from '../../../src/components/shop/SearchForProducts';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: async (...args) => args,
    setItem: async (...args) => args,
    removeItem: async (...args) => args,
  };
});

describe('SearchForProducts', () => {
  it('renders correctly', () => {
    const {getByAccessibilityHint} = render(
      <Provider store={store}>
        <NavigationContainer>
          <SearchForProducts />
        </NavigationContainer>
      </Provider>,
    );
    expect(getByAccessibilityHint('search')).toBeTruthy();
  });

  it('should open the input when pressed on search', () => {
    const {getByAccessibilityHint, getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <SearchForProducts />
        </NavigationContainer>
      </Provider>,
    );
    const button = getByAccessibilityHint('search');
    fireEvent.press(button);
    expect(getByPlaceholderText('Enter the product name')).toBeTruthy();
  });
});
