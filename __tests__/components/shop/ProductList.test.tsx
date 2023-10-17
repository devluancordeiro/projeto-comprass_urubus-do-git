import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import ProductsList from '../../../src/components/shop/ProductsList';
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

const mockProducts = [
  {
    id: 1,
    images: ['https://example.com/image.jpg'],
    category: {id: 1, name: 'Category1'},
    title: 'Product 1',
    price: 19,
    description: 'Test description',
  },
  {
    id: 2,
    images: ['https://example.com/image.jpg'],
    category: {id: 2, name: 'Category2'},
    title: 'Product 2',
    price: 29,
    description: 'Test description',
  },
  {
    id: 3,
    images: ['https://example.com/image.jpg'],
    category: {id: 1, name: 'Category3'},
    title: 'Product 3',
    price: 39,
    description: 'Test description',
  },
];

describe('ProductsList Component', () => {
  it('renders the list title correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <ProductsList data={mockProducts} title="Test Products" />
        </NavigationContainer>
      </Provider>,
    );
    expect(getByText('Test Products')).toBeTruthy();
  });

  it('renders the list items correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <ProductsList data={mockProducts} title="Test Products" />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
    expect(getByText('Product 3')).toBeTruthy();
  });
});
