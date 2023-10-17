import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  Modal,
} from 'react-native';
import DeliverySection from '../components/ui/DeliverySection';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {StoreFlowParamList} from '../routes/StoreFlow';
import {RouteProp} from '@react-navigation/native';
import {methods} from '../constants/storeTypes';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';

type CheckoutProps = {
  navigation: StackNavigationProp<StoreFlowParamList, 'checkout'>;
  route: RouteProp<StoreFlowParamList, 'checkout'>;
};

function Checkout({navigation, route}: CheckoutProps) {
  const {t} = useTranslation();
  const {orderPrice} = route.params;

  const [paymentMethodImage, setPaymentMethodImage] = useState(null);
  const [methodPayment, setMethodPayment] = useState<methods>('None');
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const hide = () => setOpenModal(false);
  const hide2 = () => setOpenModal2(false);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expire, setExpire] = useState('');
  const [cvv, setCvv] = useState('');

  const paymentMethodImages = {
    'Credit or debit card': require('../assets/images/mastercard.png'),
    Pix: require('../assets/images/pix-small.png'),
    'Bank slip': require('../assets/images/bank.png'),
  };

  const handlePaymentMethodSelect = method => {
    setMethodPayment(method);
    setPaymentMethodImage(paymentMethodImages[method]);
  };

  const handleDeliverySelect = () => {
    setDeliveryPrice(15.0);
  };

  useEffect(() => {
    setTotalPrice(orderPrice + deliveryPrice);
  }, [deliveryPrice, orderPrice]);

  const modalHandler = () => {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <Modal
          visible={openModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setOpenModal(false)}>
          <View style={styles.viewTransparent}>
            <TouchableOpacity onPress={hide} style={styles.pressOutside} />
          </View>
        </Modal>
        <View style={styles.viewTeste}>
          <View style={styles.modalHeader}>
            <View style={styles.grayLine} />
            <Text style={styles.modalTitle}>
              {t('Choose your payment method')}
            </Text>
          </View>
          <TouchableOpacity
            style={
              methodPayment === 'Credit or debit card'
                ? styles.buttonPressed
                : styles.buttonNotPressed
            }
            onPress={() => {
              setMethodPayment('Credit or debit card');
              setOpenModal(false);
              setOpenModal2(true);
            }}>
            <Text
              style={
                methodPayment === 'Credit or debit card'
                  ? styles.textPressed
                  : styles.textNotPressed
              }>
              {t('Credit or debit card')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              methodPayment === 'Pix'
                ? styles.buttonPressed
                : styles.buttonNotPressed
            }
            onPress={() => {
              setMethodPayment('Pix');
            }}>
            <Text
              style={
                methodPayment === 'Pix'
                  ? styles.textPressed
                  : styles.textNotPressed
              }>
              {t('Pix')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              methodPayment === 'Bank slip'
                ? styles.buttonPressed
                : styles.buttonNotPressed
            }
            onPress={() => {
              setMethodPayment('Bank slip');
            }}>
            <Text
              style={
                methodPayment === 'Bank slip'
                  ? styles.textPressed
                  : styles.textNotPressed
              }>
              {t('Bank slip')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const modalCardHandler = () => {
    return (
      <Modal visible={openModal2} animationType="slide" transparent={true}>
        <Modal
          visible={openModal2}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setOpenModal2(false)}>
          <View style={styles.viewTransparent}>
            <TouchableOpacity onPress={hide2} style={styles.pressOutside} />
          </View>
        </Modal>
        <View style={styles.modalCredit}>
          <View style={styles.modalHeader}>
            <View style={styles.grayLine} />
            <Text style={styles.modalTitle}>Add new card</Text>
          </View>
          <View style={styles.inputs}>
            <Input
              label="Name on card"
              value={name}
              onChangeText={text => setName(text)}
              border
            />
            <Input
              label="Card number"
              value={number}
              onChangeText={text => setNumber(text)}
              border
            />
            <Input
              label="Expire date"
              value={expire}
              onChangeText={text => setExpire(text)}
              border
            />
            <Input
              label="CVV"
              value={cvv}
              onChangeText={text => setCvv(text)}
              border
            />
          </View>
          <View style={styles.buttonCard}>
            <RedButton
              children={'add card'}
              disabled={!name || !number || !expire || !cvv}
              onPress={() => {}}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={styles.view}>
        <Header title={t('Checkout')} goBack={() => navigation.goBack()} />
        <Text style={styles.textBold}>{t('Shipping address')}</Text>
        <TouchableOpacity
          style={styles.touchable}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('address');
          }}>
          <Text style={styles.touchableClickText}>
            {t('Click to add an adress')}
          </Text>
          <Text style={styles.touchableChangeText}>{t('Change')}</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.textBold}>{t('Payment Method')}</Text>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <Text style={styles.changePaymentText}>{t('Change')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerMethod}>
          {paymentMethodImage && (
            <Image source={paymentMethodImage} style={styles.methodImage} />
          )}
          {paymentMethodImage && (
            <View style={styles.textContainerMethod}>
              <Text style={styles.textWithMethod}>{t(methodPayment)}</Text>
            </View>
          )}
          {!paymentMethodImage && (
            <Text style={styles.textNone}>{t(methodPayment)}</Text>
          )}
        </View>
        <Text style={styles.textBold}>{t('Delivery method')}</Text>
        <View style={styles.deliveryView}>
          <DeliverySection onPress={handleDeliverySelect} />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textInfo}>{t('Order')}: </Text>
          <View style={styles.flexContainer}>
            <Text style={styles.textPrice}>{orderPrice.toFixed(2)} R$ </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textInfo}>{t('Delivery')}: </Text>
          <View style={styles.flexContainer}>
            <Text style={styles.textPrice}>{deliveryPrice.toFixed(2)} R$ </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textSummary}>{t('Summary')}: </Text>
          <View style={styles.flexContainer}>
            <Text style={styles.textPriceSumarry}>
              {totalPrice.toFixed(2)} R${' '}
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <RedButton
            disabled={methodPayment === 'None'}
            onPress={() => {
              navigation.navigate('success', {paymentMethod: methodPayment});
            }}>
            {t('Submit Order')}
          </RedButton>
        </View>
        {modalHandler()}
        {modalCardHandler()}
      </View>
    </>
  );
}

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
    marginVertical: 10,
    color: Colors.black,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },

  touchable: {
    width: '91%',
    height: 108,
    backgroundColor: Colors.white,
    elevation: 6,
    shadowColor: Colors.black,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    marginTop: 32,
  },

  changePaymentText: {
    color: Colors.red_500,
    fontWeight: 'bold',
    fontSize: Sizes.s,
    fontFamily: 'OpenSans-Bold',
    marginRight: '12%',
  },

  containerMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textNone: {
    color: Colors.gray_500,
    fontSize: Sizes.s,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 70,
    fontFamily: 'OpenSans-Bold',
  },

  textWithMethod: {
    color: Colors.gray_500,
    fontSize: Sizes.s,
    marginHorizontal: 96,
    marginTop: 24,
    marginBottom: 70,
    fontFamily: 'OpenSans-Bold',
  },

  textContainerMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  methodImage: {
    backgroundColor: Colors.white,
    width: 64,
    height: 38,
    resizeMode: 'contain',
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

  viewTransparent: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  viewTeste: {
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: Colors.white,
    width: '100%',
    height: '35%',
    marginTop: '135%',
  },

  modalHeader: {
    alignItems: 'center',
    marginBottom: 34,
  },

  modalTitle: {
    color: Colors.black,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },

  grayLine: {
    width: 60,
    height: 6,
    backgroundColor: Colors.gray_500,
    borderRadius: 3,
    marginVertical: 16,
  },

  pressOutside: {
    width: '100%',
    height: '100%',
  },

  buttonNotPressed: {
    backgroundColor: 'transparent',
  },

  buttonPressed: {
    backgroundColor: Colors.red_500,
  },

  textNotPressed: {
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.black,
    fontSize: 18,
    paddingVertical: 15,
    paddingLeft: 16,
  },

  textPressed: {
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.white,
    fontSize: 18,
    paddingVertical: 15,
    paddingLeft: 16,
  },
  modalCredit: {
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: Colors.white,
    width: '100%',
    height: '80%',
    marginTop: '68%',
  },
  inputs: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  buttonCard: {
    marginHorizontal: 16,
  },
});
