import React, {JSXElementConstructor, ReactElement, useState} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ListRenderItemInfo,
  View,
} from 'react-native';
import {Colors} from '../../constants/styles';
import {Sizes} from '../../constants/styles';

interface DeliveryMethod {
  id: string;
  image: any;
};

const deliveryMethods = [
  {id: '1', image: require('../../assets/images/fedex.png')},
  {id: '2', image: require('../../assets/images/usps.png')},
  {id: '3', image: require('../../assets/images/dhl.png')},
  {id: '4', image: require('../../assets/images/fedex.png')},
  {id: '5', image: require('../../assets/images/usps.png')},
  {id: '6', image: require('../../assets/images/dhl.png')},
];

interface deliveryMethods {
  id: string;
  image: any;
}

const DeliverySection: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const renderItem = ({ item, index }: { item: DeliveryMethod; index: number }) => (
    const isSelected = selectedMethod === item.id;
    return (
      <TouchableOpacity style={styles.item} onPress={() => handleDeliverySelect(item.id)}>
        <Image source={item.image} style={[styles.image, index === 0 && styles.firstImage, index === 3 && styles.firstImage]} />
        {isSelected && <View style={styles.selectedMethod}>
          <Image source={require('../../assets/images/verified.png')} style={styles.selectedImage} />
        </View>}
        <Text style={styles.textDays}>2-3 days</Text>
      </TouchableOpacity>
    );
  );

  const handleDeliverySelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

function renderItem(info: ListRenderItemInfo<{ id: string; image: any; }>): ReactElement<any, string | JSXElementConstructor<any>> | null {
  throw new Error('Function not implemented.');
}

  return (
    <FlatList
      data={deliveryMethods}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal={true}
    />
  );
};

export default DeliverySection;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    width: 100,
    height: 72,
    marginLeft: 16,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: Colors.black,
    alignItems: 'center',
    textAlign: 'center',
  },

  image: {
    width: 80,
    height: 10,
    marginTop: 22,
    resizeMode: 'cover',
  },

  firstImage: {
    width: 60,
    height: 16,
    marginTop: 16,
    resizeMode: 'cover',
  },

  textDays: {
    color: Colors.gray_500,
    fontSize: Sizes.xxs,
    marginTop: 8,
  },

  selectedMethod: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  selectedImage: {
    width: 22,
    height: 22,
    resizeMode: 'cover',
  },
});

function setSelectedMethod(methodId: any) {
  throw new Error('Function not implemented.');
}

