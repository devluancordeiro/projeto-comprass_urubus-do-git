import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RedButton from '../components/ui/RedButton';
import {useSelector} from 'react-redux';
import type {RootState} from '../redux/store';
import CartProduct from '../components/api/CartProducts';
import {useTranslation} from 'react-i18next';

function Cart() {
  const {t} = useTranslation();
  const cartHasItems = !(
    Object.keys(useSelector((state: RootState) => state.counter)).length !== 0
  );
  if (cartHasItems) {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleView}>
            <Text style={styles.title}>{t('Cart')}</Text>
          </View>
          <View style={styles.cartView}>
            <Ionicons name={'cart-outline'} size={62} color={Colors.gray_900} />
            <Text style={styles.cartText}>
              {t('Your cart is so empty and abandoned...')}
            </Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.priceView}>
            <Text style={styles.amountText}>{t('Total amount:')}</Text>
            <Text style={styles.priceText}>0 R$</Text>
          </View>
          <View style={styles.buttonView}>
            <RedButton children={t('Buy')} disabled onPress={() => {}} />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}>{t('Cart')}</Text>
        </View>
        <View style={styles.viewAll}>
          <CartProduct />
        </View>
      </View>
    </View>
  );
}
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewAll: {
    height: '80%',
  },
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
    marginTop: 16,
    marginBottom: 10,
  },
  priceView: {
    marginTop: 12,
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
