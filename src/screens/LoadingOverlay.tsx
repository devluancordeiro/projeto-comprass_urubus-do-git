import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors} from '../constants/styles';

interface LoadingOverlayProps {
  message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({message}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/auth-background.png')}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color={Colors.red_500} />
    </ImageBackground>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'OpenSans-Regular',
  },
});
