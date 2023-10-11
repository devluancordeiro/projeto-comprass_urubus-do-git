import React from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {resetPassword} from '../components/api/User';
import {Alert} from 'react-native';

export function ForgotPassword() {
  interface FormData {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }
  async function forgotHandler({email, password}: FormData) {
    try {
      const data = await resetPassword({email, password});
      console.log(data);
    } catch (error) {
      Alert.alert(
        'Failed to login',
        'Check your credentials or try again later',
      );
    }
  }

  return <AuthFormHandler isForgoting authentication={forgotHandler} />;
}

export default ForgotPassword;
