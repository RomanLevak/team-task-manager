import {
    SIGNIN, SIGNOUT, GET_CURRENT_USER,
    SUBSCRIBE, START, SUCCESS, FAIL
} from '../constants'
import {
    loadTaskList, subscribe
} from '../AC/index'

export default store => next => action => {
    const {callAPI, type, ...rest} = action

    next({
        ...rest, type: type + START
    })

    const {method, url, body} = callAPI

    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: method || 'GET',
        body: body ? JSON.stringify(body) : null
    })
        .then(response => {
            if(response.status >= 400)
                throw new Error(response.statusText)

            return response.json()
        })
        .then(response => {
            next({
                ...rest,
                type: type + SUCCESS,
                payload: response
            })

            makePostSuccessRequest(type, store.dispatch)
        })
        .catch(error => {
            next({
                ...rest,
                type: type + FAIL,
                payload: error.message
            })
        })
}

function makePostSuccessRequest(type, dispatch) {
    switch(type) {
        case GET_CURRENT_USER:
        case SIGNIN:
        case SUBSCRIBE:
            dispatch(loadTaskList())
            dispatch(subscribe())
            break
        case SIGNOUT:
            dispatch(loadTaskList())
            break
    }
}
