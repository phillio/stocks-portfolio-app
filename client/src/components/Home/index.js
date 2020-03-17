import React, { Component } from 'react';
import { getProfile, buyStock, buyStockAgain, getStock } from '../../services/apiService'
import Portfolio from '../Portfolio'
import Purchase from '../Purchase'

class Home extends Component {

  render() {
      const portfolio = this.props.portfolio
      const priceArray = this.props.priceArray
      const transactions = this.props.transactions
      let wallet 
      if (this.props.user) {
          wallet = this.props.user.money
      }
    return (
      <div className="home-container">
        <div>
            <h3>Portfolio(${wallet})</h3>
            {portfolio[0] 
                ? <Portfolio 
                    portfolio={portfolio} 
                    priceArray={priceArray}
                    getStock={this.props.getStock} /> 
                : <p>Portfolio</p>
            }
        </div>
        <div>
            <Purchase 
                portfolio={portfolio} 
                transactions={transactions} 
                getStock={this.props.getStock} 
                buyStock={this.props.buyStock}
                wallet={wallet}
                user={this.props.user}
            />
        </div>
      </div>
    );
  }
}

export default Home;
