/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

class PolicyScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: [
      {
        title: '목포대학교 스쿨버스 이용 방법',
        content:
          ' 1. 예약하기에서 출발지, 노선, 출발일을 선택합니다.\n 2. 좌석 선택을 합니다. \n 3. 예매 정보를 확인한 후, 예매하기를 눌러 예약을 진행합니다.',
      },
      {
        title: '예약 변경 및 취소',
        content:
          ' 1. 메인화면의 "예매확인/변경" 버튼을 누릅니다.\n 2. "예매 변경"을 누릅니다.\n 3. 좌석 선택을 하고 예약 정보를 확인한 뒤  "예매하기"  \n버튼을 누릅니다.',
      },
      {
        title: '예매한 승차권 내역이 조회되지 않아요',
        content:
          '고객님께서 학번아이디로 예매하신 경우 예매 시 사용한 학번아이디로 로그인한 후 확인해주시기 바랍니다.',
      },
      {
        title: '노선 조회 이용',
        content:
          '1.메인화면에서 노선/운행정보를 누릅니다.\n 2.노선이름을 검색합니다.\n 3.노선을 클릭한 후 운행정보를 확인합니다.',
      },
      {
        title: '이용안내/문의',
        content: '통학버스 담당자 전화번호 : 061-450-2032 / 061-4502-2033',
      },
    ],
  };

  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: '#CED0CE',
        }}
      >
        {/* <ActivityIndicator animating size="large" /> */}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.titlebox}>
                <Text style={styles.titletext}>{item.title}</Text>
              </View>
              <View style={styles.contentbox}>
                <Text style={styles.contenttext}>{item.content}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingLeft: '3%',
    paddingRight: '3%',
    // alignItems: 'center',
  },
  box: {
    flex: 1,
    paddingTop: 20,
  },
  titlebox: {
    flex: 1,
    marginBottom: 10,
  },
  titletext: {
    fontSize: 20,
    fontWeight: '800',
  },
  contentbox: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#dbdbdb',
  },
  contenttext: {
    padding: '3%',
    fontSize: 15,
  },
});

export default PolicyScreen;
