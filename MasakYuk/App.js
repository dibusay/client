import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Recipes from './src/components/Recipes'
import Favourites from './src/components/Favourites'
import Home from './src/components/Home';
import { Icon } from 'native-base'
import { Provider } from 'react-redux';
import store from './src/store'

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <MainNavigator/>
      </Provider>
    );
  }
}

const HomeStack =  createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      title: "masakYuk",
      headerTitleStyle : {
        alignSelf:'center',
        textAlign: 'center',
        fontWeight:'500',
        fontSize:24,
        color: 'white',
        width: '79%',
        justifyContent: "center", 
      },
      headerStyle:{backgroundColor:'#ffc107'}
    }
  },
  Recipes:{
    screen: Recipes,
    navigationOptions:{
      title: "masakYuk",
      headerTitleStyle : {
        alignSelf:'center',
        textAlign: 'center',
        fontWeight:'500',
        fontSize:24,
        color: 'white',
        width: '79%',
        justifyContent: "center", 
      },
      headerStyle:{backgroundColor:'#ffc107'}
    }
  }
})

const FavouritesStack =  createStackNavigator({
  Favourites: {
    screen: Favourites,
    navigationOptions:{
      title: "masakYuk",
      headerTitleStyle : {
        alignSelf:'center',
        textAlign: 'center',
        fontWeight:'500',
        fontSize:24,
        color: 'white',
        width: '79%',
        justifyContent: "center", 
      },
      headerStyle:{backgroundColor:'#ffc107'}
    }
  }
  
})

const MainNavigator = createBottomTabNavigator({
  Home: {
      screen: HomeStack,
      navigationOptions:{
        header: null,
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) =>(
            <Icon color={tintColor} name="md-home" size={25}></Icon>
        )
      }
  },
  Favourites: {
      screen: FavouritesStack,
      navigationOptions:{
        header: null,
        tabBarLabel: 'Favourites',
        tabBarIcon: ({tintColor}) =>(
            <Icon color={tintColor} name="md-heart" size={25}></Icon>
        )
      }
  }
}, {
  tabBarOptions:{
      activeTintColor: 'red',
      inactiveTintColor: 'white',
      showIcon: true,
      showLabel: false,
      style:{
          backgroundColor: '#ffc107'
      }, 
  }
})



