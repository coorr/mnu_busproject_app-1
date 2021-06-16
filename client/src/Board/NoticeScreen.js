import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

class NoticeScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: [],
    isLoading: true,
  };

  dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  fetchData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/board');
      const boards = await response.json();
      this.setState({ data: boards });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('NoticeDetailScreen', {
                pid: item.pid,
                title: item.title,
                writer: item.writer,
                udate: this.dateParse(item.udate),
                content: item.content,
              });
            }}
          >
            <View style={styles.box}>
              <Text style={styles.pid}>No.{item.pid}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.writer}>작성자 : {item.writer}</Text>
              <Text style={styles.udate}>{this.dateParse(item.udate)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'column',
    paddingLeft: 3,
    marginTop: 10,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#A4A4A4',
  },
  pid: {
    paddingLeft: 5,
    paddingTop: 5,
  },
  title: {
    margin: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  writer: {
    margin: 3,
    textAlign: 'right',
  },
  udate: {
    margin: 3,
    textAlign: 'right',
  },
});

export default NoticeScreen;
