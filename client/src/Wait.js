import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

class Wait extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Wait</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#768FE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Wait;
