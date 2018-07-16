import React, { Component } from 'react'
import { Actions, Scene, Router, Stack } from 'react-native-router-flux'
import {StyleSheet} from "react-native";

import Login from './pages/Login'
import Register from './pages/Register'
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
      >
        <Stack key={'root'}>
          <Scene key={'index'} component={IndexContainer} title={'话题'}></Scene>
          <Scene key={'login'} component={Login} title={'Login'}></Scene>
          <Scene key={'register'} component={Register} title={'Register'}></Scene>
          <Scene key={'topicContainer'} component={TopicContainer} title={'话题详情'}></Scene>
          <Scene key={'newsContainer'} component={WebContainer} title={'加载中...'}></Scene>
          <Scene key={'careerContainer'} component={CareerContainer} title={'招聘详情'}></Scene>
        </Stack>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },

  navigationTitle: {
    fontSize: 17,
    color: '#333333',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
})