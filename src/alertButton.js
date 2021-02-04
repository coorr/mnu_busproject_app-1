import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

class alertButton extends Component {
  state = {
    show: false,
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show" onPress={this.handleOpen} />
        <SCLAlert
          show={this.state.show}
          onRequestClose={this.handleClose}
          theme="info"
          title="Info"
          subtitle="You can setup the colors using the theme prop"
        >
          <SCLAlertButton theme="info" onPress={this.handleClose}>
            Done
          </SCLAlertButton>
          <SCLAlertButton theme="default" onPress={this.handleClose}>
            Cancel
          </SCLAlertButton>
        </SCLAlert>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default alertButton;
