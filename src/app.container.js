import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './redux/reducers'
import AppRouter from './app.router'

const store = createStore(reducers)

export default class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}
