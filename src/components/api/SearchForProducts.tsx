import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {Colors} from '../../constants/styles';
import SearchedProductCard from './SearchedProductCard';
import {getProductsByTitle} from '../../utils/fetchProducts';
import {product} from '../../constants/storeTypes';
import {useTranslation} from 'react-i18next';

function Separator() {
  return <View style={styles.separator} />;
}

function SearchForProducts({navigation}) {
  const {t} = useTranslation();
  const [isSearching, setisSearching] = useState(false);
  const [searchedTitle, setSearchedTitle] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<product[]>([]);

  useEffect(() => {
    async function getProducts() {
      if (isSearching) {
        if (searchedTitle) {
          const productsFetched = await getProductsByTitle(searchedTitle);
          setSearchedProducts(productsFetched);
        } else {
          setSearchedProducts([]);
        }
      }
    }
    getProducts();
  }, [searchedTitle, isSearching]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setisSearching(prev => !prev)}
        style={styles.viewSearch}>
        <Image
          source={require('../../assets/images/search.png')}
          style={styles.searchIcon}
        />
      </Pressable>
      {isSearching && (
        <View style={styles.search}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={t('Enter the product name')}
              style={styles.input}
              onChangeText={text => setSearchedTitle(text)}
              value={searchedTitle}
            />
          </View>
          {searchedTitle && searchedProducts.length > 0 && (
            <View style={styles.searchedProductsWrapper}>
              <FlatList
                data={searchedProducts}
                renderItem={({item}) => (
                  <SearchedProductCard
                    item={item}
                    onTap={() =>
                      navigation.navigate('details', {productOpened: item})
                    }
                  />
                )}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={Separator}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    left: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  viewSearch: {
    backgroundColor: Colors.red_500,
    borderRadius: 23,
    height: 42,
    width: 42,
    marginBottom: 8,
  },
  searchIcon: {
    marginTop: 8,
    marginLeft: 8,
    height: 22,
    width: 22,
  },
  search: {
    width: '100%',
  },
  inputWrapper: {
    height: 36,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: Colors.red_500,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  input: {
    fontSize: 12,
    color: Colors.gray_500,
    padding: 0,
  },
  searchedProductsWrapper: {
    margin: 8,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderColor: Colors.gray_200,
    backgroundColor: Colors.white,
    maxHeight: 200,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray_200,
  },
});

export default SearchForProducts;
