import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Toast, Button } from 'antd-mobile'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  topicDetail: state
})

class TopicContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log(this.props.topicDetail)
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <Button onClick={() => {console.log(this.props.topicDetail.topics)}}>Log state</Button>
        <View style={styles.contentContainer}>
          {/*<Text style={styles.title}>{topic.title}</Text>*/}
          {/*<Text style={styles.summary}>{topic.summary}</Text>*/}
        </View>
        <View style={styles.newsContainer}>
          <Text>
            {this.props.topicDetail.topics.entityTopics[0].nerName}
          </Text>
        </View>
      </ScrollView>
    )

  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
  },

  title: {
    fontSize: 20,
    color: '#333',
    fontWeight: '700',
    paddingBottom: 32,
  },

  summary: {
    fontSize: 14,
    color: '#797979'
  },

  contentContainer: {
    marginBottom: 20,
  },

  newsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },

})

export default connect(mapStateToProps)(TopicContainer)