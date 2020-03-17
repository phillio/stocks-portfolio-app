import React from 'react'
import { Redirect } from 'react-router-dom'
import './SignupForm.css'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      showError: false
    }
  }

  handleSubmitForm = async (event) => {
    event.preventDefault()

    const { name, email, password } = this.state
    const { handleSignup } = this.props

    try {
      await handleSignup({ name, email, password })
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
                <p>Please make sure you sign up with a valid email address</p>
            </div>
        )
    }



    if (isSignedIn) {
      return <Redirect to="/" />
    }

    return (
      <div className="signup-form-wrapper" >
      {errorMessage}
        <form className="signup-form" onSubmit={this.handleSubmitForm}>
          <div className="signup-form-name" >
            <label>Name</label>
            <input className="signup-form-name-field"
              type="text"
              name="name"
              onChange={this.handleTextInput}
              value={this.state.name}
            />
          </div>
          <div className="signup-form-email" >
            <label>Email</label>
            <input className="signup-form-email-field"
              type="text"
              name="email"
              onChange={this.handleTextInput}
              value={this.state.email}
            />
          </div>
          <div className="signup-form-password" >
            <label>Password</label>
            <input className="signup-form-password-field"
              type="password"
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>

          <button className="signup-button">Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignupForm
