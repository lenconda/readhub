import React, { Component } from 'react'
import { View } from 'react-native'

import Index from '../pages/Index'

export default class IndexContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Index />
      </View>
    )
  }
}