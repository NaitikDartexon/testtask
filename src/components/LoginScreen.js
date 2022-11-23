import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import PhoneNumber from './screens/PhoneNumber';
import VerifyCode from './screens/VerifyCode';

export default function LoginScreen(props) {
  const [confirm, setConfirm] = useState(null);
  const [loader, setLoader] = useState(false);

  async function signIn(phoneNumber) {
    if (phoneNumber.length === 10) {
      setLoader(true);
      try {
        const confirmation = await auth().signInWithPhoneNumber(
          '+91' + phoneNumber,
        );
        setLoader(false);
        setConfirm(confirmation);
      } catch (error) {
        setLoader(false);
        alert(error);
      }
    } else {
      alert('Please Enter valid 10 digit phone number.');
    }
  }

  async function confirmVerificationCode(code) {
    try {
      setLoader(true);
      await confirm.confirm(code);
      setConfirm(null);
    } catch (error) {
      alert('Invalid code');
      setLoader(false);
    }
  }

  auth().onAuthStateChanged(user => {
    if (user) {
      setConfirm(null);
      setLoader(false);
      props.navigation.replace('loadProduct');
    }
  });

  if (confirm)
    return <VerifyCode onSubmit={confirmVerificationCode} loader={loader} />;

  return <PhoneNumber onSubmit={signIn} loader={loader} />;
}
