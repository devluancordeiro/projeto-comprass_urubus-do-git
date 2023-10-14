import React, {useEffect, useState} from 'react';
import {ScrollView, View, Image, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  reduceItemCount,
  increaseItemCount,
  deleteItemCount,
} from '../../redux/counterSlice';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {RootState} from '../../redux/store';
import {Colors} from '../../constants/styles';
import {getProductById} from '../../utils/fetchProducts';
import {product} from '../../constants/storeTypes';

const CartProduct = () => {
  const productsCart: any = useSelector((state: RootState) => state.counter);
  const cartItems = Object.entries(productsCart);
  const [products, setProducts] = useState<product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        cartItems.map(async ([productId]) => {
          const itemFetched = await getProductById(Number(productId));
          setProducts(prevItems => [...prevItems, itemFetched]);
          products.map((data, index) => {
            console.log(products[index]?.title);
          });
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchProduct();
  }, []);

  return (
    <ScrollView style={styles.cartScroll}>
      {cartItems.map(([productId, quantity]) => (
        <View key={productId}>
          <View style={styles.viewProduct}>
            <View style={styles.viewProductImage}>
              <Image
                source={{uri: products[Number(productId)]?.images[0]}}
                style={styles.productImage}
              />
            </View>
            <View style={styles.middleView}>
              <View>
                <Text style={styles.productName}>
                  {products[Number(productId)]?.title}
                </Text>
              </View>
              <View style={styles.viewProductCount}>
                <View>
                  <TouchableOpacity
                    style={styles.buttonCount}
                    onPress={() =>
                      dispatch(reduceItemCount(Number(productId)))
                    }>
                    <Ionicons
                      name="remove-outline"
                      size={30}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.numberCount}>{String(quantity)}</Text>
                <View>
                  <TouchableOpacity
                    style={styles.buttonCount}
                    onPress={() =>
                      dispatch(increaseItemCount(Number(productId)))
                    }>
                    <Ionicons
                      name="add-outline"
                      size={30}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.lastView}>
              <TouchableOpacity
                style={styles.remove}
                onPress={() => dispatch(deleteItemCount(Number(productId)))}>
                <Ionicons name="trash-outline" size={22} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.itemPrice}>
                R$ {products[productId]?.price},00
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CartProduct;

const styles = StyleSheet.create({
  viewProduct: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 106,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  viewProductImage: {
    flex: 1,
  },
  productImage: {
    width: 100,
    height: '100%',
  },
  middleView: {
    flex: 1,
    marginHorizontal: 4,
  },
  productName: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: Colors.black,
    marginVertical: 12,
  },
  viewProductCount: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonCount: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.red_500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberCount: {
    marginTop: '8%',
    marginHorizontal: 18,
    color: Colors.black,
  },
  lastView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  remove: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red_500,
    height: 30,
    width: 30,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  itemPrice: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: Colors.black,
    marginBottom: 16,
    marginRight: 16,
  },
  cartView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '16%',
  },
  cartScroll: {
    marginTop: '16%',
    height: '60%',
  },
});
