import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import CheckCircle from './CheckCircle';

export default class ListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: (this.props.sectionID == 'active')? true:false
    }
  }

  _navigate() {
    this.props.navigator.push({
      name: 'List',
      passProps: {
        title: this.props.title,
        activePoints: this.props.activePoints,
        inactivePoints: this.props.inactivePoints,
        items: this.props.items
      }
    })
  }

  onPress = () => {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.row}>
          <CheckCircle style={styles.check} checked={this.state.active} />
          <View style={styles.text}>
            <Text style={styles.headline}>{this.props.title}, {this.props.points} points</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
  },
  check: {
  },
  text: {
    flex: 1,
    paddingLeft: 15,
  },
  headline: {
  },
  subtext: {
    paddingTop: 5,
  },
});
