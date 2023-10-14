import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from '../components/api/ProductCard';
import ExpansableItem from '../components/ui/ExpansableItem';
import {product} from '../constants/storeTypes';
import {Colors} from '../constants/styles';
import {increaseItemCount, reduceItemCount} from '../redux/counterSlice';
import type {RootState} from '../redux/store';
import {StoreFlowParamList} from '../routes/StoreFlow';
import {getProductsByCategoryId} from '../utils/fetchProducts';
import {formatCurrency} from '../utils/formatCurrency';
import Header from '../components/ui/Header';

type DetailsProps = {
  navigation: StackNavigationProp<StoreFlowParamList, 'details'>;
  route: RouteProp<StoreFlowParamList, 'details'>;
};

function Details({navigation, route}: DetailsProps): JSX.Element {
  const {productOpened} = route.params;
  const [recommendedProducts, setRecommendedProducts] = useState<product[]>([]);
  const count = useSelector(
    (state: RootState) => state.counter[productOpened.id],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getRecommended() {
      const id = productOpened.category.id;
      const productsFetched = await getProductsByCategoryId(id);
      setRecommendedProducts(
        productsFetched.filter(
          (productFetched: product) => productFetched.id !== productOpened.id,
        ),
      );
    }
    getRecommended();
  }, [productOpened]);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <ScrollView>
        <Header title="Details" goBack={() => navigation.goBack()} />
        <View style={styles.container}>
          <FlatList
            data={productOpened.images}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            renderItem={({item}) => (
              <Image
                style={[styles.imageCard, {width: screenWidth}]}
                resizeMode="cover"
                source={{uri: item}}
              />
            )}
          />
          <View style={styles.detailsCard}>
            <View style={styles.infoContainer}>
              <View style={styles.mainInfoWrapper}>
                <Text style={styles.itemName}>{productOpened.title}</Text>
                <Text style={styles.itemCategory}>
                  {productOpened.category.name}
                </Text>
              </View>
              <Text style={styles.itemName}>
                {formatCurrency(productOpened.price)}
              </Text>
            </View>
            <Text style={styles.itemDescription}>
              {productOpened.description}
            </Text>
          </View>
          <ExpansableItem label="Description" details="Here goes description" />
          <ExpansableItem
            label="Support"
            details="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
            style={styles.supportExpansableItem}
          />
          <View style={styles.recommendedSectionWrapper}>
            <View style={styles.recommendedSectionHeader}>
              <Text style={styles.recommendedSectionTitle}>
                You can also like this
              </Text>
              <Text style={styles.recommendedSectionInfo}>
                {recommendedProducts.length} items
              </Text>
            </View>
            <FlatList
              data={recommendedProducts}
              renderItem={({item}) => (
                <ProductCard
                  item={item}
                  onTap={() =>
                    navigation.push('details', {productOpened: item})
                  }
                />
              )}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.productsRecommended}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.counterView}>
        <View style={styles.counterWrapper}>
          <TouchableOpacity
            hitSlop={20}
            activeOpacity={0.7}
            onPress={() => dispatch(reduceItemCount(productOpened.id))}>
            <Image
              style={styles.quantityModifier}
              source={require('../assets/images/big-reduce-count.png')}
            />
          </TouchableOpacity>
          <View style={styles.numberView}>
            <Text style={styles.number}>{count || 0}</Text>
          </View>
          <TouchableOpacity
            hitSlop={20}
            activeOpacity={0.7}
            onPress={() => dispatch(increaseItemCount(productOpened.id))}>
            <Image
              style={styles.quantityModifier}
              source={require('../assets/images/big-increase-count.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  imageCard: {
    height: 412,
  },
  detailsCard: {padding: 16},
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 64,
    marginBottom: 40,
  },
  mainInfoWrapper: {
    maxWidth: '70%',
  },
  itemName: {
    fontFamily: 'OpenSans-Bold',
    color: Colors.black,
    fontSize: 24,
  },
  itemCategory: {
    fontFamily: 'OpenSans',
    color: Colors.gray_500,
    fontSize: 11,
  },
  itemDescription: {
    color: Colors.black,
    fontFamily: 'OpenSans',
    fontWeight: '300',
    marginBottom: 40,
  },
  supportExpansableItem: {
    borderTopWidth: 0,
  },
  recommendedSectionWrapper: {
    height: 324,
    borderTopWidth: 0.4,
    marginTop: 16,
    paddingTop: 24,
    borderColor: '#9B9B9B',
  },
  recommendedSectionHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendedSectionTitle: {
    fontSize: 18,
    color: Colors.black,
  },
  recommendedSectionInfo: {
    fontSize: 11,
    color: Colors.gray_500,
  },
  productsRecommended: {
    paddingHorizontal: 8,
  },
  counterView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: Colors.white,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  counterWrapper: {
    flexDirection: 'row',
    height: 42,
  },
  quantityModifier: {
    width: 104,
    height: 42,
  },
  numberView: {
    width: 94,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.gray_500,
    alignItems: 'center',
  },
  number: {
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.black,
    fontSize: 24,
  },
});
