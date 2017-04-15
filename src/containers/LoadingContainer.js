import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { auth } from '../firebase'

import * as AccountActions from '../actions/account'

import common from '../styles/common'
import Diamond from '../components/Diamond'

class LoadingContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.getUserData()
        Actions.app()
      }
      else Actions.onboarding()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Diamond color={common.mediumGrey} size={50} />
        <Text style={styles.text}>Encore List</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: common.lightGrey,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: common.mediumGrey,
    marginTop: 16
  }
})

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(AccountActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer)
