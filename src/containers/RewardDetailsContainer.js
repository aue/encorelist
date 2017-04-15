import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import RewardForm from '../components/RewardForm'
import * as RewardsActions from '../actions/rewards'

class RewardDetailsContainer extends Component {
  constructor(props) {
    super(props)
  }

  _add(data) {
    this.props.addReward(data).then(() => {
      Actions.pop()
    })
  }

  _update(data) {
    this.props.changeReward(this.props.rewardId, data).then(() => {
      Actions.pop()
    })
  }

  render() {
    return (
      <RewardForm
        title={this.props.title}
        pointCost={this.props.pointCost}
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
  let activeReward = {
    rewardId: null,
    title: '',
    pointCost: 0,
    mode: 'ADD'
  }

  // if a listId has been passed in
  let rewardId = ownProps.params.rewardId
  if (rewardId) {
    let reward = state.rewards.rewards[rewardId]
    activeReward.rewardId = reward.id
    activeReward.title = reward.title
    activeReward.pointCost = reward.pointCost
    activeReward.mode = 'EDIT'
  }

  return {
    ...activeReward,
    error: state.rewards.error,
    adding: state.rewards.adding,
    changing: state.rewards.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RewardsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardDetailsContainer)
