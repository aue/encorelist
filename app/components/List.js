import React, { Component } from 'react'
import { ListView, NetInfo, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import Item from './Item'

export default class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newItem: '',
      newItemValue: ''
    }
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.props.getListItemIds(1)

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
    // Populate items when ids are fetched
    if (this.props.loadingItemIds && !nextProps.loadingItemIds && !nextProps.error) {
      this.props.getItems(nextProps.itemIds)
    }
  }

  renderRow(rowData) {
    console.log(this.props.connected)
    return (
      <Item name={rowData.title}
            removable={this.props.connected}
            onRemove={() => this._remove(rowData.id)} />
    )
  }

  _add() {
    this.props.addItem(this.state.newItem);

    this.setState({newItem: ''})
    setTimeout(() => this.refs.newItem.focus(), 1)
  }

  _remove(id) {
    this.props.removeItem(id)
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
          <TextInput placeholder="Add item"
                     style={styles.newItem}
                     ref="newItem"
                     editable={this.props.connected}
                     value={this.state.newItem}
                     onChangeText={(newItem) => this.setState({newItem})}
                     onSubmitEditing={() => this._add()} />
          <TextInput placeholder="Points"
                     style={styles.newItemValue}
                     ref="newItemValue"
                     editable={this.props.connected}
                     value={this.state.newItemValue}
                     onChangeText={(newItemValue) => this.setState({newItemValue})} />
          <Button onPress={() => this._change()} title={this.props.changingItem? "Changing":"Send Change"} disabled={this.props.changingItem} />
        </View>

        <ListView
          dataSource={this.dataSource.cloneWithRows(items)}
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
    height: 70
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
