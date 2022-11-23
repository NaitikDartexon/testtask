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

export default function PhoneNumber(props) {
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter Phone Number</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="number-pad"
      />
      {props.loader ? (
        <ActivityIndicator color={'white'} size="small" />
      ) : (
        <Button title="Get OTP" onPress={() => props.onSubmit(phoneNumber)} />
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
