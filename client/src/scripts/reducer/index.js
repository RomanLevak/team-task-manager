import {combineReducers} from 'redux'
import user from './user'
import taskList from './taskList'
import usersList from './usersList'

export default combineReducers({
    user,
    taskList,
    usersList
})
