import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {COLORS} from '../Assets/theme';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_PRODUCT_REQUEST} from '../stateManage/Actions';

const AddProduct = props => {
  const [data, setData] = useState({
    title: '',
    price: null,
    description: '',
    category: '',
  });
  const [Productimage, setProductImage] = useState({});
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state?.LoadProductReducer;
  });

  useEffect(() => {
    if (state.addProductStatus) {
      dispatch({type: 'ADD_PRODUCT_SUCCED'});
      alert('wooo hoo! your product is added...');
      props.navigation.goBack();
    }
  }, [state]);

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else {
        setProductImage(response.assets[0]);
      }
    });
  };

  const submitData = (item, text) => {
    switch (item) {
      case 'title':
        return setData({...data, title: text});
      case 'price':
        return setData({...data, price: text});
      case 'desc':
        return setData({...data, description: text});
      case 'cat':
        return setData({...data, category: text});
      default:
        return null;
    }
  };

  const createProduct = async () => {
    const {title, category, description, price} = data;
    if (Productimage.uri && title && category && description && price) {
      let payload = {
        endPoint: 'products',
        data: {
          title: title,
          price: parseInt(price),
          description: description,
          category: category,
          image: Productimage.uri,
        },
      };
      dispatch({type: ADD_PRODUCT_REQUEST, payload: payload});
    } else {
      alert('Please Fill all the mendatory fields.');
    }
  };

  const addimageDemoUrl =
    'https://static.thenounproject.com/png/187803-200.png';

  return (
    <View style={style.container}>
      <KeyboardAvoidingView style={style.addViewCnt}>
        <View style={style.detailViewCnt}>
          <TouchableOpacity onPress={() => chooseFile('photo')}>
            <Image
              style={style.imageStyle}
              source={{
                uri: Productimage.uri ? Productimage.uri : addimageDemoUrl,
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
          {['title', 'price', 'desc', 'cat'].map((item, index) => {
            return (
              <TextInput
                placeholder={`Product ${item}`}
                keyboardType={item === 'price' ? 'number-pad' : 'default'}
                value={
                  item === 'title'
                    ? data.title
                    : item === 'price'
                    ? data.price
                    : item === 'desc'
                    ? data.description
                    : data.category
                }
                style={style.inputStyle}
                onChangeText={text => submitData(item, text)}
              />
            );
          })}
        </View>
        <TouchableOpacity onPress={createProduct} style={style.btnCnt}>
          <Text style={style.addProdTxt}>Add Product</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddProduct;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addViewCnt: {
    flex: 0.8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailViewCnt: {flex: 1, width: '100%', alignItems: 'center'},
  imageStyle: {
    height: 120,
    width: 120,
    backgroundColor: 'transparent',
    marginTop: '3%',
    borderRadius: 1000,
  },
  inputStyle: {
    backgroundColor: 'white',
    marginVertical: 10,
    width: '80%',
    padding: 5,
  },
  btnCnt: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  addProdTxt: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
    marginHorizontal: '10%',
  },
});
