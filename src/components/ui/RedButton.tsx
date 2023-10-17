import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import {Colors, Sizes} from '../../constants/styles';

interface RedButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  validating?: boolean;
}

const RedButton: React.FC<RedButtonProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.8}
      testID="redButton">
      <View
        style={[styles.button, props.disabled && styles.disabledButton]}
        testID="redButtonView">
        {props.validating ? (
          <ActivityIndicator
            color={Colors.white}
            size={Sizes.xxl}
            testID="redButtonActivityIndicator"
          />
        ) : (
          <Text style={styles.buttonText} testID="redButtonText">
            {props.children}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RedButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    padding: Sizes.m,
    backgroundColor: Colors.red_500,
    elevation: 2,
    shadowColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sizes.m,
  },
  buttonText: {
    color: 'white',
    fontSize: Sizes.m,
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-Bold',
  },
  disabledButton: {
    backgroundColor: Colors.gray_900,
  },
});
