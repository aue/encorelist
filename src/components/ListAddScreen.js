import React, { Component } from 'react';
import { ListView, Text, View, Button, TextInput } from 'react-native';

export default class ListAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      listId: ''
    };
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
        <TextInput
          style={{height: 40}}
          onChangeText={(listId) => this.setState({listId})}
          placeholder="List Id"
          value={this.state.listId}
        />
      </View>
    );
  }
}
