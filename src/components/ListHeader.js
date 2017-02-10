import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ListHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.state.heightValue.setValue(155);
    Animated.timing(
      this.state.heightValue,
      {
        toValue: 92,
        duration: 250,
        delay: 250
      }
    ).start();
  }

  render() {
    return (
      <Animated.View style={{height: this.state.heightValue}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A54348', '#E4598C']} style={styles.header}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <Text style={styles.title}>Progress</Text>
          <Text style={styles.text}>{this.props.points} points</Text>
        </LinearGradient>
      </Animated.View>
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
