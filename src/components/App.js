import React, { Component } from 'react';
import { AppRegistry, Text, Button, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AllListsScreen from './AllListsScreen';
import ListScreen from './ListScreen';
import ListEditScreen from './ListEditScreen';
import ListAddScreen from './ListAddScreen';
import RewardsScreen from './RewardsScreen';

import * as ListsActions from '../actions/lists';
//ListsActions.setupLists();

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
