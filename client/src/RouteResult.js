import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Linking,
  Switch,
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import refresh from '../assets/image/refresh.png';
import RouteLogo from '../assets/image/RouteLogo.png';

class RouteResult extends Component {
  render() {
    return (
      <View style={styles.Container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: 'white' },
  
});

export default RouteResult;