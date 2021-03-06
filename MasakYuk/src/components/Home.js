import React, {Component} from 'react';

import { Container, Text, Button, Thumbnail, Spinner, Header, Body, Title, Icon, Right } from 'native-base'
import { View, StyleSheet, AsyncStorage, Button as NativeButton, TouchableOpacity } from 'react-native'
import CompressImage from 'react-native-compress-image';
import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'
import ImgToBase64 from 'react-native-image-base64'

import LogoTitle from '../components/LogoTitle'

const Clarifai = require('clarifai')

const clarifai = new Clarifai.App({
  apiKey: '763a686895a647f094356fba50ac6145'
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

    static navigationOptions = ({ navigation }) => {
      return {
        // title: 'masakYuk',
        headerTitle: <LogoTitle />,
        headerRight: (
          <TouchableOpacity onPress={navigation.getParam('handleLogout')}>
            <View style={{ flexDirection: 'row', marginRight: 12 }}>
              <Text style={{ marginRight: 8, color: 'white' }}>Logout</Text>
              <Icon style={{ color: 'white', fontSize: 21 }} name="md-hand" />
            </View>
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: '#ffc107' }
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

            //*********** react-native-compress-image *************//
            CompressImage.createCompressedImage(response.path, '/storage/emulated/0/Android/data/com.masakyuk/files/Pictures')
            .then(result=>{
              ImgToBase64.getBase64String(result.uri)
              .then(base64String =>{

                clarifai.models.predict(Clarifai.FOOD_MODEL, {base64: base64String})
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
              })
              .catch(err=>{
                console.log("error base64:", err);
                
              })
            })
            .catch(err=>{
              console.log("error compress:",err);
            })
          }
        });
    
      }
    
    componentDidMount(){
      this.props.navigation.setParams({ handleLogout: this.handleLogout })
      console.log('props', this.props.navigation)
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

    sendIngredients=()=>{
      var ingredients = this.state.images
      const {navigate} = this.props.navigation
      this.setState({
        images : [],
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
                 onPress={this.sendIngredients}
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