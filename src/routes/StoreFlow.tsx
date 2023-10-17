import React, {useContext} from 'react';
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
import {methods, product} from '../constants/storeTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AuthContextProvider, {AuthContext} from '../components/context/AuthContext';
import Checkout from '../screens/Checkout';
import Address from '../screens/Address';
import Success from '../screens/Success';
import SuccessPix from '../screens/SuccessPix';
import SuccessBillet from '../screens/SuccessBillet';
import SuccessCC from '../screens/SuccessCreditCard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export type MainFlowParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

interface TabBarIconProps {
  size: number;
  color: string;
  focused: boolean;
}

function HomeTabBarIcon({size, color, focused}: TabBarIconProps) {
  if (focused) {
    return <Ionicons name={'home-sharp'} size={size} color={Colors.red_500} />;
  }
  return <Ionicons name={'home-outline'} size={size} color={color} />;
}

function CartTabBarIcon({size, color, focused}: TabBarIconProps) {
  if (focused) {
    return <Ionicons name={'cart'} size={size} color={Colors.red_500} />;
  }
  return <Ionicons name={'cart-outline'} size={size} color={color} />;
}

function ProfileTabBarIcon({size, color, focused}: TabBarIconProps) {
  if (focused) {
    return <Ionicons name={'person'} size={size} color={Colors.red_500} />;
  }
  return <Ionicons name={'person-outline'} size={size} color={color} />;
}

function MainFlow() {
  const hasItemsInCart =
    Object.keys(useSelector((state: RootState) => state.counter)).length !== 0;
  const ctx = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeTabBarIcon,
          tabBarActiveTintColor: Colors.red_500,
          tabBarStyle: {display: ctx.oppening ? 'none' : 'flex'},
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: CartTabBarIcon,
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
          tabBarIcon: ProfileTabBarIcon,
          tabBarActiveTintColor: Colors.red_500,
        }}
      />
    </Tab.Navigator>
  );
}

export type AuthFlowParamList = {
  login: undefined;
  signup: undefined;
  forgot: undefined;
};

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
  checkout: {orderPrice: number};
  success: {paymentMethod: methods};
  address: undefined;
  load: undefined;
  successPix: undefined;
  successBillet: undefined;
  successCC: undefined;
};

function StoreFlow() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: Colors.white},
          }}>
          <Stack.Screen name="app" component={MainFlow} />
          <Stack.Screen name="auth" component={AuthFlow} />
          <Stack.Screen name="details" component={Details} />
          <Stack.Screen name="checkout" component={Checkout} />
          <Stack.Screen
            name="success"
            component={Success}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen name="successPix" component={SuccessPix} />
          <Stack.Screen name="successBillet" component={SuccessBillet} />
          <Stack.Screen name="successCC" component={SuccessCC} />
          <Stack.Screen name="address" component={Address} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default StoreFlow;
