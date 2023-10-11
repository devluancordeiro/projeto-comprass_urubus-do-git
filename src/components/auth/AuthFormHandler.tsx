import React from 'react';
import AuthForm from './AuthForm';
import {View} from 'react-native';

interface AuthFormHandlerProps {
  isLogging?: boolean;
  isRegistering?: boolean;
  isForgoting?: boolean;
}

interface FormData {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
}

function AuthFormHandler({
  isLogging,
  isForgoting,
  isRegistering,
}: AuthFormHandlerProps): JSX.Element {
  function submitHandler(data: FormData) {
    console.log(data);
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
