import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signIn, signUp} from '../AC/index'

class Form extends Component {
    static propTypes = {
        location: PropTypes.object,
        match: PropTypes.object,
        // from connect
        signIn: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired,
        user: PropTypes.shape({
            entity: PropTypes.object,
            loading: PropTypes.bool,
            error: PropTypes.string
        }).isRequired
    }

    state = {
        email: '',
        password: ''
    }

    handleInputChange = e => {
        const {id, value} = e.target

        this.setState({
            [id]: value
        })
    }

    signIn = e => {
        e.preventDefault()

        const {signIn} = this.props
        const {email, password} = this.state
        signIn(email, password)
    }

    signUp = e => {
        e.preventDefault()

        const {signUp} = this.props
        const {email, username, password} = this.state
        signUp(email, username, password)
    }

    render() {
        // if user is signed in
        if(this.props.user.entity.id) {
            try {
                const {from} = this.props.location.state
                return <Redirect to={from} />
            } catch (error) {
                return <Redirect to='/' />
            }
        }

        return (
            <form className='form form-box'>
                <fieldset className='form__fieldset'>
                    <label className='form__label' htmlFor='email'>
                        email:
                    </label>
                    <input className='form__text-input'
                        id='email'
                        type='email'
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <label className='form__label' htmlFor='userPassword'>
                        password:
                    </label>
                    <input className='form__text-input'
                        type='password'
                        id='password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <div>{this.getStatusBody()}</div>
                </fieldset>
                <div className='form__btns-box'>
                    <button className='form__btn' onClick={this.signIn}>
                            sign in
                    </button>
                    <button className='form__btn' onClick={this.signUp}>
                            sign up
                    </button>
                </div>
            </form>
        )
    }

    getStatusBody = () => {
        const {loading, error} = this.props.user

        if(error)
            return error
        if(loading)
            return 'loading...'

        return null
    }
}

export default connect(
    state => ({
        user: state.user
    }), {
        signIn,
        signUp
    }
)(Form)
