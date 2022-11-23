import {View, Text, StyleSheet, PermissionsAndroid, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Header from './screens/Header';

const OrderProduct = props => {
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      ).then(res => {
        if (res === 'granted') {
          Geolocation.getCurrentPosition(location => {
            if (location.coords) {
              const {latitude, longitude} = location?.coords;
              setLocationData({
                ...locationData,
                latitude: latitude,
                longitude: longitude,
              });
            }
          });
        } else {
          props.navigation.goBack();
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={style.container}>
      <Header title={'My Location'} navigation={props.navigation} />
      {locationData.longitude && locationData.latitude && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={style.container}
          region={locationData}>
          <Marker coordinate={locationData} />
        </MapView>
      )}
    </View>
  );
};

export default OrderProduct;

const style = StyleSheet.create({
  container: {flex: 1},
});
