import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import TechNews from './news/TechNews'
import Developers from './news/Developers'
import BlockChain from './news/BlockChain'

export default class News extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('News page is rendered')
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <RNScrollableTabView
          renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={styles.underline}
          tabBarTextStyle={styles.tabText}
          tabBarActiveTextColor={'#4867ad'}
          tabBarInactiveTextColor={'#999'}
        >
          <TechNews tabLabel={'科技动态'} ref={'科技动态'} />
          <Developers tabLabel={'开发者资讯'} ref={'开发者资讯'} />
          <BlockChain tabLabel={'区块链快讯'} ref={'区块链快讯'} />
        </RNScrollableTabView>
      </View>
    )

  }

}

const styles = StyleSheet.create({

  underline: {
    backgroundColor: '#4867ad',
    position: 'absolute',
    bottom: -1,
    height: 2.5,
  },

  tabText: {
    fontSize: 14,
    paddingTop: 10,
  },

})