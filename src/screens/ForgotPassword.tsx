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
        ctx.isSearching(true);
        const result = await search({email});
        setExists(result);
        ctx.saveEmail(email);
        ctx.isLoading(false);
        ctx.isSearching(false);
      } catch (error) {
        ctx.isLoading(false);
        ctx.isSearching(false);
        Alert.alert(
          'Failed to search',
          'Check your credentials or try again later',
        );
      }
    },
    [ctx],
  );

  useEffect(() => {}, [exists, searchHandler]);

  async function forgotHandler({email, password}: FormData) {
    try {
      ctx.isLoading(true);
      const data = await resetPassword({email, password});
      console.log(data);
      setExists(false);
      ctx.isLoading(false);
    } catch (error) {
      setExists(false);
      ctx.isLoading(false);
      Alert.alert(
        'Failed to reset password',
        'Check your credentials or try again later',
      );
    }
  }

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

  return authFormComponent;
}

export default ForgotPassword;
