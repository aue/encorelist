import React, { Component } from 'react';
import { AppRegistry, Text, Button, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AllListsScreen from './src/components/AllListsScreen';
import ListScreen from './src/components/ListScreen';
import ListEditScreen from './src/components/ListEditScreen';
import ListAddScreen from './src/components/ListAddScreen';
import RewardsScreen from './src/components/RewardsScreen';

const MainScreenNavigator = TabNavigator({
  Lists: { screen: AllListsScreen },
  Rewards: { screen: RewardsScreen },
}, {
  swipeEnabled: false,
  tabBarOptions: {
    style: {
      backgroundColor: 'gray',
    }
  }
});

const App = StackNavigator({
  Home: { screen: MainScreenNavigator, navigationOptions: {title: 'Encore List'} },
  List: { screen: ListScreen },
  ListEdit: { screen: ListEditScreen },
  ListAdd: { screen: ListAddScreen },
});

AppRegistry.registerComponent('encorelist', () => App);
