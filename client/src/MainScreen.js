/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import busIcon from '../assets/image/bus.png';
import nextButton from '../assets/image/nextButton.png';
import check2 from '../assets/image/check2.png';
import questionBlack from '../assets/image/question-mark.png';
import notice from '../assets/image/notice.png';
import information from '../assets/image/information.png';
import user from '../assets/image/user.png';

class MainScreen extends Component {
  render() {
    const { uid, uname, dept, stdnum } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.reservationFrom}>
          <TouchableOpacity
            style={styles.reservationArea}
            onPress={() => {
              this.props.navigation.navigate('RouteReserve', {
                uid: uid,
                uname: uname,
                dept: dept,
                stdnum: stdnum,
              });
            }}
          >
            <View style={styles.box}>
              <View style={styles.circle}>
                <Image
                  source={busIcon}
                  style={styles.busIcon}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.busTextFrom}>
                <Text style={styles.busText}>스쿨버스 예매</Text>
              </View>
              <Image
                source={nextButton}
                style={{
                  width: '20%',
                  height: '20%',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.cancelForm}>
          <TouchableOpacity
            style={styles.cancelArea}
            onPress={() => {
              this.props.navigation.navigate('ConfirmScreen', {
                uid: uid,
                uname: uname,
                dept: dept,
                stdnum: stdnum,
              });
            }}
          > 
            <View style={styles.box}>
              <View style={styles.circle}>
                <Image
                  source={check2}
                  style={styles.busIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.busTextFrom}>
                <Text style={styles.busText}>예약확인/변경</Text>
              </View>
              <Image
                source={nextButton}
                style={{
                  width: '20%',
                  height: '20%',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.informationFrom}>
          <TouchableOpacity
            style={styles.informationArea}
            onPress={() => {
              this.props.navigation.navigate('RoadScreen');
            }}
          >
            <View style={styles.box}>
              <View style={styles.circle}>
                <Image
                  source={questionBlack}
                  style={styles.busIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.busTextFrom}>
                <Text style={styles.busText}>노선/운행정보</Text>
              </View>
              <Image
                source={nextButton}
                style={{
                  width: '20%',
                  height: '20%',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.TabContainer}>
          <View style={styles.TabAreaOne}>
            <TouchableOpacity
              style={styles.TabBoxOne}
              onPress={() => {
                this.props.navigation.navigate('QuestionsScreen');
              }}
            >
              <Image
                source={information}
                style={styles.TabOneImage}
                resizeMode="contain"
              />
              <Text style={styles.TabOneText}>이용안내/문의</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.TabAreaOne}>
            <TouchableOpacity
              style={styles.TabBoxOne}
              onPress={() => {
                this.props.navigation.navigate('NoticeScreen');
              }}
            >
              <Image
                source={notice}
                style={styles.TabOneImage}
                resizeMode="contain"
              />
              <Text style={styles.TabOneText}>공지사항</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.TabAreaOne}>
            <TouchableOpacity
              style={styles.TabBoxOne}
              onPress={() => {
                this.props.navigation.navigate('SettingScreen', {
                  uid: uid,
                  uname: uname,
                  dept: dept,
                  stdnum: stdnum,
                });
              }}
            >
              <Image
                source={user}
                style={styles.TabOneImage}
                resizeMode="contain"
              />
              <Text style={styles.TabOneText}>내 정보</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
  reservationFrom: { flex: 2 },
  reservationArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#768FE4',
  },
  box: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  circle: {
    marginLeft: '3%',
    marginRight: '1%',
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  busIcon: {
    alignSelf: 'center',
    flex: 1,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  busTextFrom: {
    flex: 3,
    // borderWidth: 1,
    width: '50%',
    justifyContent: 'center',
  },
  busText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    // borderWidth: 1,
    justifyContent: 'space-between',
  },

  cancelForm: { flex: 2 },
  cancelArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#5A7BE6',
  },

  informationFrom: { flex: 2 },
  informationArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#456AED',
  },

  TabContainer: { flex: 1, flexDirection: 'row' },
  TabAreaOne: { flex: 1, height: '100%' },
  TabBoxOne: { width: '100%', height: '100%', alignItems: 'center' },
  TabOneImage: {
    flex: 1,
    margin: '10%',
  },
  TabOneText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default MainScreen;
