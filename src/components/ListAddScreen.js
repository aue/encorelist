import React, { Component } from 'react';
import { ListView, Text, View, Button, TextInput, StyleSheet } from 'react-native';

import * as listsActions from '../actions/lists';

export default class ListAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      saving: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    // Disable save button if needed
    if (this.state.saving != nextState.saving
      || (this.state.title.trim().length == 0 && nextState.title.trim().length != 0)
      || (this.state.title.trim().length != 0 && nextState.title.trim().length == 0)
    ) {
      // Add Save Button to Header
      const right = (
        <Button
          title="Save"
          onPress={() => this.addList()}
          disabled={nextState.saving == true || nextState.title.trim().length == 0}
        />
      )
      this.props.navigation.setParams({ right });
    }
  }

  static navigationOptions = {
    title: 'Add List',
    header: ({ state }) => {
      let right = state.params.right || (
        <Button
          title="Save"
          onPress={() => {}}
          disabled={true}
        />
      );
      return { right };
    },
  };

  async addList() {
    if (this.state.saving == true) return;
    this.setState({saving: true});

    try {
      let list = await listsActions.addList(this.state.title);
      this.props.navigation.state.params.state.params.update();
      this.props.navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textbox}
          onChangeText={(title) => this.setState({title})}
          placeholder="Title"
          disabled={this.state.saving == true}
          value={this.state.title}
          autoCapitalize="words"
          returnKeyType="done"
          underlineColorAndroid="red"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textbox: {
    fontSize: 16,
  }
});
