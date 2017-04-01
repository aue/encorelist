import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ItemForm from '../components/ItemForm'
import * as ItemsActions from '../actions/items'

class ItemDetailsContainer extends Component {
  constructor(props) {
    super(props)
    const { state } = this.props.navigation
    this.state = {
      data: state.params || {},
      mode: 'add'
    }
  }

  static navigationOptions = {
    title: ({ state }) => {
      return `${(!state.params.id)? 'Add':'Edit'} Item`
    },
  }

  _add(data) {
    const { goBack } = this.props.navigation
    this.props.addListItem(this.state.data.listId, data).then(() => {
      goBack()
    })
  }

  _update(data) {
    const { goBack } = this.props.navigation
    this.props.changeListItem(this.state.data.id, data).then(() => {
      goBack()
    })
  }

  componentWillMount() {
    if (this.state.data.id) this.setState({mode: 'edit'})
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
