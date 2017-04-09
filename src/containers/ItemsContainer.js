import React, { Component } from 'react'
import { Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Items from '../components/Items'

import * as ItemsActions from '../actions/items'

class ItemsContainer extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: ({ state }) => {
      return state.params.title || 'List'
    },
    header: ({ state, navigate }) => {
      let right = (
        <Button
          title="Add"
          onPress={() => navigate('ItemDetails', { listId: state.params.listId })}
        />
      )
      return { right }
    }
  }

  _add(title, points) {
    this.props.addListItem(title, points, this.props.listId)
  }

  _remove(itemId) {
    this.props.removeListItem(itemId, this.props.listId)
  }

  _toggle(itemId, complete) {
    this.props.changeListItem(itemId, { complete: !complete })
  }

  _edit(data) {
    const { navigate } = this.props.navigation
    navigate('ItemDetails', {
      listId: this.props.listId,
      id: data.id,
      title: data.title,
      points: data.points
    })
  }

  componentWillMount() {
    let listId = this.props.navigation.state.params.listId || ''
    this.props.getListItems(listId).then(() => {
      //setParams({title: this.props.title})
    })
  }

  render() {
    return (
      <Items
        {...this.props}
        _add={this._add.bind(this)}
        _remove={this._remove.bind(this)}
        _toggle={this._toggle.bind(this)}
        _edit={this._edit.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listId: state.items.listId,
    itemIds: state.items.itemIds,
    items: state.items.items,
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
