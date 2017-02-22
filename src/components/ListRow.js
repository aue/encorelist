import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import CheckCircle from './CheckCircle';

export default class ListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: (this.props.sectionID == 'active')? true : false,
      editing: false,
      title: this.props.title,
    }
  }

  toggleActiveState = () => {
    this.setState({
      active: !this.state.active
    });
  }

  editItem = () => {
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.check} onPress={this.toggleActiveState}>
          <CheckCircle checked={this.state.active} />
        </TouchableOpacity>
        <View style={styles.text}>
          <TextInput
            style={styles.headline}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            underlineColorAndroid='#FFF'
          />
          <Text style={styles.subtext}>{this.props.points} points</Text>
        </View>
      </View>
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
  },
  check: {
    padding: 15,
  },
  text: {
    flex: 1,
    padding: 15,
  },
  headline: {

  },
  subtext: {
    paddingTop: 5,
  },
});
