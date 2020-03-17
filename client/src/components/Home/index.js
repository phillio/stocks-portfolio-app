import React, { Component } from 'react';
import { getProfile, buyStock, buyStockAgain, getStock } from '../../services/apiService'
import Portfolio from '../Portfolio'
import Purchase from '../Purchase'

import './Home.css';

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
        <div className="portfolio-container" >
            <h1 className="portfolio-list-header" >Portfolio</h1>
            <h3 className="portfolio-list-wallet" >(${wallet} left in wallet)</h3>
            <ul className="portfolio-list" >
              {portfolio[0] 
                  ? <Portfolio 
                      portfolio={portfolio} 
                      priceArray={priceArray}
                      getStock={this.props.getStock} /> 
                  : <p>Portfolio</p>
              }
            </ul>
        </div>
        <div className="purchase-container" >
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
