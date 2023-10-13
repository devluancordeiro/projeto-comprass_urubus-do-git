import React, {useState, useEffect, useCallback} from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {resetPassword, search} from '../components/api/User';
import {Alert} from 'react-native';
import {AuthContext} from '../components/auth/AuthContext';

export function ForgotPassword() {
  interface FormData {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }

  const ctx = React.useContext(AuthContext);
  const [exists, setExists] = useState<boolean | undefined>(false);

  const searchHandler = useCallback(
    async ({email}: FormData) => {
      try {
        ctx.isLoading(true);
        const result = await search({email});
        setExists(result);
        ctx.saveEmail(email);
        ctx.isLoading(false);
      } catch (error) {
        Alert.alert(
          'Failed to search',
          'Check your credentials or try again later',
        );
      }
    },
    [ctx],
  );

  let authFormComponent;
  if (exists) {
    authFormComponent = (
      <AuthFormHandler isForgoting exists authentication={forgotHandler} />
    );
  } else {
    authFormComponent = (
      <AuthFormHandler isForgoting authentication={searchHandler} />
    );
  }

  useEffect(() => {}, [exists, searchHandler]);

  async function forgotHandler({email, password}: FormData) {
    try {
      const data = await resetPassword({email, password});
      console.log(data);
      setExists(false);
    } catch (error) {
      setExists(false);
      Alert.alert(
        'Failed to reset password',
        'Check your credentials or try again later',
      );
    }
  }

  return authFormComponent;
}

export default ForgotPassword;
