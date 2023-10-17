import React, {useEffect} from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {login} from '../utils/User';
import {AuthContext} from '../components/context/AuthContext';
import {useNavigation} from '@react-navigation/native';

export function Login() {
  interface FormData {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }

  const ctx = React.useContext(AuthContext);
  const navigation = useNavigation();

  async function loginHandler({email, password}: FormData) {
    try {
      ctx.isLoading(true);
      ctx.generateError(false);
      const id = await login({email, password});
      if (typeof id === 'number') {
        ctx.authLogin(id?.toString());
      } else {
        ctx.generateError(true);
      }
      ctx.isLoading(false);
    } catch {
      navigation.navigate('auth' as never);
    }
  }

  useEffect(() => {
    if (ctx.isLogged) {
      navigation.navigate('app' as never);
    }
  }, [ctx.isLogged, navigation]);

  return <AuthFormHandler isLogging authentication={loginHandler} />;
}

export default Login;
