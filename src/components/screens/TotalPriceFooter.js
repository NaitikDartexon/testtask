import {View, Text} from 'react-native';
import React from 'react';

const TotalPriceFooter = ({price}) => {
  return (
    <View>
      <Text style={{margin: 10, fontWeight: '700', color: 'red'}}>
        Total Price: <Text style={{color: 'black'}}>{price}</Text>
      </Text>
    </View>
  );
};

export default TotalPriceFooter;
