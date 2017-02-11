import React, { Component } from 'react';
import { View, Text, StyleSheet, Navigator, BackAndroid, TouchableHighlight } from 'react-native';

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
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
              {
               if (route.name === 'Lists') {
                 return null;
               } else {
                 return (
                   <TouchableHighlight onPress={() => navigator.pop()}>
                     <Text style={{padding: 15}}>Back</Text>
                   </TouchableHighlight>
                 );
               }
             },
              RightButton: (route, navigator, index, navState) =>
                { return (<Text style={{padding: 15}}>More</Text>); },
              Title: (route, navigator, index, navState) =>
                { return (<Text style={{padding: 15}}>{route.title || 'Encore List'}</Text>); },
            }}
          />
        }
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
