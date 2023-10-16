import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
  Modal,
} from 'react-native';
import DeliverySection from '../components/ui/DeliverySection';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';
import {useTranslation} from 'react-i18next';

const Checkout: React.FC = ({navigation, route}) => {
  const {t} = useTranslation();
  const {orderPrice} = route.params;

  const [selectedPayment, setSelectedPayment] = useState('None added');
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const hide = () => setOpenModal(false);
  const [methodPayment1, setMethodPayment1] = useState(false);
  const [methodPayment2, setMethodPayment2] = useState(false);
  const [methodPayment3, setMethodPayment3] = useState(false);

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
              methodPayment1 ? styles.buttonPressed : styles.buttonNotPressed
            }
            onPress={() => {
              setMethodPayment1(true);
              setMethodPayment2(false);
              setMethodPayment3(false);
            }}>
            <Text
              style={
                methodPayment1 ? styles.textPressed : styles.textNotPressed
              }>
              {t('Credit or debit card')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              methodPayment2 ? styles.buttonPressed : styles.buttonNotPressed
            }
            onPress={() => {
              setMethodPayment1(false);
              setMethodPayment2(true);
              setMethodPayment3(false);
            }}>
            <Text
              style={
                methodPayment2 ? styles.textPressed : styles.textNotPressed
              }>
              {t('Pix')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              methodPayment3 ? styles.buttonPressed : styles.buttonNotPressed
            }
            onPress={() => {
              setMethodPayment1(false);
              setMethodPayment2(false);
              setMethodPayment3(true);
            }}>
            <Text
              style={
                methodPayment3 ? styles.textPressed : styles.textNotPressed
              }>
              {t('Bank slip')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={styles.view}>
        <Text style={styles.textCheckout}>{t('Checkout')}</Text>
        <Text style={styles.textBold}>{t('Shipping address')}</Text>
        <TouchableOpacity
          style={styles.touchable}
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
        <Text style={styles.textNone}>{t('None added')}</Text>
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
          <RedButton disabled onPress={function (): void {}}>
            {t('Submit Order')}
          </RedButton>
        </View>
        {modalHandler()}
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
});
