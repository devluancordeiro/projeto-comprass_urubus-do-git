import React from 'react';
import {View, ImageBackground, StyleSheet, Text, StatusBar} from 'react-native';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';
import {useTranslation} from 'react-i18next';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StoreFlowParamList} from '../routes/StoreFlow';

type SuccessProps = {
  navigation: StackNavigationProp<StoreFlowParamList, 'success'>;
  route: RouteProp<StoreFlowParamList, 'success'>;
};

const Success = ({navigation, route}: SuccessProps) => {
  const {paymentMethod} = route.params;
  const {t} = useTranslation();

  const handlePayment = () => {
    if (paymentMethod === 'Pix') {
      navigation.navigate('successPix');
    } else if (paymentMethod === 'Credit or debit card') {
      navigation.navigate('successCC');
    } else if (paymentMethod === 'Bank slip') {
      navigation.navigate('successBillet');
    }
  };
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <View style={styles.view}>
        <ImageBackground
          style={styles.image}
          source={require('../assets/images/success.png')}>
          <Text style={styles.textBold}>{t('Success')}!</Text>
          <Text style={styles.textOrder}>
            {t('Your order will be delivered soon')}.
          </Text>
          <Text style={styles.textThanks}>
            {t('Thank you for choosing our app')}!
          </Text>
          <View style={styles.button}>
            <RedButton onPress={handlePayment}>{t('Continue')}</RedButton>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Success;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  textBold: {
    color: Colors.black,
    fontSize: Sizes.xxl,
    fontFamily: 'OpenSans-ExtraBold',
    marginTop: 114,
    marginBottom: 14,
    textAlign: 'center',
  },

  textOrder: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },

  textThanks: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 14,
    textAlign: 'center',
  },

  button: {
    width: 160,
    flexShrink: 0,
    alignSelf: 'center',
    fontSize: 14,
  },
});
