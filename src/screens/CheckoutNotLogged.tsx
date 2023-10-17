import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/ui/Header';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {StoreFlowParamList} from '../routes/StoreFlow';
import RedButton from '../components/ui/RedButton';
import {Colors} from '../constants/styles';

type CheckoutNotLoggedProps = {
  navigation: StackNavigationProp<StoreFlowParamList, 'checkoutNotlog'>;
};
const CheckoutNotLogged = ({navigation}: CheckoutNotLoggedProps) => {
  const {t} = useTranslation();
  return (
    <>
      <Header title={t('Checkout')} goBack={() => navigation.goBack()} />
      <View style={styles.centralView}>
        <Text style={styles.text}>
          You need to connect to complete your purchase, come on?
        </Text>
        <View style={styles.viewButton}>
          <RedButton
            children={t('login')}
            onPress={() => navigation.navigate('auth' as never)}
          />
        </View>
      </View>
    </>
  );
};

export default CheckoutNotLogged;

const styles = StyleSheet.create({
  centralView: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 52,
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
  },
  viewButton: {
    marginTop: 16,
    alignSelf: 'center',
    width: '45%',
  },
});
