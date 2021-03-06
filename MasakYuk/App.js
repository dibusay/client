import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator  } from 'react-navigation';
import Recipes from './src/components/Recipes'
import Favourites from './src/screens/Favourites'
import Home from './src/components/Home';
import DetailScreen from './src/screens/DetailScreen'
import SignUp from './src/components/SignUp'
import Login from './src/components/Login'
import Loading from './src/components/Loading'
import LogoTitle from './src/components/LogoTitle'
import Rekognition from './src/components/Rekognition'
import MoodResult from './src/screens/MoodResult'
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
  },
  Recipes:{
    screen: Recipes,
    navigationOptions:{
      headerTitle: <LogoTitle />,
      // headerTitleStyle : {
      //   alignSelf:'center',
      //   textAlign: 'center',
      //   fontWeight:'500',
      //   fontSize:24,
      //   color: 'white',
      //   width: '79%',
      //   justifyContent: "center", 
      // },
      headerStyle:{backgroundColor:'#ffc107'}
    }
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: {
      headerTitle: <LogoTitle />,
      headerStyle:{backgroundColor:'#ffc107'}
    }
  }
})

const FavouritesStack =  createStackNavigator({
  Favourites: {
    screen: Favourites,
    navigationOptions:{
      headerTitle: <LogoTitle />,
      headerStyle:{backgroundColor:'#ffc107'}
    }
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: {
      headerTitle: <LogoTitle />,
      headerStyle:{backgroundColor:'#ffc107'}
    }
  }
})

const RekognitionStack = createStackNavigator({
  Rekognition: {
    screen: Rekognition,
    navigationOptions:{
      headerTitle: <LogoTitle />,
      headerStyle:{backgroundColor:'#ffc107'}
    }
  },
  MoodResult: {
    screen: MoodResult,
    navigationOptions:{
      headerTitle: <LogoTitle />,
      headerStyle:{backgroundColor:'#ffc107'}
    } 
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: {
      headerTitle: <LogoTitle />,
      // headerTitleStyle : {
      //   alignSelf:'center',
      //   textAlign: 'center',
      //   fontWeight:'500',
      //   fontSize:24,
      //   color: 'white',
      //   width: '90%',
      //   justifyContent: "center", 
      // },
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


