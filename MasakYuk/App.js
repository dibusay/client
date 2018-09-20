import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from './src/components/Main';

export default class App extends Component{
  render() {
    return (
      <Navigator />
    );
  }
}

const Navigator =  createStackNavigator({
  Main: {
    screen: Main,
  }
})
