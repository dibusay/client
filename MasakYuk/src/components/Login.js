import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'
import axios from 'axios'
// const apiURL = 'http://192.168.0.76:3000'
const apiURL = 'https://server-kujumibbvi.now.sh'

class Login extends Component {
  state = { 
    email: '',
    password: '',
    errorMessage: null
  }

  componentDidMount() {
    AsyncStorage.getItem('uid')
    .then(data => {
      console.log('uid', data)
    })
  }

  handleLogin = () => {
    const { email, password } = this.state
    if(email==="" || password===""){
      Alert.alert("Please Enter All the Values.");
    }else{
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((response) => {
        // needs refactoring, move to actionCreator if possible
        axios({
          method: 'post',
          url: `${apiURL}/users`,
          data: {
            userId: response.user._user.uid,
            userName: response.user._user.displayName,
            email: response.user._user.email,
          }
        })
        .then(({ data }) => {
          console.log('masuk login route')
          AsyncStorage.setItem('uid', response.user._user.uid)
          .then(() => {
            console.log('masuk asyncstorage')
            this.props.navigation.navigate('Main')
          })
          .catch(err => {
            console.log('error asyncstorage', err)
          })
        })
        .catch(({ response }) =>{
          console.log('error login', response)
        })
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
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
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

export default Login