import React, { Component } from 'react';
import { getProfile, buyStock, buyStockAgain } from '../../services/apiService'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        stocks: {}
    }
  }

  componentDidMount = async() => {
    await getProfile()
      await buyStock({"symbol": "NFLX", "shares": "10", "price": 100})
      await buyStock({"symbol": "AAPL", "shares": "50", "price": 500})
      await buyStock({"symbol": "FB", "shares": "100", "price": 1000})
  }

  render() {
    return (
      <div className="home-container">
        <div>
            <p>Stock API Data here</p>
        </div>
        <div>
            <p>$ Data here</p>
        </div>
      </div>
    );
  }
}

export default Home;
