import React, { Component } from 'react'
import { StyleSheet, TextInput, View, Alert} from 'react-native'
import { Icon, Button, Text } from 'native-base'
import firebase from 'react-native-firebase'

export default class SignUp extends Component {
  state = { 
      email: '', 
      password: '', 
      errorMessage: null 
    }

    handleSignUp = () => {
        if(this.state.email === "" || this.state.password === ""){
            Alert.alert("Please Enter All the Values.");
        }else{
            firebase
            .auth()
            .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
        }
        
    }

    render() {
        return (
        <View style={styles.container}>
            <Icon name="md-egg" style={{fontSize: 100, color: 'white'}}/>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
             </Text>}
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                required
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
            />
            <View style={{marginTop: 15}}>
                <Button rounded primary onPress={this.handleSignUp}>
                    <Icon name='md-person-add' />
                    <Text>Sign Up</Text>
                </Button>
            </View>
            <View style={{marginTop: 15}}>
                <Button iconLeft transparent primary onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{color: 'gray'}}> Already have an account? Login </Text>
                </Button>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc107'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 8
  }
})