import React from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {Alert} from 'react-native';
import {register} from '../components/api/User';
import {useNavigation} from '@react-navigation/native';

export function SingUp() {
  interface FormData {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }

  const navigation = useNavigation();

  async function signUpHandler({name, email, password}: FormData) {
    try {
      await register({name, email, password});
      Alert.alert('SignUp succesfull', 'Login now!');
      navigation.navigate('login' as never);
    } catch (error) {
      Alert.alert('SignUp failed', 'Please try again later!');
    }
  }

  return <AuthFormHandler isRegistering authentication={signUpHandler} />;
}
export default SingUp;
