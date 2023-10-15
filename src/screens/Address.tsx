import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthInput from '../components/auth/AuthInput';
import Header from '../components/ui/Header';
import RedButton from '../components/ui/RedButton';
import {validation} from '../components/auth/AuthInput';

function Address() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<validation>('');

  useEffect(() => {
    async function getAddressByCep() {
      try {
        if (cep) {
          var addressFetched;
          const validacep = /^[0-9]{8}$/;
          if (validacep.test(cep)) {
            setStatus('validating');
            const response = await fetch(
              `https://viacep.com.br/ws/${cep}/json/`,
            );
            addressFetched = await response.json();
          }
          if (addressFetched && !addressFetched?.erro) {
            setStatus('sucess');
            setAddress(addressFetched.logradouro);
            setCity(addressFetched.localidade);
            setState(addressFetched.uf);
          } else {
            setStatus('error');
          }
        } else {
          setStatus('');
        }
      } catch (e) {
        console.error(e);
      }
    }
    getAddressByCep();
  }, [cep]);

  return (
    <View style={styles.container}>
      <Header title="Adding Shipping Address" />
      <View style={styles.form}>
        <View>
          <AuthInput
            label="Zip Code (Postal Code)"
            validation={status}
            onChangeText={text => setCep(text)}
            value={cep}
            keyboardType="number-pad"
            border
          />
          <AuthInput
            label="Address"
            value={address}
            disabled={status === 'validating'}
            onChangeText={text => setAddress(text)}
            enableAutoCapitalize
            border
          />
          <AuthInput
            label="City"
            value={city}
            disabled={status === 'validating'}
            onChangeText={text => setCity(text)}
            enableAutoCapitalize
            border
          />
          <AuthInput
            label="State/Province/Region"
            value={state}
            disabled={status === 'validating'}
            onChangeText={text => setState(text)}
            enableAutoCapitalize
            border
          />
          <AuthInput
            label="Full name"
            value={fullName}
            onChangeText={text => setFullName(text)}
            enableAutoCapitalize
            border
          />
        </View>
        <RedButton
          onPress={() => console.log('Address must be saved!')}
          disabled={
            !(status === 'sucess') || !address || !city || !state || !fullName
          }>
          Save Address
        </RedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 16,
    marginVertical: 32,
    justifyContent: 'space-between',
    flex: 1,
    gap: 20,
  },
});

export default Address;
