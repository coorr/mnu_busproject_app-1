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
  FlatList,
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { useState } from 'react';

class NoticeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentbox}>
          <TouchableOpacity style={styles.touch}>
            <View style={styles.title}>
              <Text style={styles.title_text}>글 제목</Text>
            </View>

            <View style={styles.infobox}>
              <View style={styles.infoleft}>
                <Text style={styles.info_text}>작성자</Text>
              </View>
              <View style={styles.inforight}>
                <Text style={styles.info_text}>작성일</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    paddingLeft: '6%',
    paddingRight: '6%',
    flexDirection: 'column',
  },
  touch: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  contentbox: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'column',
    width: '100%',
    height: '15%',
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: '65%',
    paddingLeft: 10,
  },

  title_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  infobox: {
    paddingLeft: 10,
    flex: 1,
    width: '100%',
    height: '30%',
    flexDirection: 'row',
  },

  infoleft: {
    flex: 1,
  },

  inforight: {
    flex: 1,
  },

  info_text: {
    fontSize: 11,
    textAlign: 'right',
  },
});

export default NoticeScreen;
