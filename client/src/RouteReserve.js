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

class RouteReserve extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.SelectionContainer}>
          <View style={styles.StartButtonArea}>
            <TouchableOpacity style={styles.StartTouchButton}>
              <Text style={styles.StartButtonText}>출발지</Text>
              <Text style={styles.StartButtonInput}>선택</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.StartButtonArea}>
            <TouchableOpacity style={styles.StartTouchButton}>
              <Text style={styles.StartButtonText}>도착지</Text>
              <Text style={styles.StartButtonInput}>선택</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dateContatiner}>
          <TouchableOpacity style={styles.dateButtonArea}>
            <Text style={styles.StartButtonText}>가는날</Text>
            <Text style={styles.dateButtonInput}>선택</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.buttonFrom}
            onPress={() => {
              this.props.navigation.navigate('RouteResult');
            }}
          >
            <Text style={styles.buttonText}>조회하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: 'white' },
  SelectionContainer: {
    width: '100%',
    height: '25%',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
  },
  StartButtonArea: { width: '50%', height: '100%', borderRightWidth: 0.2 },
  StartTouchButton: {
    width: '90%',
    height: '90%',
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#EBECF0',
  },
  StartButtonText: { marginTop: 10, marginLeft: 10, fontSize: 18 },
  StartButtonInput: {
    marginTop: 30,
    marginLeft: 30,
    fontSize: 30,
    color: '#949494',
  },

  dateContatiner: { width: '100%', height: '15%', borderBottomWidth: 0.2 },
  dateButtonArea: {
    width: '95%',
    height: '85%',
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#EBECF0',
  },
  dateButtonInput: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    color: '#949494',
  },
  buttonArea: {
    width: '100%',
    height: 50,
    marginTop: 12,
  },
  buttonFrom: {
    backgroundColor: '#5C72E1',
    borderColor: '#5C72E1',
    borderWidth: 1,
    borderRadius: 5,
    height: '95%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});

export default RouteReserve;
