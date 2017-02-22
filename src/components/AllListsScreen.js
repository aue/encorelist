import React, { Component } from 'react';
import { ListView, Button, Alert } from 'react-native';

import List from './List';
import ListsHeader from './ListsHeader';
import ListsRow from './ListsRow';

import * as listsActions from '../actions/lists';

export default class AllListsScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      populated: false,
      dataSource: ds
    };
  }

  componentWillMount() {
    this.loadList();
    this.props.navigation.setParams({
      update: () => {
        this.loadList();
      }
    });
  }

  static navigationOptions = {
    title: 'Lists',
    header: ({ state, setParams, navigate }) => {
      // The navigation prop has functions like setParams, goBack, and navigate.
      let right = (
        <Button
          title="Add"
          onPress={() => navigate('ListAdd', {
            state
          })}
        />
      );
      return { right };
    },
  };

  loadList() {
    // Fetch lists data
    this.fetchData()
      .then(listsData => {
        // Parse into dataSource for ListView
        const ds = this.state.dataSource.cloneWithRows(listsData);

        this.setState({
          populated: true,
          dataSource: ds
        });
      })
      .catch(err => {
        Alert.alert(
          'A problem has occurred',
          'Could not fetch your lists'
        );
      });
  }

  async fetchData() {
    try {
      // Fetch account information
      let account = await listsActions.getAccount();

      // Test if account setup is needed
      if (account === null) {
        await listsActions.setupAccount();
        account = await listsActions.getAccount();
      }

      // Fetch data for lists
      let listsData = await listsActions.getList(account.listsIds);

      // Save to state
      this.setState({
        account,
        listsData: listsData,
      });

      return listsData;
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    console.log('rendered');
    const { navigate } = this.props.navigation;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <ListsHeader {...this.state.account} />}
        renderRow={(rowData) => <ListsRow {...rowData} navigation={ this.props.navigation } />}
        style={{backgroundColor: '#FFF'}}
      />
    );
  }
}
