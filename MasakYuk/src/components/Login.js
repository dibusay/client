import React, { Component } from 'react'
import { StyleSheet, TextInput, View, Alert } from 'react-native'
import { Icon, Button, Text } from 'native-base'
import firebase from 'react-native-firebase'

export default class Login extends Component {
  state = { 
    email: '',
    password: '',
    errorMessage: null
  }

  handleLogin = () => {
    const { email, password } = this.state
    if(email==="" || password===""){
      Alert.alert("Please Enter All the Values.");
    }else{
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Icon name="md-egg" style={{fontSize: 100, color: '#ffc107'}}/>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{marginTop: 15}}>
          <Button rounded info onPress={this.handleLogin}>
            <Icon name='people' />
            <Text> Login </Text>
          </Button>
        </View>
        <View style={{marginTop: 15}}>
          <Button iconLeft transparent primary onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={{color: 'gray'}}> Don't have an account? Sign Up </Text>
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
    backgroundColor: 'white'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: '#ffc107',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 8,
  }
})