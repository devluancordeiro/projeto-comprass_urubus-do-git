import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {product} from '../../constants/storeTypes';
import {Colors} from '../../constants/styles';
import {
  deleteItemCount,
  increaseItemCount,
  reduceItemCountWithoutRemove,
} from '../../redux/counterSlice';

interface CartProductCardProps {
  item: product;
  quantity: number;
  onTap: () => void;
}

function CartProductCard({item, quantity, onTap}: CartProductCardProps) {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={onTap}
      style={styles.viewProduct}
      activeOpacity={0.9}>
      <View style={styles.viewProductImage}>
        <Image source={{uri: item?.images[0]}} style={styles.productImage} />
      </View>
      <View style={styles.viewInfo}>
        <View style={styles.middleView}>
          <View>
            <Text style={styles.productName}>{item.title}</Text>
          </View>
          <TouchableOpacity
            style={styles.remove}
            onPress={() => dispatch(deleteItemCount(item.id))}
            activeOpacity={0.6}>
            <Ionicons name="trash-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.lastView}>
          <View style={styles.viewProductCount}>
            <View>
              <TouchableOpacity
                style={styles.buttonCount}
                onPress={() => dispatch(reduceItemCountWithoutRemove(item.id))}
                activeOpacity={0.7}>
                <Ionicons
                  name="remove-outline"
                  size={30}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.numberCount}>{quantity}</Text>
            <View>
              <TouchableOpacity
                style={styles.buttonCount}
                onPress={() => dispatch(increaseItemCount(item.id))}
                activeOpacity={0.7}>
                <Ionicons name="add-outline" size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.itemPrice}>R$ {item.price},00</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(CartProductCard);

const styles = StyleSheet.create({
  viewProduct: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 106,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  viewProductImage: {
    marginRight: 12,
  },
  productImage: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 100,
    height: '100%',
  },
  viewInfo: {
    flex: 1,
  },
  middleView: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: Colors.black,
    marginVertical: 12,
  },
  viewProductCount: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonCount: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.red_500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberCount: {
    marginTop: '8%',
    marginHorizontal: 15,
    color: Colors.black,
  },
  lastView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  remove: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red_500,
    height: 30,
    width: 30,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  itemPrice: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: Colors.black,
    marginBottom: 16,
    marginRight: 16,
  },
  cartView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '16%',
  },
});
