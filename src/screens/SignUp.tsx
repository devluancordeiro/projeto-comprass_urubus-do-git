import React from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {Alert} from 'react-native';
import {register} from '../components/api/User';

export function SingUp() {
  interface FormData {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }

  async function signUpHandler({name, email, password}: FormData) {
    try {
      const id = await register({name, email, password});
      console.log(id);
    } catch (error) {
      Alert.alert('SignUp failed', 'Please try again later!');
    }
  }

  return <AuthFormHandler isRegistering authentication={signUpHandler} />;
}
export default SingUp;
