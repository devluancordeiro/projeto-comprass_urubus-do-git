import React from 'react';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import IncrementalProductCard from './IncrementalProductCard';
import {product} from '../../constants/storeTypes';
import {Colors, Sizes} from '../../constants/styles';

interface ProductsListProps {
  data: product[];
  title: string;
}

function ProductsList({data, title}: ProductsListProps) {
  return (
    <View style={styles.productListWrapper}>
      <View style={styles.listHeader}>
        <Text style={styles.listName}>{title}</Text>
        <Pressable>
          <Text style={styles.viewAll}>View all</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <IncrementalProductCard
            item={item}
            onTap={() => console.log('pressed item', item.id)}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.listItems}
      />
    </View>
  );
}

export default ProductsList;

const styles = StyleSheet.create({
  productListWrapper: {
    marginVertical: 8,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.s,
    marginBottom: 16,
  },
  listName: {
    color: Colors.black,
    fontSize: 32,
    fontFamily: 'OpenSans-ExtraBold',
  },
  viewAll: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
  listItems: {paddingHorizontal: 8},
});
