import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProductsList from '../components/shop/ProductsList';
import SearchForProducts from '../components/shop/SearchForProducts';
import AuthWelcome from '../components/auth/AuthWelcome';
import {category, product} from '../constants/storeTypes';
import {Colors, Sizes} from '../constants/styles';
import {getCategories, getProductsByCategoryId} from '../utils/fetchProducts';
import {AuthContext} from '../components/auth/AuthContext';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const Home = () => {
  const {t} = useTranslation();
  const [categories, setCategories] = useState<category[]>([]);
  const [products, setProducts] = useState<product[][]>([]);
  const ctx = useContext(AuthContext);

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
        ctx.isOppening(false);
      } catch (error) {
        ctx.isOppening(false);
        console.error('Error fetching data:', error);
      }
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ctx.oppening) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <ScrollView style={styles.view}>
        <ImageBackground
          source={require('../assets/images/background-compass.png')}
          style={styles.headerBackground}>
          <View style={styles.headerWrapper}>
            <AuthWelcome />
            <Image
              source={require('../assets/images/comprass-logo.png')}
              style={styles.headerImage}
            />
            <View style={styles.viewTextCart}>
              <Text style={styles.text}>{t('Here you always win!')}</Text>
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
            />
          ))}
        </View>
      </ScrollView>
      <SearchForProducts />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Colors.white,
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
