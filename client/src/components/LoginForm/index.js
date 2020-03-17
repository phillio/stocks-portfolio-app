import React from 'react'
import { Redirect } from 'react-router-dom'
import './LoginForm.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showError: false
    }
  }

  handleSubmitForm = async (event) => {
    event.preventDefault()

    const { email, password } = this.state
    const { handleLogin } = this.props

    try {
      await handleLogin({email, password})
      window.location.reload()
    }
    catch(e) {

    this.setState(state=>{
        return {showError: true}
    })

    }
  }

  handleTextInput = (event) => {
    const { name, value } = event.target

    this.setState(state => {
      return { [name]: value }
    })
  }

  render() {
    const { isSignedIn } = this.props
    const {showError} = this.state

    let errorMessage

    if (showError) {
        errorMessage = ( 
            <div className="errorMessage">
                <h3>Error, please try again</h3>
                <p>Please make sure you log in with an email address and check the password is correct</p>
            </div>
        )
    }



    if (isSignedIn) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-wrapper" >
      {errorMessage}
        <form className="login-form" onSubmit={this.handleSubmitForm}>
          <div className="login-form-email" >
            <label>Email</label>
            <input className="login-form-email-field"
              type="text"
              name="email"
              onChange={this.handleTextInput}
              value={this.state.email}
            />
          </div>
          <div className="login-form-password" >
            <label>Password</label>
            <input className="login-form-password-field"
              type="password"
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>

          <button className="login-button" >Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm