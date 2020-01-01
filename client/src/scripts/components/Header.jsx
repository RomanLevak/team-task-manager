import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut, getCurrentUser} from '../AC/index'

class Header extends Component {
    static propTypes = {
        location: PropTypes.object,
        // from connect
        user: PropTypes.object,
        signOut: PropTypes.func.isRequired,
        getCurrentUser: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getCurrentUser()
    }

    handleSingOutClick = () =>
        this.props.signOut()

    render() {
        return (
            <header className='header'>
                <h1 className='header__title'>
                    <Link to='/'>
                        <span className='header__title-team'>
                            team
                        </span>
                        task manager
                    </Link>
                </h1>
                {this.getUserArea()}
            </header>
        )
    }

    getUserArea() {
        const {email} = this.props.user

        if(email) { // user is signed in
            return (
                <div className='header__user'>
                    <span className='header__user-email'>
                        {email}
                    </span>
                    <button className='header__btn'
                        onClick={this.handleSingOutClick}
                    >
                        logout
                    </button>
                </div>
            )
        }

        return (
            <Link className='header__btn'
                to={{
                    pathname: '/sing-in',
                    state: {from: this.props.location}
                }}
            >
                    sing in
            </Link>
        )
    }
}

export default connect(
    state => ({
        user: state.user.entity
    }), {
        signOut,
        getCurrentUser
    }
)(Header)
