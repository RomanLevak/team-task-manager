import {createStore, applyMiddleware} from 'redux'
import serverAPI from '../middleware/server-api'
import reducer from '../reducer/index'

const enhancer = applyMiddleware(serverAPI)

const store = createStore(reducer, {}, enhancer)

// dev only
window.store = store

export default store
