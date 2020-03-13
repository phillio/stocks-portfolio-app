import React, { Component } from 'react';
import { getStocks } from '../../services/apiService'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        stocks: {}
    }
  }

  render() {
      getStocks('AAPL')
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
