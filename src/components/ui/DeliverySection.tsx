import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../constants/styles';
import {Sizes} from '../../constants/styles';

const deliveryMethods = [
  {id: '1', image: require('../../assets/images/fedex.png')},
  {id: '2', image: require('../../assets/imgages/usps.png')},
  {id: '3', image: require('../../assets/imgages/dhl.png')},
  {id: '4', image: require('../../assets/imgages/fedex.png')},
  {id: '5', image: require('../../assets/imgages/usps.png')},
  {id: '6', image: require('../../assets/images/dhl.png')},
];

interface DeliveryItem {
  id: string;
  image: any;
}

const DeliverySection: () => React.JSX.Element = () => {
  const renderItem = ({item, index}: {item: DeliveryItem; index: number}) => (
    <TouchableOpacity style={styles.item}>
      <Image
        source={item.image}
        style={[
          styles.image,
          index === 0 && styles.firstImage,
          index === 3 && styles.firstImage,
        ]}
      />
      <Text style={styles.textDays}> 2-3 days</Text>
    </TouchableOpacity>
  );

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
    width: 100,
    height: 72,
    marginLeft: 16,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 8,
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
});
