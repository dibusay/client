import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Dimensions, AsyncStorage } from 'react-native'
import { 
  Text, 
  Container, 
  Content,
  Button,
} from 'native-base'

import { 
  addFavouriteToUser, 
  removeFavouriteFromUser 
} from '../actions/userAction'

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavourite: (uid, detail) => {
      dispatch(addFavouriteToUser(uid, detail))
    },
    removeFavourite: (uid, favouriteId) => {
      dispatch(removeFavouriteFromUser(uid, favouriteId))
    }
  }
}

// const saveUID = async uid => {
//   try {
//     await AsyncStorage.setItem('uid', uid)
//   } catch (error) {
//     console.log('error set to storage', error.message)
//   }
// }

// const getUID = async () => {
//   try {
//     const uid = await AsyncStorage.getItem('uid') || null
//   } catch (error) {
//     console.log(error.message)
//   }
//   return uid
// }

class DetailScreen extends Component {
  state = {
    isFavourite: false
  }

  componentDidMount() {
    console.log('detail data',this.props.navigation.state.params.detail)
    // check if already favourited or not
    // compare favourite data from database with favourites inside user array
  }

  handleAddFavourite = () => {
    const { detail } = this.props.navigation.state.params
    // const uid = '23456'
    AsyncStorage.getItem('uid')
    .then(uid => {
      this.props.addFavourite(uid, detail)
    })
    // if isFavourite is false
    // /favourite POST
  }

  handleRemoveFavourite = () => {
    // if isFavourite is true
    // /favourite/:id DELETE
  }

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
              <Button rounded small danger
                onPress={this.handleAddFavourite}
              >
                <Text>Favourite!</Text>
              </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)