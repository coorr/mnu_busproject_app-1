import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';


class ReserveCheckScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { start_data,route_data,end_data,date,seat_number,uid, uname, dept, stdnum } = this.props.route.params;

    return (
        <View style={styles.container}>
          <Text>{start_data}</Text>
          <Text>{route_data}</Text>
          <Text>{end_data}</Text>
          <Text>{date}</Text>
          <Text>{seat_number}</Text>
          <Text>{uid}</Text>
          <Text>{uname}</Text>
          <Text>{dept}</Text>
          <Text>{stdnum}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  }
});

export default ReserveCheckScreen;
