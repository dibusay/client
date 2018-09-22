import React, {Component} from 'react';
// import { Container, Text, Content, Icon} from 'native-base'
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';


export default class Favourites extends Component{
    constructor() {
        super();
        this.state = {
          // firebase things?
        };
    }
    
    componentDidMount() {
        // firebase things?
    }

    render(){
        return(
            // <Container>
            //     <Text>This is Favourites Screen</Text>
            // </Container>
            <View style={styles.modules}>
            <Text style={styles.modulesHeader}>The following Firebase modules are pre-installed:</Text>
            {firebase.auth.nativeModuleExists && <Text style={styles.module}>auth()</Text>}
           
          </View>
           
        )
    }
}

const styles = StyleSheet.create({
    
    modules: {
      margin: 20,
    },
    modulesHeader: {
      fontSize: 16,
      marginBottom: 8,
    },
    module: {
      fontSize: 14,
      marginTop: 4,
      textAlign: 'center',
    }
  });

