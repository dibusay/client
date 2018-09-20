import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Main from './src/components/Main';
import Recipes from './src/components/Recipes'
import Favourites from './src/components/Favourites'
import Home from './src/components/Home';

export default class App extends Component{
  render() {
    return (
      // <Navigator />
      <MainNavigator/>
    );
  }
}




const HomeStack =  createStackNavigator({
  Home: {
    screen: Home,
  },
  Recipes: Recipes
  
})

const MainNavigator = createBottomTabNavigator({
  Home: {
      screen: HomeStack
  },
  Favourites: {
      screen: Favourites
  }
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions:{
      showIcon: true,
      showLabel: false,
      style:{
          backgroundColor: '#ffc107'
      },
      activeTintColor: 'red',
      inactiveTintColor: 'white'
  }
})



