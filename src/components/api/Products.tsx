import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const data = [
  {key: '1', title: 'Name ', price: 'R$ 30,00'},
  {key: '2', title: 'Name ', price: 'R$ 699,99'},
  {key: '3', title: 'Name ', price: 'R$ 30,00'},
  {key: '4', title: 'Name ', price: 'R$ 699,99'},
  {key: '5', title: 'Name ', price: 'R$ 30,00'},
  {key: '6', title: 'Name ', price: 'R$ 699,99'},
  {key: '7', title: 'Name ', price: 'R$ 30,00'},
  {key: '8', title: 'Name ', price: 'R$ 699,99'},
  {key: '9', title: 'Name ', price: 'R$ 30,00'},
  // Adicione mais itens conforme necessário
];

const renderItem = ({
  item,
}: {
  item: {key: string; title: string; price: string};
}) => (
  <View style={styles.productView}>
    <View style={styles.counter}>
      <TouchableOpacity>
        <Image source={require('../../assets/images/count-.png')} />
      </TouchableOpacity>
      <View style={styles.numberView}>
        <Text style={styles.number}>1</Text>
      </View>
      <TouchableOpacity>
        <Image source={require('../../assets/images/count+.png')} />
      </TouchableOpacity>
    </View>
    <TouchableOpacity>
      <Image
        source={require('../../assets/images/productImage.png')}
        style={styles.productImage}
      />
      <Text style={styles.Name}>{item.title}</Text>
      <Text style={styles.description}>Description pequena aqui e se...</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  </View>
);

const Products = () => {
  return (
    <>
      <View style={styles.viewText}>
        <Text style={styles.category}>Category</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>
      <View style={styles.flat}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default Products;

const styles = StyleSheet.create({
  flat: {
    marginLeft: 8,
  },
  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  category: {
    color: 'black',
    fontSize: 36,
    fontFamily: 'OpenSans-ExtraBold',
  },
  viewAll: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
  productImage: {
    width: 160,
    height: 218,
  },
  productView: {
    paddingHorizontal: 8,
  },
  Name: {
    color: 'gray',
    marginTop: 8,
    marginBottom: 4,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  description: {
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    marginBottom: 6,
  },
  price: {
    color: 'red',
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 18,
  },
  counter: {
    flexDirection: 'row',
  },
  numberView: {
    width: 58,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  number: {
    fontFamily: 'OpenSans-Bold',
    color: 'black',
  },
});
