import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

import { TouchableOpacity } from 'react-native-gesture-handler';
import QuestionMark from '../../assets/image/question-mark.png';
import qrcode from '../../assets/image/qrcode.png';
import { timesSeries } from 'async';

class ConfirmScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usercheck: false,
      data: [],
    };
  }
  dateParse = start_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(start_date).format('YYYY-MM-DD');
    return ndate;
  };

  reserve_check = async (start, route, end, date) => {
    try {
      // 예약내역에 유저가 있는지 체크하는 함수.
      const { uid, uname, dept, stdnum } = this.props.route.params;
      await fetch('http://10.0.2.2:5000/api/reserve_check', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            this.setState({
              usercheck: !this.state.usercheck, // 예매 없음 true으로 변환
            });
          } else if (res.success === false) {
            var reserve = JSON.parse(res.reserve);
            this.setState({ data: reserve[0] });
          }
        })

        .done();
    } catch (err) {
      console.log(err);
    }
  };

  reserve_delete = async () => {
    try {
      const { uid } = this.props.route.params;
      console.log(uid);
      await fetch('http://10.0.2.2:5000/api/reserve_delete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === false) {
            this.props.navigation.navigate('MainScreenView');
          }
        })

        .done();
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.reserve_check();
    // this.reserve_delete();
  }

  goAlert = () => {
    Alert.alert(
      '취소하시겠습니까?',
      '  ',
      [
        {
          text: '아니요', // 버튼 제목
          onPress: () => console.log('아니라는데'), //onPress 이벤트시 콘솔창에 로그를 찍는다
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => {
            this.reserve_delete();
          },
        }, //버튼 제목
        // 이벤트 발생시 로그를 찍는다
      ],
      { cancelable: false },
    );
  };

  render() {
    console.log(this.state.usercheck);
    // console.log(this.reserve_delete);
    const { uid, uname, dept, stdnum } = this.props.route.params;

    return (
      <View style={styles.contain}>
        {this.state.usercheck === true ? (
          <View style={styles.containers}>
            <View style={styles.ImageArea}>
              <Image source={QuestionMark} style={styles.QuestionMark} />
            </View>
            <View style={styles.TextArea}>
              <View style={styles.TextBox}>
                <Text style={styles.TextStyle}>예매하신 내역이 없습니다.</Text>
              </View>
            </View>
          </View>
        ) : (
          // false일 경우 예매 있음
          <View style={styles.start_date}>
            <View style={styles.start_date_Area}>
              <View style={styles.start_date_Box}>
                <Text style={styles.start_date_text}>
                  {this.dateParse(this.state.data.start_date)}
                  {this.state.data.start_time}
                </Text>
              </View>
            </View>

            <View style={styles.RoadContainer}>
              <View style={styles.RoadBox}>
                <View style={styles.RoadCircleStart}>
                  <Text style={styles.RoadStart}>출발</Text>
                </View>

                <View style={styles.RoadCircleStart}>
                  <Text style={styles.RoadStart}>도착</Text>
                </View>
              </View>

              <View style={styles.localArea}>
                <View style={styles.localBox}>
                  <Text style={styles.local_StartPoint}>
                    {this.state.data.start_point}
                  </Text>
                </View>
                <View style={styles.localBox}>
                  <Text style={styles.local_StartPoint}>
                    {this.state.data.end_point}
                  </Text>
                </View>
              </View>

              <View style={styles.qrcodeContainer}>
                <TouchableOpacity style={styles.qrcodeArea}>
                  <View style={styles.qrcodeHeader}>
                    <Text style={styles.qrcodeText}>모바일 예매</Text>
                  </View>
                  <View style={styles.qrcodeView}>
                    <Image source={qrcode} style={styles.qrcode} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.middleContainer}>
              <View style={styles.middleArea}>
                <Text style={styles.middleText}>좌석번호</Text>
                <Text style={styles.middleTextTwo}>
                  {this.state.data.reserve_seat}번
                </Text>
              </View>
              <View style={styles.middleArea}>
                <Text style={styles.middleText}>승차홈</Text>
                <Text style={styles.middleTextThree}>3번</Text>
              </View>
            </View>

            <View style={styles.BtnContainer}>
              <View style={styles.BtnCancelArea}>
                <TouchableOpacity
                  style={styles.TouchBtnCancel}
                  onPress={() => {
                    this.goAlert();
                  }}
                >
                  <View style={styles.BtnCancelBox}>
                    <Text style={styles.BtnCancleText}>예매 취소</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.BtnCancelArea}>
                <TouchableOpacity
                  style={styles.TouchBtnCancel}
                  onPress={() => {
                    this.props.navigation.navigate('RouteResult', {
                      //예매정보 전달
                      start_data: this.state.data.local, // 출발 지역 :광주 , 목포
                      route_data: this.state.data.start_point, // 선택 노선 정보
                      end_data: this.state.data.end_point, //도착 목적지 정보
                      start_time: this.state.data.start_time,
                      date: this.dateParse(this.state.data.start_date),
                      //유저정보 전달
                      uid: uid,
                      uname: uname,
                      dept: dept,
                      stdnum: stdnum,
                    });
                  }}
                >
                  <View style={styles.BtnCancelBox}>
                    <Text style={styles.BtnCancleText}>예매 변경</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contain: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'space-around', alignItems: 'center' },
  containers: { width: '100%', height: '100%' },
  ImageArea: { width: '100%', height: '60%' },
  QuestionMark: {
    width: '60%',
    height: '60%',
    marginTop: '40%',
    marginLeft: '20%',
  },
  TextArea: { height: '10%', width: '100%' },
  TextBox: {
    width: '100%',
    height: '70%',
    marginLeft: '22%',
    marginTop: '3%',
  },
  TextStyle: { fontSize: 22, fontWeight: 'bold', color: '#868e96' },

  start_date: {
    flex: 1,
    width: '100%',
    height: '100%',
    // borderWidth: 2,
  },
  start_date_Area: { width: '100%', height: '6%', backgroundColor: '#dee2e6' },
  start_date_Box: { marginLeft: '3%', marginTop: '2%' },
  start_date_text: { fontSize: 15, fontWeight: 'bold' },

  RoadContainer: {
    width: '100%',
    height: '20%',
    // borderWidth: 2,
    flexDirection: 'row',
    // marginTop: '2%',
    borderBottomWidth: 1,
    borderColor: '#ced4da',
  },
  RoadBox: {
    height: '100%',
    width: '15%',
    // borderWidth: 1,
  },
  RoadCircleStart: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
    marginLeft: '20%',
  },
  RoadStart: { fontSize: 15, color: 'gray', fontWeight: 'bold' },

  localArea: { height: '100%', width: '58%' },
  localBox: { height: '25%', width: '70%', marginTop: '5.5%' },
  local_StartPoint: { fontWeight: 'bold', fontSize: 16 },

  // qrcodeArea: { width: '100%', height: '100%', borderWidth: 1 },
  qrcodeContainer: { height: '100%', width: '27%' },
  qrcodeArea: { width: '100%', height: '100%' },
  qrcodeHeader: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#6495ED',
  },
  qrcodeText: { fontWeight: 'bold', color: 'white' },
  qrcodeView: {
    width: '100%',
    height: '85%',
    borderWidth: 1,
    borderColor: '#ced4da',
    alignItems: 'center',
  },
  qrcode: { width: 60, height: 60, marginTop: '20%' },

  middleContainer: {
    width: '85%',
    height: '20%',
    marginLeft: '15%',
    marginTop: '2%',
    marginBottom: '10%',
  },
  middleArea: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
  },
  middleText: { fontSize: 15, color: 'gray' },
  middleTextTwo: { marginLeft: '5%', fontWeight: 'bold' },
  middleTextThree: { marginLeft: '9%', fontWeight: 'bold' },

  BtnContainer: { width: '100%', height: '10%', flexDirection: 'row' },
  BtnCancelArea: {
    width: '48%',
    height: '100%',
    backgroundColor: '#6495ED',
    marginRight: '4%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  TouchBtnCancel: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnCancelBox: {
    width: '40%',
    height: '40%',
  },
  BtnCancleText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default ConfirmScreen;
