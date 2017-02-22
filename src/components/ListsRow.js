import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import PointCircle from './PointCircle';

export default class ListsRow extends Component {
  constructor(props) {
    super(props);
  }

  getNumberOfItems = () => {
    return this.props.items.active.length + this.props.items.inactive.length;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity onPress={
        () => navigate('List', {
          title: this.props.title,
          id: this.props.id
        })
      }>
        <View style={styles.row}>
          <PointCircle number={this.props.activePoints} style={styles.points} />
          <View style={styles.text}>
            <Text style={styles.headline}>{this.props.title}</Text>
            <Text style={styles.subtext}>{this.getNumberOfItems()} items, {this.props.activePoints + this.props.inactivePoints} total points</Text>
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
  points: {
  },
  text: {
    flex: 1,
    paddingLeft: 15,
  },
  headline: {
    fontWeight: 'bold',
  },
  subtext: {
    paddingTop: 5,
  },
});
