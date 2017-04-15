import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import ListForm from '../components/ListForm'
import * as ListsActions from '../actions/lists'

class ListDetailsContainer extends Component {
  constructor(props) {
    super(props)
  }

  _add(data) {
    this.props.addList(data).then(() => {
      Actions.pop()
    })
  }

  _update(data) {
    this.props.changeList(this.props.listId, data).then(() => {
      Actions.pop()
    })
  }

  render() {
    return (
      <ListForm
        title={this.props.title}
        mode={this.props.mode}
        error={this.props.error}
        adding={this.props.adding}
        changing={this.props.changing}
        _add={this._add.bind(this)}
        _update={this._update.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeList = {
    listId: null,
    title: '',
    mode: 'ADD'
  }

  // if a listId has been passed in
  let listId = ownProps.params.listId
  if (listId) {
    let list = state.lists.lists[listId]
    activeList.listId = list.id
    activeList.title = list.title
    activeList.mode = 'EDIT'
  }

  return {
    ...activeList,
    error: state.lists.error,
    adding: state.lists.adding,
    changing: state.lists.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetailsContainer)
