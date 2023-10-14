import React, {memo} from 'react';
import {Pressable, View, Text, Image, StyleSheet} from 'react-native';
import {product} from '../../constants/storeTypes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {
  reduceItemCountWithoutRemove,
  increaseItemCount,
  deleteItemCount,
} from '../../redux/counterSlice';

interface CartProductCardProps {
  item: product;
  quantity: number;
  onTap: () => void;
}

function CartProductCard({item, quantity, onTap}: CartProductCardProps) {
  const dispatch = useDispatch();
  return (
    <Pressable onPress={onTap} style={styles.viewProduct}>
      <View style={styles.viewProductImage}>
        <Image source={{uri: item?.images[0]}} style={styles.productImage} />
      </View>
      <View style={styles.middleView}>
        <View>
          <Text style={styles.productName}>{item.title}</Text>
        </View>
        <View style={styles.viewProductCount}>
          <View>
            <TouchableOpacity
              style={styles.buttonCount}
              onPress={() => dispatch(reduceItemCountWithoutRemove(item.id))}>
              <Ionicons name="remove-outline" size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.numberCount}>{quantity}</Text>
          <View>
            <TouchableOpacity
              style={styles.buttonCount}
              onPress={() => dispatch(increaseItemCount(item.id))}>
              <Ionicons name="add-outline" size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.lastView}>
        <TouchableOpacity
          style={styles.remove}
          onPress={() => dispatch(deleteItemCount(item.id))}>
          <Ionicons name="trash-outline" size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.itemPrice}>R$ {item.price},00</Text>
      </View>
    </Pressable>
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
    flex: 1,
  },
  productImage: {
    width: 100,
    height: '100%',
  },
  middleView: {
    flex: 1,
    marginHorizontal: 4,
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
    marginHorizontal: 18,
    color: Colors.black,
  },
  lastView: {
    flex: 1,
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
