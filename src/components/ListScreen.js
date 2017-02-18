import React, { Component } from 'react';
import { ListView, Text, View, Button } from 'react-native';

import ListHeader from './ListHeader';
import ListRow from './ListRow';
import * as data from '../data';

export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    let listData = this.fetchListData();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      ...listData,
      dataSource: ds.cloneWithRowsAndSections(listData.items)
    };
  }

  static navigationOptions = {
    title: ({ state }) => {
      return state.params.title;
    },
    header: ({ state, setParams, navigate }) => {
      // The navigation prop has functions like setParams, goBack, and navigate.
      let right = (
        <Button
          title="Edit"
          onPress={() => navigate('ListEdit', {
            title: state.params.title,
            listId: state.params.listId
          })}
        />
      );
      return { right };
    },
  };

  renderSectionHeader(sectionData, headerData) {
    return (
      <Text style={{padding: 15, fontWeight: 'bold'}}>{(headerData == 'active')? 'Items to do':'Completed items'}</Text>
    )
  }

  fetchListData() {
    return data.lists[this.props.navigation.state.params.listId];
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <ListHeader points={this.props.inactivePoints} />}
        renderRow={(rowData, sectionID) => <ListRow {...rowData} sectionID={sectionID} navigator={this.props.navigator} />}
        renderSectionHeader={this.renderSectionHeader}
        style={{backgroundColor: '#FFF'}}
      />
    );
  }
}
