import React from 'react';
import './Purchase.css'

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

          } catch (error) {
            this.setState({showError: true})
              throw error
          }
          const { symbol, share, price } = this.state
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
          return { [name]: value.toUpperCase() }
          })
      }
      
      render() {
        const {showError} = this.state
        let errorMessage
        if (showError) {
            errorMessage = alert('Incorrect stock symbol or insufficient funds')
            window.location.reload()
        }
        return (
            <div className="purchase-form-container" >
                {errorMessage}
                <form className="form" className="purchase-form" onSubmit={this.handleSubmitForm}>
                    <div className="purchase-form-field" >
                        <label>Stock Symbol</label>
                        <input className="purchase-form-field-box"
                        type="text"
                        name="symbol"
                        placeholder="i.e. AAPL, NFLX, FB"
                        onChange={this.handleTextInput}
                        value={this.state.symbol}
                        />
                    </div>
                    <div className="purchase-form-field" >
                        <label>Quantity</label>
                        <input className="purchase-form-field-box"
                        type="text"
                        name="share"
                        onChange={this.handleTextInput}
                        value={this.state.share}
                        />
                    </div>
                    <button className="purchase-form-button" >Buy</button>
                </form>
            </div>
        )
      }

}

export default Purchase