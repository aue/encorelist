import React, { Component } from 'react';
import { ListView, Text, View, Button } from 'react-native';

export default class RewardsContainer extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Account'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>My account here Coming Soon</Text>
      </View>
    );
  }
}
