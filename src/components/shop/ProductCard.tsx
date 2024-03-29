import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

import {product} from '../../constants/storeTypes';
import {Colors, Sizes} from '../../constants/styles';
import {formatCurrency} from '../../utils/formatCurrency';

interface ProductCardProps {
  item: product;
  onTap: () => void;
}

function ProductCard({item, onTap}: ProductCardProps) {
  return (
    <TouchableOpacity
      accessibilityHint="product-card"
      onPress={onTap}
      style={styles.productView}
      activeOpacity={0.7}>
      <Image style={styles.productImage} source={{uri: item.images[0]}} />
      <Text numberOfLines={1} style={styles.productCategory}>
        {item.category.name}
      </Text>
      <Text numberOfLines={1} style={styles.productTitle}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
    </TouchableOpacity>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  productView: {
    width: 148,
    marginHorizontal: 8,
    height: 200,
  },
  productImage: {
    width: 148,
    height: 184,
    borderRadius: 8,
    backgroundColor: Colors.gray_200,
    marginBottom: 8,
  },
  productTitle: {
    color: Colors.black,
    marginVertical: 2,
    fontSize: Sizes.m,
    fontFamily: 'OpenSans-Bold',
  },
  productCategory: {
    color: Colors.gray_500,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  productPrice: {
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.black,
    fontSize: 14,
    marginBottom: 5,
  },
});
