import React, { Component } from 'react'
import { View, Text, WebView } from 'react-native'
import { Toast } from 'antd-mobile'

export default class NewsContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: this.props.url }}
          injectedJavaScript="window.postMessage(document.title)"
          onError={() => {
            Toast.offline('网页加载失败', 1)
          }}
        />
      </View>
    )

  }

}