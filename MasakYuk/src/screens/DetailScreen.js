import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Container, Content, Header, Body } from 'native-base'

class DetailScreen extends Component {
  render() {
    const { detail } = this.props.navigation.state.params
    return (
      <Container>

      </Container>
    )
  }
}

export default DetailScreen