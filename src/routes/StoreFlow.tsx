import React from 'react';
import Home from '../screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/styles';
import {createStackNavigator} from '@react-navigation/stack';
import SingUp from '../screens/SignUp';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Details from '../screens/Details';
import {product} from '../constants/storeTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AuthContextProvider from '../components/auth/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainFlow() {
  const hasItemsInCart =
    Object.keys(useSelector((state: RootState) => state.counter)).length !== 0;
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({size, color, focused}) => {
            if (focused) {
              return (
                <Ionicons
                  name={'home-sharp'}
                  size={size}
                  color={Colors.red_500}
                />
              );
            }
            return <Ionicons name={'home-outline'} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.red_500,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({size, color, focused}) => {
            if (focused) {
              return (
                <Ionicons name={'cart'} size={size} color={Colors.red_500} />
              );
            }
            return <Ionicons name={'cart-outline'} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.red_500,
          tabBarBadge: hasItemsInCart ? ' ' : undefined,
          tabBarBadgeStyle: {
            backgroundColor: Colors.red_500,
            height: 10,
            minWidth: 10,
            borderRadius: 5,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({size, color, focused}) => {
            if (focused) {
              return (
                <Ionicons name={'person'} size={size} color={Colors.red_500} />
              );
            }
            return (
              <Ionicons name={'person-outline'} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: Colors.red_500,
        }}
      />
    </Tab.Navigator>
  );
}

function AuthFlow() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: Colors.black},
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SingUp} />
      <Stack.Screen name="forgot" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export type StoreFlowParamList = {
  app: undefined;
  auth: undefined;
  details: {productOpened: product};
};

function StoreFlow() {
  return (
    <>
      <AuthContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="auth"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="app" component={MainFlow} />
            <Stack.Screen name="auth" component={AuthFlow} />
            <Stack.Screen name="details" component={Details} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContextProvider>
    </>
  );
}

export default StoreFlow;
