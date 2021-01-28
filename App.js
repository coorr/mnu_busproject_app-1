/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
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
// import Icon from 'react-native-vector-icons/dist/Ionicons';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';

import {
  createDrawerNavigator,
  // DrawerContentScrollView,
  // DrawerItemList,
  // DrawerItem,
} from '@react-navigation/drawer';

import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreen from './src/LoginScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
