/* eslint-disable no-alert */
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';

class PolicyScreen extends Component {
  constructor(props) {
    super(props);
    this.reservefetchdata();
  }
  state = {
    data: [],
  };

  reservefetchdata = async () => {
    try {
      const { uid } = this.props.route.params;
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://121.149.180.144:5000/api/reserve_history', {
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
            Alert.alert('조회결과', res.message);
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
            <Text style={styles.titleheadertext}>통학</Text>
          </View>
          <View style={styles.textbox2}>
            <Text style={styles.titleheadertext}>노선이름</Text>
          </View>
          <View style={styles.textbox3}>
            <Text style={styles.titleheadertext}>출발일</Text>
          </View>
          <View style={styles.textbox3}>
            <Text style={styles.titleheadertext}>좌석번호</Text>
          </View>
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.textbox1}>
                <Text style={styles.contenttext}>
                  {item.route_type === 1 ? '등교' : '하교'}
                </Text>
              </View>
              <View style={styles.textbox2}>
                <Text style={styles.contenttext}>{item.start_point}</Text>
              </View>
              <View style={styles.textbox3}>
                <Text style={styles.contenttext}>{item.start_date}</Text>
              </View>
              <View style={styles.textbox3}>
                <Text style={styles.contenttext}>{item.reserve_seat}</Text>
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
    flex: 1,
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
