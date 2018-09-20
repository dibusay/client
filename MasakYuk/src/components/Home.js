import React, {Component} from 'react';
import { Container, Text, Content, Icon} from 'native-base'

export default class Home extends Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='md-home' style={{ color: tintColor }} />
        }
    }

    render(){
        return(
                <Container>
                    <Text>This is Home Screen</Text>
                </Container>
        )
    }
}

