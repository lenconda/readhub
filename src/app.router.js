import React, { Component } from 'react'
import { Actions, Scene, Router, Stack } from 'react-native-router-flux'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import IndexContainer from './container/IndexContainer'
import TopicContainer from './container/TopicContainer'
import WebContainer from './container/WebContainer'
import CareerContainer from './container/CareerContainer'

export default class AppRouter extends Component {
  render() {
    return (
      <Router
        sceneStyle={styles.sceneStyle}
        navigationBarStyle={styles.navigationBar}
        titleStyle={styles.navigationTitle}
        backButtonTintColor={'#4867ad'}
        // backButtonTextStyle={styles.backButton}
        // renderBackButton={() => <Icon name={'chevron-left'} color={'#4867ad'} size={16} />}
        // onBack={Actions.pop()}
        leftButtonStyle={styles.backButton}
      >
        <Scene key={'root'}>
          <Scene key={'index'} component={IndexContainer} title={'话题'}></Scene>
          <Scene key={'topicContainer'} component={TopicContainer} title={'话题详情'}></Scene>
          <Scene key={'newsContainer'} component={WebContainer} title={'浏览网页'}></Scene>
          <Scene key={'careerContainer'} component={CareerContainer} title={'招聘详情'}></Scene>
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({

  sceneStyle: {
    backgroundColor: '#fff'
  },

  navigationBar: {
    height: 45,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },

  navigationTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    alignSelf: 'center',
    textAlign: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 1,
  },

})