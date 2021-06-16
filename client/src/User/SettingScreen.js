import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import man_logo2 from '../../assets/image/man_logo2.png';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
  }
  remove = () => {
    AsyncStorage.removeItem('userData');
    this.props.navigation.reset({
      routes: [
        {
          name: 'Login',
        },
      ],
    });
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
            <TouchableOpacity
              style={styles.list_touch_box}
              onPress={() => {
                this.props.navigation.navigate('RhistoryScreen', {
                  // 필요한것만 select
                  uid: uid,
                  uname: uname,
                  dept: dept,
                  stdnum: stdnum,
                });
              }}
            >
              <View style={styles.textbox}>
                <Text style={styles.listboxtext}>예약 내역 확인</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.list_box_area}>
            <TouchableOpacity
              style={styles.list_touch_box}
              onPress={() => {
                this.props.navigation.navigate('PhistoryScreen', {
                  // 필요한것만 select
                  uid: uid,
                  uname: uname,
                  dept: dept,
                  stdnum: stdnum,
                });
              }}
            >
              <View style={styles.textbox}>
                <Text style={styles.listboxtext}>페널티 내역 확인</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listbox}>
          <Text style={styles.listboxtitle}>알림</Text>
          <View style={styles.list_box_area}>
            <TouchableOpacity
              style={styles.list_touch_box}
              onPress={() => {
                this.props.navigation.navigate('NoticeScreen');
              }}
            >
              <View style={styles.textbox}>
                <Text style={styles.listboxtext}>공지사항</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.list_box_area}>
            <TouchableOpacity
              style={styles.list_touch_box}
              onPress={() => {
                this.props.navigation.navigate('PolicyScreen');
              }}
            >
              <View style={styles.textbox}>
                <Text style={styles.listboxtext}>자주 묻는 질문</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonform}>
          <TouchableOpacity onPress={this.remove} style={styles.buttonArea}>
            <Text style={styles.buttonText}>로그아웃</Text>
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
    marginTop: '5%',
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
    marginTop: '5%',
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
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '95%',
    backgroundColor: '#5B79ED',
    borderRadius: 15,
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
