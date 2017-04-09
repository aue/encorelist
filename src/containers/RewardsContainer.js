import React, { Component } from 'react'
import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { auth } from '../firebase'

import Rewards from '../components/Rewards'
import * as RewardsActions from '../actions/rewards'

class RewardsContainer extends Component {
  constructor(props) {
    super(props)
  }

  gotoAddReward() {
    Actions.rewardDetails({ params: {}, title: 'Add Reward' })
  }

  gotoRemoveReward(rewardId) {
    Alert.alert(
      'Delete this reward?',
      'This will be removed',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removeReward(rewardId), style: 'destructive'},
      ]
    )
  }

  componentWillMount() {
    if (auth.currentUser)
      this.props.getUserRewards(auth.currentUser.uid)
  }

  render() {
    return (
      <Rewards
        { ...this.props }
        gotoAddReward={this.gotoAddReward.bind(this)}
        gotoRemoveReward={this.gotoRemoveReward.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  let rewards = []
  if (!(state.rewards.loadingRewardIds || state.rewards.loadingRewards)) {
    rewards = Object.keys(state.rewards.rewardIds)
      .map(rewardId => state.rewards.rewards[rewardId])
      .filter(value => value !== null)
  }

  return {
    rewards,
    loading: state.rewards.loadingRewardIds || state.rewards.loadingRewards,
    error: state.rewards.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RewardsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsContainer)
