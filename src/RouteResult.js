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
        <View style={styles.RouteArea}>
          <View style={styles.RouteBox}>
            <View style={styles.StartCircle}>
              <Text style={styles.StartCircleText}>출발</Text>
            </View>
            <Text style={styles.StartText}>광주</Text>
          </View>

          <View style={styles.RouteBox}>
            <View style={styles.StartCircle}>
              <Text style={styles.StartCircleText}>도착</Text>
            </View>
            <Text style={styles.StartText}>목포</Text>
          </View>
        </View>

        <View style={styles.dateArea}>
          <View style={styles.refreshArea}>
            <TouchableOpacity style={styles.refreshBox}>
              <Image source={refresh} style={styles.refreshImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.dateBoxFrom}>
            <Text style={styles.dateBox}>2021-02-03</Text>
          </View>
        </View>

        <View style={styles.supportBar}>
          <View style={styles.supportArea}>
            <Text style={styles.startText}>출발</Text>
          </View>
          <View style={styles.supportAreaTwo}>
            <Text style={styles.locationText}>지점</Text>
          </View>
          <View style={styles.supportAreaThree}>
            <Text style={styles.locationText}>잔여석</Text>
          </View>
          <View style={styles.supportAreaFour}>
            <Text style={styles.locationText}>노선</Text>
          </View>
        </View>

        <View style={styles.informationBar}>
          <TouchableOpacity style={styles.informationButton}>
            <View style={styles.informationArea}>
              <Text style={styles.schStartTime}>17:00</Text>
            </View>
            <View style={styles.informationAreaTwo}>
              <Text style={styles.schLocation}>금호지구 서구문화센터</Text>
            </View>
            <View style={styles.informationAreaThree}>
              <Text style={styles.schSeatNumber}>27</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.informationLogoButton}>
            <TouchableOpacity style={styles.informationAreaFour}>
              <Image source={RouteLogo} style={styles.RouteLogo} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.informationBar}>
          <TouchableOpacity style={styles.informationButton}>
            <View style={styles.informationArea}>
              <Text style={styles.schStartTime}>18:10</Text>
            </View>
            <View style={styles.informationAreaTwo}>
              <Text style={styles.schLocation}>첨단 응암공원승강장</Text>
            </View>
            <View style={styles.informationAreaThree}>
              <Text style={styles.schSeatNumber}>30</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.informationLogoButton}>
            <TouchableOpacity style={styles.informationAreaFour}>
              <Image source={RouteLogo} style={styles.RouteLogo} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: 'white' },
  RouteArea: {
    width: '100%',
    height: '12%',
    backgroundColor: '#5B79ED',
    borderTopWidth: 0.2,
    flexDirection: 'row',
  },
  RouteBox: { width: '50%', height: '100%' },
  StartCircle: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: 'white',
    marginLeft: '40%',
    marginTop: 5,
  },
  StartCircleText: {
    color: '#5B79ED',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 7,
    fontSize: 15,
  },
  StartText: {
    color: 'white',
    marginLeft: '39%',
    fontSize: 25,
  },

  dateArea: {
    width: '100%',
    height: '8%',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  refreshArea: { width: '13%', height: '100%' },
  refreshBox: { width: '100%', height: '100%' },
  refreshImage: {
    height: 40,
    width: 40,
    backgroundColor: '#D3D3D3',
    marginTop: 5,
    marginLeft: 5,
  },
  dateBoxFrom: {
    width: '74%',
    height: '100%',
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBox: { fontSize: 20, fontWeight: 'bold' },

  supportBar: {
    width: '100%',
    height: '4%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
  },
  supportArea: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: { color: '#555555' },
  locationBtn: { color: '#555555', marginLeft: 20 },
  supportAreaTwo: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportAreaThree: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportAreaFour: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  informationBar: {
    width: '87%',
    height: '8%',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  informationButton: { width: '100%', height: '100%', flexDirection: 'row' },
  informationArea: { height: '100%', width: '24%', justifyContent: 'center' },
  schStartTime: { fontWeight: 'bold', fontSize: 16, marginLeft: '18%' },
  informationAreaTwo: {
    height: '100%',
    width: '59%',
    justifyContent: 'center',
  },
  schLocation: { fontSize: 16, marginLeft: '5%' },
  informationAreaThree: {
    height: '100%',
    width: '17%',
    justifyContent: 'center',
  },
  schSeatNumber: { fontSize: 16, marginLeft: '30%' },
  informationLogoButton: {
    height: '100%',
    width: '100%',
    borderBottomWidth: 0.5,
    marginTop: 0.2,
  },
  informationAreaFour: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderLeftWidth: 0.5,
  },
  RouteLogo: { width: 25, height: 25, marginLeft: '3%' },
});

export default RouteResult;
