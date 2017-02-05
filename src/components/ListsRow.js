import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

import PointCircle from './PointCircle';

class ListsRow extends Component {
  constructor(props) {
    super(props);
  }

  onPress = () => {
    Alert.alert(this.props.title, `${this.props.number} Items`);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.row}>
          <PointCircle number={this.props.number} style={styles.points} />
          <View style={styles.text}>
            <Text style={styles.headline}>{this.props.title}</Text>
            <Text style={styles.subtext}>{this.props.number} Items</Text>
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

export default ListsRow;
