import React, {memo} from 'react';
import {View, Image, Text, Pressable, StyleSheet} from 'react-native';
import {Colors} from '../../constants/styles';
import {formatCurrency} from '../../utils/formatCurrency';
import {product} from '../../constants/storeTypes';

interface SearchedProductCard {
  item: product;
  onTap: () => void;
}

function SearchedProductCard({item, onTap}: SearchedProductCard) {
  return (
    <Pressable onPress={onTap} style={styles.productCard}>
      <View style={styles.productContainer}>
        <Image
          style={styles.productImage}
          source={{
            uri: item.images[0],
          }}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text numberOfLines={1} style={{color: Colors.black}}>
            {item.description}
          </Text>
        </View>
        <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
      </View>
    </Pressable>
  );
}

export default memo(SearchedProductCard);

const styles = StyleSheet.create({
  productCard: {
    height: 66,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 11,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  productImage: {
    width: 30,
    height: 38,
    borderRadius: 6,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
  productPrice: {
    color: Colors.red_500,
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 16,
    alignSelf: 'center',
  },
});
