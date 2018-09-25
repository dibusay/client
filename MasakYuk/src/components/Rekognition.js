import React, { Component } from 'react'
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
                    axios.post('http://192.168.0.76:3000/mood', {
                        image: result.uri,
                        base64: base64String
                    })
                    .then(({data}) => {
                        console.log('data from mood===>', data)
                        this.setState({
                            loading:false,
                            base64: base64String
                        })
                        navigate('MoodResult', { result: data, image: this.state.img })
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

    // testNavigate = () => {
    //     this.props.navigation.navigate('MoodResult', {
    //         result: {
    //             age: '21',
    //             mood: 'happy',
    //             foodType: 'chamomile',
    //             recipes: [{ 
    //                 calories: 207.57771100000002,
    //                 image: 'https://www.edamam.com/web-img/bb2/bb221d581497fa559f5817ca1800ea65.jpg',
    //                 ingredientLines: [
    //                     '1 ounce semisweet or bittersweet chocolate, per person',
    //                     '1 tablespoon water, per person',
    //                     '1 large egg, per person'
    //                 ],
    //                 label: 'Chocolate Mousse',
    //                 totalTime: 20
    //             }, {
    //                 calories: 207.57771100000002,
    //                 image: 'https://www.edamam.com/web-img/bb2/bb221d581497fa559f5817ca1800ea65.jpg',
    //                 ingredientLines: [
    //                     '1 ounce semisweet or bittersweet chocolate, per person',
    //                     '1 tablespoon water, per person',
    //                     '1 large egg, per person'
    //                 ],
    //                 label: 'Chocolate Mousse',
    //                 totalTime: 20
    //             }]
    //         },
    //         image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Vegetables_and_eggs.JPG'
    //     })
    // }

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
            <Icon onPress={this.handleRekognition} name="ios-camera" style={{fontSize: 200, color:"#e98df5", marginTop: 140}}/>
        )
        return(
            <Container style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Content>
                    {   this.state.img ? userImg : camera   }
                    {
                        this.state.loading ? <Spinner /> : <Text/>
                    }
                    {/* <Button onPress={this.testNavigate}><Text>MOODRESULT PAGE TEST</Text></Button> */}
                </Content>
          </Container>
        )
    }
}

