import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, Linking } from 'react-native';
import {
  NavigationContainer,
  // DrawerActions,
  // useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {
  createDrawerNavigator,
  // DrawerContentScrollView,
  // DrawerItemList,
  // DrawerItem,
} from '@react-navigation/drawer';

import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreen from './src/LoginScreen';
import Main from './src/MainScreen';
import RouteReserve from './src/RouteReserve';
import RouteResult from './src/RouteResult';
import NoticeDetailScreen from './src/NoticeDetailScreen';
import NoticeScreen from './src/NoticeScreen';
import Register from './src/register';
import RoadScreen from './src/RoadScreen';
import RoadDetail from './src/RoadDetail';

// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';
// import Reducer from './src/reducer/index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk,
// )(createStore);

class App extends Component {
  render() {
    return (
      // <Provider store={createStoreWithMiddleware(Reducer)}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="RouteReserve"
            component={RouteReserve}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '예매',
            }}
          />
          <Stack.Screen
            name="RouteResult"
            component={RouteResult}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTitle: '조회결과',
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="RoadScreen"
            component={RoadScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '노선운행/정보',
            }}
          />
          <Stack.Screen
            name="RoadDetail"
            component={RoadDetail}
            options={{ headerShown: false }}
          />

          {/* 공지사항 */}
          <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
          <Stack.Screen
            name="NoticeDetailScreen"
            component={NoticeDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
