import React from 'react';

class Purchase extends React.Component {
      constructor(props) {
        super(props)
    
        this.state = {
          symbol: '',
          share: '',
          price: '',
          showError: false
        }
      }

      handleSubmitForm = async (event) => {
          event.preventDefault()
          try {
            const stockSymbol = this.state.symbol
            const priceCheck = await this.props.getStock(stockSymbol)
            this.setState({price: priceCheck.latestPrice})
            // this.setState({price: priceCheck[stockSymbol].quote.latestPrice})

          } catch (error) {
              throw error
          }
          const { symbol, share, price } = this.state
        //   console.log(symbol, share, price)
          const { buyStock } = this.props
          const stockPriceTotal = parseInt(share) * parseInt(price)


          if (parseInt(this.props.wallet) > parseInt(stockPriceTotal)) {
            try {
                await buyStock({ "symbol": `"${symbol}"`, "shares": share, "price": price })
                this.setState({symbol: '', share: '', price:''})
                window.location.reload()
            } catch (error) {
              this.setState(state=>{
                  return {showError: true}
              })
            }
          } else {
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
        const {showError} = this.state
        let errorMessage
        if (showError) {
            errorMessage = ( 
                <div className="errorMessage">
                    <h3>Error, please try again</h3>
                    <p>Please check stock symbol and if you have sufficient funds</p>
                </div>
            )
        }
        return (
            <div>
                {errorMessage}
                <form className="form" onSubmit={this.handleSubmitForm}>
                    <div>
                        <label>Stock Symbol</label>
                        <input
                        type="text"
                        name="symbol"
                        onChange={this.handleTextInput}
                        value={this.state.symbol}
                        />
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input
                        type="text"
                        name="share"
                        onChange={this.handleTextInput}
                        value={this.state.share}
                        />
                    </div>
                    <button>Buy</button>
                </form>
            </div>
        )
      }

}





// import React from 'react'
// import { Link, Redirect } from 'react-router-dom'

// class LoginForm extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       email: '',
//       password: '',
//       showError: false
//     }
//   }

//   handleSubmitForm = async (event) => {
//     event.preventDefault()

//     const { email, password } = this.state
//     const { handleLogin } = this.props

//     try {
//       await handleLogin({email, password})
//     }
//     catch(e) {
//     //   throw e
//     // this.setState(state=>{
//     //     return {showError: true}
//     // }, () => {
//     //     throw e
//     // })

//     this.setState(state=>{
//         return {showError: true}
//     })

//     }
//   }

//   handleTextInput = (event) => {
//     const { name, value } = event.target

//     this.setState(state => {
//       return { [name]: value }
//     })
//   }

//   render() {
//     const { isSignedIn } = this.props
//     const {showError} = this.state

//     let errorMessage

//     if (showError) {
//         errorMessage = ( 
//             <div className="errorMessage">
//                 <h3>Error, please try again</h3>
//                 <p>Please make sure you log in with an email address and check the password is correct</p>
//             </div>
//         )
//     }



//     if (isSignedIn) {
//       return <Redirect to="/" />
//     }

//     return (
//       <div>
//       {errorMessage}
//         <form className="form" onSubmit={this.handleSubmitForm}>
//           <div>
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               onChange={this.handleTextInput}
//               value={this.state.email}
//             />
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               onChange={this.handleTextInput}
//               value={this.state.password}
//             />
//           </div>

//           <button>Login</button>
//         </form>
//       </div>
//     )
//   }
// }

// export default LoginForm











export default Purchase