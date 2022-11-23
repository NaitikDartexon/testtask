import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../Assets/theme';

export default function OTP(props) {
  const [code, setCode] = useState('');

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter OTP</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={styles.input}
      />
      {props.loader ? (
        <ActivityIndicator color={'white'} size="small" />
      ) : (
        <Button title="Confirm OTP" onPress={() => props.onSubmit(code)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 25,
  },
});
