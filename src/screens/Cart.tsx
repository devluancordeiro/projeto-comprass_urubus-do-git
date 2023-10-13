import React from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {useStoreContext} from '../contexts/StoreContext';
import {Colors} from '../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RedButton from '../components/ui/RedButton';

function Cart() {
  const {productsCart}: any = useStoreContext();
  const test = false;

  if (test) {
    return (
      <>
        <View>
          <View style={styles.titleView}>
            <Text style={styles.title}>Cart</Text>
          </View>
          <View style={styles.cartView}>
            <Ionicons name={'cart-outline'} size={62} />
            <Text style={styles.cartText}>
              Your cart is so empty and abandoned...
            </Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.priceView}>
            <Text style={styles.amountText}>Total amount:</Text>
            <Text style={styles.priceText}>0 R$</Text>
          </View>
          <View style={styles.buttonView}>
            <RedButton
              children={'Buy'}
              disabled
              onPress={() => {
                return console.log('Buy');
              }}
            />
          </View>
        </View>
      </>
    );
  }
  return (
    <>
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Cart</Text>
        </View>
        <ScrollView style={styles.cartScroll}>
          {Array.from(productsCart).map(([productId, count]) => (
            <View key={productId} style={styles.viewProduct}>
              <View style={styles.viewProductImage}>
                <Image
                  source={require('../assets/images/productImage.png')}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.middleView}>
                <Text style={styles.productName}>Name</Text>
                <View style={styles.viewProductCount}>
                  <View style={styles.buttonCount}>
                    <RedButton
                      children={
                        <Ionicons
                          name="remove-outline"
                          size={20}
                          onPress={() => {
                            return console.log('Decrement');
                          }}
                        />
                      }
                    />
                  </View>
                  <Text style={styles.numberCount}>{count}</Text>
                  <View style={styles.buttonCount}>
                    <RedButton
                      children={
                        <Ionicons
                          name="add-outline"
                          size={20}
                          onPress={() => {
                            return console.log('Increment');
                          }}
                        />
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={styles.lastView}>
                <View style={styles.remove}>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={Colors.white}
                  />
                </View>
                <Text style={styles.itemPrice}>58,90 R$</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.priceView}>
          <Text style={styles.amountText}>Total amount:</Text>
          <Text style={styles.priceText}>0 R$</Text>
        </View>
        <View style={styles.buttonView}>
          <RedButton
            children={'Buy'}
            disabled
            onPress={() => {
              return console.log('Buy');
            }}
          />
        </View>
      </View>
    </>
  );
}
export default Cart;

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
    marginHorizontal: 8,
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
  },
  numberCount: {
    marginTop: '8%',
    marginHorizontal: 18,
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
  titleView: {
    marginTop: '16%',
    marginLeft: 16,
  },
  title: {
    color: Colors.black,
    fontSize: 36,
    fontFamily: 'OpenSans-ExtraBold',
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
  cartText: {
    fontFamily: 'OpenSans-Regular',
    color: Colors.black,
    fontSize: 26,
    textAlign: 'center',
    paddingTop: 16,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
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
