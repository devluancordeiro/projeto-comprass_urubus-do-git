import React from 'react';
import {View, Image, StyleSheet, Text, StatusBar} from 'react-native';
import moment from 'moment';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';

const SuccessBillet = () => {
  const billetDate = moment().add(1, 'days').format('DD/MM/YYYY');

  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/bags.png')}
          style={styles.bags}
        />
        <Text style={styles.textSuccess}>Success!</Text>
        <Text style={styles.textPay}>
          Pay the invoice by {billetDate} and then
        </Text>
        <Text style={styles.textSteps}>follow the steps sent by email.</Text>
        <View style={styles.buttonBillet}>
          <RedButton onPress={function (): void {}}>BAIXAR BOLETO</RedButton>
        </View>
        <View style={styles.buttonContinue}>
          <RedButton onPress={function (): void {}}>
            CONTINUE SHOPPING
          </RedButton>
        </View>
      </View>
    </>
  );
};

export default SuccessBillet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  bags: {
    alignSelf: 'center',
    marginTop: 200,
    marginBottom: 16,
  },

  textSuccess: {
    color: Colors.black,
    fontSize: Sizes.xxl,
    fontFamily: 'OpenSans-ExtraBold',
    marginBottom: 16,
    textAlign: 'center',
  },

  textPay: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },

  textSteps: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 14,
    textAlign: 'center',
  },

  buttonBillet: {
    marginTop: 140,
    marginBottom: 16,
    width: 280,
    flexShrink: 0,
    alignSelf: 'center',
  },

  buttonContinue: {
    marginBottom: 40,
    width: 280,
    flexShrink: 0,
    alignSelf: 'center',
  },
});
