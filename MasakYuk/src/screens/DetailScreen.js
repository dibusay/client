import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Dimensions } from 'react-native'
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
  users: state.users
}

const mapDispatchToProps = (dispatch) => {

}

class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('detail', 'Detail')
    }
  }

  state = {
    isFavourite: false
  }

  componentDidMount() {
    // check if already favourited or not
    // compare favourite data from database with favourites inside user array
  }

  handleAddFavourite = () => {
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

export default DetailScreen