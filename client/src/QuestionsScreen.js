import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class QuestionsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>통학버스 담당부서 (학생지원과)</Text>
          <Text style={styles.content}>
            담당자 전화번호: 061-450-2032 / 061-450-2033
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',

    justifyContent: 'center',
    backgroundColor: '#5B79ED',
    alignItems: 'center',
  },
  contentbox: {
    height: '95%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '95%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
    fontWeight: '400',
  },
});

export default QuestionsScreen;
