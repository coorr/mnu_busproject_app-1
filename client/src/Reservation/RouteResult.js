/* eslint-disable no-alert */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import seat from '../../assets/image/seat.png';
import seat_gray from '../../assets/image/seat_gray.png';
import seat_green from '../../assets/image/seat_green.png';
import bus_door from '../../assets/image/bus_door.png';
import steering_wheel_icon from '../../assets/image/steering_wheel_icon.png';
import seat_background from '../../assets/image/seat_background.png';

let seats = [
  { id: 1, user: '' },
  { id: 2, user: '' },
  { id: 0, user: '' },
  { id: 3, user: '' },
  { id: 4, user: '' },
  { id: 5, user: '' },
  { id: 6, user: '' },
  { id: 0, user: '' },
  { id: 7, user: '' },
  { id: 8, user: '' },
  { id: 9, user: '' },
  { id: 10, user: '' },
  { id: 0, user: '' },
  { id: 11, user: '' },
  { id: 12, user: '' },
  { id: 13, user: '' },
  { id: 14, user: '' },
  { id: 0, user: '' },
  { id: 15, user: '' },
  { id: 16, user: '' },
  { id: 17, user: '' },
  { id: 18, user: '' },
  { id: 0, user: '' },
  { id: 19, user: '' },
  { id: 20, user: '' },
  { id: 21, user: '' },
  { id: 22, user: '' },
  { id: 0, user: '' },
  { id: 23, user: '' },
  { id: 24, user: '' },
  { id: 25, user: '' },
  { id: 26, user: '' },
  { id: 0, user: '' },
  { id: 27, user: '' },
  { id: 28, user: '' },
  { id: 29, user: '' },
  { id: 30, user: '' },
  { id: 0, user: '' },
  { id: 31, user: '' },
  { id: 32, user: '' },
  { id: 33, user: '' },
  { id: 34, user: '' },
  { id: 0, user: '' },
  { id: 35, user: '' },
  { id: 36, user: '' },
  { id: 37, user: '' },
  { id: 38, user: '' },
  { id: 0, user: '' },
  { id: 39, user: '' },
  { id: 40, user: '' },
  { id: 41, user: '' },
  { id: 42, user: '' },
  { id: 43, user: '' },
  { id: 44, user: '' },
  { id: 45, user: '' },
];

class RouteResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // seat 데이터 설정 0 : seat_background 출력 아니면 숫자 출력
      seat_number: -1, // 선택한 좌석 번호 저장
      usercheck: false, // false : 예약하기 / true : 변경하기
    };
  }

  getSeatData = async () => {
    const { route_data, date, uid } = this.props.route.params;

    await fetch('http://10.0.2.2:5000/api/reserve', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: route_data,
        start_date: date,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.success === true) {
          for (let index = 0; index < res.reserve.length; index++) {
            // let형은 재선언 불가능:메모리 재배치 불가능  , 재할당 : 메모리에 다른 값 덮어쓰기 가능.

            if (uid === res.reserve[index].uid) {
              // 기존의 회원과 같을 경우.
              this.setState({
                seat_number: res.reserve[index].reserve_seat,
                usercheck: true,
              });
            } else {
              seats[
                seats.findIndex(x => x.id === res.reserve[index].reserve_seat)
              ].user = res.reserve[index].uid;
              // findIndex에서 db와 일치하는 정보만 찾아서 let 형태의 seats 배열에 저장.
            }
          }
        }
      })
      .done();
  };

  sendSeatData = async () => {
    // RouteCheckScreen 으로 전송

    const { start_data, route_data, end_data, date, uid, uname, dept, stdnum } =
      this.props.route.params;

    this.props.navigation.navigate('ReserveCheckScreen', {
      //예약정보
      start_data: start_data, // 출발 지역 :광주 , 목포
      route_data: route_data, // 선택 노선 정보
      end_data: end_data,
      date: date,
      seat_number: this.state.seat_number,
      //예약자 정보
      uid: uid,
      uname: uname,
      dept: dept,
      stdnum: stdnum,
      //예약상태 정보
      usercheck: this.state.usercheck,
    });
  };

  getItemLayout(data, index) {
    return {
      length: styles.seatsize.height,
      offset: styles.seatsize.height * index,
      index,
    };
  }

  renderHeader = () => {
    return (
      <View style={styles.headerimage}>
        <Image source={steering_wheel_icon} />
        <Image source={bus_door} />
      </View>
    );
  };

  render() {
    this.getSeatData();
    const { route_data } = this.props.route.params;

    return (
      <View style={styles.Container}>
        <View style={styles.topbox}>
          <Text style={styles.start_point_text}>{route_data}</Text>
        </View>

        {/* // 버스 좌석이미지 반복출력 */}
        <View style={styles.boxlist}>
          <FlatList
            numColumns={5} // 배열 5줄 가운데 공백 출력
            keyExtractor={item => item.id}
            data={seats}
            renderItem={({ item }) => {
              if (item.user !== '') {
                // user 정보가 있을 경우 회색 리턴
                // user 정보가 있을 경우 회색 리턴
                return (
                  <View>
                    <Image source={seat_gray} style={styles.seatsize} />
                    <View style={styles.seatnumbox}>
                      <Text style={styles.seatnum}>{item.id}</Text>
                    </View>
                  </View>
                );
              }

              if (item.id === 0) {
                // 0이면 백라운드 이미지 출력 else 이면 숫자 출력 함수
                return (
                  <View>
                    <Image source={seat_background} style={styles.seatsize} />
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        seat_number: item.id,
                      });
                    }}
                  >
                    {this.state.seat_number === item.id ? (
                      <Image source={seat_green} style={styles.seatsize} />
                    ) : (
                      <Image source={seat} style={styles.seatsize} />
                    )}
                    <View style={styles.seatnumbox}>
                      <Text style={styles.seatnum}>{item.id}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
            getItemLayout={this.getItemLayout} // 좌석 이미지 고정 최적화
            ListHeaderComponent={this.renderHeader}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (this.state.seat_number !== -1) {
              this.sendSeatData();
            } else {
              alert('좌석을 선택해 주세요.');
            }
          }}
        >
          <View style={styles.buttonbox}>
            {this.state.usercheck === false ? (
              <Text style={styles.reservetext}>예약하기</Text>
            ) : (
              <Text style={styles.reservetext}>변경하기</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  //윗 부분(titlebox))
  topbox: {
    width: '100%',
    height: '10%',
    backgroundColor: '#5B79ED',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  start_point_text: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },

  // 아랫부분 박스
  boxlist: {
    width: '100%',
    height: '80%',
    borderColor: '#848484',
    borderWidth: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  //운전대 및 출입문
  headerimage: {
    paddingRight: '5%',
    paddingLeft: '5%', //운전대  위치 조정
    paddingTop: '3%', // 버스앞 대시보드
    paddingBottom: '5%', // 운전대 좌석거리두기
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  seatsize: {
    // 좌석 1개 크기
    margin: 1,
    width: 70,
    height: 70,
  },
  seatnumbox: {
    // 좌석번호 텍스트
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  seatnum: { fontSize: 20, fontWeight: '700' },
  buttonbox: {
    width: '100%',
    zIndex: 3,
    height: '47%', // 70하고 47% 비슷  폰 크기 달라지면 달라짐.
    backgroundColor: '#5B79ED',
    justifyContent: 'center',
  },

  reservetext: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },

  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RouteResult; // memorization
