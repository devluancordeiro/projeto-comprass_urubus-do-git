import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useStoreContext} from '../contexts/StoreContext';
import {Colors} from '../constants/styles';

function Cart() {
  const {productsCart} = useStoreContext();

  return (
    <ScrollView>
      {Array.from(productsCart).map(([productId, count]) => (
        <View
          key={productId}
          style={{
            backgroundColor: Colors.orange,
            height: 40,
            justifyContent: 'center',
            padding: 10,
            margin: 10,
            borderRadius: 5,
          }}>
          <Text>
            {productId}: {count}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
export default Cart;
