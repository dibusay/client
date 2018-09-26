import React, { Component } from 'react'
import { Image } from 'react-native'

export default class LogoTitle extends Component {
  render() {
    return (
      <Image
        source={require('../assets/masakyuk1.png')}
        style={{ marginLeft: 8 }}
      />
    )
  }
}