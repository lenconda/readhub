import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import RefreshListView, { RefreshState } from '../components/RefreshListView'
import { Card, Toast } from 'antd-mobile'
import { Icon } from 'react-native-vector-icons/FontAwesome'

import api from '../api'

export default class Topics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      topicItems: [],
      RefreshState: RefreshState.Idle,
      lastCursor: 0
    }
  }

  componentDidMount() {
    console.log('Initializing...')
    api.get(`/topic?pageSize=10`).then(res => {
      this.setState({
        topicItems: res.data.data,
        lastCursor: res.data.data[res.data.data.length - 1].order,
        refreshState: RefreshState.Idle,
      })
    }).catch(error => {
      Toast.fail('刷新失败', 1)
    })
  }

  onHeaderRefresh = () => {
    this.setState({refreshState: RefreshState.HeaderRefreshing})
    console.log('Head refreshing...')
    api.get(`/topic?pageSize=10`).then(res => {
      Toast.success('刷新成功', 1)
      this.setState({
        topicItems: res.data.data,
        lastCursor: res.data.data[res.data.data.length - 1].order,
        refreshState: RefreshState.Idle,
      })
    }).catch(error => {
      Toast.fail('刷新失败', 1)
    })
  }

  onFooterRefresh = () => {
    this.setState({refreshState: RefreshState.FooterRefreshing})
    console.log('Foot refreshing...')
    api.get(`/topic?pageSize=10&lastCursor=${this.state.lastCursor}`).then(res => {
      if (res.data.data.length < 1) return
      let newList = res.data.data
      this.setState({
        topicItems: [...this.state.topicItems, ...newList],
        lastCursor: res.data.data[res.data.data.length - 1].order,
        refreshState: RefreshState.Idle,
      })
    }).catch(error => [
      Toast.fail('加载失败', 1)
    ])
  }

  topicItem = ({ item }) => {
    return <TouchableOpacity activeOpacity={0.6}>
      <Card full style={styles.topicCard}>
        <Card.Header title={item.title} />
        <Card.Body>
          <View style={styles.topicTextContainer}>
            <Text style={styles.topicText}>{item.summary}</Text>
          </View>
        </Card.Body>
      </Card>
    </TouchableOpacity>
  }

  render() {

    return (
      <View style={styles.container}>
        <RefreshListView
          data={this.state.topicItems}
          renderItem={this.topicItem}
          refreshState={this.state.refreshState}
          keyExtractor={(item, index) => index.toString()}
          onHeaderRefresh={() => {this.onHeaderRefresh()}}
          onFooterRefresh={() => {
            if (this.state.RefreshState === RefreshState.FooterRefreshing) return
            this.onFooterRefresh()
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },

  topicCard: {
    marginTop: 10,
    marginBottom: 10,
  },

  topicTextContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  topicText: {
    color: '#797979'
  }

})