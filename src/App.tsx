import React, {useState} from 'react';
import {View} from 'react-native';
import RedButton from './components/ui/RedButton';
import AuthInput from './components/auth/AuthInput';
import TextButton from './components/ui/TextButton';

function App(): JSX.Element {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  return (
    <View>
      <AuthInput
        label="Email"
        onChangeText={enteredText => setText1(enteredText)}
        value={text1}
        validation="sucess"
      />
      <AuthInput
        label="Password"
        onChangeText={enteredText => setText2(enteredText)}
        isPassword
        value={text2}
      />
      <RedButton onPress={function (): void {}}>LOGIN</RedButton>
      <TextButton onPress={function (): void {}}>
        Not have an account yet? {'\n'} Sign Up
      </TextButton>
    </View>
  );
}

export default App;
