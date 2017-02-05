import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';

import ListsRow from './ListsRow';
import * as data from '../data';

class Lists extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data.lists)
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <ListsRow {...rowData} />}
      />
    );
  }
}

export default Lists;
