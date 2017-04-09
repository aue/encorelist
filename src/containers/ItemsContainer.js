import React, { Component } from 'react'
import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Items from '../components/Items'

import * as ItemsActions from '../actions/items'

class ItemsContainer extends Component {
  constructor(props) {
    super(props)
  }

  addItem() {
    Actions.itemDetails({ params: { listId: this.props.listId }, title: 'Add Item' })
  }

  _add(title, points) {
    this.props.addListItem(title, points, this.props.listId)
  }

  _remove(itemId) {
    Alert.alert(
      'Delete this item?',
      'Points from this item will be removed',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removeListItem(itemId, this.props.listId), style: 'destructive'},
      ]
    )
  }

  _toggle(itemId, complete) {
    this.props.changeListItem(itemId, { complete: !complete })
  }

  _edit(data) {
    Actions.itemDetails({ params: {
      listId: this.props.listId,
      id: data.id,
      title: data.title,
      points: data.points
    }, title: 'Edit Item' })
  }

  componentWillMount() {
    let listId = this.props.params.listId || null
    if (listId) {
      this.props.getListItems(listId).then(() => {
        //setParams({title: this.props.title})
      })
    }
  }

  render() {
    return (
      <Items
        {...this.props}
        addItem={this.addItem.bind(this)}
        _add={this._add.bind(this)}
        _remove={this._remove.bind(this)}
        _toggle={this._toggle.bind(this)}
        _edit={this._edit.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  let items = []
  if (state.items.activeListId && !(state.items.loadingItemIds || state.items.loadingItems)) {
    items = Object.keys(state.lists.lists[state.items.activeListId].items)
      .map(itemId => state.items.items[itemId])
      .filter(value => value !== null)
  }

  return {
    listId: state.items.activeListId,
    items: items,
    loading: state.items.loadingItemIds || state.items.loadingItems,
    error: state.items.error,
    addingItem: state.items.addingItem,
    removingItem: state.items.removingItem,
    changingItem: state.items.changingItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ItemsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer)
