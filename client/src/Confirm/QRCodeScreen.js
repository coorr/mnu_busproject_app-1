'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

class ScanScreen extends Component {
  state = {
    result: true,
  };
  today = () => {
    var d = new Date();
    const today = moment(d).format('YYYY-MM-DD'); // Today
    return today;
  };

  ModifySeatData = async () => {
    try {
      const {
        route_type,
        start_data,
        date,
        uid,
        // uname,
        // dept,
        // stdnum,
      } = this.props.route.params;

      await fetch('http://121.149.180.144:5000/api/status_modify', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route_type: route_type, // 통학형태
          start_data: start_data, // 노선정보
          start_date: date, //출발일
          uid: uid, // 사용자
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            this.props.navigation.navigate('ConfirmScreen', { result: true });
          } else {
            alert(res.reserve);
          }
        })

        .done();
    } catch (err) {
      console.log(err);
    }
  };

  onSuccess = e => {
    const { route_type, start_data, date } = this.props.route.params;
    var pdata = JSON.parse(e.data);
    // if (pdata.start_point === start_data) {
    //   console.log(start_data);
    // }
    // console.log(JSON.parse(e.data));

    // 등교/하교 형식, 노선명, 당일 출발일자 일치해야지 탑승 인증.
    if (
      pdata.route_type === route_type &&
      pdata.start_point === start_data &&
      this.today() === date
    ) {
      this.ModifySeatData();
    }
  };
  cancle = () => {
    this.props.navigation.pop(); //뒤로 가기
  };
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        // reactivate={true}
        showMarker={true}
        flashMode={RNCamera.Constants.FlashMode.auto} // 디바이스에 따라 카메라 플래시 on/off
        topContent={
          <Text style={styles.centerText}>QR 코드를 스캔해 주세요!</Text>
        }
        bottomContent={
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => {
              this.cancle();
            }}
          >
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScanScreen;
