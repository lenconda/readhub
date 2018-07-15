import React, { Component } from 'react'
import { View, Text, WebView } from 'react-native'

export default class NewsContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: this.props.url }}
          injectedJavaScript='window.postMessage(document.title)'
          onError={() => {
            console.log(this.props.url)
          }}
        />
      </View>
    )
  }

}