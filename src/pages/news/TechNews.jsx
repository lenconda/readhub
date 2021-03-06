import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import RefreshListView, { RefreshState } from '../../components/RefreshListView'
import { Toast, List } from 'antd-mobile'
import { Actions } from 'react-native-router-flux'

import api from '../../api'
import utils from '../../utils'

export default class TechNews extends Component {

  constructor(props) {
    super(props)
    this.state = {
      techNewsItems: [],
      RefreshState: RefreshState.Idle,
      lastCursor: utils.getTimeStamp()
    }
  }

  getNews = (isFooterRefreshing = false, lastCursor = null) => {
    api.get(`/news?pageSize=10&lastCursor=${lastCursor || this.state.lastCursor}`).then(res => {
      if (!isFooterRefreshing) { Toast.success('刷新成功', 1) }
      this.setState({
        techNewsItems: isFooterRefreshing ? [...this.state.techNewsItems, ...res.data.data] : res.data.data,
        RefreshState: RefreshState.Idle,
        lastCursor: Date.parse(new Date(res.data.data[res.data.data.length - 1].publishDate))
      })
    }).catch(error => {
      this.setState({
        RefreshState: RefreshState.Idle
      })
      Toast.fail('刷新失败', 1)
    })
  }

  componentDidMount() {
    console.log('TechNews is initializing...')
    this.getNews()
  }

  onHeaderRefresh = () => {
    this.setState({RefreshState: RefreshState.HeaderRefreshing})
    console.log('Head refreshing...')
    this.getNews(false, utils.getTimeStamp())
  }

  onFooterRefresh = () => {
    this.setState({RefreshState: RefreshState.FooterRefreshing})
    console.log('Foot refreshing...')
    this.getNews(true)
  }

  newsItem = ({ item }) => {

    return <List style={{ marginTop: 10, marginBottom: 10 }}>
      <List.Item
        multipleLine={true}
        wrap={true}
        style={{ paddingTop: 10 }}
        onClick={() => {
          Actions.push('newsContainer', {url: item.url})
        }}
      >
        {item.title}
        {item.summary === '' ? <View></View> :
          <List.Item.Brief style={{ marginTop: 10, marginBottom: 10 }}>{item.summary}</List.Item.Brief>
        }
        <List.Item.Brief style={{ color: '#4867ad' }}>{`${item.siteName}${item.authorName ? ` / ${item.authorName}` : ''}  ${utils.getDateDiff(item.publishDate)}`}</List.Item.Brief>
      </List.Item>
    </List>

  }

  render() {

    return (
      <View style={styles.container}>
        <RefreshListView
          data={this.state.techNewsItems}
          renderItem={this.newsItem}
          refreshState={this.state.RefreshState}
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

})