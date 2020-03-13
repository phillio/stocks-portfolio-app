import React from 'react'
import { Redirect } from 'react-router-dom'

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
      await handleSignup({name, email, password})
    }
    catch(e) {
    //   throw e
    this.setState(state=>{
        return {showError: true}
    }, () => {
        throw e
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
                <span>An error occured, plese try again</span>
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
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleTextInput}
              value={this.state.name}
            />
          </div>
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

          <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignupForm
