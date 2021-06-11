/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import check from '../../assets/image/check.png';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

class RouteReserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbutton: false, // 체크버튼 false일 경우 전체 뷰 true 일경우 리스트 뷰
      scrollleftvalue: '', // 왼쪽 리스트 선택 값
      scrollrightvalue: '', // 오른쪽 리스트 선택 값
      scrollcentervalue: '', // 노선 경로 번호
      checkstatus: false, // 버튼 체크 유무
      Rdata: [], // 왼쪽 리스트 값 저장.
      Ldata: [], //  오른쪽 리스트 값 저장.
      selectedStartDate: '',
      dateclick: false,
      start_time: '',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date, // utc 표준 형식으로 data 저장
      dateclick: !this.state.dateclick, // 날짜 선택 후 화면전환
    });
  }

  fetchDataleft = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/route_local');
      const Ldata = await response.json();
      this.setState({ data: Ldata });
    } catch (err) {
      console.log(err);
    }
  };

  fetchDataright = async () => {
    if (this.state.scrollleftvalue !== '') {
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://10.0.2.2:5000/api/routes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          local: this.state.scrollleftvalue,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            var routes = JSON.parse(res.route);
            this.setState({ Rdata: routes });
          } else {
            alert(res.route);
          }
        })

        .done();
    } else {
    }
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
            this.props.navigation.navigate('RouteResult', {
              //예매정보 전달
              start_data: start, // 출발 지역 :광주 , 목포
              route_data: route, // 선택 노선 정보
              end_data: end, //도착 목적지 정보
              start_time: this.state.start_time,
              date: date.format('YYYY-MM-DD'),
              //유저정보 전달
              uid: uid,
              uname: uname,
              dept: dept,
              stdnum: stdnum,
            });
          } else {
            alert(res.message); // 예약된 내역이 있습니다. 출력
          }
        })
        .done();
    } catch (err) {
      console.log(err);
    }
  };

  checkdata = (start, route, end, date) => {
    // 출발지 ,경로,예약날자
    // 아이디 , 이름, 학과,학번
    if (start !== '' && route !== '' && date !== '' && end !== '') {
      return this.reserve_check(start, route, end, date);
    } else {
      return alert('모든 항목을 선택해 주세요.'); //  경고 창 띄우기
    }
  };

  componentDidMount() {
    this.fetchDataleft();
  }

  componentDidUpdate() {
    this.fetchDataright();
  }

  render() {
    var d = new Date(); // d 객체생성
    const minDate = moment(d).format('YYYY-MM-DD'); // Today
    const maxDate = moment(d.getTime()).add('7', 'd').format('YYYY-MM-DD'); // d 객체에서 7일 후까지
    const { selectedStartDate } = this.state;
    const startDate =
      selectedStartDate !== ''
        ? selectedStartDate.format('YYYY - MM - DD (dddd)')
        : '';

    const customDayHeaderStylesCallback = ({ dayOfWeek, month, year }) => {
      // 년/월/주 헤더 타이틀 스타일

      switch (
        dayOfWeek //1:월요일~7:일요일까지
      ) {
        case 1:
          return {
            textStyle: {
              color: 'black',
              fontSize: 15,
              fontWeight: '400',
            },
          };
        case 2:
          return {
            textStyle: {
              color: 'black',
              fontSize: 15,
              fontWeight: '400',
            },
          };
        case 3:
          return {
            textStyle: {
              color: 'black',
              fontSize: 15,
              fontWeight: '400',
            },
          };
        case 4:
          return {
            textStyle: {
              color: 'black',
              fontSize: 15,
              fontWeight: '400',
            },
          };
        case 5:
          return {
            textStyle: {
              color: 'black',
              fontSize: 15,
              fontWeight: '400',
            },
          };
        case 6: // 토요일
          return {
            textStyle: {
              color: 'blue',
              fontSize: 15,
              fontWeight: '400',
            },
          };
        case 7: // 일요일
          return {
            textStyle: {
              color: 'red',
              fontSize: 15,
              fontWeight: '400',
            },
          };
      }
    };

    return (
      <View style={styles.Container}>
        <View style={styles.SelectionContainer}>
          <View style={styles.StartButtonArea}>
            <TouchableOpacity
              style={styles.StartTouchButton}
              onPress={() => {
                this.setState({
                  checkbutton: !this.state.checkbutton,
                });
              }}
            >
              <Text style={styles.StartButtonText}>출발지</Text>
              {this.state.scrollleftvalue !== '' ? (
                <Text style={styles.StartButtonInputchange}>
                  {this.state.scrollleftvalue}
                </Text>
              ) : (
                <Text style={styles.StartButtonInput}>선택</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.StartButtonArea}>
            <TouchableOpacity style={styles.StartTouchButton}>
              <Text style={styles.StartButtonText}>도착지</Text>
              {this.state.scrollrightvalue !== '' ? (
                <Text style={styles.StartButtonInputchange}>
                  {this.state.scrollrightvalue}
                </Text>
              ) : (
                <Text style={styles.StartButtonInput}>선택</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {this.state.checkbutton === false ? (
          <View style={styles.updown}>
            <View style={styles.dateContatiner}>
              <TouchableOpacity
                style={styles.dateButtonArea}
                onPress={() => {
                  this.setState({
                    dateclick: !this.state.dateclick,
                  });
                }}
              >
                <Text style={styles.StartButtonText}>가는날</Text>
                <Text style={styles.dateButtonInput}>{startDate}</Text>
              </TouchableOpacity>
            </View>

            {this.state.dateclick === true ? (
              <View>
                <ScrollView style={styles.CalendarContainer}>
                  <CalendarPicker
                    customDayHeaderStyles={customDayHeaderStylesCallback}
                    todayTextStyle={{ color: 'white' }}
                    todayBackgroundColor="#5B79ED"
                    onDateChange={this.onDateChange}
                    weekdays={['일', '월', '화', '수', '목', '금', '토']} //요일
                    months={[
                      '1월',
                      '2월',
                      '3월',
                      '4월',
                      '5월',
                      '6월',
                      '7월',
                      '8월',
                      '9월',
                      '10월',
                      '11월',
                      '12월',
                    ]} // 달
                    minDate={minDate} // 최소 선택가능일
                    maxDate={maxDate} // 최대 선택가능일
                    previousTitle="이전"
                    nextTitle="다음"
                  />
                </ScrollView>
              </View>
            ) : (
              <View style={styles.bottombox}>
                <View style={styles.dateContatiner}>
                  <TouchableOpacity style={styles.dateButtonArea}>
                    <Text style={styles.StartButtonText}>노선 이름</Text>
                    <Text style={styles.dateButtonInput}>
                      {this.state.scrollcentervalue}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonArea}>
                  <TouchableOpacity
                    style={styles.buttonFrom}
                    onPress={() => {
                      this.checkdata(
                        this.state.scrollleftvalue,
                        this.state.scrollcentervalue,
                        this.state.scrollrightvalue,
                        selectedStartDate,
                      ); // 선택 출발지, 선택 경로, 선택 도착지 , 예약일
                    }}
                  >
                    <Text style={styles.buttonText}>조회하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.updown}>
            <View style={styles.listheader}>
              <View style={styles.listleft}>
                <Text style={styles.listtext}>출발지역</Text>
              </View>
              <View style={styles.listright}>
                <Text style={styles.listtext}>출발지점</Text>
              </View>
            </View>

            <View style={styles.scrollarea}>
              <FlatList
                style={styles.scrollleft}
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ scrollrightvalue: '' });
                      if (this.state.scrollleftvalue === item.local) {
                        //기존 지역 설정 값 있을 시에
                        this.setState({
                          scrollleftvalue: '', //왼쪽 지역 설정 값 초기화
                          checkstatus: !this.state.checkstatus, // 지역설정시 화면 전환
                        });
                      } else {
                        //없을 시 해당 지역으로 설정 후 화면 전환
                        this.setState({
                          scrollleftvalue: item.local,
                          checkstatus: !this.state.checkstatus,
                        });
                      }
                    }}
                  >
                    <View style={styles.boxl}>
                      <Text style={styles.lefttext}>{item.local}</Text>
                      {this.state.scrollleftvalue === item.local ? (
                        <Image source={check} style={styles.checklogo} />
                      ) : (
                        <View style={styles.backcolor} />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />

              <FlatList
                style={styles.scrollright}
                data={this.state.Rdata}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        scrollrightvalue: item.end_point, // 도착지 값 설정 :도림캠퍼스
                        scrollcentervalue: item.start_point, // 경로 명 설정
                        start_time: item.start_time,
                        checkbutton: !this.state.checkbutton, //화면 전환
                      });
                    }}
                  >
                    {this.state.scrollleftvalue === '' ? (
                      <View style={styles.Container} />
                    ) : (
                      <View style={styles.boxr}>
                        <Text style={styles.righttext1}>
                          {item.start_point}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
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
    marginLeft: 15,
    fontSize: 30,
    fontWeight: '300',
    color: '#949494',
  },
  StartButtonInputchange: {
    marginTop: 30,
    marginLeft: 15,
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
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
  updown: {
    height: '100%',
    width: '100%',
  },

  CalentdarContainer: { flex: 1, backgroundColor: 'white' },
  bottombox: {
    flex: 1,
  },

  listheader: {
    backgroundColor: '#5B79ED',
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
    fontSize: 20,
    borderBottomWidth: 1,
  },
  listleft: {
    width: '40%',
  },
  listright: {
    width: '60%',
  },
  listtext: {
    fontSize: 25,
    fontWeight: '100',
    color: 'white',
    textAlign: 'center',
  },

  scrollarea: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollleft: {
    borderRightWidth: 1,
    borderRightColor: '#5C72E1',
    width: '40%',
    height: '100%',
    flexDirection: 'column',
  },
  scrollright: {
    width: '60%',
    height: '100%',
    flexDirection: 'column',
  },
  boxl: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  boxr: {
    width: '100%',
    height: 80,
    marginLeft: 10,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  backcolor: {
    backgroundColor: '#EBECF0',
    position: 'relative',
    left: 98,
    width: 60,
    height: 72,
  },
  checklogo: {
    position: 'relative',
    left: 98,
    width: 60,
    height: 75,
  },

  lefttext: {
    paddingLeft: 10,
    width: '60%',
    height: '90%',
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'left',
    backgroundColor: '#EBECF0',
    position: 'absolute',
  },
  righttext1: {
    flex: 1,
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    position: 'absolute',
    top: 25,
  },
});

export default RouteReserve;
