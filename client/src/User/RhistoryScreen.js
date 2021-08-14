/* eslint-disable no-alert */
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러. 명확하게 하기 위해 import
import 'moment/locale/ko';

class PolicyScreen extends Component {
  constructor(props) {
    super(props);
    this.reservefetchdata();
  }
  state = {
    data: [],
  };

  dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  reservefetchdata = async () => {
    try {
      const { uid } = this.props.route.params;
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://172.16.2.171:5000/api/reserve_history', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          uid: uid,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            var reserve = JSON.parse(res.reserve);
            this.setState({ data: reserve });
          } else {
            alert(res.message);
          }
        })
        .done();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleheader}>
          <View style={styles.textbox1}>
            <Text style={styles.titleheadertext}>좌석번호</Text>
          </View>
          <View style={styles.textbox2}>
            <Text style={styles.titleheadertext}>노선이름</Text>
          </View>
          <View style={styles.textbox3}>
            <Text style={styles.titleheadertext}>출발일</Text>
          </View>
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.textbox1}>
                <Text style={styles.contenttext}>{item.reserve_seat}</Text>
              </View>
              <View style={styles.textbox2}>
                <Text style={styles.contenttext}>{item.start_point}</Text>
              </View>
              <View style={styles.textbox3}>
                <Text style={styles.contenttext}>
                  {this.dateParse(item.pdate)}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleheader: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    borderBottomWidth: 2,
  },
  textbox1: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  textbox2: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  textbox3: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  eadertext: {
    fontSize: 15,
    fontWeight: '700',
  },
  box: {
    flex: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  contenttext: {
    fontSize: 15,
  },
});

export default PolicyScreen;
