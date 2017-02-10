import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';

import ListsHeader from './ListsHeader';
import ListsRow from './ListsRow';
import * as data from '../data';

export default class Lists extends Component {
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
        renderHeader={() => <ListsHeader {...data.account} />}
        renderRow={(rowData) => <ListsRow {...rowData} navigator={this.props.navigator} />}
        style={{backgroundColor: '#FFF'}}
      />
    );
  }
}
