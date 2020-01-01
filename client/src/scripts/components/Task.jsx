import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateTaskContent, deleteTask} from '../AC'
import ShareBtn from './ShareBtn'

class Task extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        // from connect
        content: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired,
        sharedWith: PropTypes.array.isRequired,
        updateTaskContent: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired
    }

    state = {
        isEdit: false,
        value: this.props.content
    }

    componentDidUpdate() {
        this.input && this.input.focus()
    }

    makeEditable = () =>
        this.setState({
            isEdit: true
        })

    saveHandler = () => {
        const {updateTaskContent, content, id} = this.props
        const newContent = this.state.value

        if(newContent != content)
            updateTaskContent(id, newContent)

        this.setState({
            isEdit: false
        })
    }

    deleteHandler = () => {
        if(!confirm('Are you sure want to delete this task?'))
            return

        const {id, deleteTask} = this.props

        deleteTask(id)
    }

    handleChange = e =>
        this.setState({
            value: e.target.value
        })

    render() {
        const {content, sharedWith, id, user} = this.props
        const {isEdit} = this.state

        return (
            <div className='task'>
                <span className='task__author'>author:
                    <span className='task__author-email'>
                        {user.email}
                    </span>
                </span>
                { isEdit ?
                    <textarea className='task__content task__input'
                        ref={el => this.input = el}
                        value={this.state.value}
                        onChange={this.handleChange}
                    /> :
                    <p className='task__content'>{content}</p>
                }
                <span className='task__shared-title'>shared with:</span>
                <ul className='task__shared-body'>
                    { sharedWith.map(
                        ({email}) =>
                            <li className='task__shared-item'
                                key={email}
                            >
                                {email}
                            </li>
                    )}
                </ul>
                <div className='task__btns'>
                    <ShareBtn taskId={id} />
                    { isEdit ?
                        <button className='task__btn'
                            onClick={this.saveHandler}
                        >
                            ✓
                        </button> :
                        <button className='task__btn'
                            onClick={this.makeEditable}
                        >
                            ✎
                        </button>
                    }
                    <button className='task__btn'
                        onClick={this.deleteHandler}
                    >
                        🞫
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        ...state.taskList.entities[ownProps.id]
    }),
    {
        updateTaskContent,
        deleteTask
    }
)(Task)
