import {
    SIGNIN,
    SIGNOUT,
    SIGNUP,
    GET_CURRENT_USER,
    LOAD_USERS_LIST,
    LOAD_TASK_LIST,
    CLEAR_LIST_STATE,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    SHARE_TASK,
    SUBSCRIBE
} from '../constants'

export function signIn(email, password) {
    return {
        type: SIGNIN,
        callAPI: {
            url: '/user/login',
            method: 'POST',
            body: {email, password}
        }
    }
}

export function signUp(email, username, password) {
    return {
        type: SIGNUP,
        callAPI: {
            url: '/user/register',
            method: 'POST',
            body: {
                email,
                displayName: username,
                password
            }
        }
    }
}

export function signOut() {
    return {
        type: SIGNOUT,
        callAPI: {
            url: '/user/logout',
            method: 'POST'
        }
    }
}

export function getCurrentUser() {
    return {
        type: GET_CURRENT_USER,
        callAPI: {url: '/user/me'}
    }
}

export function loadUsers() {
    return {
        type: LOAD_USERS_LIST,
        callAPI: {
            url: '/user/others'
        }
    }
}

export function loadTaskList() {
    return {
        type: LOAD_TASK_LIST,
        callAPI: {
            url: '/tasks'
        }
    }
}

export function clearListState() {
    return {
        type: CLEAR_LIST_STATE
    }
}

export function updateTaskContent(id, content) {
    return {
        type: UPDATE_TASK,
        callAPI: {
            url: `/tasks/${id}`,
            method: 'PUT',
            body: {content}
        }
    }
}

export function shareTask(taskId, userId) {
    return {
        type: SHARE_TASK,
        callAPI: {
            url: `/tasks/${taskId}/${userId}`,
            method: 'PUT'
        }
    }
}

export function deleteTask(id) {
    return {
        type: DELETE_TASK,
        callAPI: {
            url: `/tasks/${id}`,
            method: 'DELETE'
        }
    }
}

export function subscribe() {
    return {
        type: SUBSCRIBE,
        callAPI: {
            url: '/tasks/subscribe'
        }
    }
}

export function createTask() {
    return {
        type: CREATE_TASK,
        callAPI: {
            url: '/tasks',
            method: 'POST'
        }
    }
}
