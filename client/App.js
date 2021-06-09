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
import MainScreenView from './src/MainScreen';
import RouteReserve from './src/RouteReserve';
import RouteResult from './src/RouteResult';
import ReserveCheckScreen from './src/ReserveCheckScreen';
import NoticeDetailScreen from './src/NoticeDetailScreen';
import NoticeScreen from './src/NoticeScreen';
import RoadScreen from './src/RoadScreen';
import RoadDetail from './src/RoadDetail';
import Wait from './src/Wait';
import SettingScreen from './src/SettingScreen';
import QuestionsScreen from './src/QuestionsScreen';
import PolicyScreen from './src/PolicyScreen';
import PhistoryScreen from './src/PhistoryScreen';
import RhistoryScreen from './src/RhistoryScreen';
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
//   ReduxThunk,Wait
// )(createStore);

class App extends Component {
  render() {
    return (
      // <Provider store={createStoreWithMiddleware(Reducer)}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          {/* <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
            }}
          /> */}
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
            name="MainScreenView"
            component={MainScreenView}
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
              headerTintColor: 'white',
              headerTitle: '좌석선택',
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
          <Stack.Screen
            name="QuestionsScreen"
            component={QuestionsScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTitle: '이용문의/안내',
              headerTintColor: 'white',
            }}
          />

          {/* 공지사항 */}
          <Stack.Screen
            name="NoticeScreen"
            component={NoticeScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '공지사항',
            }}
          />

          <Stack.Screen
            name="NoticeDetailScreen"
            component={NoticeDetailScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '공지내용',
            }}
          />

          <Stack.Screen
            name="Wait"
            component={Wait}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '내 정보',
            }}
          /> 
          <Stack.Screen
            name="ReserveCheckScreen"
            component={ReserveCheckScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              
              headerTitle: '예약 정보',
            }}
          /> 
          <Stack.Screen
            name="PolicyScreen"
            component={PolicyScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '이용정책',
            }}
          />
          <Stack.Screen
            name="RhistoryScreen"
            component={RhistoryScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '이용내역 확인',
            }}
          />
          <Stack.Screen
            name="PhistoryScreen"
            component={PhistoryScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '페널티 내역 확인',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
