import React, {Component} from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from 'react-navigation'
import { Container, Text } from 'native-base'

import Favourites from './Favourites'
import Home from './Home'

export default class Main extends Component{
    static navigationOptions = {
        title: 'masakYuk'
    }
    render(){
        return(
                <MainNavigator>
                    <Text>This is Main Screen</Text>
                </MainNavigator>
           
        )
    }
}



// export default createBottomTabNavigator({
//     Home: {
//         screen: Home,
//         navigationOptions:{
//             header: null,
//             tabBarLabel: 'Home',
//             tabBarIcon: ({tintColor}) =>(
//                 <Icon color={tintColor} name="home" size={25}></Icon>
//             )
//         }
//     },
// })