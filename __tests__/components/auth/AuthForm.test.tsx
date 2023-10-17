import React from 'react';
import {render} from '@testing-library/react-native';
import AuthForm from '../../../src/components/auth/AuthForm';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('does AuthForm component', () => {
  it('renders login form', () => {
    const onSubmit = jest.fn();
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <AuthForm type="login" onSubmit={onSubmit} />
      </NavigationContainer>,
    );
    expect(getByTestId('auth-form')).toBeDefined();

    expect(getByText('Login')).toBeDefined();
  });

  it('renders signup form', () => {
    const onSubmit = jest.fn();
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthForm type="signup" onSubmit={onSubmit} />
      </NavigationContainer>,
    );

    expect(getByTestId('auth-form')).toBeDefined();

    expect(getByTestId('signup')).toBeDefined();
  });

  it('renders forget form', () => {
    const onSubmit = jest.fn();
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <AuthForm type="forgot" onSubmit={onSubmit} />
      </NavigationContainer>,
    );

    expect(getByTestId('auth-form')).toBeDefined();

    expect(getByText('Forgot Password')).toBeDefined();
  });
});
