import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import ProductsList from '../components/api/ProductsList';
import {getCategories, getProductsByCategoryId} from '../utils/fetchProducts';
import {Colors, Sizes} from '../constants/styles';
import {product, category} from '../constants/storeTypes';
import SearchForProducts from '../components/api/SearchForProducts';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState<category[]>([]);
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesFetched = await getCategories();
        setCategories(categoriesFetched);
        for (const categoryFetched of categoriesFetched) {
          if (categoryFetched.id <= 5) {
            const productsFetched = await getProductsByCategoryId(
              categoryFetched.id,
            );
            setProducts(prevProducts => [...prevProducts, productsFetched]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <>
      <ScrollView style={styles.view}>
        <ImageBackground
          source={require('../assets/images/background-compass.png')}
          style={styles.headerBackground}>
          <View style={styles.headerWrapper}>
            <Image
              source={require('../assets/images/comprass-logo.png')}
              style={styles.headerImage}
            />
            <View style={styles.viewTextCart}>
              <Text style={styles.text}>Aqui você sempre ganha!</Text>
              <Image
                source={require('../assets/images/cart-icon.png')}
                style={styles.imageCart}
              />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.shoppingSection}>
          {products.map((data, index) => (
            <ProductsList
              key={index}
              data={data}
              title={categories[index]?.name}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
      <SearchForProducts navigation={navigation} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  headerBackground: {
    width: '100%',
    height: 400,
  },
  headerWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  headerImage: {
    alignSelf: 'center',
    width: '75%',
    resizeMode: 'contain',
    marginTop: '33%',
  },
  viewTextCart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  text: {
    color: Colors.white,
    fontSize: Sizes.m,
    fontFamily: 'OpenSans-SemiBold',
  },
  imageCart: {
    height: 46,
    width: 46,
  },
  shoppingSection: {
    marginVertical: 8,
  },
});
