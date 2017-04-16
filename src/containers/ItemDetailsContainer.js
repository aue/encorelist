import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import ItemForm from '../components/ItemForm'
import * as ItemsActions from '../actions/items'

class ItemDetailsContainer extends Component {
  constructor(props) {
    super(props)
  }

  add = (data) => {
    // listId, data
    this.props.addListItem(this.props.listId, data).then(() => {
      Actions.pop()
    })
  }

  update = (data) => {
    let oldData = {
      title: this.props.title,
      complete: this.props.complete,
      points: this.props.points
    }
    // listId, itemId, data, oldData
    this.props.changeListItem(this.props.listId, this.props.itemId, data, oldData).then(() => {
      Actions.pop()
    })
  }

  render() {
    return (
      <ItemForm
        title={this.props.title}
        complete={this.props.complete}
        points={this.props.points}
        mode={this.props.mode}
        error={this.props.error}
        addingItem={this.props.addingItem}
        changingItem={this.props.changingItem}
        add={this.add}
        update={this.update}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeItem = {
    listId: null,
    itemId: null,
    title: '',
    complete: false,
    points: 0,
    mode: 'ADD'
  }

  // if a listId has been passed in
  let listId = ownProps.params.listId
  if (listId)
    activeItem.listId = listId

  // if a itemId has been passed in
  let itemId = ownProps.params.id
  if (itemId) {
    let item = state.items.items[itemId]
    activeItem.itemId = itemId
    activeItem.title = item.title
    activeItem.complete = item.complete
    activeItem.points = item.points
    activeItem.mode = 'EDIT'
  }

  return {
    ...activeItem,
    error: state.items.error,
    addingItem: state.items.addingItem,
    changingItem: state.items.changingItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ItemsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsContainer)
