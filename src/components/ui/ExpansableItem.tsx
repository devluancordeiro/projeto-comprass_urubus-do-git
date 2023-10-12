import React, {useState} from 'react';
import {View, Pressable, Text, ViewStyle, StyleSheet} from 'react-native';
import {Colors} from '../../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ExpansableItemProps {
  label: string;
  details: string;
  style?: ViewStyle;
}

function ExpansableItem({
  label,
  details,
  style,
}: ExpansableItemProps): JSX.Element {
  const [expand, setExpand] = useState(false);
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={() => setExpand(prev => !prev)}
        hitSlop={16}
        style={styles.pressableHeader}>
        <Text style={styles.label}>{label}</Text>
        <Ionicons
          name={'chevron-forward-outline'}
          size={18}
          color={Colors.black}
          style={expand && {transform: [{rotate: '90deg'}]}}
        />
      </Pressable>
      {expand && <Text style={styles.details}>{details}</Text>}
    </View>
  );
}

export default ExpansableItem;

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    padding: 16,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#B6B6B6',
  },
  pressableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: Colors.black,
  },
  details: {
    fontSize: 12,
    color: Colors.black,
    marginTop: 13,
    textAlign: 'justify',
  },
});
