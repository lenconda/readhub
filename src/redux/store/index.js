import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import reducers from '../reducers'

const logger = store => next => action => {
  if(typeof action === 'function') console.log('dispatching a function')
  else console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

let middleWares = [logger, thunk]

let createAppStore = applyMiddleware(...middleWares)(createStore)

export default function configureStore(onComplete) {
  const store = autoRehydrate()(createAppStore)(reducers)
  let options = {
    storage: AsyncStorage,
    transform: []
  }
  persistStore(store, options, onComplete)
  return store
}