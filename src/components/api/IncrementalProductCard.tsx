import React from 'react';
import {Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../constants/styles';
import {product} from '../../constants/storeTypes';
import {formatCurrency} from '../../utils/formatCurrency';
import {useStoreContext} from '../../contexts/StoreContext';

interface IncrementalProductCardProps {
  item: product;
  onTap: () => void;
}

function IncrementalProductCard({item, onTap}: IncrementalProductCardProps) {
  const {productsCart, increaseItemCount, reduceItemCount} = useStoreContext(); //lembrar de tipar

  return (
    <View style={styles.productView}>
      <View style={styles.counterWrapper}>
        <TouchableOpacity
          hitSlop={20}
          activeOpacity={0.7}
          onPress={() => reduceItemCount(item.id)}>
          <Image
            style={styles.quantityModifier}
            source={require('../../assets/images/reduce-count.png')}
          />
        </TouchableOpacity>
        <View style={styles.numberView}>
          <Text style={styles.number}>{productsCart.get(item.id) || 0}</Text>
        </View>
        <TouchableOpacity
          hitSlop={20}
          activeOpacity={0.7}
          onPress={() => increaseItemCount(item.id)}>
          <Image
            style={styles.quantityModifier}
            source={require('../../assets/images/increase-count.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onTap}>
        <Image source={{uri: item.images[0]}} style={styles.productImage} />
        <Text numberOfLines={1} style={styles.productTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          {item.description}
        </Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productView: {
    marginHorizontal: 8,
    width: 150,
  },
  counterWrapper: {
    flexDirection: 'row',
    height: 21,
  },
  quantityModifier: {
    width: 51,
    height: 21,
  },
  numberView: {
    width: 48,
    borderWidth: 1,
    borderColor: Colors.gray_500,
    alignItems: 'center',
  },
  number: {
    fontFamily: 'OpenSans-Bold',
    color: Colors.black,
  },
  productImage: {
    height: 218,
    backgroundColor: Colors.gray_200,
  },
  productTitle: {
    color: Colors.gray_500,
    marginTop: 8,
    marginBottom: 4,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: Sizes.m,
  },
  description: {
    color: Colors.black,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    marginBottom: 6,
  },
  price: {
    color: Colors.red_500,
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: Sizes.l,
  },
});

export default React.memo(IncrementalProductCard);
