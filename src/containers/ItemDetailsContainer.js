import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import ItemForm from '../components/ItemForm'
import * as ItemsActions from '../actions/items'

class ItemDetailsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.params || {},
      mode: (this.props.params.id)? 'edit':'add'
    }
  }

  _add(data) {
    this.props.addListItem(this.state.data.listId, data).then(() => {
      Actions.pop()
    })
  }

  _update(data) {
    this.props.changeListItem(this.state.data.id, data).then(() => {
      Actions.pop()
    })
  }

  render() {
    return (
      <ItemForm
        { ...this.state.data }
        mode={this.state.mode}
        error={this.props.error}
        addingItem={this.props.addingItem}
        changingItem={this.props.changingItem}
        _add={this._add.bind(this)}
        _update={this._update.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.items.error,
    addingItem: state.items.addingItem,
    changingItem: state.items.changingItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ItemsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsContainer)
