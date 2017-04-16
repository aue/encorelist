import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as RewardsActions from '../actions/rewards'

import RedeemSuccess from '../components/RedeemSuccess'

class RewardRedeemSuccessContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <RedeemSuccess
        title={this.props.title}
        pointCost={this.props.pointCost}
        accountPoints={this.props.accountPoints}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeReward = {
    rewardId: null,
    title: '',
    pointCost: 0
  }

  // if a rewardId has been passed in
  let rewardId = ownProps.params.rewardId
  if (rewardId) {
    let reward = state.rewards.rewards[rewardId]
    activeReward.rewardId = reward.id
    activeReward.title = reward.title
    activeReward.pointCost = reward.pointCost
  }

  return {
    ...activeReward,
    accountPoints: state.account.points,
    error: state.rewards.error,
    adding: state.rewards.adding,
    changing: state.rewards.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RewardsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardRedeemSuccessContainer)
