import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from './redux/store'
let store = configureStore()

import AppRouter from './app.router'

export default class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}
