import React, {useState} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/styles';
import {Sizes} from '../../constants/styles';

interface DeliveryMethod {
  id: string;
  image: any;
}

const deliveryMethods = [
  {id: '1', image: require('../../assets/images/fedex.png')},
  {id: '2', image: require('../../assets/images/usps.png')},
  {id: '3', image: require('../../assets/images/dhl.png')},
  {id: '4', image: require('../../assets/images/fedex.png')},
  {id: '5', image: require('../../assets/images/usps.png')},
  {id: '6', image: require('../../assets/images/dhl.png')},
];

interface DeliverySectionProps {
  onPress: () => void;
}

function DeliverySection({onPress}: DeliverySectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  function renderItem({item, index}: {item: DeliveryMethod; index: number}) {
    const isSelected = selectedMethod === item.id;
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() => {
          handleDeliverySelect(item.id);
          onPress();
        }}>
        <Image
          source={item.image}
          style={[
            styles.image,
            index === 0 && styles.firstImage,
            index === 3 && styles.firstImage,
          ]}
        />
        {isSelected && (
          <View style={styles.selectedMethod}>
            <Image
              source={require('../../assets/images/verified.png')}
              style={styles.selectedImage}
            />
          </View>
        )}
        <Text style={styles.textDays}>2-3 days</Text>
      </TouchableOpacity>
    );
  }

  const handleDeliverySelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  return (
    <FlatList
      data={deliveryMethods}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal={true}
    />
  );
}

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
