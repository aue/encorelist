import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ListHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A54348', '#E4598C']} style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.text}>{this.props.points} points</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#FFF',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
  },
});
