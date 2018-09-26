import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Card, CardItem, Thumbnail, Text, Icon, Spinner, Button } from 'native-base'
import CompressImage from 'react-native-compress-image';
import ImagePicker from 'react-native-image-picker'
import ImgToBase64 from 'react-native-image-base64'
import axios from 'axios'

const options={
    title: 'Detect your mood',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from your library',
}

export default class Rekognition extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            img: null,
            base64: null
        }
    }

    handleRekognition = () => {
        const { navigate } = this.props.navigation
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else {
              console.log('ImagePicker success! response =>', response);
              process.nextTick = setImmediate // RN polyfill
              this.setState({
                loading:true,
                img: response.uri
              })

              //*********** react-native-compress-image *************//
              CompressImage.createCompressedImage(response.path, '/storage/emulated/0/Android/data/com.masakyuk/files/Pictures')
              .then(result=>{
                ImgToBase64.getBase64String(result.uri)
                .then(base64String =>{
                //   console.log('base64String', base64String)
                    axios.post('http://35.240.255.70/mood', {
                        image: result.uri,
                        base64: base64String
                    })
                    .then(({data}) => {
                        console.log('data from mood===>', data)
                        var img  = this.state.img
                        this.setState({
                            loading:false,
                            base64: null,
                            img: null
                        })
                        navigate('MoodResult', { result: data, image: img })
                    })
                    .catch(err => {
                        console.log('error di mood ==>', err)
                    })
                })
                .catch(err=>{
                  console.log("base64String error ", err);
                })
              })
              .catch(err=>{
                console.log("error compress:",err);
              })
            }
        });
    }

    render(){
        let userImg = (
            <Card>
                <CardItem>
                    <Text>Detect My Current Mood</Text>
                </CardItem>
                <CardItem>
                    {
                        this.state.img ?  <Thumbnail source={{uri: this.state.img}} style={{height:250, width:300}}/> : <Text>No Image</Text>
                    }
                </CardItem>

                <CardItem>
                    <Icon name={'ios-color-wand-outline'} style={{color : '#ED4A6A'}} />
                    <Text>Checking now</Text>
                </CardItem>
            </Card>
        )
        let camera = (
            <View style={{marginTop: 100}}>
                <Text style={{ fontSize:30, fontFamily: 'sans-serif-thin', alignSelf: 'center'}}>Food for Mood</Text>
                <Icon onPress={this.handleRekognition} name="ios-camera" style={{fontSize: 200, color:"#e98df5", alignSelf: 'center'}}/>
            </View>
        )
        return(
            <Container style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Content>
                    {   this.state.img ? userImg : camera   }
                    {
                        this.state.loading ? <Spinner /> : <Text/>
                    }
                </Content>
          </Container>
        )
    }
}