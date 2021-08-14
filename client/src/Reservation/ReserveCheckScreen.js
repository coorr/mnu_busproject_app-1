/* eslint-disable no-alert */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

class ReserveCheckScreen extends Component {
  constructor(props) {
    super(props);
  }

  sendSeatData = async () => {
    try {
      const {
        start_data,
        route_data,
        end_data,
        start_time,
        date,
        seat_number,
        uid,
        uname,
        dept,
        stdnum,
      } = this.props.route.params;

      await fetch('http://172.16.2.171:5000/api/reserve_input', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: start_data,
          end: end_data,
          reserve_seat: seat_number,
          route: route_data,
          start_time: start_time,
          start_date: date,
          uid: uid,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            this.props.navigation.reset({
              routes: [
                {
                  name: 'MainScreenView',
                  params: {
                    uid: uid,
                    uname: uname,
                    dept: dept,
                    stdnum: stdnum,
                  },
                },
              ],
            });
          } else {
            alert(res.message);
          }
        })

        .done();
    } catch (err) {
      console.log(err);
    }
  };

  ModifySeatData = async () => {
    try {
      const { route_data, date, seat_number, uid, uname, dept, stdnum } =
        this.props.route.params;
      console.log(11);

      await fetch('http://172.16.2.171:5000/api/reserve_modify', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reserve_seat: seat_number,
          route: route_data, // 노선정보
          start_date: date,
          uid: uid,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            console.log(1111);
            this.props.navigation.reset({
              routes: [
                {
                  name: 'MainScreenView',
                  params: {
                    uid: uid,
                    uname: uname,
                    dept: dept,
                    stdnum: stdnum,
                  },
                },
              ],
            });
          } else {
            alert(res.reserve);
          }
        })

        .done();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      start_data,
      route_data,
      end_data,
      date,
      seat_number,
      uname,
      dept,
      stdnum,
    } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.boxlist}>
          <View style={styles.header_area}>
            <Text style={styles.header_areaText}>승차권 예매</Text>
          </View>
          <View style={styles.topbox}>
            <View style={styles.leftstart_area}>
              <Text style={styles.topboxtexttiny}>출발</Text>
              <Text style={styles.topboxtext}>{start_data}</Text>
            </View>
            <View style={styles.rightend_area}>
              <Text style={styles.topboxtexttiny}>도착</Text>
              <Text style={styles.topboxtext}>{end_data}</Text>
            </View>
          </View>
          <View style={styles.middlebox}>
            <View style={styles.box_area}>
              <Text style={styles.middleboxtexttiny}>노선</Text>
              <Text style={styles.middleboxtext}>{route_data}</Text>
            </View>
            <View style={styles.box_area}>
              <Text style={styles.middleboxtexttiny}>좌석번호</Text>
              <Text style={styles.middleboxtext}>{seat_number}</Text>
            </View>
            <View style={styles.box_area}>
              <Text style={styles.middleboxtexttiny}>출발일</Text>
              <Text style={styles.middleboxtext}>{date}</Text>
            </View>
            <View style={styles.boxuser_area}>
              <Text style={styles.middleboxusertext}>{dept}</Text>
              <Text style={styles.middleboxusertext}>{stdnum}</Text>
              <Text style={styles.middleboxusertext}>{uname}</Text>
            </View>
          </View>
        </View>
        <View style={styles.checkbutton}>
          <TouchableOpacity
            style={styles.checkarea}
            onPress={() => {
              //처음 예약이면 예약하기 sql insert 시행
              if (this.props.route.params.usercheck === false) {
                this.sendSeatData();
              } else {
                //예약상태가 true일 경우에 시행.
                this.ModifySeatData();
              }
            }}
          >
            <Text style={styles.checktext}>예약하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  boxlist: {
    marginTop: '15%',
    width: '90%',
    height: '70%',
    borderRadius: 20,
    borderColor: '#dbdbdb',
    borderWidth: 3,
  },
  header_area: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B79ED',
  },
  header_areaText: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
  },
  topbox: {
    flexDirection: 'row',
    height: '20%',
    width: '100%',
  },
  leftstart_area: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#dbdbdb',
  },
  rightend_area: {
    flex: 1,
    alignItems: 'center',
  },
  topboxtexttiny: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  topboxtext: {
    fontSize: 20,
    fontWeight: '300',
  },
  middlebox: {
    width: '100%',
    flex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    //marginBottom:'1%',
  },
  box_area: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
    flex: 1,
    paddingLeft: 25,
    justifyContent: 'center',
  },

  middleboxtext: {
    fontSize: 20,
    fontWeight: '500',
  },
  middleboxtexttiny: {
    fontSize: 20,
    fontWeight: '400',
  },
  boxuser_area: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleboxusertext: {
    flex: 1,
    textAlign: 'center',
  },
  checkbutton: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '90%',
    backgroundColor: '#5B79ED',
    borderRadius: 15,
  },
  checkarea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  checktext: {
    color: 'white',
    fontSize: 20,
  },
});

export default ReserveCheckScreen;
