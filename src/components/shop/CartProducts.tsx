import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {product} from '../../constants/storeTypes';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../constants/styles';
import {deleteItemCount} from '../../redux/counterSlice';
import {setOrderSlice} from '../../redux/orderSlice';
import type {RootState} from '../../redux/store';
import {StoreFlowParamList} from '../../routes/StoreFlow';
import {getProductById} from '../../utils/fetchProducts';
import RedButton from '../ui/RedButton';
import CartProductCard from './CartProductCard';
import {AuthContext} from '../context/AuthContext';

const CartProducts = () => {
  const {t} = useTranslation();
  const [addPrices, setAddPrices] = useState(0);
  const productsCart = useSelector((state: RootState) => state.counter);
  const [products, setProducts] = useState(
    new Map<number, {productItem: product; quantity: number}>(),
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<StoreFlowParamList>>();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        ctx.isLoading(true);
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
                } else {
                  dispatch(deleteItemCount(id));
                }
              }),
            );
          }
        }
        ctx.isLoading(false);
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
    dispatch(setOrderSlice(total));
  }, [dispatch, products]);

  return (
    <>
      {ctx.loading ? (
        <ActivityIndicator size="large" color={Colors.red_500} />
      ) : (
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
                    if (ctx.isLogged) {
                      navigation.navigate('checkout' as never);
                    } else {
                      navigation.navigate('checkoutNotlog');
                    }
                  }}
                />
              ) : (
                <RedButton children={t('Buy')} disabled onPress={() => {}} />
              )}
            </View>
          </View>
        </>
      )}
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
