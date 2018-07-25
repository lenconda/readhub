import React, { Component } from 'react'
import RNSplashScreen from 'react-native-splash-screen'

import AppRouter from './app.router'

export default class AppContainer extends React.Component {

  componentDidMount() {
    RNSplashScreen.hide()
  }

  render() {

    return (
      <AppRouter />
    )

  }

}
