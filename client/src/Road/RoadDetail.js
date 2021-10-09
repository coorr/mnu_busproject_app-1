/* eslint-disable no-alert */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowIcon from '../../assets/image/arrow.png';
import BackArrow from '../../assets/image/backicon.png';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

class RoadDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  DetailList = async () => {
    try {
      const { numID } = this.props.route.params;
      await fetch('http://112.164.190.87:5000/api/route_screen_detail', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },

        body: JSON.stringify({
          numID: numID,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            const ar =
              res.detail[0].station_numID !== null
                ? res.detail[0].station_numID.split(',')
                : '';
            var rearray = [];

            // 정류장의 갯수만큼 나눠서 배열 추가
            for (var i = 0; ar.length > i; i++) {
              rearray.push(ar[i].split('-'));
            }
            this.setState({
              data: rearray,
            });
            // this.setState({ data: res.detail[0] });
          } else {
            alert(res.route);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.DetailList();
  }

  renderContent = () => {
    return (
      <View style={styles.containers}>
        <View style={styles.lineBox}>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.BusRoadBox}>{item[1]}</Text>
                <Text style={styles.NumIDBox}>{item[0]}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  };

  title = () => {
    const { direction, start_point, end_point } = this.props.route.params;
    return (
      <View style={styles.StartBox}>
        <Text style={styles.StartHangul}>{direction}</Text>
        <View style={styles.FirstArea}>
          <Text style={styles.FirstHangul}>{start_point}</Text>
          <Image source={ArrowIcon} style={styles.busIcon} />
          <Text style={styles.EndHangul}>{end_point}</Text>
        </View>
      </View>
    );
  };
  renderNavBar = () => {
    return (
      <View style={styles.navContainer}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.iconLeft}
            onPress={() => {
              this.props.navigation.navigate('RoadScreen');
            }}
          >
            <Image source={BackArrow} style={styles.BackArrow} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ReactNativeParallaxHeader
          // headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={180}
          extraScrollHeight={20}
          navbarColor="#5B79ED"
          title={this.title()}
          backgroundColor="#5B79ED"
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={styles.container}
          // contentContainerStyle={styles.contentContainer}
          // innerContainerStyle={styles.container}
          scrollViewProps={{
            onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
            onScrollEndDrag: () => console.log('onScrollEndDrag'),
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  lineBox: {
    // height: '100%',
    // width: '100%',
    marginLeft: '20%',
    marginTop: '10%',
    borderLeftWidth: 5,
    borderColor: 'gray',
    marginBottom: '10%',
  },
  BusRoadBox: { marginLeft: '3%' },
  NumIDBox: {
    color: '#686868',
    fontSize: 12,
    marginLeft: '3%',
    marginBottom: '8%',
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },

  StartBox: {
    height: '20%',
    width: '100%',
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '50%',
    marginRight: '50%',
  },
  StartHangul: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  Box: { width: '100%', height: '100%', borderWidth: 1 },
  FirstArea: {
    flexDirection: 'row',
  },
  FirstHangul: { fontSize: 12, color: 'white' },
  ArrowBox: { width: '15%', height: '100%', marginLeft: '8%' },
  busIcon: { width: 15, height: 15 },
  EndArea: { width: '100%', height: '100%' },
  EndHangul: { fontSize: 12, color: 'white' },

  bodys: { height: '100%', width: '100%' },

  navBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  BackArrow: { width: 30, height: 30, marginLeft: '15%' },
});

export default RoadDetail;
