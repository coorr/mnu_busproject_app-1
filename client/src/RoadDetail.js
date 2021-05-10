import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RoadScreen from './RoadScreen';
import ArrowIcon from '../assets/image/arrow.png';

class RoadDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      startArea: '서광주',
    };
  }

  // paramsDetail = () => {
  //   this.setState={
  //     {
  //       startArea
  //     }
  //   }
  // }

  DetailList = async () => {
    const { startArea } = this.props.route.params;
    await fetch('http://10.0.2.2:5000/api/roaddetail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },

      body: JSON.stringify({
        startAreas: startArea,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.success == true) {
          var startAreas = JSON.parse(res.startAreas);
          this.setState({ data: startAreas });
        } else {
          alert(res.startAreas);
        }
      });
  };
  componentDidMount() {
    this.DetailList();
  }

  render() {
    const { startArea, firstArea, endArea } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.BusHeaderBox}>
          <View style={styles.BusHeaderArea}>
            <View style={styles.StartAreaBox}>
              <Text style={styles.StartAreaHangul}>{startArea}</Text>
            </View>
          </View>

          <View style={styles.FirstAreaBox}>
            <View style={styles.FirstArea}>
              <Text style={styles.FirstAreaHangul}>{firstArea}</Text>
              <Image source={ArrowIcon} style={styles.busIcon} />
              <Text style={styles.EndAreaHangul}>{endArea}</Text>
            </View>
          </View>
        </View>

        <View>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.aa}>{item.numID}</Text>
                <Text>{item.BusRoad}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aa: { fontSize: 90 },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  BusHeaderBox: {
    height: '20%',
    width: '100%',
    backgroundColor: '#5B79ED',
  },
  BusHeaderArea: {
    height: '25%',
    width: '100%',
    marginTop: '10%',
    // borderWidth: 1,
  },
  StartAreaBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.5%',
  },
  StartAreaHangul: { color: 'white', fontSize: 20, fontWeight: 'bold' },

  FirstAreaBox: {
    height: '20%',
    width: '100%',
    // borderWidth: 1,
  },
  FirstArea: {
    height: '100%',
    width: '40%',
    marginLeft: '10%',
    marginRight: '5%',
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: '4%',
  },
  FirstAreaHangul: { color: 'white', fontSize: 12 },
  busIcon: { width: 15, height: 17 },
  EndAreaHangul: {
    height: '100%',
    width: '100%',
    // borderWidth: 1,
    color: 'white',
    marginLeft: '3%',
    fontSize: 12,
  },

  InputFoamBox: {
    width: '100%',
    height: '100%',
    borderTopWidth: 10,
    borderTopColor: '#ced4da',
  },
  InputArea: {
    marginLeft: '3.5%',
    marginTop: '1.5%',
    marginBottom: '1.5%',
  },
  RoadAreaText: {
    fontSize: 18,
  },
  StartAreaText: { color: '#495057', marginTop: '0.5%' },
});

export default RoadDetail;
