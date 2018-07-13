import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'antd-mobile'
import { Actions } from 'react-native-router-flux'

export default class Today extends Component {

  constructor(props) {
    super(props)
  }

  onRightClick() {

  }

  componentWillMount() {
    Actions.refresh({
      rightTitle: 'Options',
      onRight: this.onRightClick
    })
  }

  render() {
    return (
      <View>
        <Text>This is Today page</Text>
        <Button>Fuck</Button>
      </View>
    )
  }
}