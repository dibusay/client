import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Container, Content, Spinner, Card, CardItem, Body, Text } from 'native-base'
import RecipeDetail from '../components/RecipeDetail'

class MoodResult extends Component {
  constructor() {
    super()
  }

  render() {
    const { 
      recipes, 
      foodType, 
      mood, 
      age 
    } = this.props.navigation.state.params.result

    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>You're {mood}!</Text>
                <Text>Best match: {foodType}</Text>
              </Body>
            </CardItem>
          </Card>

          <FlatList
            data={recipes}
            renderItem={({item}) => <RecipeDetail navigation={this.props.navigation} recipe={item} />}
            keyExtractor={(item, index) => String(index)}
          />
          {/* <Text>{JSON.stringify(mood)}</Text>
          <Text>{JSON.stringify(foodType)}</Text>
          <Text>{JSON.stringify(age)}</Text>
          <Text>{JSON.stringify(recipes)}</Text> */}
        </Content>
      </Container>
    )
  }
}

export default MoodResult