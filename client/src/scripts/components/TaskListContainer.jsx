import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createTask} from '../AC'
import TaskList from './TaskList'

class TaskListContainer extends Component {
    static propTypes = {
        createTask: PropTypes.func.isRequired
    }

    createHandler = () => {
        const {createTask} = this.props

        createTask()
    }

    render() {
        return (
            <div className='list-container list-container-box'>
                <div className="list-container__header">
                    <button className='list-container__add-btn'
                        onClick={this.createHandler}
                    >
                        +
                    </button>
                    <span className='list-container__title'>
                        current tasks
                    </span>
                </div>
                <div className='list-container__list'>
                    <TaskList />
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {createTask}
)(TaskListContainer)
