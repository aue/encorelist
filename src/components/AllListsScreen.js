import React, { Component } from 'react';
import { ListView, Button } from 'react-native';

import List from './List';
import ListsHeader from './ListsHeader';
import ListsRow from './ListsRow';
import * as data from '../data';

export default class AllListsScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.mapListIdsToDataSourceArray(data.account.listsIds))
    };
  }

  static navigationOptions = {
    title: 'Lists',
    header: ({ state, setParams, navigate }) => {
      // The navigation prop has functions like setParams, goBack, and navigate.
      let right = (
        <Button
          title="Add"
          onPress={() => navigate('ListAdd')}
        />
      );
      return { right };
    },
  };

  mapListIdsToDataSourceArray(listsIds) {
    return listsIds.map((listId) => {
      let listData = data.lists[listId];
      listData.listId = listId;
      return listData;
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <ListsHeader {...data.account} />}
        renderRow={(rowData) => <ListsRow {...rowData} navigation={ this.props.navigation } />}
        style={{backgroundColor: '#FFF'}}
      />
    );
  }
}
