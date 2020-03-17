import React from 'react'
import { Link, Redirect } from 'react-router-dom'

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
      <div>
      {errorMessage}
        <form className="form" onSubmit={this.handleSubmitForm}>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={this.handleTextInput}
              value={this.state.email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm