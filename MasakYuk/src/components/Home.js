import React, {Component} from 'react';
import { Container, Text, Content, Icon, Button, Thumbnail, Spinner } from 'native-base'
import { View } from 'react-native'
import ImagePicker from 'react-native-image-picker'
const Clarifai = require('clarifai')

const clarifai = new Clarifai.App({
  apiKey: 'e84f6d23cedc4dd1b7d9e727af03d11b'
})

const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from your library',
  }


export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
          image: null,
          loading: false,
          img: null
        }
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
            console.log(response);
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
              const ingredients = []
              const { concepts } = result.outputs[0].data
              if (concepts && concepts.length > 0) {
                for (const prediction of concepts) {
                  console.log(prediction.name,"-----",prediction.value);

              //******************************************
                  if(prediction.value >= 0.95){
                    ingredients.push(prediction.name)
                  }
                }
              }
              this.setState({
                loading:false
              })
              const {navigate} = this.props.navigation
              
              navigate('Recipes', { ingredients })
            //******************************************
            
              // this.setState({ loading: false })
            })
            .catch(e => {
              console.log("error",e);
     
           })
          }
        });
    
      }


    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='md-home' style={{ color: tintColor }} />
        }
    }

    componentDidMount(){
      this.setState({
        loading:false,
        img: null
      })
    }
    render(){
        return(
          <Container style={{justifyContent:'center'}}>
                <View style={{alignSelf:'center'}}>
                  {
                    this.state.img ? (
                        <Thumbnail source={{uri: this.state.img}} style={{height:200, width:200, borderRadius:100}}/>
                      ) : (
                        <Thumbnail source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUVEOFjXa1INx1CB6hUXF--LiEnqimWs3TJDitFUbHWZGhPaErlg' }} style={{height:200, width:200}}/>
                    )
                  }
                  <Button rounded  style={{alignSelf:'center', marginTop:15}}
                      onPress={this.addImage}
                  >   
                      <Text style={{color:'#fff'}}>Select Image</Text>
                  </Button>
                  
                  {/*DELETE THIS AFTER*/}
                  {/* <Button onPress={() => this.props.navigation.navigate('DetailScreen')}><Text>TEST DETAIL PAGE</Text></Button> */}

                </View>
            {
              this.state.loading ? (
                // <View >
                  <Spinner style={{alignSelf:'center'}}></Spinner>
                // </View>
              ) : (
                <Text> </Text>
              )
            }
          </Container>
        )
    }
}

