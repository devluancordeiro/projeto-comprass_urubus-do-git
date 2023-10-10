import React, {useState} from 'react';
import {View} from 'react-native';
import Home from './screens/Home';

function App(): JSX.Element {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  return (
    <View>
      <Home />
    </View>
  );
}

export default App;
