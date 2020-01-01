import React from 'react'
import {Provider} from 'react-redux'
import store from '../store/index'
import App from './App'
import '../../styles/index.sass'

function Root() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default Root
