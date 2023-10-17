import React from 'react';
import {View, Image, StyleSheet, Text, StatusBar} from 'react-native';
import moment from 'moment';
import {Colors} from '../constants/styles';
import {Sizes} from '../constants/styles';
import RedButton from '../components/ui/RedButton';
import {useTranslation} from 'react-i18next';
import RNFetchBlob from 'rn-fetch-blob';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StoreFlowParamList} from '../routes/StoreFlow';
import {useDispatch} from 'react-redux';
import {resetItemCount} from '../redux/counterSlice';

type SuccessBilletProps = {
  navigation: StackNavigationProp<StoreFlowParamList, 'successBillet'>;
  route: RouteProp<StoreFlowParamList, 'successBillet'>;
};

function SuccessBillet({navigation}: SuccessBilletProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const billetDate = moment().add(1, 'days').format('DD/MM/YYYY');

  const handleDownloadTicket = async () => {
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch(
      'GET',
      'https://www.ufms.br/wp-content/uploads/2017/09/PDF-teste.pdf',
    );

    const filePath = response.path();

    RNFetchBlob.fs.unlink(filePath);
  };

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
        <Text style={styles.textPay}>
          {t('Pay the invoice by')} {billetDate} {t('and then')}
        </Text>
        <Text style={styles.textSteps}>
          {t('follow the steps sent by email')}.
        </Text>
        <View style={styles.buttonBillet}>
          <RedButton onPress={handleDownloadTicket}>
            {t('DOWNLOAD TICKET')}
          </RedButton>
        </View>
        <View style={styles.buttonContinue}>
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
