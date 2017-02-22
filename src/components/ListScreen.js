import React, { Component } from 'react';
import { ListView, Text, View, Button } from 'react-native';

import ListHeader from './ListHeader';
import ListRow from './ListRow';

import * as listsActions from '../actions/lists';

export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      populated: false,
      dataSource: ds
    };
  }

  componentWillMount() {
    // Fetch list data
    this.fetchData()
      .then(listData => {
        // Parse into dataSource for ListView
        const ds = this.state.dataSource.cloneWithRowsAndSections(listData.items);

        this.setState({
          populated: true,
          dataSource: ds
        });
      })
      .catch(err => {
        Alert.alert(
          'A problem has occurred',
          'Could not list data'
        );
      });
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
            id: state.params.id
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

  async fetchData() {
    try {
      // Fetch data for lists
      let listId = this.props.navigation.state.params.id;
      let listData = await listsActions.getList(listId);

      // Save to state
      this.setState({
        listData: listData,
      });

      return listData;
    } catch (err) {
      console.error(err);
    }
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
