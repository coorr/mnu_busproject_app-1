/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
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
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formArea}>
          <TextInput style={styles.TextFrom} placeholder={'학번'} />
        </View>
        <View style={styles.TextFrom2}>
          <TextInput style={styles.TextFrom} placeholder={'통합 패스워드'} />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.buttonFrom}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.autoLoginFrom}>
          <View style={styles.autoLoginArea}>
            <Text style={styles.autoLoginText}>자동로그인</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  formArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    width: '100%',
    paddingBottom: '3%',
    marginTop: '6%',
  },
  TextFrom: { fontSize: 17, marginTop: 5, padding: 5, marginLeft: 10 },
  TextFrom2: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    width: '100%',
    paddingBottom: '3%',
    marginTop: 10,
  },
  buttonArea: {
    width: '100%',
    height: '8%',
    // borderWidth: 0.2,
    marginTop: 10,
  },
  buttonFrom: {
    backgroundColor: '#5C72E1',
    borderColor: '#5C72E1',
    borderWidth: 1,
    borderRadius: 5,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  autoLoginFrom: {
    width: '100%',
    height: '8%',
    // borderWidth: 0.5,
  },
  autoLoginArea: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginLeft: '60%',
  },
  autoLoginText: {
    color: '#7F7F7F',
    fontSize: 13,
  },
});

export default LoginScreen;
