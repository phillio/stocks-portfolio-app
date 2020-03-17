import React from 'react'
import { depositMoney } from '../../services/apiService'
import './DepositMoney.css'

class DepositMoney extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      money: '',
      showError: false
    }
  }

  handleSubmitForm = async (event) => {
    event.preventDefault()
    const { money } = this.state
    if (!isNaN(money)) {
      try {
          await depositMoney(money)
          this.props.history.push('/')
          window.location.reload()
      }
      catch(e) {
        this.setState(state=>{
            return {showError: true}
        })
  
      }
    } else {
      alert('You did not type in a number')
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
                <p>Please make sure you typed in a number</p>
            </div>
        )
    }

    return (
      <div className="deposit-form-container">
      {errorMessage}
        <form className="form" className="deposit-form" onSubmit={this.handleSubmitForm}>
          <div className="deposit-form-field" >
            <label className="deposit-form-field-label" >Amount to Deposit</label>
            <div className="deposit-form-field-moneysign" >
              <p>$</p>
              <input className="money-field"
                type="text"
                name="money"
                placeholder="i.e. 10,000"
                onChange={this.handleTextInput}
                value={this.state.money}
              />
            </div>
          </div>
          <button className="deposit-form-button">Deposit</button>
        </form>
      </div>
    )
  }
}

export default DepositMoney
