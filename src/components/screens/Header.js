import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Header = ({navigation, title}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/0/340.png',
          }}
          style={{height: 20, width: 25, marginHorizontal: 10}}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      <Text style={{fontSize: 15, fontWeight: '700'}}>{title}</Text>
    </View>
  );
};

export default Header;
