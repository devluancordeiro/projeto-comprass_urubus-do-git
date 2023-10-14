import React from 'react';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import IncrementalProductCard from './IncrementalProductCard';
import {product} from '../../constants/storeTypes';
import {Colors, Sizes} from '../../constants/styles';
import {useTranslation} from 'react-i18next';

interface ProductsListProps {
  data: product[];
  title: string;
}

function ProductsList({data, title, navigation}: ProductsListProps) {
  const {t} = useTranslation();
  return (
    <View style={styles.productListWrapper}>
      <View style={styles.listHeader}>
        <Text style={styles.listName}>{title}</Text>
        <Pressable>
          <Text style={styles.viewAll}>{t('View all')}</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <IncrementalProductCard
            item={item}
            onTap={() => navigation.navigate('details', {productOpened: item})}
          />
        )}
        keyExtractor={item => item.id.toString()}
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
