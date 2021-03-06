import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

import TopicsJsx from './Topics'
import News from './News'
import CareersJsx from './Careers'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Topics'
    }
  }

  renderTab = title => {
    Actions.refresh({
      title: title
    })
  }

  render() {

    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Topics'}
          title={'话题'}
          titleStyle={styles.tabText}
          selectTitleStyle={styles.selectedTitleStyle}
          renderIcon={() => <Icon color={'#999'} size={22} name={'comments'}></Icon>}
          renderSelectedIcon={() => <Icon color={'#4867ad'} size={22} name={'comments'}></Icon>}
          onPress={() => {
            this.setState({ selectedTab: 'Topics' })
            this.renderTab('话题')
          }}
        >
          <TopicsJsx />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'News'}
          title={'资讯'}
          titleStyle={styles.tabText}
          selectTitleStyle={styles.selectedTitleStyle}
          renderIcon={() => <Icon color={'#999'} size={22} name={'newspaper-o'}></Icon>}
          renderSelectedIcon={() => <Icon color={'#4867ad'} size={22} name={'newspaper-o'}></Icon>}
          onPress={() => {
            this.setState({ selectedTab: 'News' })
            this.renderTab('资讯')
          }}
        >
          <News />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Careers'}
          title={'招聘'}
          titleStyle={styles.tabText}
          selectTitleStyle={styles.selectedTitleStyle}
          renderIcon={() => <Icon color={'#999'} size={22} name={'group'}></Icon>}
          renderSelectedIcon={() => <Icon color={'#4867ad'} size={22} name={'group'}></Icon>}
          onPress={() => {
            this.setState({ selectedTab: 'Careers' })
            this.renderTab('招聘')
          }}
        >
          <CareersJsx />
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  tabText: {
    color: '#999',
    fontSize: 10
  },

  selectedTabText: {
    color: '#4867ad'
  }
})