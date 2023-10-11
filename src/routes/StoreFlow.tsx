import React from 'react';
import Home from '../screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/styles';

const Tab = createBottomTabNavigator();

function StoreFlow() {
  return (
    <NavigationContainer>
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
              return (
                <Ionicons name={'home-outline'} size={size} color={color} />
              );
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
              return (
                <Ionicons name={'cart-outline'} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: Colors.red_500,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({size, color, focused}) => {
              if (focused) {
                return (
                  <Ionicons
                    name={'person'}
                    size={size}
                    color={Colors.red_500}
                  />
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
    </NavigationContainer>
  );
}

export default StoreFlow;
