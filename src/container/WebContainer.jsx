import React, { Component } from 'react'
import { View, Text, WebView } from 'react-native'
import { Toast } from 'antd-mobile'
import { Actions } from 'react-native-router-flux'
import RNADWebview from 'react-native-advanced-webview'

export default class WebContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    Actions.refresh({
      rightTitle: '',
      onRight: () => null
    })
  }

  render() {

    const patchPostMessageFunction=function(){
      var originalPostMessage=window.postMessage;
      var patchedPostMessage=function(message,targetOrigin,transfer){
        originalPostMessage(message,targetOrigin,transfer);
      };
      patchedPostMessage.toString=function(){
        return String(Object.hasOwnProperty).replace('hasOwnProperty','postMessage');
      };
      window.postMessage=patchedPostMessage;
    };

    const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();\nwindow.postMessage(document.title);'

    return (
      <View style={{ flex: 1 }}>
        <RNADWebview
          ref={(webview) => this.webview = webview}
          source={{ uri: this.props.url }}
          initialJavaScript={patchPostMessageJsCode}
          onError={() => {Toast.offline('网页加载失败', 1)}}
          onLoadStart={() => {Toast.loading('加载中...')}}
          onLoad={() => {Toast.hide()}}
          onMessage={e => {
            console.log('get message')
            Actions.refresh({title: e.nativeEvent.data})
          }}
          allowFileAccessFromFileURLs={true}
        />
      </View>
    )

  }

}