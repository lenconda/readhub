import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RefreshListView, { RefreshState } from '../components/RefreshListView'
import { Toast, List } from 'antd-mobile'
import { Icon } from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { change_topic } from '../redux/actions'
import api from '../api'
import utils from '../utils'

const mapStateToProps = state => {
  return {
    topic: state.topic
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTopic: (topic) => {
      console.log('dispatching topic to store...')
      dispatch(change_topic(topic))
    }
  }
}

class Topics extends Component {

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
      })
    }).catch(error => {
      Toast.fail('加载失败', 1)
    })
  }

  onHeaderRefresh = () => {
    this.setState({RefreshState: RefreshState.HeaderRefreshing})
    console.log('Head refreshing...')
    api.get(`/topic?pageSize=10`).then(res => {
      Toast.success('刷新成功', 1)
      this.setState({
        topicItems: res.data.data,
        lastCursor: res.data.data[res.data.data.length - 1].order,
        RefreshState: RefreshState.Idle,
      })
    }).catch(error => {
      Toast.fail('刷新失败', 1)
    })
  }

  onFooterRefresh = () => {
    this.setState({RefreshState: RefreshState.FooterRefreshing})
    console.log('Foot refreshing...')
    api.get(`/topic?pageSize=10&lastCursor=${this.state.lastCursor}`).then(res => {
      if (res.data.data.length < 1) return
      let newList = res.data.data
      this.setState({
        topicItems: [...this.state.topicItems, ...newList],
        lastCursor: res.data.data[res.data.data.length - 1].order,
        RefreshState: RefreshState.Idle,
      })
    }).catch(error => [
      Toast.fail('加载失败', 1)
    ])
  }

  topicItem = ({ item }) => {

    return <List style={styles.topicCard}>
      <List.Item
        multipleLine={true}
        wrap={true}
        onClick = {() => {
          Toast.loading('加载中...', 0)
          api.get(`/topic/${item.id}`).then(res => {
            this.props.changeTopic(res.data)
            Actions.push('topicContainer')
            Toast.hide()
          }).catch(error => {Toast.fail('加载失败', 1)})
        }}
        style={{ paddingTop: 10 }}
      >
        {item.title}
        <List.Item.Brief style={{ marginTop: 10, marginBottom: 10 }}>{item.summary}</List.Item.Brief>
        <List.Item.Brief>
          <Text style={{ color: '#4867ad' }}>{utils.getDateDiff(item.publishDate)}</Text>
        </List.Item.Brief>
      </List.Item>
    </List>

  }

  render() {

    return (
      <View style={styles.container}>
        <RefreshListView
          data={this.state.topicItems}
          renderItem={this.topicItem}
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

  topicCard: {
    marginTop: 10,
    marginBottom: 10,
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(Topics)