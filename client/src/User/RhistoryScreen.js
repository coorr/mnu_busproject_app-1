import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

class PolicyScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, writer, udate, content } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text>123</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PolicyScreen;
