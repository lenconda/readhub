import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Card } from 'antd-mobile'
import api from '../api'

export default class Topics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      topicItems: [],
      // isLoading: true,
      RefreshState: RefreshState.Idle,
      lastCursor: 0
    }
  }

  componentDidMount() {
    this.onHeaderRefresh()
  }

  // fetchData = (type, size, lastCursor) => {
  //   let cursor = lastCursor || ''
  //   return axios.create(`/${type}?size=${size}&lastCuror=${cursor}`)
  // }

  // onEndReached = () => {
  //   if (this.state.isLoading) return
  //   this.setState({ isLoading: true })
  //   api.get(`/topic?size=10&lastCursor=${this.state.lastCursor}`).then(res => {
  //     let data = { ...this.state.dataSource, ...res.data.data }
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(data),
  //       isLoading: false,
  //     })
  //   })
  // }

  onHeaderRefresh = () => {
    this.setState({refreshState: RefreshState.HeaderRefreshing})
    console.log('Head refreshing...')
    api.get(`/topic?pageSize=10`).then(res => {
      console.log(res)
      this.setState({
        topicItems: res.data.data.reverse(),
        lastCursor: res.data.data[res.data.data.length - 1].order,
        refreshState: RefreshState.Idle,
      })
    })
  }

  onFooterRefresh = () => {
    this.setState({refreshState: RefreshState.FooterRefreshing})
    console.log('Foot refreshing...')
    api.get(`/topic?pageSize=10&lastCursor=${this.state.lastCursor}`).then(res => {
      if (res.data.data.length < 1) return
      console.log(res)
      this.setState({
        topicItems: this.state.topicItems.concat(res.data.data),
        lastCursor: res.data.data[res.data.data.length - 1].order,
        refreshState: RefreshState.Idle,
      })
    })
  }

  renderItem = () => {
    // let topicItemArray = []
    // this.state.topicItems.map((topicItem, index) => {
    //   topicItemArray.push(
    //     <TouchableOpacity activeOpacity={0.6}>
    //       <Card style={styles.topicCard}>
    //         <Card.Header title={topicItem.title} />
    //         <Card.Body>
    //           <Text>{topicItem.summary}</Text>
    //         </Card.Body>
    //       </Card>
    //     </TouchableOpacity>
    //   )
    // })
    // return topicItemArray

    // let index = this.state.topicItems.length - 1
    // return <TouchableOpacity activeOpacity={0.6}>
    //   <Card sindex = this.state.topicItems.length - 1tyle={styles.topicCard}>
    //     <Card.Header title={this.state.topicItems[index--].title} />
    //     <Card.Body>
    //       <Text>{this.state.topicItems[index--].summary}</Text>
    //     </Card.Body>
    //   </Card>
    // </TouchableOpacity>
  }



  topicItem = () => {
    // if (index < 0)
    // const item = this.state.topicItems[index--]
    let index = this.state.topicItems.length - 1
    return <TouchableOpacity activeOpacity={0.6}>
      <Card full style={styles.topicCard}>
        <Card.Header title={this.state.topicItems[index--].title} />
        <Card.Body>
          <Text>{this.state.topicItems[index--].summary}</Text>
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
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
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
  }
})