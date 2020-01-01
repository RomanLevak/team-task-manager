import {
    LOAD_USERS_LIST,
    START, SUCCESS, FAIL
} from '../constants'
import {arrToMap} from '../helpers'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entities: {}
}

export default (usersListState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case LOAD_USERS_LIST + START:
            return {
                loading: true,
                loaded: false,
                error: '',
                entities: {}
            }

        case LOAD_USERS_LIST + SUCCESS:
            return {
                loading: false,
                loaded: true,
                error: '',
                entities: arrToMap(payload)
            }

        case LOAD_USERS_LIST + FAIL:
            return {
                loading: false,
                loaded: false,
                error: payload,
                entities: {}
            }
    }

    return usersListState
}
