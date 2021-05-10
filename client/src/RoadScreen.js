import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as hangul from 'hangul-js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class RoadScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fullData: [],
      search: '',
    };
  }

  handleSearch = text => {
    alert('text', text);
    this.setState({ search: text });
  };

  RoadList = async () => {
    const apiURL = 'http://10.0.2.2:5000/api/roadtest';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson });
        this.setState({ fullData: responseJson });
      })
      .catch(error => {
        console.log(error);
      });
  };

  searchFilter = text => {
    if (text) {
      const newData = this.state.fullData.filter(item => {
        var disassemble = hangul.disassemble(item.RoadArea, true);
        var cho = '';
        for (var i = 0, l = disassemble.length; i < l; i++) {
          cho += disassemble[i][0];
        }
        item.disassemble = cho;
        const itemData = item.RoadArea ? item.RoadArea : '';
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

  componentDidMount() {
    this.RoadList();
  }

  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
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
                      startArea: item.StartArea,
                      firstArea: item.FirstArea,
                      endArea: item.EndArea,
                    });
                  }}
                >
                  <View style={styles.InputArea}>
                    <Text style={styles.RoadAreaText}>{item.RoadArea}</Text>
                    <Text style={styles.StartAreaText}>{item.StartArea}</Text>
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
