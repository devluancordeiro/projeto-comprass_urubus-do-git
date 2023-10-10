import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import Products from '../components/api/Products';

const Home = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
      />
      <View style={styles.view}>
        <ImageBackground
          source={require('../assets/images/background-compass.png')}
          style={styles.background}>
          <View style={styles.viewSearch}>
            <Image
              source={require('../assets/images/redDot.png')}
              style={styles.redDot}
            />
            <Image
              source={require('../assets/images/search.png')}
              style={styles.search}
            />
          </View>
          <Image
            source={require('../assets/images/Comprass-logo1.png')}
            style={styles.imageCompras}
          />
          <View style={styles.viewTextCart}>
            <Text style={styles.text}>Aqui você sempre ganha!</Text>
            <Image
              source={require('../assets/images/cart-svgrepo-com1.png')}
              style={styles.imageCart}
            />
          </View>
          <Products />
        </ImageBackground>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: 400,
    marginBottom: 16,
  },
  imageCompras: {
    alignSelf: 'center',
    width: '70%',
    height: 60,
    marginTop: '41%',
    marginBottom: '27%',
    marginHorizontal: 56,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  imageCart: {
    height: 46,
    width: 46,
  },
  viewTextCart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewSearch: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    top: 66,
    right: 16,
    position: 'absolute',
  },
  search: {
    height: 26,
    width: 26,
    marginRight: 12,
    marginBottom: 4,
  },
  redDot: {
    position: 'absolute',
    height: 46,
    width: 46,
  },
});
