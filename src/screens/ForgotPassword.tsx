import React, {useState, useCallback} from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {resetPassword, search} from '../components/api/User';
import {Alert} from 'react-native';
import {AuthContext} from '../components/auth/AuthContext';
import {useNavigation} from '@react-navigation/native';

export function ForgotPassword() {
  interface FormData {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }

  const ctx = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [exists, setExists] = useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = useCallback(
    async ({email}: FormData) => {
      try {
        setIsLoading(true);
        ctx.isLoading(true);
        ctx.isSearching(true);
        const result = await search({email});
        setExists(result);
        ctx.saveEmail(email);
      } catch (error) {
        Alert.alert(
          'Failed to search',
          'Check your credentials or try again later',
        );
      } finally {
        setIsLoading(false);
        ctx.isLoading(false);
        ctx.isSearching(false);
      }
    },
    [ctx],
  );

  async function forgotHandler({email, password}: FormData) {
    try {
      setIsLoading(true);
      ctx.isLoading(true);
      await resetPassword({email, password});
      Alert.alert('Password succesfully changed', 'Try to login now!');
      setExists(false);
      navigation.navigate('login' as never);
    } catch (error) {
      Alert.alert(
        'Failed to reset password',
        'Check your credentials or try again later',
      );
    } finally {
      setIsLoading(false);
      ctx.isLoading(false);
    }
  }

  let authFormComponent;
  if (isLoading) {
    authFormComponent = (
      <AuthFormHandler isForgoting authentication={searchHandler} />
    );
  } else if (exists) {
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
