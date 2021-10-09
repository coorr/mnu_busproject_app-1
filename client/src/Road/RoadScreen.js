/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as hangul from 'hangul-js';

class RoadScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fullData: [],
      search: '',
    };
    this.RoadList();
  }

  handleSearch = text => {
    alert('text', text);
    this.setState({ search: text });
  };

  RoadList = async () => {
    try {
      await fetch('http://112.164.190.87:5000/api/route_screen', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ data: responseJson });
          this.setState({ fullData: responseJson });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  searchFilter = text => {
    if (text) {
      const newData = this.state.fullData.filter(item => {
        var disassemble = hangul.disassemble(item.start_point, true);
        var cho = '';
        for (var i = 0, l = disassemble.length; i < l; i++) {
          cho += disassemble[i][0];
        }
        item.disassemble = cho;
        const itemData = item.start_point ? item.start_point : '';
        const textData = text;
        const initialData = hangul.disassemble(textData).join('');
        return (
          itemData.indexOf(textData) > -1 ||
          item.disassemble.includes(initialData)
        );
      });
      this.setState({ data: newData });
      this.setState({ search: text });
    } else {
      this.setState({ data: this.state.fullData });
      this.setState({ search: text });
    }
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="노선 검색"
        lightTheme
        round
        onChangeText={text => this.searchFilter(text)}
        value={this.state.search}
      />
    );
  };

  renderFooter = () => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.InputFoamBox}>
                <TouchableOpacity
                  style={styles.InputFoam}
                  onPress={() => {
                    this.props.navigation.navigate('RoadDetail', {
                      numID: item.numID,
                      direction: item.direction,
                      start_point: item.start_point,
                      end_point: item.end_point,
                    });
                  }}
                >
                  <View style={styles.InputArea}>
                    <Text style={styles.RoadAreaText}>{item.start_point}</Text>
                    <Text style={styles.StartAreaText}>{item.direction}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </View>

      // <View>
      //   <Text />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  InputFoamBox: {
    width: '100%',
    height: '100%',
    borderTopWidth: 5,
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
  // InputFoam: {
  //   width: '100%',
  //   height: '100%',
  // },
  // InputArea: {
  //   width: '88%',
  //   height: '70%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: '1.6%',
  //   marginLeft: '2%',
  //   backgroundColor: 'red',
  // },
});

export default RoadScreen;
