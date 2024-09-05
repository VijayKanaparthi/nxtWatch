import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class Login extends Component {
  state = {
    showPassword: false,
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  checkbox = () =>
    this.setState(preState => ({showPassword: !preState.showPassword}))

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassWord = event => {
    this.setState({password: event.target.value})
  }

  successForHomeRoute = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitInformations = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successForHomeRoute(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const {showPassword, errorMsg, showErrorMsg} = this.state
          const showingPassword = showPassword ? 'text' : 'password'
          return (
            <>
              {isDarkTheme ? (
                <div className="login-container-dark-theme">
                  <div className="login-card-dark-theme">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                      alt="website logo"
                      className="website-logo-login"
                    />
                    <form
                      className="form-container-dark-theme"
                      onSubmit={this.submitInformations}
                    >
                      <label htmlFor="username">USERNAME</label>
                      <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        onChange={this.getUserName}
                      />
                      <label htmlFor="password">PASSWORD</label>
                      <input
                        type={showingPassword}
                        id="password"
                        placeholder="Password"
                        onChange={this.getPassWord}
                      />
                      <div>
                        <input
                          type="checkbox"
                          id="checkbox"
                          onChange={this.checkbox}
                        />
                        <label htmlFor="checkbox">Show Password</label>
                      </div>
                      <button type="submit" className="login-button">
                        Login
                      </button>
                      {showErrorMsg ? (
                        <p className="error-msg">*{errorMsg}</p>
                      ) : (
                        ''
                      )}
                    </form>
                  </div>
                </div>
              ) : (
                <div className="login-container">
                  <div className="login-card">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="website logo"
                      className="website-logo-login"
                    />
                    <form
                      className="form-container"
                      onSubmit={this.submitInformations}
                    >
                      <label htmlFor="username">USERNAME</label>
                      <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        onChange={this.getUserName}
                      />
                      <label htmlFor="password">PASSWORD</label>
                      <input
                        type={showingPassword}
                        id="password"
                        placeholder="Password"
                        onChange={this.getPassWord}
                      />
                      <div>
                        <input
                          type="checkbox"
                          id="checkbox"
                          onChange={this.checkbox}
                        />
                        <label htmlFor="checkbox">Show Password</label>
                      </div>
                      <button type="submit" className="login-button">
                        Login
                      </button>
                      {showErrorMsg ? (
                        <p className="error-msg">*{errorMsg}</p>
                      ) : (
                        ''
                      )}
                    </form>
                  </div>
                </div>
              )}
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Login
