import {
    SIGNIN,
    SIGNOUT,
    SIGNUP,
    GET_CURRENT_USER,
    START,
    SUCCESS,
    FAIL
} from '../constants'

const defaultState = {
    loading: false,
    entity: {},
    error: ''
}

export default (userState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case SIGNIN + START:
        // falls through
        case SIGNUP + START:
        // falls through
        case GET_CURRENT_USER + START:
            return {
                loading: true,
                entity: {},
                error: ''
            }

        case SIGNIN + SUCCESS:
        case SIGNUP + SUCCESS:
        case GET_CURRENT_USER + SUCCESS:
            return {
                loading: false,
                entity: payload || {},
                error: ''
            }
        case SIGNIN + FAIL:
        case SIGNUP + FAIL:
        case GET_CURRENT_USER + FAIL:
            return {
                loading: false,
                entity: {},
                error: payload
            }

        case SIGNOUT + START:
            if(!userState.entity)
                return {
                    ...userState,
                    error: 'you are not signed in'
                }
            return {
                ...userState,
                loading: true,
                error: ''
            }

        case SIGNOUT + SUCCESS:
            return {
                ...userState,
                loading: false,
                entity: {},
                error: ''
            }

        case SIGNOUT + FAIL:
            return {
                ...userState,
                loading: false,
                error: ''
            }
    }

    return userState
}
