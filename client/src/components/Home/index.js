import React, { Component } from 'react';
import { getProfile, buyStock, buyStockAgain } from '../../services/apiService'
import Portfolio from '../Portfolio'
import Purchase from '../Purchase'

class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         portfolio: null,
//         transactions: null
//     }
//   }

//   loadPortfolio = async () => {
//       const userData = await getProfile()
//       this.setState({portfolio: userData.portfolio, transactions: userData.transactions})
//     //   await userData.map(el=>{
//     //       console.log(el.symbol, ': ', el.shares)

//     //       return(
//     //           <div>
//     //               <p>{el.symbol} - {el.shares}</p>
//     //           </div>
//     //       )
//     //   })
//   }

  componentDidMount = async () => {
//     //   await getProfile()
//     //   await buyStock({"symbol": "NFLX", "shares": "10", "price": 100})
    //   await buyStock({"symbol": "AAPL", "shares": "50", "price": 500})
//     //   await buyStock({"symbol": "FB", "shares": "100", "price": 1000})

//     // await this.loadPortfolio()
  }

  render() {
    //   console.log('home props', this.props)
      const portfolio = this.props.portfolio
      const transactions = this.props.transactions
      let wallet 
      if (this.props.user) {
          wallet = this.props.user.money
      }
    return (
      <div className="home-container">
        <div>
            <h3>Portfolio(${wallet})</h3>
            {/* <p>Stock API Data here</p> */}
            {portfolio[0] 
                ? <Portfolio 
                    portfolio={portfolio} 
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
