import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Linking, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class QuestionsScreen extends Component {
  dialCall = () => {
    let telnum = '';

    if ((Platform.OS = 'android')) {
      telnum = 'tel:061-458-2032';
    } else {
      telnum = 'telprompt:${061-450-2302}';
    }
    Linking.openURL(telnum);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>통학버스 담당부서 (학생지원과)</Text>
          <View style={styles.cbox}>
            <Text style={styles.content1}>담당자 연락처</Text>
            <TouchableOpacity onPress={this.dialCall} activeOpacity={0.7}>
              <Text style={styles.content2}>061-450-2032</Text>
            </TouchableOpacity>
          </View>
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
  content1: {
    fontSize: 20,
    fontWeight: '400',
  },
  content2: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default QuestionsScreen;
