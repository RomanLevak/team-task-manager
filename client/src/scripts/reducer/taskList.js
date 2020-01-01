import {
    LOAD_TASK_LIST,
    START, SUCCESS, FAIL
} from '../constants'
import {arrToMap} from '../helpers'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entities: {
        /*
         * "5e08fa875ddf7742ca06fc84": {
         *     id: "5e08fa875ddf7742ca06fc84",
         *     user: "mark@gmail.com",
         *     content: 'add sharing todo functionality',
         *     sharedWith: ['john@gmail.com', 'mary@gmail.com'],
         *     createdAt: "2019-12-29T19:12:07.706Z"
         *     updatedAt: "2019-12-29T19:12:07.706Z"
         *  }
         */
    }
}

export default (listState = defaultState, action) => {
    const {type, payload} = action
    switch(type) {
        case LOAD_TASK_LIST + START:
            return {
                loading: true,
                loaded: false,
                error: '',
                entities: {}
            }

        case LOAD_TASK_LIST + SUCCESS:
            return {
                loading: false,
                loaded: true,
                error: '',
                entities: arrToMap(payload)
            }

        case LOAD_TASK_LIST + FAIL:
            return {
                loading: false,
                loaded: false,
                error: payload,
                entities: {}
            }
    }

    return listState
}
