import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../Assets/theme';
import TotalPriceFooter from './screens/TotalPriceFooter';
import Header from './screens/Header';

const MyProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => {
    return state.LoadProductReducer;
  });

  useEffect(() => {
    dispatch({type: 'GET_MY_PRODUCT'});
  }, []);

  const renderItem = (item, index) => {
    return (
      <View key={index} style={style.cardCnt}>
        <View style={{flex: 0.25}}>
          <Image
            source={{uri: item?.image}}
            style={style.imgStyle}
            resizeMode="contain"
          />
        </View>
        <View style={style.descCnt}>
          <Text style={style.fontStyle}>
            Title: <Text style={style.descStyle}>{item.title}</Text>
          </Text>
          <Text style={style.fontStyle}>
            Description: <Text style={style.descStyle}>{item.description}</Text>
          </Text>
          <Text style={style.fontStyle}>
            Price: <Text style={style.descStyle}>{item.price}</Text>
          </Text>
          <Text style={style.fontStyle}>
            Category: <Text style={style.descStyle}>{item.category}</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <Header title={'My Products'} navigation={navigation} />
      <FlatList
        data={data?.addProductData}
        style={{flex: 1}}
        renderItem={({item, index}) => renderItem(item, index)}
        showsHorizontalScrollIndicator={false}
      />
      <TotalPriceFooter price={data.myProductTotalPrice} />
    </View>
  );
};

export default MyProduct;

const style = StyleSheet.create({
  fontStyle: {fontWeight: 'bold', fontSize: 18},
  descStyle: {fontWeight: '500'},
  cardCnt: {
    backgroundColor: 'white',
    padding: 5,
    margin: '3%',
    alignSelf: 'center',
    width: '95%',
    flexDirection: 'row',
  },
  imgStyle: {height: 100, width: 100, backgroundColor: 'lightgrey'},
  descCnt: {flex: 0.75, padding: 10, paddingLeft: 20},
});
