import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {getProductById} from '../../utils/fetchProducts';
import {product} from '../../constants/storeTypes';
import CartProductCard from './CartProductCard';
import {useSelector} from 'react-redux';
import type {RootState} from '../../redux/counterSlice';

const CartProduct = ({navigation}) => {
  const productsCart = useSelector((state: RootState) => state.counter);
  const [products, setProducts] = useState(
    new Map<number, {productItem: product; quantity: number}>(),
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productIds = Object.keys(productsCart);
        const updatedProducts = new Map();
        for (const productId of productIds) {
          const id = Number(productId);
          const quantity = productsCart[id];
          var productItem;
          if (products.has(id)) {
            productItem = products.get(id)?.productItem;
          } else {
            productItem = await getProductById(id);
          }
          updatedProducts.set(id, {
            productItem: productItem,
            quantity: quantity,
          });
        }
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsCart]);

  return (
    <FlatList
      style={styles.cartScroll}
      data={Array.from(products.values())}
      keyExtractor={({productItem}) => productItem.id.toString()}
      renderItem={({item}) => (
        <CartProductCard
          key={item.productItem.id}
          quantity={item.quantity}
          item={item.productItem}
          onTap={() =>
            navigation.navigate('details', {productOpened: item.productItem})
          }
        />
      )}
    />
  );
};

export default CartProduct;

const styles = StyleSheet.create({
  cartScroll: {
    marginTop: '16%',
    height: '60%',
  },
});
