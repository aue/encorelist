import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import ListForm from '../components/ListForm'
import * as ListsActions from '../actions/lists'

class ListDetailsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.params || {},
      mode: (this.props.params.listId)? 'edit':'add'
    }
  }

  _add(data) {
    this.props.addList(data).then(() => {
      Actions.pop()
    })
  }

  _update(data) {
    this.props.changeList(this.state.data.listId, data).then(() => {
      Actions.pop()
    })
  }

  render() {
    return (
      <ListForm
        { ...this.state.data }
        mode={this.state.mode}
        error={this.props.error}
        adding={this.props.adding}
        changing={this.props.changing}
        _add={this._add.bind(this)}
        _update={this._update.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.lists.error,
    adding: state.lists.adding,
    changing: state.lists.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetailsContainer)
