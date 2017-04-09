import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import RewardForm from '../components/RewardForm'
import * as RewardsActions from '../actions/rewards'

class RewardDetailsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.params || {},
      mode: (this.props.params.rewardId)? 'edit':'add'
    }
  }

  _add(data) {
    this.props.addReward(data).then(() => {
      Actions.pop()
    })
  }

  _update(data) {
    this.props.changeReward(this.state.data.rewardId, data).then(() => {
      Actions.pop()
    })
  }

  render() {
    return (
      <RewardForm
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
    error: state.rewards.error,
    adding: state.rewards.adding,
    changing: state.rewards.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RewardsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardDetailsContainer)
