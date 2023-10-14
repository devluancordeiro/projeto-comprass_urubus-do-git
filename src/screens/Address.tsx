import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AuthInput from '../components/auth/AuthInput';
import Header from '../components/ui/Header';
import RedButton from '../components/ui/RedButton';

function Address() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function getAddressByCep() {
      try {
        if (cep) {
          var validacep = /^[0-9]{8}$/;
          if (validacep.test(cep)) {
            setStatus('validating');
            const response = await fetch(
              `https://viacep.com.br/ws/${cep}/json/`,
            );
            const addressFetched = await response.json();
            setAddress(addressFetched.logradouro);
            setCity(addressFetched.localidade);
            setState(addressFetched.uf);
            setStatus('sucess');
          } else {
            setStatus('');
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    getAddressByCep();
  }, [cep]);

  return (
    <View>
      <Header title="Adding Shipping Address" />
      <View
        style={{
          paddingHorizontal: 16,
          marginVertical: 32,
        }}>
        <View>
          <AuthInput
            label="Zip Code (Postal Code)"
            validation={status}
            onChangeText={text => setCep(text)}
          />
          <AuthInput
            label="Address"
            value={address}
            disabled={status === 'validating'}
          />
          <AuthInput
            label="City"
            value={city}
            disabled={status === 'validating'}
          />
          <AuthInput
            label="State/Province/Region"
            value={state}
            disabled={status === 'validating'}
          />
          <AuthInput label="Full name" />
        </View>
        <RedButton>SAVE ADDRESS</RedButton>
      </View>
    </View>
  );
}

export default Address;
