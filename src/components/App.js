import React, { Component } from 'react';
import { View, Text, StyleSheet, Navigator, BackAndroid } from 'react-native';

import Lists from './Lists';
import List from './List';

class App extends Component {
  state = {
    buttonVariant: 'primary',
    buttonText: 'Submit',
  }

  renderScene(route, navigator) {
    if (route.name == 'Lists') {
      return <Lists navigator={navigator} {...route.passProps} />;
    }
    if (route.name == 'List') {
      return <List navigator={navigator} {...route.passProps} />;
    }
  }

  back = () => {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
    }
    return false;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.back);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.back);
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Lists' }}
        ref={(nav) => {this.navigator = nav;}}
        renderScene={this.renderScene}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
});

export default App;
