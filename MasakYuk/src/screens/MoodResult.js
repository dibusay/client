import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Container, Content, Card, CardItem, Text, Thumbnail } from 'native-base'
import RecipeDetail from '../components/RecipeDetail'

class MoodResult extends Component {
  constructor() {
    super()
  }

  render() {
    const image = this.props.navigation.state.params.image
    const { 
      recipes, 
      food, 
      mood, 
      age,
      gender
    } = this.props.navigation.state.params.result

    return (
      <Container style={styles.container}>
        <Content>
          <Card style={[styles.top, styles.orangeColor, styles.card]}>
            <CardItem style={[styles.top, styles.orangeColor]}>
              <Thumbnail circle source={{ uri: image }} style={styles.thumbnail} />
            </CardItem>
            <CardItem style={[styles.top, styles.orangeColor, { flexDirection: 'column' }]}>
              <Text style={styles.moodText}>You are a...</Text>
              <Text style={[styles.moodText, { fontSize: 24, fontWeight: 'bold' }]}>{gender}, {age} years old</Text>
            </CardItem>
            <CardItem style={[styles.top, styles.orangeColor, { flexDirection: 'column' }]}>
              <Text style={styles.moodText}>Mood</Text>
              <Text style={[styles.moodText, { fontSize: 24, fontWeight: 'bold' }]}>You're {mood}!</Text>
            </CardItem>
            <CardItem style={[styles.top, styles.orangeColor, { flexDirection: 'column', marginBottom: 8, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]}>
              <Text style={styles.moodText}>Matched Ingredient</Text>
              <Text style={[styles.moodText, { fontSize: 24, fontWeight: 'bold' }]}>{food}</Text>
            </CardItem>
          </Card>
          <FlatList
            data={recipes}
            renderItem={({item}) => <RecipeDetail navigation={this.props.navigation} recipe={item} />}
            keyExtractor={(item, index) => String(index)}
          />
          {/* <Text>{JSON.stringify(mood)}</Text>
          <Text>{JSON.stringify(food)}</Text>
          <Text>{JSON.stringify(age)}</Text>
        <Text>{JSON.stringify(recipes)}</Text> */}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodText: {
    color: 'white',
    fontSize: 14
  },
  orangeColor: {
    backgroundColor: '#ffc107'
  },
  card: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    marginBottom: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  thumbnail: { 
    height: 120, 
    width: 120, 
    borderWidth: 4, 
    borderColor: '#fff2cd', 
    borderRadius: 60, 
    marginTop: 8
  }
})

export default MoodResult