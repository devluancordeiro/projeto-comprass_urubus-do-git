import React, {useState} from 'react';
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

  let price = 0.99;
  let deliveryPrice = 15;
  let totalPrice = 0;
  totalPrice += price + deliveryPrice;

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
        <Text style={styles.textBold}>Delivery method</Text>
        <View style={styles.deliveryView}>
          <DeliverySection />
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
  },

  touchable: {
    width: 300,
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

  modalContainer: {
    backgroundColor: Colors.white,
    height: 270,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },

  modalTitle: {
    color: Colors.black,
    fontSize: Sizes.l,
    fontFamily: 'OpenSans-ExtraBold',
    fontWeight: 'bold',
    marginBottom: 34,
  },

  modalCloseText: {
    color: Colors.black,
    fontSize: Sizes.m,
    marginTop: 16,
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
  },

  textPrice: {
    position: 'absolute',
    fontFamily: 'OpenSans-Bold',
    fontSize: Sizes.m,
  },

  textSummary: {
    fontSize: Sizes.m,
    fontFamily: 'OpenSans-ExtraBold',
    fontWeight: 'bold',
  },

  textPriceSumarry: {
    fontSize: Sizes.l,
    fontFamily: 'OpenSans-ExtraBold',
    fontWeight: 'bold',
  },

  button: {
    width: 300,
    flexShrink: 0,
    marginTop: 38,
    alignSelf: 'center',
    fontSize: Sizes.s,
  },
});
