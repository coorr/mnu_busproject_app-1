import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  NavigationContainer,
  // DrawerActions,
  // useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/LoginScreen';
import MainScreenView from './src/MainScreen';
import QuestionsScreen from './src/QuestionsScreen';

import RouteReserve from './src/Reservation/RouteReserve';
import RouteResult from './src/Reservation/RouteResult';
import ReserveCheckScreen from './src/Reservation/ReserveCheckScreen';

import NoticeDetailScreen from './src/Board/NoticeDetailScreen';
import NoticeScreen from './src/Board/NoticeScreen';
import RoadScreen from './src/Road/RoadScreen';
import RoadDetail from './src/Road/RoadDetail';
import Wait from './src/Wait';
import ConfirmScreen from './src/Confirm/ConfirmScreen';

import SettingScreen from './src/User/SettingScreen';
import PolicyScreen from './src/User/PolicyScreen';
import PhistoryScreen from './src/User/PhistoryScreen';
import RhistoryScreen from './src/User/RhistoryScreen';
// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';
// import Reducer from './src/reducer/index';

const Stack = createStackNavigator();

// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk,Wait
// )(createStore);

class App extends Component {
  render() {
    return (
      // <Provider store={createStoreWithMiddleware(Reducer)}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
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
              headerTitle: 'FAQ',
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
          <Stack.Screen
            name="ConfirmScreen"
            component={ConfirmScreen}
            options={{
              headerStyle: {
                backgroundColor: '#5B79ED',
              },
              headerTintColor: 'white',
              headerTitle: '예매 확인',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
