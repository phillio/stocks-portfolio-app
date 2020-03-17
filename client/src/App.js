// Packages and Libraries
import React from 'react';
import { Route, Link } from 'react-router-dom'
// Components
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Transactions from './components/Transactions'
// Helper functions
import { login, getProfile, signup, getStocks, getStock, buyStock } from './services/apiService'
import authService from './services/authService';
// Css
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSignedIn: false,
      user: {},
      portfolio: [],
      transactions: {},
      priceArray: [],
      updated: false
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
      this.loadPortfolio()
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
        user: {},
        transactions: {},
        portfolio: [],
        priceArray: []
      }
    })
  }

  loadPortfolio = async () => {
    const userData = await getProfile()

    let newPortfolio = []
    userData.portfolio.map(async el => {
      const stockPriceAPI = await getStock(el.symbol.replace(/"/g, ''))
      const price = stockPriceAPI.latestPrice
      newPortfolio.push({symbol: el.symbol, shares: el.shares, price: price})
      return newPortfolio
    })
    this.setState({portfolio: userData.portfolio, transactions: userData.transactions, priceArray: newPortfolio})
}


  render() {
    const { isSignedIn, user, portfolio, transactions, priceArray } = this.state
    return (
      <div className="App">
        <nav>
          {
            isSignedIn &&
            <div><Link to="/">Portfolio</Link></div>
          }

          {
            isSignedIn &&
            <div><Link to="/transactions">Transactions</Link></div>
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
            getStock={getStock}
            getStocks={getStocks}
            buyStock={buyStock}
            portfolio={portfolio}
            priceArray={priceArray}
            transactions={transactions}
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
              <Transactions {...props} user={user} isSignedIn={isSignedIn} transactions={transactions}/>
            }
          />
        </main>
      </div>
    );
  }
}

export default App;
