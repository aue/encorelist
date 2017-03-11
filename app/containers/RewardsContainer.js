import React, { Component } from 'react';
import { ListView, Text, View, Button } from 'react-native';

export default class RewardsContainer extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Rewards'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Rewards Coming Soon</Text>
      </View>
    );
  }
}
