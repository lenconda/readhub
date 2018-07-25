import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Toast, Button, List } from 'antd-mobile'
import { Actions } from 'react-native-router-flux'

import utils from '../utils'
import api from '../api'

export default class TopicContainer extends Component {

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

    let detail = this.props.data

    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{detail.title}</Text>
          <Text style={styles.summary}>{detail.summary}</Text>
        </View>
        <View style={styles.newsContainer}>
          {
            !detail.newsArray ? '' :
            detail.newsArray.map((news, index) => {
              return (
                <TouchableOpacity style={styles.urlLink} activeOpacity={0.6} key={index} onPress={() => {
                  Actions.push('newsContainer', {url: news.mobileUrl})
                }}>
                  <View>
                    <Text style={{ fontSize: 14, color: '#4867ad' }}>
                      <Icon name={'circle-o'} color={'#a3a3a3'} />&nbsp;
                      <Text style={styles.siteName}>{news.siteName}</Text>&nbsp;
                      {news.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>事件追踪</Text>
          <List>
            {
              !detail.timeline ? <List.Item><List.Item.Brief>暂无事件追踪</List.Item.Brief></List.Item> :
              detail.timeline.topics.map((topic, index) => {
                let dateObj = utils.getTimelineDate(topic.createdAt)
                return (
                  <List.Item arrow={'horizontal'} multipleLine={true} key={index} onClick={() => {
                    api.get(`/topic/${topic.id}`).then(res => {
                      Actions.push('topicContainer', res)
                    })
                  }}>
                    <Text style={{ color: '#333' }}>{topic.title}</Text>
                    <List.Item.Brief>
                      <Text style={{ fontSize: 12 }}>{`${dateObj.month}-${dateObj.date}${dateObj.year === dateObj.curYear ? '' : `, ${dateObj.year}`}`}</Text>
                    </List.Item.Brief>
                  </List.Item>
                )
              })
            }
          </List>
        </View>
      </ScrollView>
    )

  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
    color: '#333',
    fontWeight: '700',
    paddingBottom: 32,
  },

  summary: {
    fontSize: 14,
    color: '#797979',
  },

  contentContainer: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 20,
  },

  newsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },

  siteName: {
    color: '#a3a3a3',
  },

  urlLink: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 10,
    marginBottom: 10,
  },

  timelineContainer: {
    marginTop: 20,
    marginBottom: 20,
  },

  timelineTitle: {
    color: '#a3a3a3',
    fontSize: 12,
    marginLeft: 14,
    marginBottom: 14,
  },

  timelineItems: {
    borderTopStartRadius: 5,
    borderBottomEndRadius: 5,
    backgroundColor: '#fafafa',
  },

  itemWrapper: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 7,
  },

  dateWrapper: {
    width: 36,
    flexGrow: 0,
  },

})