import React, {Component} from 'react';
import { Container, Text, Content, Icon} from 'native-base'
import RecipeDetail from './RecipeDetail'
import firebase from 'react-native-firebase';


export default class Favourites extends Component{
   componentDidMount(){
    firebase.auth().signInAnonymously()
    .then((user) => {
      console.log('user===>',user.isAnonymous);
    });
   }
    render(){
        return(
            <Container>
                <Text>This is Favourites Screen</Text>
            </Container>
           
        )
    }
}

