import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      isSubmit: false,
    };
  }

  render() {
    const { parent, heading, input } = styles;

    const usernameHandler = text => {
      this.setUsername(text);
    };
    const passwordHandler = text => {
      this.setPassword(text);
    };

    // const authenticate = async () => {
    //   axios
    //     .post(
    //       'http://172.16.1.13:5000/api/users',
    //       JSON.stringify({
    //         username: this.username,
    //         password: this.password,
    //       }),
    //     )
    //     .then(response => {
    //       console.log(response);
    //       this.isSubmit(false);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // };

    return (
      <View stlye={parent}>
        <Text style={heading}>Login into the ap</Text>
        <TextInput
          style={input}
          placeholder={'Username'}
          onChangeText={usernameHandler}
          autoCapitalize="none"
        />
        <TextInput
          style={input}
          secureTextEntry={true}
          placeholder={'Password'}
          onChangeText={passwordHandler}
        />

        {/* <Button title={'Login'} onPress={() => authenticate(true)} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#dddddd',
    borderWidth: 1,
  },
});

export default Register;
