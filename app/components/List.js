import React, { Component } from 'react'
import { ListView, NetInfo, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import Item from './Item'

export default class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newItemTitle: '',
      newItemPoints: ''
    }
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.props.getListItems(1)

    this.props.loadOfflineItems()

    if (NetInfo) {
      NetInfo.isConnected.fetch().done(isConnected => {
        if (isConnected) {
          this.props.checkConnection()
        } else {
          this.props.goOffline()
        }
      })
    } else {
      this.props.checkConnection()
    }
  }

  componentWillReceiveProps(nextProps) {
    // Populate list with items
    if (this.props.items !== nextProps.items) {
      this.dataSource = this.dataSource.cloneWithRows(nextProps.items)
    }
  }

  renderRow(rowData) {
    return (
      <Item name={rowData.title}
        removable={this.props.connected}
        onRemove={() => this._remove(rowData.id)} />
    )
  }

  _add() {
    this.props.addListItem(this.state.newItemTitle, this.state.newItemPoints, 1);
    this.setState({
      newItemTitle: '',
      newItemPoints: ''
    })
  }

  _remove(id) {
    this.props.removeListItem(id, 1)
  }

  _change() {
    this.props.changeItem('40hsfcrl5eic7x28olxr', {points: 10});
  }

  render() {
    console.log('PROPS!')
    console.log(this.props)
    let items, readonlyMessage
    if (this.props.connected) {
      items = this.props.onlineItems
    } else if (this.props.connectionChecked) {
      items = this.props.offlineItems
      readonlyMessage = <Text style={styles.offline}>Offline</Text>
    } else {
      items = []
      readonlyMessage = <Text style={styles.offline}>Loading...</Text>
    }

    return (
      <View style={styles.container}>
        {readonlyMessage}
        <View style={styles.new}>
          <TextInput
            placeholder="Add item"
            style={styles.newItem}
            value={this.state.newItemTitle}
            onChangeText={(value) => this.setState({newItemTitle: value})} />
          <TextInput
            placeholder="Points"
            style={styles.newItem}
            keyboardType="numeric"
            value={this.state.newItemPoints}
            onChangeText={(value) => this.setState({newItemPoints: value})} />
          <Button onPress={() => this._add()} title={this.props.addingItem? "Adding":"Add to List"} disabled={this.props.addingItem} />
        </View>

        <ListView
          dataSource={this.dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
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
