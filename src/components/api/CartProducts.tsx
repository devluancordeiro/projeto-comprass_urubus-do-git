import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {getProductById} from '../../utils/fetchProducts';
import {product} from '../../constants/storeTypes';
import CartProductCard from './CartProductCard';
import {useSelector} from 'react-redux';
import type {RootState} from '../../redux/counterSlice';
import RedButton from '../ui/RedButton';
import {Colors} from '../../constants/styles';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StoreFlowParamList} from '../../routes/StoreFlow';

const CartProducts = () => {
  const {t} = useTranslation();
  const [addPrices, setAddPrices] = useState(0);
  const productsCart = useSelector((state: RootState) => state.counter);
  const [products, setProducts] = useState(
    new Map<number, {productItem: product; quantity: number}>(),
  );
  const navigation = useNavigation<StackNavigationProp<StoreFlowParamList>>();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productIds = Object.keys(productsCart);
        const updatedProducts = new Map();
        const productPromises = [];
        for (const productId of productIds) {
          const id = Number(productId);
          const quantity = productsCart[id];
          const existingProduct = products.get(id);
          if (existingProduct) {
            updatedProducts.set(id, {
              productItem: existingProduct.productItem,
              quantity: quantity,
            });
          } else {
            productPromises.push(
              getProductById(id).then(productItem => {
                if (productItem.name !== 'EntityNotFoundError') {
                  updatedProducts.set(id, {
                    productItem: productItem,
                    quantity: quantity,
                  });
                }
              }),
            );
          }
        }
        await Promise.all(productPromises);
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsCart]);

  useEffect(() => {
    let total = 0;
    products.forEach(item => {
      const price = item.productItem.price;
      const quantity = item.quantity;
      total += price * quantity;
    });
    setAddPrices(total);
  }, [products]);

  return (
    <>
      <View>
        <FlatList
          style={styles.cartScroll}
          data={Array.from(products.values())}
          keyExtractor={({productItem}) => productItem.id.toString()}
          renderItem={({item}) => {
            return (
              <CartProductCard
                key={item.productItem.id}
                quantity={item.quantity}
                item={item.productItem}
                onTap={() =>
                  navigation.navigate('details', {
                    productOpened: item.productItem,
                  })
                }
              />
            );
          }}
        />
      </View>
      <View style={styles.bottomView}>
        <View style={styles.priceView}>
          <Text style={styles.amountText}>{t('Total amount:')}</Text>
          <Text style={styles.priceText}>R$ {addPrices.toString()},00</Text>
        </View>
        <View style={styles.buttonView}>
          {addPrices > 0 ? (
            <RedButton
              children={t('Buy')}
              onPress={() => {
                navigation.navigate('checkout', {orderPrice: addPrices});
              }}
            />
          ) : (
            <RedButton children={t('Buy')} disabled onPress={() => {}} />
          )}
        </View>
      </View>
    </>
  );
};

export default CartProducts;

const styles = StyleSheet.create({
  cartScroll: {
    marginTop: '16%',
    height: '76%',
  },
  bottomView: {
    justifyContent: 'flex-end',
    marginTop: 9,
    marginBottom: 10,
  },
  priceView: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: {
    fontFamily: 'OpenSans-Regular',
    color: Colors.gray_500,
    fontSize: 16,
  },
  priceText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    color: Colors.black,
  },
  buttonView: {
    marginTop: 28,
    marginHorizontal: 16,
  },
});
