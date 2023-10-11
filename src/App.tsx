import 'react-native-gesture-handler';
import React from 'react';
import SingUp from './screens/SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from './constants/styles';

function App(): JSX.Element {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{cardStyle: {backgroundColor: Colors.black}}}>
        <Stack.Screen name="signup" component={SingUp} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="forgot" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
