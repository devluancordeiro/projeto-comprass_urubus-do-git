import React from 'react';
import AuthForm from './AuthForm';
import {View} from 'react-native';

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
}: AuthFormHandlerProps): JSX.Element {
  function submitHandler(data: FormData) {
    authentication({...data});
  }

  return (
    <View>
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
      {isForgoting && (
        <AuthForm
          isEmail
          isPassword
          isConfirmPassword
          type="forgot"
          onSubmit={submitHandler}
        />
      )}
    </View>
  );
}

export default AuthFormHandler;
