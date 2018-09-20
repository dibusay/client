import React, {Component} from 'react';
import { Container, Text, Content, Icon} from 'native-base'
import { createBottomTabNavigator } from 'react-navigation'

export default class Favourites extends Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='md-heart' style={{ color: tintColor }} />
        }
    }

    render(){
        return(
                <Container>
                    <Text>This is Favourites Screen</Text>
                </Container>
           
        )
    }
}

