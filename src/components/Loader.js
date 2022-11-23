import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../Assets/theme';

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={COLORS.primary} size="large" />
    </View>
  );
};

export default Loader;
