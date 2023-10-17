import React, {useState, useCallback} from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {resetPassword, search} from '../utils/User';
import {Alert} from 'react-native';
import {AuthContext} from '../components/context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export function ForgotPassword() {
  const {t} = useTranslation();
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
          t('Failed to search'),
          t('Check your credentials or try again later'),
        );
      } finally {
        setIsLoading(false);
        ctx.isLoading(false);
        ctx.isSearching(false);
      }
    },
    [ctx, t],
  );

  async function forgotHandler({email, password}: FormData) {
    try {
      setIsLoading(true);
      ctx.isLoading(true);
      await resetPassword({email, password});
      Alert.alert(t('Password succesfully changed'), t('Try to login now!'));
      setExists(false);
      navigation.navigate('login' as never);
    } catch (error) {
      Alert.alert(
        t('Failed to reset password'),
        t('Check your credentials or try again later'),
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
