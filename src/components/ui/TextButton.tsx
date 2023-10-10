import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Sizes} from '../../constants/styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface TextButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

const TextButton: React.FC<TextButtonProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  viewStyles: {
    paddingVertical: Sizes.xl,
    alignItems: 'center',
  },
  textStyles: {
    color: Colors.white,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: Sizes.m,
    lineHeight: Sizes.l,
    textAlign: 'center',
  },
});
