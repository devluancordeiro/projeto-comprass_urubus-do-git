import React from 'react';
import AuthFormHandler from '../components/auth/AuthFormHandler';
import {Alert} from 'react-native';
import {register} from '../utils/User';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../components/auth/AuthContext';

export function SingUp() {
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
          Alert.alert('SignUp succesfully', 'login now');
          navigation.navigate('login' as never);
        }
      } catch (error) {
        Alert.alert('SignUp failed', 'Please try again later!');
      }
      ctx.isLoading(false);
    } catch (error) {
      ctx.isLoading(false);
      Alert.alert('SignUp failed', 'Please try again later!');
    }
  }

  return <AuthFormHandler isRegistering authentication={signUpHandler} />;
}
export default SingUp;
