import React from 'react';
import {View, Image, StyleSheet, Text, StatusBar} from 'react-native';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';

const SuccessPix = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/QRcode.png')}
          style={styles.qrCode}
        />
        <Text style={styles.textSuccess}>Success!</Text>
        <Text style={styles.textPay}>
          Pay your pix using the QR code above and
        </Text>
        <Text style={styles.textSteps}>
          then follow the steps sent by email.
        </Text>
        <View style={styles.button}>
          <RedButton onPress={function (): void {}}>
            CONTINUE SHOPPING
          </RedButton>
        </View>
      </View>
    </>
  );
};

export default SuccessPix;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  qrCode: {
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

  button: {
    marginTop: 160,
    marginBottom: 50,
    width: 280,
    flexShrink: 0,
    alignSelf: 'center',
  },
});
