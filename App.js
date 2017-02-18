import React, { Component } from 'react';
import { AppRegistry, Text, Button, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AllListsScreen from './src/components/AllListsScreen';
import ListScreen from './src/components/ListScreen';
import RewardsScreen from './src/components/RewardsScreen';

const MainScreenNavigator = TabNavigator({
  Lists: { screen: AllListsScreen },
  Rewards: { screen: RewardsScreen },
});

const App = StackNavigator({
  Home: { screen: MainScreenNavigator, navigationOptions: {title: 'Encore List'} },
  List: { screen: ListScreen },
});

AppRegistry.registerComponent('encorelist', () => App);
