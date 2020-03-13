// Packages and Libraries
import React from 'react';
import { Route, Link } from 'react-router-dom'
// Components
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Transactions from './components/Transactions'
// Helper functions
import { login, getProfile, signup } from './services/apiService'
import authService from './services/authService';
// Css
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSignedIn: false,
      user: {}
    }
  }

  async componentDidMount() {
    try {
      const fetchUser = await getProfile()

      this.setState(state => {
        return {
          isSignedIn: authService.isAuthenticated(),
          user: fetchUser
        }
      })
    } catch (e) {
      throw e
    }
  }

  loginUser = async (credentials) => {
    try {
      const user = await login(credentials)
      this.setState({
        isSignedIn: true,
        user: user
      })
    }
    catch (e) {
      throw e
    }
  }

  signupUser = async (credentials) => {
    try {
      const user = await signup(credentials)
      this.setState(state => {
        return {
          isSignedIn: true,
          user: user
        }
      })
    }
    catch (e) {
      throw e
    }
  }

  signOutUser = async () => {
    authService.signOut()

    this.setState(state=>{
      return{
        isSignedIn: false,
        user: {}
      }
    })
  }

  render() {
    const { isSignedIn, user } = this.state
    return (
      <div className="App">
        <nav>
          {/* <div><Link to="/">Portfolio</Link></div> */}

          {
            isSignedIn &&
            <div><Link to="/">Home</Link></div>
          }

          {
            !isSignedIn ? (
              <div><Link to="/login">Login</Link></div>
            ) : (
              <button onClick={this.signOutUser} >Sign Out</button>
            )
          }
        </nav>

        <main>
          {/* <Route exact path="/" user={user} component={ProtectedRoute} /> */}
          <ProtectedRoute
            exact path="/"
            user={user}
            component={Home}
          />
          <Route
            path="/login"
            render={(props) =>
              <Login {...props} handleLogin={this.loginUser} isSignedIn={isSignedIn} />
            }
          />
          <Route
            path="/signup"
            render={(props) =>
              <Signup {...props} handleSignup={this.signupUser} isSignedIn={isSignedIn} />
            }
          />
          <Route
            path="/transactions"
            render={(props) =>
              <Transactions {...props} user={user} isSignedIn={isSignedIn} />
            }
          />
        </main>
      </div>
    );
  }
}

export default App;
