import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RedButton from '../components/ui/RedButton';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import CartProduct from '../components/api/CartProducts';

function Cart() {
  const test = !(
    Object.keys(useSelector((state: RootState) => state.counter)).length !== 0
  );
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
        <CartProduct />
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
