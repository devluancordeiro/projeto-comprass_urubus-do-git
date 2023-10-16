import React, {useState} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Colors, Sizes} from '../../constants/styles';

export type validation = 'validating' | 'sucess' | 'error' | '';

export interface InputProps extends TextInputProps {
  label: string;
  value: string | undefined;
  enableAutoCapitalize?: boolean;
  isPassword?: boolean;
  validation?: validation;
  disabled?: boolean;
  border?: boolean;
}

const passwordVisibilityIcons = {
  visible: require('../../assets/icons/ui/eye-opened.png'),
  hidden: require('../../assets/icons/ui/eye-closed.png'),
};

const validationIcons = {
  sucess: require('../../assets/icons/ui/check.png'),
  error: require('../../assets/icons/ui/error.png'),
};

function Input({
  label,
  value,
  isPassword,
  validation,
  enableAutoCapitalize,
  disabled,
  border,
  ...props
}: InputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowing, setIsShowing] = useState(isPassword);

  const labelConditionalStyle = {
    top: !isFocused && !value ? 22 : 11,
    fontSize: !isFocused ? Sizes.s : Sizes.xs,
  };

  const autoCapitalizeMode = enableAutoCapitalize ? 'sentences' : 'none';

  return (
    <View
      testID="auth-input-container"
      style={[
        styles.inputViewWrapper,
        validation === 'sucess' && styles.inputViewWrapperSucess,
        validation === 'error' && styles.inputViewWrapperError,
        border && styles.borderConditionalStyle,
        disabled && styles.inputViewWrapperDisabled,
      ]}>
      <View style={styles.inputContainer}>
        <Text
          testID="auth-input-label"
          style={[styles.inputLabel, labelConditionalStyle]}>
          {label}
        </Text>
        <View>
          <TextInput
            testID="auth-input-text"
            style={styles.input}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(!!value)}
            autoCapitalize={autoCapitalizeMode}
            secureTextEntry={isShowing}
            editable={!disabled}
            {...props}
          />
        </View>
      </View>
      {isPassword ? (
        <Pressable
          testID="password-visibility-icon"
          style={styles.inputIconWrapper}
          onPress={() => setIsShowing(!isShowing)}>
          <Image
            testID="check-or-error"
            source={passwordVisibilityIcons[isShowing ? 'hidden' : 'visible']}
          />
        </Pressable>
      ) : (
        validation && (
          <View style={styles.inputIconWrapper}>
            {validation === 'validating' ? (
              <ActivityIndicator
                testID="validating-icon"
                color={Colors.red_500}
                size={Sizes.xxl}
              />
            ) : (
              <Image
                testID={validation === 'sucess' ? 'sucess-icon' : 'error-icon'}
                source={validationIcons[validation]}
              />
            )}
          </View>
        )
      )}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputViewWrapper: {
    height: 64,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: Sizes.m,
    borderRadius: 12,
    elevation: 2,
    marginVertical: Sizes.xxs,
  },
  inputViewWrapperSucess: {
    borderWidth: 2,
    borderColor: Colors.green_900,
  },
  inputViewWrapperError: {
    borderWidth: 2,
    borderColor: Colors.red_200,
  },
  inputViewWrapperDisabled: {
    backgroundColor: Colors.gray_200,
  },
  borderConditionalStyle: {
    borderWidth: 1,
    borderColor: Colors.gray_200,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    color: Colors.gray_500,
  },
  input: {
    padding: 0,
    fontSize: Sizes.s,
    color: Colors.black,
    width: '100%',
    lineHeight: 20,
    paddingVertical: Sizes.xxxs,
  },
  inputIconWrapper: {
    justifyContent: 'center',
  },
});
