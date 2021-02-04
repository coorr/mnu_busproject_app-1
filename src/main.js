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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';

import busIcon from '../assets/image/bus.png';
import nextButton from '../assets/image/nextButton.png';
import checkGreen from '../assets/image/checkGreen.png';
import questionBlack from '../assets/image/question-mark.png';
import notice from '../assets/image/notice.png';
import information from '../assets/image/information.png';
import user from '../assets/image/user.png';

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.reservationFrom}>
          <TouchableOpacity
            style={styles.reservationArea}
            onPress={() => {
              this.props.navigation.navigate('RouteReserve');
            }}
          >
            <View style={styles.box}>
              <Text style={styles.circle}>
                <Image source={busIcon} style={styles.busIcon} />
              </Text>
              <View style={styles.busTextFrom}>
                <Text style={styles.busText}>스쿨버스 예매</Text>
              </View>
              <Image
                source={nextButton}
                style={{ height: 25, width: 40, marginTop: 60 }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.cancelForm}>
          <TouchableOpacity style={styles.cancelArea}>
            <View style={styles.box}>
              <Text style={styles.circle}>
                <Image source={checkGreen} style={styles.busIcon} />
              </Text>
              <View style={styles.busTextFrom}>
                <Text style={styles.busText}>예매확인/취소</Text>
              </View>
              <Image
                source={nextButton}
                style={{ height: 25, width: 40, marginTop: 60 }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.informationFrom}>
          <TouchableOpacity style={styles.informationArea}>
            <View style={styles.box}>
              <Text style={styles.circleInformation}>
                <Image
                  source={questionBlack}
                  style={styles.busIconInformation}
                />
              </Text>
              <View style={styles.busTextFrom}>
                <Text style={styles.busText}>노선운행/정보</Text>
              </View>
              <Image
                source={nextButton}
                style={{ height: 25, width: 40, marginTop: 60 }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.TabContainer}>
          <View style={styles.TabAreaOne}>
            <TouchableOpacity
              style={styles.TabBoxOne}
              onPress={() => {
                this.props.navigation.navigate('TabQuestion');
              }}
            >
              <Image source={information} style={styles.TabOneImage} />
              <Text style={styles.TabOneText}>이용안내/문의</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.TabAreaTwo}>
            <TouchableOpacity
              style={styles.TabBoxTwo}
              onPress={() => {
                this.props.navigation.navigate('NoticeScreen');
              }}
            >
              <Image source={notice} style={styles.TabTwoImage} />
              <Text style={styles.TabTwoText}>공지사항</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.TabAreaThree}>
            <TouchableOpacity
              style={styles.TabBoxThree}
              onPress={() => {
                this.props.navigation.navigate('TabMyPage');
              }}
            >
              <Image source={user} style={styles.TabThreeImage} />
              <Text style={styles.TabThreeText}>마이페이지</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
  reservationFrom: { width: '100%', height: '29%' },
  reservationArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#768FE4',
  },
  box: { flexDirection: 'row', alignItems: 'center' },
  circle: {
    // borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    marginTop: '14%',
    marginLeft: '5%',
    paddingLeft: '2.5%',
  },
  busIcon: { width: 75, height: 60 },

  busTextFrom: {
    // borderWidth: 1,
    width: '50%',
    height: '30%',
    marginTop: 60,
    marginLeft: 30,
    justifyContent: 'center',
  },
  busText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    // borderWidth: 1,
    justifyContent: 'space-between',
  },

  cancelForm: { width: '100%', height: '29%' },
  cancelArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#5A7BE6',
  },

  informationFrom: { width: '100%', height: '29%' },
  informationArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#456AED',
  },
  circleInformation: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    marginTop: '14%',
    marginLeft: '5%',
    paddingLeft: '6%',
    paddingTop: '1%',
  },
  busIconInformation: { width: 50, height: 50 },

  TabContainer: { width: '100%', height: '100%', flexDirection: 'row' },
  TabAreaOne: { width: '33.3%', height: '100%' },
  TabBoxOne: { width: '100%', height: '100%' },
  TabOneImage: { width: 60, height: 60, marginLeft: 30, marginTop: 8 },
  TabOneText: {
    marginTop: 3,
    marginLeft: 10,
    fontSize: 18,
  },

  TabAreaTwo: { width: '33.3%', height: '100%' },
  TabBoxTwo: { width: '100%', height: '100%' },
  TabTwoImage: { width: 60, height: 60, marginLeft: '27%', marginTop: 6 },
  TabTwoText: {
    marginTop: 3,
    marginLeft: 35,
    fontSize: 18,
  },

  TabAreaThree: { width: '33.3%', height: '100%' },
  TabBoxThree: { width: '100%', height: '100%' },
  TabThreeImage: { width: 60, height: 60, marginLeft: '29%', marginTop: 6 },
  TabThreeText: {
    marginTop: 3,
    marginLeft: 28,
    fontSize: 18,
  },
});

export default Main;
