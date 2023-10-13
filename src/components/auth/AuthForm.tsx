import React from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {Image, StyleSheet, Text, View} from 'react-native';
import AuthInput from './AuthInput';
import RedButton from '../ui/RedButton';
import TextButton from '../ui/TextButton';
import {useNavigation} from '@react-navigation/native';
import {Colors, Sizes} from '../../constants/styles';
import {AuthContext} from './AuthContext';

interface AuthFormProps {
  isName?: boolean;
  isEmail?: boolean;
  isPassword?: boolean;
  isConfirmPassword?: boolean;
  exists?: boolean;
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
  exists,
  onSubmit,
}: AuthFormProps): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<FormData>({mode: 'onChange'});
  const navigation = useNavigation();
  const ctx = React.useContext(AuthContext);
  const [emailValidation, setEmailValidation] = React.useState<
    'error' | 'sucess' | 'validating' | undefined
  >();

  React.useEffect(() => {
    if (ctx.loading) {
      console.log(ctx.loading);
      setEmailValidation('validating');
    } else if (errors.email) {
      setEmailValidation('error');
    } else {
      setEmailValidation('sucess');
    }
  }, [ctx.loading, errors.email]);

  return (
    <View style={styles.viewStyle}>
      {type === 'login' ? (
        <Image
          style={styles.logo}
          source={require('../../assets/images/comprass-logo.png')}
        />
      ) : type === 'signup' ? (
        <View>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.text}>
            Choose a really cool name that only contains spaces as special
            characters. Oh, and your password must have more than 4 digits! :)
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.text}>
            Enter your email and let us see if it exists for you to change your
            password :)
          </Text>
        </View>
      )}
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
          defaultValue={ctx.email}
          rules={{
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          }}
          render={({field: {value, onChange}}) => (
            <AuthInput
              label={'Email'}
              value={value}
              onChangeText={onChange}
              validation={value ? emailValidation : undefined}
            />
          )}
        />
      )}
      {isPassword && (
        <Controller
          control={control}
          name="password"
          rules={{
            required: exists ? true : false,
            minLength: 6,
          }}
          render={({field: {value, onChange}}) => (
            <AuthInput
              label={'Password'}
              value={value}
              onChangeText={onChange}
              isPassword
              disabled={type === 'forgot' && !exists}
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
            required: exists ? true : false,
            validate: (val: string | undefined) => watch('password') === val,
          }}
          render={({field: {value, onChange}}) => (
            <AuthInput
              label={'Confirm Password'}
              value={value}
              onChangeText={onChange}
              isPassword
              disabled={type === 'forgot' && !exists}
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
        <Text style={styles.errorText}>
          Your name is not valid, use only letters and numbers{' '}
        </Text>
      )}
      {errors.email && (
        <Text style={styles.errorText}>Your email is not valid</Text>
      )}
      {errors.password && (
        <Text style={styles.errorText}>
          Your password must be longer than 6 digits.{' '}
        </Text>
      )}
      {errors.confirmPassword && (
        <Text style={styles.errorText}>
          Your password is not the same as your confirmation
        </Text>
      )}
      {type === 'login' && (
        <View style={styles.buttons}>
          <RedButton
            onPress={handleSubmit(onSubmit)}
            disabled={
              (!!isName && !watch('name')) ||
              (!!isPassword && !watch('password')) ||
              (!!isEmail && !watch('email')) ||
              !!errors.name ||
              !!errors.email ||
              !!errors.password
            }
            validating={ctx.loading}>
            Login
          </RedButton>
          <TextButton onPress={() => navigation.navigate('signup' as never)}>
            Not have an account yet? {'\n'} Sign up
          </TextButton>
          <TextButton onPress={() => navigation.navigate('forgot' as never)}>
            I forgot my password
          </TextButton>
          <TextButton onPress={() => navigation.goBack()}>
            I don't want to login
          </TextButton>
        </View>
      )}
      {type === 'signup' && (
        <View style={styles.buttons}>
          <RedButton
            onPress={handleSubmit(onSubmit)}
            disabled={
              (!!isName && !watch('name')) ||
              (!!isEmail && !watch('email')) ||
              (!!isPassword && !watch('password')) ||
              (!!isConfirmPassword && !watch('confirmPassword')) ||
              !!errors.name ||
              !!errors.email ||
              !!errors.password ||
              !!errors.confirmPassword
            }
            validating={ctx.loading}>
            Sign Up
          </RedButton>
          <TextButton onPress={() => navigation.navigate('login' as never)}>
            I don't want to register
          </TextButton>
        </View>
      )}
      {type === 'forgot' && (
        <View style={styles.buttons}>
          <RedButton
            onPress={handleSubmit(onSubmit)}
            disabled={(!!isEmail && !watch('email')) || !!errors.email}
            validating={ctx.loading}>
            Search
          </RedButton>
          <RedButton
            onPress={handleSubmit(onSubmit)}
            disabled={!exists}
            validating={ctx.loading}>
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

const styles = StyleSheet.create({
  viewStyle: {
    marginHorizontal: Sizes.m,
  },
  logo: {
    marginLeft: '10%',
    resizeMode: 'contain',
    width: 263,
    height: 100,
    marginTop: 56,
    marginBottom: Sizes.xxxl,
  },
  buttons: {
    width: 320,
    marginTop: 64,
  },
  errorText: {
    color: Colors.red_500,
    textAlign: 'left',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: Sizes.xxxl,
    color: Colors.white,
    paddingBottom: Sizes.m,
  },
  text: {color: Colors.white, marginBottom: Sizes.xxl},
});
