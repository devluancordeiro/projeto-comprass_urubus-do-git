import React from 'react';
import {View, Image, StyleSheet, Text, StatusBar} from 'react-native';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';
import {useTranslation} from 'react-i18next';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StoreFlowParamList} from '../routes/StoreFlow';
import {resetItemCount} from '../redux/counterSlice';
import {useDispatch} from 'react-redux';

type SuccessCardProps = {
  navigation: StackNavigationProp<StoreFlowParamList, 'successCC'>;
  route: RouteProp<StoreFlowParamList, 'successCC'>;
};

function SuccessCC({navigation}: SuccessCardProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
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
        <Text style={styles.textSuccess}>{t('Success')}!</Text>
        <Text style={styles.textOrder}>
          {t('Your order will be delivered soon')}.
        </Text>
        <Text style={styles.textThanks}>
          {t('Thank you for choosing our app')}!
        </Text>
        <View style={styles.button}>
          <RedButton
            onPress={() => {
              navigation.navigate('app');
              dispatch(resetItemCount());
            }}>
            {t('CONTINUE SHOPPING')}
          </RedButton>
        </View>
      </View>
    </>
  );
}

export default SuccessCC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 160,
    marginBottom: 50,
    width: 280,
    flexShrink: 0,
    alignSelf: 'center',
  },
});
