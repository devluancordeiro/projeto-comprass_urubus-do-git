import React from 'react';
import {View} from 'react-native';
import RedButton from './components/ui/RedButton';

function App(): JSX.Element {
  return (
    <View>
      <RedButton onPress={function (): void {}}>LOGIN</RedButton>
    </View>
  );
}

export default App;
