import React from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {Text, View} from 'react-native';
import AuthInput from './AuthInput';
import RedButton from '../ui/RedButton';
import TextButton from '../ui/TextButton';
import {useNavigation} from '@react-navigation/native';

interface AuthFormProps {
  isName?: boolean;
  isEmail?: boolean;
  isPassword?: boolean;
  isConfirmPassword?: boolean;
  type: 'login' | 'signup' | 'forgot';
  onSubmit: SubmitHandler<FormData>;
}

type FormData = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function AuthForm({
  isName,
  isEmail,
  isPassword,
  isConfirmPassword,
  type,
  onSubmit,
}: AuthFormProps): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<FormData>({mode: 'onChange'});
  React.useEffect(() => {
    reset({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }, [reset, onSubmit]);
  const navigation = useNavigation();
  return (
    <View>
      {isName && (
        <Controller
          control={control}
          name="name"
          rules={{required: true, pattern: /^[A-Za-z0-9]+$/}}
          render={({field: {value, onChange}}) => (
            <AuthInput
              label={'Name'}
              value={value}
              onChangeText={onChange}
              enableAutoCapitalize
              validation={
                value ? (errors.name ? 'error' : 'sucess') : undefined
              }
            />
          )}
        />
      )}
      {isEmail && (
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          }}
          render={({field: {value, onChange}}) => (
            <AuthInput
              label={'Email'}
              value={value}
              onChangeText={onChange}
              validation={
                value ? (errors.email ? 'error' : 'sucess') : undefined
              }
            />
          )}
        />
      )}
      {isPassword && (
        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({field: {value, onChange}}) => (
            <AuthInput
              label={'Password'}
              value={value}
              onChangeText={onChange}
              isPassword
              validation={
                value ? (errors.password ? 'error' : 'sucess') : undefined
              }
            />
          )}
        />
      )}
      {isConfirmPassword && (
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: true,
            validate: (val: string | undefined) => watch('password') === val,
          }}
          render={({field: {value, onChange}}) => (
            <AuthInput
              label={'Confirm Password'}
              value={value}
              onChangeText={onChange}
              isPassword
              validation={
                value
                  ? errors.confirmPassword
                    ? 'error'
                    : 'sucess'
                  : undefined
              }
            />
          )}
        />
      )}
      {errors.name && (
        <Text>Your name is not valid, use only letters and numbers </Text>
      )}
      {errors.email && <Text>Your email is not valid</Text>}
      {errors.password && (
        <Text>Your password must be longer than 6 digits. </Text>
      )}
      {errors.confirmPassword && (
        <Text>Your password is not the same as your confirmation</Text>
      )}
      {type === 'login' && (
        <View>
          <RedButton
            onPress={handleSubmit(onSubmit)}
            disabled={
              errors.name ||
              errors.email ||
              errors.password ||
              errors.confirmPassword
                ? true
                : false
            }>
            Login
          </RedButton>
          <TextButton onPress={() => navigation.navigate('signup' as never)}>
            Not have an account yet? {'\n'} Sign up
          </TextButton>
          <TextButton onPress={() => navigation.navigate('forgot' as never)}>
            I forgot my password
          </TextButton>
          <TextButton onPress={() => navigation.goBack}>
            I don't want to login
          </TextButton>
        </View>
      )}
      {type === 'signup' && (
        <View>
          <RedButton
            onPress={handleSubmit(onSubmit)}
            disabled={
              errors.name ||
              errors.email ||
              errors.password ||
              errors.confirmPassword
                ? true
                : false
            }>
            Sign Up
          </RedButton>
          <TextButton onPress={() => navigation.navigate('login' as never)}>
            I don't want to register
          </TextButton>
        </View>
      )}
      {type === 'forgot' && (
        <View>
          <RedButton
            onPress={handleSubmit(onSubmit)}
            disabled={errors.email ? true : false}>
            Search
          </RedButton>
          <RedButton
            onPress={handleSubmit(onSubmit)}
            disabled={
              errors.name ||
              errors.email ||
              errors.password ||
              errors.confirmPassword
                ? true
                : false
            }>
            Confirm
          </RedButton>
          <TextButton onPress={() => navigation.navigate('login' as never)}>
            I remembered my password
          </TextButton>
        </View>
      )}
    </View>
  );
}

export default AuthForm;
