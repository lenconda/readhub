import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import RNSplashScreen from 'react-native-splash-screen'

import reducers from './redux/reducers'
import AppRouter from './app.router'

const store = createStore(reducers)

export default class AppContainer extends React.Component {

  componentDidMount() {
    RNSplashScreen.hide()
  }

  render() {

    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )

  }

}
