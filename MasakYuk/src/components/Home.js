import React, {Component} from 'react';
import { Container, Text, Content, Icon} from 'native-base'
import { TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
const Clarifai = require('clarifai')

const clarifai = new Clarifai.App({
  apiKey: '763a686895a647f094356fba50ac6145'
})

const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  }


export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
          image: null
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
            
            clarifai.models.predict(Clarifai.FOOD_MODEL, file)
            .then(result => {
              console.log("berhasil", result);
              const ingredients = []
              const { concepts } = result.outputs[0].data
              if (concepts && concepts.length > 0) {
                for (const prediction of concepts) {
                  console.log(prediction.name,"-----",prediction.value);
                  ingredients.push(prediction.name)
                }
              }

              const {navigate} = this.props.navigation
              // console.log(recipe);
              
              navigate('Recipes')
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

    render(){
        return(
                <Container>
                    <Text>This is Home Screen</Text>
                    <TouchableOpacity style={{backgroundColor:'green',margin:10,padding:10}}
                        onPress={this.addImage}
                    >   
                        <Text style={{color:'#fff'}}>Select Image</Text>
                    </TouchableOpacity>
                </Container>
        )
    }
}

