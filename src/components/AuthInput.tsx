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
import {Colors} from '../constants/styles';

interface AuthInputProps extends TextInputProps {
  label: string;
  value: string;
  enableAutoCapitalize?: boolean;
  isPassword?: boolean;
  validation?: 'validating' | 'sucess' | 'error';
  disabled?: boolean;
}

const passwordVisibilityIcons = {
  visible: require('../assets/icons/ui/eye-opened.png'),
  hidden: require('../assets/icons/ui/eye-closed.png'),
};

const validationIcons = {
  sucess: require('../assets/icons/ui/check.png'),
  error: require('../assets/icons/ui/error.png'),
};

function AuthInput({
  label,
  value,
  isPassword,
  validation,
  enableAutoCapitalize,
  disabled,
  ...props
}: AuthInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowing, setIsShowing] = useState(!!isPassword);

  const labelConditionalStyle = {
    top: !isFocused ? 22 : 11,
    fontSize: !isFocused ? 14 : 12,
  };

  const autoCapitalizeMode = enableAutoCapitalize ? 'sentences' : 'none';

  return (
    <View
      style={[
        styles.inputViewWrapper,
        disabled && styles.inputViewWrapperDisabled,
        validation === 'sucess' && styles.inputViewWrapperSucess,
        validation === 'error' && styles.inputViewWrapperError,
      ]}>
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, labelConditionalStyle]}>{label}</Text>
        <View>
          <TextInput
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

      {!disabled &&
        (isPassword ? (
          <Pressable
            style={styles.inputIconWrapper}
            onPress={() => setIsShowing(!isShowing)}>
            <Image
              source={passwordVisibilityIcons[isShowing ? 'hidden' : 'visible']}
            />
          </Pressable>
        ) : (
          validation && (
            <View style={styles.inputIconWrapper}>
              {validation === 'validating' ? (
                <ActivityIndicator color={Colors.red_500} size={28} />
              ) : (
                <Image source={validationIcons[validation]} />
              )}
            </View>
          )
        ))}
    </View>
  );
}

export default AuthInput;

const styles = StyleSheet.create({
  inputViewWrapper: {
    height: 64,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
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
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    color: Colors.gray_500,
  },
  input: {
    padding: 0,
    fontSize: 14,
    color: Colors.black,
    width: '100%',
    lineHeight: 20,
    paddingVertical: 8,
  },
  inputIconWrapper: {
    justifyContent: 'center',
  },
});
