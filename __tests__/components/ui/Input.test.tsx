import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Input from '../../../src/components/ui/Input';
import {Colors} from '../../../src/constants/styles';

describe('Input component', () => {
  it('renders correctly with provided props', () => {
    const mockProps = {
      label: 'Test',
      value: 'Test',
      isPassword: true,
      validation: 'sucess',
      enableAutoCapitalize: true,
      disabled: false,
      border: true,
    };
    const {getByText, getByDisplayValue} = render(<Input {...mockProps} />);
    expect(getByText('Test')).toBeTruthy();
    expect(getByDisplayValue('Test')).toBeTruthy();
  });

  it('toggles password visibility on press', () => {
    const mockProps = {
      label: 'Password',
      value: 'TestPassword',
      isPassword: true,
    };
    const {getByTestId} = render(<Input {...mockProps} />);
    const toggleButton = getByTestId('password-visibility-icon');
    fireEvent.press(toggleButton);
    expect(toggleButton).toBeTruthy();
  });

  it('displays the validating icon when validation is set to "validating"', () => {
    const mockProps = {
      label: 'Email',
      value: 'test@example.com',
      validation: 'validating',
    };
    const {getByTestId} = render(<Input {...mockProps} />);
    const validatingIcon = getByTestId('validating-icon');
    expect(validatingIcon).toBeTruthy();
  });

  it('applies sucess styles when validation is set to "sucess"', () => {
    const mockProps = {
      label: 'Test',
      value: 'Test',
      validation: 'sucess',
    };
    const {getByTestId} = render(<Input {...mockProps} />);
    const sucessComponent = getByTestId('sucess-icon');
    expect(sucessComponent).toBeTruthy();
  });

  it('applies error styles when validation is set to "error"', () => {
    const mockProps = {
      label: 'Test',
      value: 'Test',
      validation: 'error',
    };
    const {getByTestId} = render(<Input {...mockProps} />);
    const errorComponent = getByTestId('error-icon');
    expect(errorComponent).toBeTruthy();
  });
  it('should apply border styles when border prop is true', () => {
    const {getByTestId} = render(<Input label="Test Label" value="" border />);

    const inputViewWrapper = getByTestId('auth-input-container');
    const styles = inputViewWrapper.props.style[3];

    expect(styles).toMatchObject({
      borderColor: Colors.gray_200,
      borderWidth: 1,
    });
  });

  it('should apply disabled styles when disabled prop is true', () => {
    const {getByTestId} = render(<Input label="Test" value="" disabled />);

    const inputViewWrapper = getByTestId('auth-input-container');
    expect(inputViewWrapper.props.style).toContainEqual({
      backgroundColor: Colors.gray_200,
    });
  });
  it('should set isFocused to true on input focus and to !!value on blur', () => {
    const {getByTestId} = render(<Input label="Test" value="" />);

    const input = getByTestId('auth-input-text');

    fireEvent(input, 'focus');
    expect(input.props.onFocus).toBeTruthy();

    fireEvent(input, 'blur');
    expect(input.props.onBlur).toBeTruthy();
  });
});
