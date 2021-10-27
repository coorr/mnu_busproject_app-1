'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class ScanScreen extends Component {
  ModifySeatData = async () => {
    try {
      const {
        route_type,
        start_data,
        date,
        seat_number,
        uid,
        uname,
        dept,
        stdnum,
      } = this.props.route.params;

      await fetch('http://121.149.180.144:5000/api/reserve_modify', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route_type: route_type,
          reserve_seat: seat_number,
          start_data: start_data, // 노선정보
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
            alert(res.reserve);
          }
        })

        .done();
    } catch (err) {
      console.log(err);
    }
  };

  onSuccess = e => {
    this.ModifySeatData();
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
