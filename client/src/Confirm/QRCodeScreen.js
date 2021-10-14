'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class ScanScreen extends Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };
  cancle = () => {
    this.props.navigation.pop(); //뒤로 가기
  };
  render() {
    console.log('camera');
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
