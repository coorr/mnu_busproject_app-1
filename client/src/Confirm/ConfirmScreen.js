import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QuestionMark from '../../assets/image/question-mark.png';

class ConfirmScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usercheck: false,
    };
    this.reserve_check();
  }

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
          }
        })
        .done();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state.usercheck);
    return (
      <View style={styles.contain}>
        {this.state.usercheck === true ? (
          <View style={styles.container}>
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
          <View>
            <Text>{this.props.route.params.uid}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  ImageArea: {
    width: '100%',
    height: '60%',
  },
  QuestionMark: {
    width: '60%',
    height: '60%',
    marginTop: '40%',
    marginLeft: '20%',
  },
  TextArea: {
    height: '10%',
    width: '100%',
  },
  TextBox: {
    width: '100%',
    height: '70%',
    marginLeft: '22%',
    marginTop: '3%',
  },
  TextStyle: { fontSize: 22, fontWeight: 'bold', color: '#868e96' },
});

export default ConfirmScreen;
