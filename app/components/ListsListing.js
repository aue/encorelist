import React, { Component } from 'react'
import { ListView, StyleSheet, Text } from 'react-native'
import ListsRow from './ListsRow'

export default class ListsListing extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lists !== nextProps.lists) {
      this.dataSource = this.dataSource.cloneWithRows(nextProps.lists)
    }
  }

  render() {
    console.log('PROPS!')
    console.log(this.props)

    return (
      <ListView
        dataSource={this.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => <ListsRow {...rowData} navigateToList={this.props.navigateToList} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F6F6F6'
  },
  new: {
    flex: 0
  },
  newItem: {
    backgroundColor: '#FFFFFF',
    height: 42,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 20
  },
  offline: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
})
