import React, { Component } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import * as AccountActions from '../actions/account'

import styles from '../styles'
import Diamond from '../components/Diamond'
import PillButton from '../components/PillButton'

class AccountContainer extends Component {
  constructor(props) {
    super(props)
  }

  logout = () => {
    Alert.alert(
      'Log out',
      'Do you want to log out of Encore List?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.props.logout().then(() => {
            Actions.onboarding()
          })
        }}
      ]
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>{this.props.name}</Text>
          <Text>{this.props.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Points Available</Text>
          <View style={styles.pointsDisplay}>
            <Text style={styles.pointsDisplayText}>{this.props.points}</Text>
            <Diamond size={27} />
            <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold]}>pts</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Points Redeemed</Text>
          <View style={styles.pointsDisplay}>
            <Text style={styles.pointsDisplayText}>{this.props.redeemedPoints}</Text>
            <Diamond size={27} />
            <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold]}>pts</Text>
          </View>
        </View>

        <View style={styles.section}>
          <PillButton
            onPress={this.logout}
            title="Log Out"
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(AccountActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
