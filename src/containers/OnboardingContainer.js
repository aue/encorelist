import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import common from '../styles/common'
import styles from '../styles'
import Diamond from '../components/Diamond'
import PillButton from '../components/PillButton'

export default class OnboardingContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.container, styles.welcome]}>
        <View style={styles.welcomeImage}>
          <Diamond color={common.brandPrimary} size={175} />
          <Text style={styles.welcomeTagline}>Turn to-do lists into reality.</Text>
        </View>

        <View style={[styles.section, styles.welcomeBottom]}>
          <PillButton
            onPress={() => Actions.form({ params: { mode: 'signup' }, title: 'Sign Up'})}
            title="Sign Up"
          />

          <View style={styles.signin}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => Actions.form({ params: { mode: 'login' }, title: 'Log In'})}>
              <Text style={styles.login}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}
