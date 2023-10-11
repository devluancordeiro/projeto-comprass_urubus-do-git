import React from 'react';
import {View, Image, StyleSheet, Text, StatusBar} from 'react-native';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';

const SuccessCC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <Image source={require('../assets/img/bags.png')} style={styles.bags} />
        <Text style={styles.textSuccess}>Success!</Text>
        <Text style={styles.textOrder}>Your order will be delivered soon.</Text>
        <Text style={styles.textThanks}>Thank you for choosing our app!</Text>
        <View style={styles.button}>
          <RedButton onPress={function (): void {}}>
            CONTINUE SHOPPING
          </RedButton>
        </View>
      </View>
    </>
  );
};

export default SuccessCC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  bags: {
    alignSelf: 'center',
    marginTop: 210,
    marginBottom: 16,
  },

  textSuccess: {
    color: Colors.black,
    fontSize: Sizes.xxl,
    fontFamily: 'OpenSans-ExtraBold',
    marginBottom: 16,
  },

  textOrder: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 4,
  },

  textThanks: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 14,
  },

  button: {
    marginTop: 160,
    marginBottom: 50,
    width: 280,
    flexShrink: 0,
    alignSelf: 'center',
  },
});
