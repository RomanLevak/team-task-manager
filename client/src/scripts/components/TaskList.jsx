import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Task from './Task'
import {mapToArr} from '../helpers'

class TaskList extends Component {
    static propTypes = {
        // from connect
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        entities: PropTypes.array.isRequired
    }

    render() {
        const {loading, loaded, error} = this.props

        if(error)
            return <span className='task-list__error'>{error}</span>

        if(loading || !loaded)
            return <span className='task-list__loading'>loading...</span>

        return (
            <ul className='task-list__body'>
                {this.getBody()}
            </ul>
        )
    }

    getBody= () =>
        this.props.entities.map(task =>
            <li className='task-list__item'
                key={task.id}
            >
                <Task id={task.id} />
            </li>
        )
}

export default connect(
    state => ({
        ...state.taskList,
        entities: mapToArr(state.taskList.entities),
    })
)(TaskList)
