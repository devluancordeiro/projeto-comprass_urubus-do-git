import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from '../../constants/styles';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({message}) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/images/auth-background.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.inside}>
          <Image
            source={require('../../assets/images/comprass-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.message}>{message}</Text>
          <ActivityIndicator
            size={80}
            color={Colors.red_500}
            testID="activity-indicator"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: Colors.black},
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    top: '28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inside: {
    position: 'absolute',
    top: '16%',
  },
  message: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'OpenSans-Regular',
  },
  logo: {
    marginHorizontal: '5%',
    marginLeft: '5%',
    resizeMode: 'contain',
    width: 300,
    height: 100,
  },
});
