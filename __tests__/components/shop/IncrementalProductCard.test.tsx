import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import IncrementalProductCard from '../../../src/components/shop/IncrementalProductCard';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: async (...args) => args,
    setItem: async (...args) => args,
    removeItem: async (...args) => args,
  };
});

const mockProduct = {
  id: 1,
  images: ['https://example.com/image.jpg'],
  category: {id: 1, name: 'Category'},
  title: 'Product Title',
  price: 19,
  description: 'Test description',
};

describe('ExpansableItem component', () => {
  it('should render the product card correctly', () => {
    const {getByText} = render(
      <IncrementalProductCard item={mockProduct} onTap={() => {}} />,
    );

    expect(getByText('Product Title')).toBeTruthy();
    expect(getByText('Category')).toBeTruthy();
    expect(getByText('19,00 R$')).toBeTruthy();
  });

  it('should correctly increment and decrement the counter', async () => {
    const {getByText, getByAccessibilityHint} = render(
      <Provider store={store}>
        <IncrementalProductCard item={mockProduct} onTap={() => {}} />
      </Provider>,
    );

    const reduceCountButton = getByAccessibilityHint('handle-reduce-count');
    const increaseCountButton = getByAccessibilityHint('handle-increase-count');
    fireEvent.press(increaseCountButton);
    expect(getByText('1')).toBeTruthy();
    fireEvent.press(reduceCountButton);
    expect(getByText('0')).toBeTruthy();
  });
});
