import React, { Component } from 'react';
import { ListView, Text, View, Button, TextInput } from 'react-native';

import * as listsActions from '../actions/lists';

export default class ListAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      title: 'Adding list'
    });
  }

  static navigationOptions = {
    title: 'Add List',
    header: ({ state, setParams, goBack }) => {
      // The navigation prop has functions like setParams, goBack, and navigate.
      let right = (
        <Button
          title="Save"
          onPress={() => goBack()}
        />
      );
      return { right };
    },
  };

  async addList() {
    try {
      let list = await listsActions.addList(this.state.title);
      this.props.navigation.state.params.state.params.update();
      this.props.navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TextInput
          style={{height: 40}}
          onChangeText={(title) => this.setState({title})}
          placeholder="Title"
          value={this.state.title}
        />
        <Button
          title="Save"
          onPress={() => this.addList()}
        />
      </View>
    );
  }
}
