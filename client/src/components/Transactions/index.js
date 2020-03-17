import React from 'react';
import { Redirect } from 'react-router-dom'
import DepositMoney from '../DepositMoney';
import TransactionsList from '../TransactionsList';
import './Transactions.css'

function Transactions(props) {
    // const { isSignedIn } = props

    // if (!isSignedIn) {
    //   return <Redirect to="/login" />
    // }
    return(
        <div className="transactions-wrapper" >
            <div className="transactions-container">
            <h1>Transactions History</h1>
            <ul className="transactions-list" >
                <TransactionsList 
                    {...props} 
                    user={props.user} 
                    isSignedIn={props.isSignedIn} 
                    transactions={props.transactions}
                />
            </ul>
            </div>
            <div className="transactions-deposit-money-container" >
                <DepositMoney 
                    {...props} 
                    user={props.user}
                    isSignedIn={props.isSignedIn}
                    depositMoney={props.depositMoney}
                />
            </div>
        </div>
    )
}

export default Transactions