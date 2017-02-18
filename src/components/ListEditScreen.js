import React, { Component } from 'react';
import { ListView, Text, View, Button, TextInput } from 'react-native';

export default class ListEditScreen extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      title: params.title,
      listId: params.listId
    };
  }

  static navigationOptions = {
    title: 'Edit List',
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
          value={this.state.title}
        />
        <TextInput
          style={{height: 40}}
          onChangeText={(listId) => this.setState({listId})}
          value={this.state.listId}
        />
      </View>
    );
  }
}
