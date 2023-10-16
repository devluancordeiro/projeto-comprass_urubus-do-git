import React from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {Alert} from 'react-native';
import {register} from '../components/api/User';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../components/auth/AuthContext';
import {useTranslation} from 'react-i18next';

export function SingUp() {
  const {t} = useTranslation();
  interface FormData {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }

  const navigation = useNavigation();
  const ctx = React.useContext(AuthContext);

  async function signUpHandler({name, email, password}: FormData) {
    try {
      ctx.isLoading(true);
      try {
        const id = await register({name, email, password});
        if (id) {
          Alert.alert(t('SignUp succesfully'), t('login now'));
          navigation.navigate('login' as never);
        }
      } catch (error) {
        Alert.alert(t('SignUp failed'), t('Please try again later!'));
      }
      ctx.isLoading(false);
    } catch (error) {
      ctx.isLoading(false);
      Alert.alert(t('SignUp failed'), t('Please try again later!'));
    }
  }

  function resetError() {
    ctx.generateError('');
  }

  return (
    <AuthFormHandler
      isRegistering
      authentication={signUpHandler}
      resetError={resetError}
    />
  );
}
export default SingUp;
