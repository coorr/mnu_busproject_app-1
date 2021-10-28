/* eslint-disable no-alert */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Dimensions,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import qr_scanner_128 from '../../assets/image/qr_scanner_128.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QuestionMark from '../../assets/image/question-mark.png';
import stamp from '../../assets/image/stamp.png';

class ConfirmScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: true,
      usercheck: false,
      data: [],
      route_type: 1, // 등교 - 0 / 하교 - 1
    };
    this.closeActivityIndicator();
  }
  // componentDidMount(),componentDidUpdate()

  componentDidMount() {
    this.reserve_check();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.route_type !== this.state.route_type) {
      this.reserve_check();
    }
    if (this.props.route.params?.result !== undefined) {
      this.notifyMessage('인증되었습니다.');
    }
  }

  notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          animating: false,
        }),
      1000, //1초 로딩바
    );

  reserve_check = async () => {
    try {
      // 예약내역에 유저가 있는지 체크하는 함수.
      const { uid } = this.props.route.params;
      await fetch('http://121.149.180.144:5000/api/reserve_check', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          route_type: this.state.route_type,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            var reserve = JSON.parse(res.reserve);

            this.setState({
              data: reserve[0],
              usercheck: true, // 예매 없음 false에서 -> true으로 변환
            });
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

      await fetch('http://121.149.180.144:5000/api/reserve_delete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          start_date: this.state.data.start_date,
          route_type: this.state.data.route_type,
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

  goAlert = () => {
    if (this.state.data.status === 0) {
      Alert.alert(
        '예매 취소하시겠습니까?',
        '  ',
        [
          {
            text: '아니오', // 버튼 제목
            onPress: () => console.log('아니요'), //onPress 이벤트시 콘솔창에 로그를 찍는다
            style: 'cancel',
          },
          {
            text: '예',
            onPress: () => {
              this.reserve_delete();
            },
          }, //버튼 제목
          // 이벤트 발생시 로그를 찍는다
        ],
        { cancelable: false },
      );
    } else {
      alert('출발 1시간 전에는 취소할 수 없습니다.');
    }
  };

  render() {
    const { uid, uname, dept, stdnum } = this.props.route.params;
    const animating = this.state.animating;
    return (
      <View style={styles.contain}>
        <ActivityIndicator
          pointerEvents={'none'} // 로딩시 터치금지
          animating={animating}
          color="#bc2b78"
          size="large"
          style={styles.activityIndicator}
        />
        <View style={styles.route_selector}>
          <View
            style={
              this.state.route_type === 0
                ? styles.route_ButtonArea_on
                : styles.route_ButtonArea_off
            }
          >
            <TouchableOpacity
              onPress={() => {
                if (this.state.route_type !== 0) {
                  // alert('테스트 기간은 하교만 이용 가능합니다.');
                  this.setState({
                    route_type: 0,
                    usercheck: false,
                  });
                }
              }}
            >
              <Text
                style={
                  this.state.route_type === 0
                    ? styles.route_selector_text_on
                    : styles.route_selector_text_off
                }
              >
                등교
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={
              this.state.route_type === 1
                ? styles.route_ButtonArea_on
                : styles.route_ButtonArea_off
            }
          >
            <TouchableOpacity
              onPress={() => {
                if (this.state.route_type !== 1) {
                  this.setState({
                    route_type: 1,
                    usercheck: false,
                  });
                }
              }}
            >
              <Text
                style={
                  this.state.route_type === 1
                    ? styles.route_selector_text_on
                    : styles.route_selector_text_off
                }
              >
                하교
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* &&패턴 앞 조건이 참 이면 && 뒤 조건 반환 */}
        {this.state.data.status === 3 && (
          <View style={styles.frontimagebox}>
            <Image
              source={stamp}
              resizeMode="contain"
              style={styles.frontimage}
            />
          </View>
        )}
        {this.state.usercheck === false ? (
          <View style={styles.containers}>
            <View style={styles.ImageArea}>
              <Image source={QuestionMark} style={styles.QuestionMark} />
            </View>
            <View style={styles.TextArea}>
              <View style={styles.TextBox}>
                <Text style={styles.TextStyle}>예매 내역이 없습니다.</Text>
              </View>
            </View>
          </View>
        ) : (
          // false일 경우 예매 있음
          <View style={styles.start_date}>
            <View style={styles.start_date_Area}>
              <View style={styles.start_date_Box}>
                <Text style={styles.start_date_text}>
                  {this.state.data.start_date}
                  {'\b\b\b'}
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

                <View style={styles.RoadSeat}>
                  <Text style={styles.RoadStart}>좌석번호</Text>
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
                <View style={styles.localBox}>
                  <Text style={styles.local_StartPoint}>
                    {this.state.data.reserve_seat}
                  </Text>
                </View>
              </View>

              <View style={styles.qrcodeContainer}>
                <View style={styles.qrcodeHeader}>
                  <Text style={styles.qrcodeText}>QR-CODE 인증</Text>
                </View>
                <View style={styles.qrcodeArea}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ScanScreen', {
                        route_type: this.state.data.route_type,
                        local: this.state.data.local, // 출발 지역 :광주 , 목포
                        start_data: this.state.data.start_point, // 선택 노선 정보
                        end_data: this.state.data.end_point, //도착 목적지 정보
                        start_time: this.state.data.start_time,
                        date: this.state.data.start_date,

                        //유저정보 전달
                        uid: uid,
                        uname: uname,
                        dept: dept,
                        stdnum: stdnum,
                      });
                    }}
                  >
                    <Image source={qr_scanner_128} style={styles.qrcode} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.middleContainer}>
              <View style={styles.middleArea}>
                <Text style={styles.middleText}>예약자 정보 </Text>
              </View>
              <View style={styles.middleArea}>
                <Text style={styles.middleText}>ID :</Text>
                <Text style={styles.middleTextTwo}>{uid}</Text>
              </View>
              <View style={styles.middleArea}>
                <Text style={styles.middleText}>학과 :</Text>
                <Text style={styles.middleTextTwo}>{dept}</Text>
              </View>
              <View style={styles.middleArea}>
                <Text style={styles.middleText}>학번 :</Text>
                <Text style={styles.middleTextTwo}>{stdnum}</Text>
              </View>
              <View style={styles.middleArea}>
                <Text style={styles.middleText}>이름 :</Text>
                <Text style={styles.middleTextTwo}>{uname}</Text>
              </View>
              {/* <View style={styles.middleArea}>
                <Text style={styles.middleText}>승차홈</Text>
                <Text style={styles.middleTextThree}>3번</Text>
              </View> */}
            </View>

            <View style={styles.BtnContainer}>
              <View style={styles.BtnCancelArea1}>
                <TouchableOpacity
                  style={styles.touchbox}
                  onPress={() => {
                    this.goAlert();
                  }}
                >
                  <View style={styles.BtnCancelBox}>
                    <Text style={styles.BtnCancleText}>예매 취소</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.BtnCancelArea2}>
                <TouchableOpacity
                  style={styles.touchbox}
                  onPress={() => {
                    //  0,1 (미탑승) 상태에서만 좌석 변경이 가능하다.
                    if (this.state.data.status < 2) {
                      this.props.navigation.navigate('RouteResult', {
                        //예매정보 전달
                        route_type: this.state.data.route_type,
                        local: this.state.data.local, // 출발 지역 :광주 , 목포
                        start_data: this.state.data.start_point, // 선택 노선 정보
                        end_data: this.state.data.end_point, //도착 목적지 정보
                        start_time: this.state.data.start_time,
                        date: this.state.data.start_date,

                        //유저정보 전달
                        uid: uid,
                        uname: uname,
                        dept: dept,
                        stdnum: stdnum,
                      });
                    } else {
                      alert('탑승 후에는 좌석을 변경할 수 없습니다.');
                    }
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
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    bottom: '50%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  route_selector: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
  },
  route_ButtonArea_on: {
    backgroundColor: '#00a000',
    width: '50%',
    height: '100%',
    borderRightWidth: 0.2,
  },
  route_ButtonArea_off: {
    backgroundColor: '#cccccc',
    width: '50%',
    height: '100%',
    borderRightWidth: 0.2,
  },

  route_selector_text_on: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    fontSize: 20,
    height: '100%',
  },
  route_selector_text_off: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    fontSize: 20,
    height: '100%',
  },

  container: { flex: 1, justifyContent: 'space-around' },
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    width: '25%',
    // borderWidth: 1,
    marginLeft: '2%',
  },
  RoadCircleStart: {
    marginTop: '5%',
    width: '70%',
    flex: 1,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RoadSeat: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },

  RoadStart: { fontSize: 15, color: 'gray', fontWeight: 'bold' },

  localArea: { height: '100%', width: '45%' },
  localBox: {
    height: '25%',
    width: '70%',
    flex: 1,
    marginTop: '5%',
    marginLeft: '5%',
  },
  local_StartPoint: { fontWeight: 'bold', fontSize: 13 },

  // qrcodeArea: { width: '100%', height: '100%', borderWidth: 1 },
  qrcodeContainer: {
    flexDirection: 'column',
    height: '100%',
    width: '30%',
    borderLeftWidth: 0.2,
    borderColor: 'gray',
  },

  qrcodeHeader: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ced4da',
    backgroundColor: '#6495ED',
  },
  qrcodeText: { fontWeight: 'bold', color: 'white' },

  qrcodeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrtouch: { flex: 1, backgroundColor: 'red' },
  qrcode: {
    alignSelf: 'center',
    height: '90%',
    resizeMode: 'contain',
  },

  middleContainer: {
    width: '100%',
    height: '20%',
    marginTop: '5%',
    marginBottom: '5%',
    paddingLeft: '5%',
    paddingBottom: '5%',
    borderBottomWidth: 0.2,
    borderColor: 'gray',
  },
  middleArea: {
    width: '80%',
    height: '20%',
    flexDirection: 'row',
  },
  middleText: { fontSize: 15, color: 'gray' },
  middleTextTwo: { marginLeft: '5%', fontWeight: 'bold' },
  middleTextThree: { marginLeft: '9%', fontWeight: 'bold' },

  BtnContainer: { width: '100%', height: '10%', flexDirection: 'row' },
  BtnCancelArea1: {
    width: '44%',
    height: '100%',
    marginLeft: '4%',
    marginRight: '2%',
    backgroundColor: '#5B79ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  BtnCancelArea2: {
    width: '44%',
    height: '100%',
    marginRight: '4%',
    marginLeft: '2%',

    backgroundColor: '#5B79ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  BtnCancelBox: {
    flex: 1,
    justifyContent: 'center',
  },
  touchbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2,
    height: '100%',
  },
  BtnCancleText: {
    color: 'white',
    fontSize: 18,
  },
  frontimagebox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  frontimage: {
    marginBottom: Dimensions.get('window').height / 3.5,
    width: '90%',
    height: '100%',
  },
});

export default ConfirmScreen;
