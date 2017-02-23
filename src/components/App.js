import React, { Component } from 'react';
import { AppRegistry, Text, Button, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AllListsScreen from './AllListsScreen';
import ListScreen from './ListScreen';
import ListEditScreen from './ListEditScreen';
import ListAddScreen from './ListAddScreen';
import RewardsScreen from './RewardsScreen';

const MainScreenNavigator = TabNavigator({
  Lists: { screen: AllListsScreen },
  Rewards: { screen: RewardsScreen },
}, {
  swipeEnabled: false,
  tabBarOptions: {
    style: {
      backgroundColor: '#DDD',
    }
  }
});

const App = StackNavigator({
  Home: { screen: MainScreenNavigator, navigationOptions: {
      title: 'Encore List'
    }
  },
  List: { screen: ListScreen },
  ListEdit: { screen: ListEditScreen },
  ListAdd: { screen: ListAddScreen },
}, {
  cardStyle: {
    backgroundColor: '#fff',
  }
});

AppRegistry.registerComponent('encorelist', () => App);
