import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import DeliverySection from '../components/ui/DeliverySection';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';

const Checkout: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPayment, setSelectedPayment] = useState('None added');
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);

  const handleDeliverySelect = () => {
    setDeliveryPrice(15.0);
  };

  useEffect(() => {
    setTotalPrice(price + deliveryPrice);
  }, [deliveryPrice, price]);

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={styles.view}>
        <Text style={styles.textCheckout}>Checkout</Text>
        <Text style={styles.textBold}>Shipping address</Text>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.touchableClickText}>Click to add an adress</Text>
          <Text style={styles.touchableChangeText}>Change</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.textBold}>Payment Method</Text>
          <TouchableOpacity onPress={function (): void {}}>
            <Text style={styles.changePaymentText}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textNone}>None added</Text>
        <Text style={styles.textBold}>Delivery method</Text>
        <View style={styles.deliveryView}>
          <DeliverySection onPress={handleDeliverySelect}/>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textInfo}>Order: </Text>
          <View style={styles.flexContainer}>
            <Text style={styles.textPrice}>{price.toFixed(2)} R$ </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textInfo}>Delivery: </Text>
          <View style={styles.flexContainer}>
            <Text style={styles.textPrice}>{deliveryPrice.toFixed(2)} R$ </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textSummary}>Summary: </Text>
          <View style={styles.flexContainer}>
            <Text style={styles.textPriceSumarry}>
              {totalPrice.toFixed(2)} R${' '}
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <RedButton disabled onPress={function (): void {}}>
            Submit Order
          </RedButton>
        </View>
      </View>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  textCheckout: {
    color: Colors.black,
    fontSize: Sizes.l,
    fontFamily: 'OpenSans-ExtraBold',
    marginTop: 14,
    marginBottom: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },

  textBold: {
    fontSize: Sizes.m,
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: Colors.black,
    textAlign: 'center',
  },

  touchable: {
    width: 340,
    height: 108,
    backgroundColor: Colors.white,
    elevation: 6,
    shadowColor: Colors.black,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  touchableChangeText: {
    color: Colors.red_500,
    fontSize: Sizes.s,
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    marginBottom: 60,
    marginHorizontal: 30,
    textAlign: 'right',
  },

  touchableClickText: {
    color: Colors.gray_500,
    fontSize: Sizes.s,
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    marginHorizontal: 24,
    marginLeft: 30,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },

  changePaymentText: {
    color: Colors.red_500,
    fontWeight: 'bold',
    fontSize: Sizes.s,
    fontFamily: 'OpenSans-Bold',
    marginLeft: 86,
  },

  textNone: {
    color: Colors.gray_500,
    fontSize: Sizes.s,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 70,
    fontFamily: 'OpenSans-Bold',
  },

  deliveryView: {
    marginTop: 20,
  },

  priceContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 16,
  },

  flexContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  textInfo: {
    fontSize: Sizes.s,
    fontFamily: 'OpenSans-Bold',
    color: Colors.black,
  },

  textPrice: {
    position: 'absolute',
    fontFamily: 'OpenSans-Bold',
    fontSize: Sizes.m,
    color: Colors.black,
  },

  textSummary: {
    fontSize: Sizes.m,
    fontFamily: 'OpenSans-ExtraBold',
    fontWeight: 'bold',
    color: Colors.black,
  },

  textPriceSumarry: {
    fontSize: Sizes.l,
    fontFamily: 'OpenSans-ExtraBold',
    fontWeight: 'bold',
    color: Colors.black,
  },

  button: {
    width: 300,
    flexShrink: 0,
    marginTop: 38,
    alignSelf: 'center',
    fontSize: Sizes.s,
  },
});
