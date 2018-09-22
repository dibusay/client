import React, {Component} from 'react';

import { Container, Text, Content, Button, Thumbnail, Spinner, Header, Body, Title, Icon, Right } from 'native-base'
import { View, StyleSheet, AsyncStorage} from 'react-native'

import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'

const Clarifai = require('clarifai')

const clarifai = new Clarifai.App({
  // rhesa utomo apiKey, don't forget to change
  apiKey: '5bd1146616fe44cd97f91cbfc084b12f'
})

const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from your library',
}

const saveUID = async uid => {
  try {
    await AsyncStorage.setItem('uid', uid)
  } catch (error) {
    console.log('error set to storage', error.message)
  }
}

const getUID = async () => {
  try {
    const uid = await AsyncStorage.getItem('uid') || null
  } catch (error) {
    console.log(error.message)
  }
  return uid
}

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
          images: [],
          loading: false,
          img: null,
          add: false,
          currentUser: null,
          errorMessage: null
        }
    }

    handleLogout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          AsyncStorage.removeItem('uid')
          .then(() => {
            this.props.navigation.navigate('Login')
          })
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    addImage=()=>{
        ImagePicker.showImagePicker(options, (response) => {
          // console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else {
            // console.log(response);
            process.nextTick = setImmediate // RN polyfill
            // const { data } = this.props.navigation.state.params.image
            const file = { base64: response.data }
            // let source = { uri: response.uri };
            console.log(file);
            this.setState({
              loading:true,
              img: response.uri
            })
            clarifai.models.predict(Clarifai.FOOD_MODEL, file)
            .then(result => {
              // console.log("berhasil", result);
              const ingredients = this.state.images
              
              const { concepts } = result.outputs[0].data
              if (concepts && concepts.length > 0) {
                for (const prediction of concepts) {
                  // console.log(prediction.name,"-----",prediction.value);

              //******************************************
                  if(prediction.value >= 0.95){
                    var status = true
                    for( var i = 0; i < ingredients.length; i++){
                      if(ingredients[i]===prediction.name){
                        status = false
                      }
                    }
                    if(status){
                      ingredients.push(prediction.name)
                    }
                  }
                }
              }

              console.log("ini ingredients", ingredients);

              this.setState({
                loading:false,
                add: true,
                images: ingredients
              })
            })
            .catch(e => {
              console.log("error",e);
     
           })
          }
        });
    
      }
    
    // componentWillMount() {
    //   AsyncStorage.getItem('uid')
    //   .then(data => {
    //     console.log('will mount asyncstorage data', data)
    //   })
    //   .catch(err => {
    //     console.log('error asyncstorage', err)
    //   })
    // }
    componentDidMount(){
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
      console.log('currentUser==>', currentUser)

      AsyncStorage.getItem('uid')
      .then(data => {
        console.log('did mount asyncstorage data', data)
        this.setState({
          loading:false,
          img: null
        })
      })
      .catch(err => {
        console.log('error asyncstorage', err)
      })

    }

    sendIngeridents=()=>{
      var ingredients = this.state.images
      const {navigate} = this.props.navigation
      this.setState({
        ingredients : [],
        add : false 
      })
      navigate('Recipes', { ingredients })
    }

    statusButton(){
      if(this.state.loading){
        return <Spinner style={{alignSelf:'center'}}></Spinner>
      }
      else{
        if(this.state.add){
          return (
            <View style={{flexDirection:"row", marginTop:15}}>
              <Button rounded  style={{alignSelf:'center'}}
                onPress={this.addImage}
              >   
                <Text style={{color:'#fff'}}>Add Image</Text>
              </Button>
              <Button rounded  style={{alignSelf:'center', marginLeft:10}}
                 onPress={this.sendIngeridents}
              >   
                <Text style={{color:'#fff'}}>Done</Text>
              </Button>
            </View>
          )
        }
        else{
          return (
            <Button rounded  style={{alignSelf:'center', marginTop:15}}
              onPress={this.addImage}
            >   
              <Text style={{color:'#fff'}}>Select Image</Text>
            </Button>
          )
        }
      }
    }
    render(){
        return(
          <Container>
            <Header style={{backgroundColor: '#ffc107'}}>
              <Body>
                <Title style={{paddingLeft: 8, fontSize: 24, fontWeight:'500'}}>masakYuk</Title>
              </Body>
              <Right>
                <Button transparent onPress={this.handleLogout}>
                  <Text>Logout</Text>
                  <Icon name='md-hand' />
                </Button>
              </Right>
            </Header>
                <View style={styles.greetContainer}>
                  <Text style={{color: 'gray', fontSize: 18}}>
                    Hi, {this.state.currentUser && this.state.currentUser.email}!
                  </Text>
                </View>

                <View style={{ marginVertical: '50%', justifyContent: 'center', alignItems: 'center'}}>
                  {
                    this.state.img ? (
                        <Thumbnail source={{uri: this.state.img}} style={{height:200, width:200, borderRadius:100}}/>
                      ) : (
                        <Thumbnail source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUVEOFjXa1INx1CB6hUXF--LiEnqimWs3TJDitFUbHWZGhPaErlg' }} style={{height:200, width:200}}/>
                    )
                  }
                  {this.statusButton()}
                </View>
          </Container>
        )
    }
}

const styles = StyleSheet.create({
  greetContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  }
})

export default Home