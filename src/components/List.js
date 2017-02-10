import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';

import ListHeader from './ListHeader';
import ListRow from './ListRow';

export default class List extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this.props.items)
    };
  }

  renderSectionHeader(sectionData, headerData) {
    return (
      <Text style={{padding: 15, fontWeight: 'bold'}}>{(headerData == 'active')? 'Items to do':'Completed items'}</Text>
    )
  }

  render() {
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
