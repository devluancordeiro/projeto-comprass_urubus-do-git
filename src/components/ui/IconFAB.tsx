import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../constants/styles';

interface IconFABProps {
  onPress: () => void;
  icon: string;
  color: string;
  size: number;
}

const IconFAB: React.FC<IconFABProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{backgroundColor: props.color, borderRadius: props.size / 2}}>
        <View style={[styles.secView, {height: props.size, width: props.size}]}>
          <Icon
            name={props.icon}
            size={props.size / 1.7}
            color={Colors.white}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IconFAB;

const styles = StyleSheet.create({
  secView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
