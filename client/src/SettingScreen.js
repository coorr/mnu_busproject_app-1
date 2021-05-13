import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import man_logo2 from '../assets/image/man_logo2.png';
import magnifier_logo from '../assets/image/magnifier_logo.png';
import bus_logo from '../assets/image/bus_logo.png';
import check_logo from '../assets/image/check_logo.png';
import user from '../assets/image/user.png';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
  }
  remove = () => {
    AsyncStorage.removeItem('userData');
    this.props.navigation.navigate('Login');
  };
  render() {
    const { uid, uname, dept, stdnum } = this.props.route.params; // 아이디 , 이름, 학과,학번

    return (
      <View style={styles.container}>
        <View style={styles.userbox}>
          <View style={styles.userlogobox}>
            <Image source={man_logo2} style={styles.man_logo} />
          </View>
          <View style={styles.usertextbox}>
            <Text style={styles.usertext_name}>{uname}</Text>
            <Text style={styles.usertext_uid}>{uid}</Text>
            <Text style={styles.usertext_dept}>{dept}</Text>
            <Text style={styles.usertext_stdnum}>{stdnum}</Text>
          </View>
        </View>

        {/*title 명 및 메뉴 이름  */}
        <View style={styles.listbox}>
          <Text style={styles.listboxtitle}>내역 조회</Text>
          <View style={styles.list_box_area}>
            <TouchableOpacity style={styles.list_touch_box}>
              <View style={styles.textbox}>
                <Text style={styles.listboxtext}>예약 내역 확인</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.list_box_area}>
            <TouchableOpacity style={styles.list_touch_box}>
              <View style={styles.textbox}>
                <Text style={styles.listboxtext}>페널티 내역 확인</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listbox}>
          <Text style={styles.listboxtitle}>알림</Text>
          <View style={styles.list_box_area}>
            <TouchableOpacity style={styles.list_touch_box}>
              <View style={styles.textbox}>
                <Text style={styles.listboxtext}>공지사항</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.list_box_area}>
            <TouchableOpacity style={styles.list_touch_box}>
              <View style={styles.textbox}>
                <Text style={styles.listboxtext}>이용안내</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonform}>
          <TouchableOpacity onPress={this.remove} style={styles.buttonArea}>
            <Text style={styles.buttonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottom_menu}>
          <TouchableOpacity style={styles.bottom_touch}>
            <View style={styles.bottom_menubox}>
              <Image style={styles.bottom_image} source={bus_logo} />
              <View style={styles.bottom_menu_textbox}>
                <Text style={styles.bottom_menu_text}>예약</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottom_touch}>
            <View style={styles.bottom_menubox}>
              <Image style={styles.bottom_image} source={check_logo} />
              <View style={styles.bottom_menu_textbox}>
                <Text style={styles.bottom_menu_text}>예약 확인</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottom_touch}>
            <View style={styles.bottom_menubox}>
              <Image style={styles.bottom_image} source={magnifier_logo} />
              <View style={styles.bottom_menu_textbox}>
                <Text style={styles.bottom_menu_text}>시간표 조회</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottom_touch}>
            <View style={styles.bottom_menubox}>
              <Image style={styles.bottom_image} source={user} />
              <View style={styles.bottom_menu_textbox}>
                <Text style={styles.bottom_menu_text}>내 정보</Text>
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
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  userbox: {
    borderColor: '#848484',
    marginTop: '3%',
    paddingLeft: '5%',
    borderRadius: 15,
    borderWidth: 1,
    width: '95%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userlogobox: {},
  usertextbox: {
    width: '50%',
    paddingLeft: '5%',
  },
  usertext_name: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  usertext_uid: {
    color: '#848484',
    fontSize: 12,
    fontWeight: '300',
  },
  usertext_dept: {
    color: '#848484',
    fontSize: 12,
    fontWeight: '300',
  },
  usertext_stdnum: {
    color: '#848484',
    fontSize: 12,
    fontWeight: '300',
  },

  listbox: {
    borderColor: '#848484',
    borderRadius: 15,
    borderWidth: 1,
    width: '95%',
    height: '23%',
  },
  list_box_area: {
    flex: 1,
    width: '100%',
  },
  list_touch_box: {
    width: '100%',
    height: '100%',
  },

  textbox: {
    flex: 1,
    justifyContent: 'center',
  },
  listboxtitle: {
    padding: '2%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listboxtext: {
    paddingLeft: '3%',
    fontSize: 20,
    fontWeight: '400',
  },
  buttonform: {
    height: '10%',
    width: '95%',
    backgroundColor: '#5B79ED',
  },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  // bottom menu 스타일
  bottom_menu: {
    width: '100%',
    height: '40%',

    flexDirection: 'row',
  },
  bottom_touch: {
    width: '100%',
    height: '100%',
  },
  bottom_menubox: {
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
  },
  bottom_image: {
    width: 64,
    height: 64,
  },
  bottom_menu_textbox: {},
  bottom_menu_text: {
    textAlign: 'center',
  },
});

export default SettingScreen;
