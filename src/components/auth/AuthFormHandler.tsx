import React, {useContext} from 'react';
import AuthForm from './AuthForm';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

interface FormData {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
}

interface AuthFormHandlerProps {
  isLogging?: boolean;
  isRegistering?: boolean;
  isForgoting?: boolean;
  exists?: boolean;
  authentication: (credentials: {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
  }) => Promise<void>;
}

function AuthFormHandler({
  isLogging,
  isForgoting,
  isRegistering,
  authentication,
  exists,
}: AuthFormHandlerProps): JSX.Element {
  function submitHandler(data: FormData) {
    ctx.generateError(false);
    authentication({...data});
  }

  const ctx = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/auth-background.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        {isRegistering && (
          <AuthForm
            isName
            isEmail
            isPassword
            isConfirmPassword
            type="signup"
            onSubmit={submitHandler}
          />
        )}
        {isLogging && (
          <AuthForm isEmail isPassword type="login" onSubmit={submitHandler} />
        )}
        {isForgoting && exists && (
          <AuthForm
            isEmail
            isPassword
            isConfirmPassword
            type="forgot"
            exists
            onSubmit={submitHandler}
          />
        )}
        {isForgoting && !exists && (
          <AuthForm
            isEmail
            isPassword
            isConfirmPassword
            type="forgot"
            onSubmit={submitHandler}
          />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthFormHandler;
