import React, { Component } from 'react'
import { View, Image, Dimensions } from 'react-native'
import { 
  Text, 
  Container, 
  Content,
  Button,
  Header, 
  Body,
  H2, H3
} from 'native-base'

class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('detail', 'Detail')
    }
  }
  // render() {
  //   const { detail } = this.props.navigation.state.params
    // return (
    //   <Container>
    //     <Content>
    //       <Image source={{ uri: detail.image }} resizeMode={'cover'} style={{ width: Dimensions.get('window').width }} />
    //       <Container style={styles.container}>
    //         <H2>{detail.label}</H2>
    //         <Container style={styles.section}>
    //           <H3>Ingredients</H3>
    //           {
    //             detail.ingredientLines.map((ingredient, index) => {
    //               return <Text style={styles.text}>- {ingredient}</Text>
    //             })
    //           }
    //         </Container>
    //         <Container style={styles.section}>
    //           <H3>Cooking Time:</H3>
    //           <Text style={styles.text}>{detail.totalTime} minutes</Text>
    //         </Container>
    //         <Container style={styles.section}>
    //           <H3>Calories:</H3>
    //           <Text style={styles.text}>{detail.calories.toFixed()}</Text>
    //         </Container>
    //         <Text style={styles.text}>{detail.uri}</Text>
    //       </Container>
    //     </Content>
    //   </Container>
    // )
  // }
  render () {
    const { detail } = this.props.navigation.state.params
    return (
      <Container style={{ flex: 1 }}>
        <Content>
          <Image source={{ uri: detail.image }} 
            resizeMode={'cover'} style={{ width: Dimensions.get('window').width, height: 200 }} />
          <Content style={styles.container}>
            <Content style={[styles.section, { flexDirection: 'row' }]}>
              <Text style={styles.mainTitle}>{detail.label}</Text>
              <Button rounded small danger><Text>Favourite!</Text></Button>
            </Content>
            <Content style={styles.section}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              {
                detail.ingredientLines.map((ingredient, index) => {
                  return <Text key={index} style={styles.text}>- {ingredient}</Text>
                })
              }
            </Content>
            <Content style={styles.section}>
              <Text style={styles.sectionTitle}>Cooking Time</Text>
              <Text style={styles.text}>{detail.totalTime} minutes</Text>
            </Content>
            <Content style={styles.section}>
              <Text style={styles.sectionTitle}>Calories</Text>
              <Text style={styles.text}>{detail.calories.toFixed()} kcal</Text>
            </Content>
          </Content>
        </Content>
      </Container>
    )
  }
}

const styles = {
  container: {
    marginRight: 16, marginLeft: 16,
    backgroundColor: '#fff'
  },
  section: {
    marginTop: 8, marginBottom: 8
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffc107'
  },
  text: {
    color: '#999',
    fontSize: 16
  }
}

export default DetailScreen