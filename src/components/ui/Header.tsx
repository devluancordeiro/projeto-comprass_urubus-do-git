import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants/styles';

interface HeaderProps {
  title: string;
  goBack: () => void;
}

function Header({title, goBack}: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      {!!goBack && (
        <Pressable onPress={goBack} hitSlop={10} style={styles.backWrapper}>
          <Ionicons
            name={'chevron-forward-outline'}
            size={22}
            color={Colors.black}
            style={styles.backIcon}
          />
        </Pressable>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backWrapper: {
    position: 'absolute',
    left: 16,
  },
  backIcon: {
    transform: [{rotate: '180deg'}],
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    color: Colors.black,
  },
});

export default Header;
