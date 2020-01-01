import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import {loadUsers, shareTask} from '../AC'

class ShareBtn extends Component {
    static propTypes = {
        taskId: PropTypes.string.isRequired,
        // from connect
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        entities: PropTypes.array.isRequired,
        loadUsers: PropTypes.func.isRequired,
        shareTask: PropTypes.func.isRequired
    }

    state = {
        isOpen: false
    }

    componentDidMount() {
        const {loadUsers, loading, loaded} = this.props

        if(!loading || !loaded)
            loadUsers()
    }

    toggleMenu = () =>
        this.setState({
            isOpen: !this.state.isOpen
        })

    handleItemClick = e => {
        const {shareTask, taskId} = this.props
        const {userId} = e.target.dataset

        shareTask(taskId, userId)
    }

    render() {
        return (
            <div className='share-btn-box task__btn'>
                <button className='share-btn'
                    onClick={this.toggleMenu}
                >
                    +
                </button>
                { this.state.isOpen &&
                    this.getMenu()
                }
            </div>
        )
    }

    getMenu = () =>
        <ul className='share-btn__menu'>
            { this.props.entities.map(user =>
                <li className='share-btn__item'
                    key={user.id}
                    data-user-id={user.id}
                    onClick={this.handleItemClick}
                >
                    {user.email}
                </li>
            )}
        </ul>
}

export default connect(
    state => ({
        ...state.usersList,
        entities: mapToArr(state.usersList.entities)
    }),
    {loadUsers, shareTask}
)(ShareBtn)
