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
  Switch,
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';

class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = { hidePassword: true };
  }
  state = {
    isOnDefaultToggleSwitch: true,
    isOnLargeToggleSwitch: false,
    isOnBlueToggleSwitch: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formArea}>
          <TextInput style={styles.TextFrom} placeholder={'학번'} />
        </View>
        <View style={styles.TextFrom2}>
          <TextInput
            style={styles.TextFrom}
            placeholder={'통합 패스워드'}
            secureTextEntry={this.state.hidePassword}
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.buttonFrom}
            onPress={() => {
              this.props.navigation.navigate('Main');
            }}
          >
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.autoLoginFrom}>
          <View style={styles.autoLoginArea}>
            <ToggleSwitch
              label="자동로그인"
              labelStyle={{ color: '#7F7F7F' }}
              isOn={this.state.isOnDefaultToggleSwitch}
              onToggle={isOnDefaultToggleSwitch => {
                this.setState({ isOnDefaultToggleSwitch });
                this.onToggle(isOnDefaultToggleSwitch);
              }}
            />
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
    marginTop: '3%',
  },
  buttonArea: {
    width: '100%',
    height: 50,
    // borderWidth: 0.2,
    marginTop: 12,
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
    // borderWidth: 0.2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    // borderWidth: 1,
  },
  autoLoginFrom: {
    width: '100%',
    height: 40,
    // borderWidth: 0.5,
  },
  autoLoginArea: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginLeft: '60%',
  },
});

export default LoginScreen;
