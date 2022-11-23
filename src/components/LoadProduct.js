import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../Assets/theme';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_PRODUCT_REQUEST} from '../stateManage/Actions';
import TotalPriceFooter from './screens/TotalPriceFooter';
import Loader from './Loader';

const LoadProduct = props => {
  const dispatch = useDispatch();
  const products = useSelector(state => {
    return state.LoadProductReducer;
  });

  useEffect(() => {
    let payload = {
      endPoint: 'products',
    };
    dispatch({type: LOAD_PRODUCT_REQUEST, payload: payload});
  }, []);

  const renderItem = item => (
    <TouchableOpacity
      style={style.productContainer}
      activeOpacity={0.5}
      onPress={() => props.navigation.navigate('orderProduct')}>
      <View style={style.imagCnt}>
        <View style={style.imgView}>
          <Image
            source={{uri: item.image}}
            style={{width: 100, height: 100}}
            resizeMode="center"
          />
        </View>
        <View style={style.detailCnt}>
          <Text style={style.fontStyle}>
            Title: <Text style={style.descStyle}>{item.title}</Text>
          </Text>
          <Text style={style.fontStyle}>
            category: <Text style={style.descStyle}>{item.category}</Text>
          </Text>
          <Text style={style.fontStyle}>
            Price: <Text style={style.descStyle}>{item.price}₹</Text>
          </Text>
          <Text style={style.fontStyle}>
            Rating: <Text style={style.descStyle}>{item.rating?.rate}</Text>
          </Text>
          <Text numberOfLines={2} style={style.fontStyle}>
            Desc: <Text style={style.descStyle}>{item.description}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return products.loader ? (
    <Loader />
  ) : (
    <View style={style.container}>
      <View style={style.headCnt}>
        <Text style={style.headTitle}>Product Detail Lists</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('myProduct');
            }}>
            <Text style={{margin: 10, fontWeight: '700', color: 'red'}}>
              My Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('addProduct')}>
            <Image
              style={style.addProductImage}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/992/992651.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products.data}
        renderItem={({item}) => renderItem(item)}
        showsHorizontalScrollIndicator={false}
      />
      <TotalPriceFooter price={products.productTotalPrice} />
    </View>
  );
};

export default LoadProduct;

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.primary},
  headCnt: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headTitle: {fontWeight: '700', fontSize: 17},
  addProductImage: {
    height: 30,
    width: 30,
    marginVertical: 5,
    tintColor: COLORS.primary,
  },
  productContainer: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
  imagCnt: {flexDirection: 'row', backgroundColor: '#cfcfcf'},
  imgView: {
    flex: 0.3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCnt: {flex: 0.7, backgroundColor: 'white', padding: 5},
  fontStyle: {fontWeight: 'bold', fontSize: 18},
  descStyle: {fontWeight: '500'},
});
