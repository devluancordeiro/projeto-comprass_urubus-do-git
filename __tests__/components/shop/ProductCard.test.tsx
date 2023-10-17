import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ProductCard from '../../../src/components/shop/ProductCard';

const mockProduct = {
  id: 1,
  images: ['https://example.com/image.jpg'],
  category: {id: 1, name: 'Category'},
  title: 'Product Title',
  price: 19,
  description: 'Test description',
};

describe('ProductCard Component', () => {
  it('renders the product card correctly', () => {
    const {getByText, getByAccessibilityHint} = render(
      <ProductCard item={mockProduct} onTap={() => {}} />,
    );

    // Check if the components are rendered correctly
    expect(getByAccessibilityHint('product-card')).toBeTruthy();
    expect(getByText('Product Title')).toBeTruthy();
    expect(getByText('Category')).toBeTruthy();
    expect(getByText('19,00 R$')).toBeTruthy();
  });
  it('change to other item on press', () => {
    const onPressMock = jest.fn();
    const {getByAccessibilityHint} = render(
      <ProductCard item={mockProduct} onTap={onPressMock} />,
    );

    const card = getByAccessibilityHint('product-card');
    fireEvent.press(card);

    expect(onPressMock).toHaveBeenCalled();
  });
});
