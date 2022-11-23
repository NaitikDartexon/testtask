import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../Assets/theme';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimateText(true);
      setTimeout(() => {
        gettoken();
      }, 2000);
    }, 500);
  }, []);

  const gettoken = async () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('loadProduct');
      } else {
        navigation.replace('loginScreen');
      }
    });
  };

  return (
    <View style={style.container}>
      <Text style={{textAlign: 'center', fontSize: 30, fontWeight: '500'}}>
        Ecom Shopping...
      </Text>
      {animateText && (
        <Animatable.Text animation="bounceIn">
          Shop your favourite product from near you. :)
        </Animatable.Text>
      )}
    </View>
  );
};

export default SplashScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
