import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator  } from 'react-navigation';
import Recipes from './src/components/Recipes'
import Favourites from './src/screens/Favourites'
import Home from './src/components/Home';
import DetailScreen from './src/screens/DetailScreen'
import SignUp from './src/components/SignUp'
import Login from './src/components/Login'
import Loading from './src/components/Loading'
import Rekognition from './src/components/Rekognition'
import { Icon } from 'native-base'
import { Provider } from 'react-redux';
import store from './src/store'

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}

const HomeStack =  createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      header: null,
      headerTitleStyle : {
        alignSelf:'center',
        textAlign: 'center',
        fontWeight:'500',
        fontSize:24,
        color: 'white',
        width: '79%',
        justifyContent: "center", 
      },
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
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: {
      title: 'masakYuk',
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
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: {
      // title: 'masakYuk',
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

const RekognitionStack = createStackNavigator({
  Rekognition: {
    screen: Rekognition,
    navigationOptions:{
      title: "Food for Mood",
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
            <Icon style={{ color: tintColor }} name="md-home" size={25}></Icon>
        )
      }
  },
  Favourites: {
      screen: FavouritesStack,
      navigationOptions:{
        header: null,
        tabBarLabel: 'Favourites',
        tabBarIcon: ({tintColor}) =>(
            <Icon style={{ color: tintColor }} name="md-heart" size={25}></Icon>
        )
      }
  },
  Rekognition: {
    screen: RekognitionStack,
    navigationOptions:{
      header: null,
      tabBarLabel: 'Rekognition',
      tabBarIcon: ({tintColor}) =>(
          <Icon style={{ color: tintColor }} name="md-contacts" size={25}></Icon>
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

const RootNavigator = createSwitchNavigator({
  Loading,
  SignUp,
  Login,
  Main: MainNavigator
}, {
  initialRouteName: 'Loading'
})


