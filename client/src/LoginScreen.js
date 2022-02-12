/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import {config} from './config';
class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      username: '',
      password: '',
      userData: '',
      isOnDefaultToggleSwitch: false,
    };
    this.getData();
  }

  login = async () => {
    try {
      if (this.state.username !== '' && this.state.password !== '') {
        await fetch(`http://${config.api}/api/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
        })
          .then(response => response.json())
          .then(res => {
            if (res.success === true) {
              const user = JSON.parse(res.user);
              if (this.state.isOnDefaultToggleSwitch === true) {
                AsyncStorage.setItem(
                  'userData',
                  JSON.stringify({
                    userid: this.state.username,
                    userpassword: this.state.password,
                  }),
                );
              }

              this.setState({
                username: '',
                password: '',
              });
              this.props.navigation.reset({
                routes: [
                  {
                    name: 'MainScreenView',
                    params: {
                      uid: user.uid,
                      uname: user.uname,
                      dept: user.dept,
                      stdnum: user.stdnum,
                    },
                  },
                ],
              });
            } else {
              alert(res.message);
            }
          })
          .done();
      } else {
        alert('아디 비번 입력바람');
      }
    } catch (err) {
      console.log(err);
    }
  };

  getData = async () => {
    try {
      // eslint-disable-next-line handle-callback-err
      await AsyncStorage.getItem('userData', (err, result) => {
        const userInfo = JSON.parse(result); // 저장된 id/password userInfo 객체에 담는다.
        if (userInfo != null) {
          fetch(`http://${config.api}/api/users`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userInfo.userid,
              password: userInfo.userpassword,
            }),
          })
            .then(response => response.json())
            .then(res => {
              if (res.success === true) {
                const user = JSON.parse(res.user);

                this.props.navigation.reset({
                  routes: [
                    {
                      name: 'MainScreenView',
                      params: {
                        uid: user.uid,
                        uname: user.uname,
                        dept: user.dept,
                        stdnum: user.stdnum,
                      },
                    },
                  ],
                });
              } else {
                this.props.navigation.navigate('Login');
              }
            })
            .done();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  ToggleChange = () => {
    this.setState({
      isOnDefaultToggleSwitch: !this.state.isOnDefaultToggleSwitch,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formArea}>
          <TextInput
            style={styles.TextFrom}
            placeholder={'학번'}
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <View style={styles.TextFrom2}>
          <TextInput
            style={styles.TextFrom}
            placeholder={'통합 패스워드'}
            secureTextEntry={this.state.hidePassword}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.buttonFrom} onPress={this.login}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.autoLoginFrom}>
          <View style={styles.autoLoginArea}>
            <ToggleSwitch
              label="자동로그인"
              labelStyle={{ color: '#7F7F7F' }}
              isOn={this.state.isOnDefaultToggleSwitch}
              onToggle={this.ToggleChange}
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
