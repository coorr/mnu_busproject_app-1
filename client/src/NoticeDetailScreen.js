import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Linking,
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { useState } from 'react';

class NoticeDetailScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.title_text}>공지사항 제목은 ~입니다.</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.info_left}>
            <Text style={styles.info_text}>write_date</Text>
          </View>
          <View style={styles.info_right}>
            <Text style={styles.info_text}>writer_info</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.body_text}>내용확인 중입니다.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: '3%',
    paddingRight: '3%',
    flexDirection: 'column',
  },

  title: {
    borderTopWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 2,
  },

  title_text: {
    paddingLeft: 10,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },

  info: {
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 2,
    paddingLeft: 10,
    borderRadius: 5,
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  info_left: {
    borderRightColor: '#dbdbdb',
    borderRightWidth: 1,
    flex: 1,
  },

  info_right: {
    borderLeftColor: '#dbdbdb',
    borderLeftWidth: 1,
    flex: 1,
  },

  info_text: {
    fontWeight: '200',
    paddingLeft: 10,
    fontSize: 14,
    textAlign: 'left',
  },

  body: {
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    height: '70%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },

  body_text: {
    marginTop: 5,
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: '300',
  },
});

export default NoticeDetailScreen;
