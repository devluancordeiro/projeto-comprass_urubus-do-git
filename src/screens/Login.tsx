import React from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {login} from '../components/api/User';
import {Alert} from 'react-native';
import {AuthContext} from '../components/auth/AuthContext';

export function Login() {
  interface FormData {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }

  const ctx = React.useContext(AuthContext);

  async function loginHandler({email, password}: FormData) {
    try {
      const id = await login({email, password});
      ctx.authLogin(id);
    } catch (error) {
      Alert.alert(
        'Failed to login',
        'Check your credentials or try again later',
      );
    }
  }

  return <AuthFormHandler isLogging authentication={loginHandler} />;
}

export default Login;
