import React from 'react';

function TransactionsList(props) {
    if (props.transactions.length > 0) {
        return(
            props.transactions.map(el=>{
                
                return (
                        <li>BUY ({el.symbol.replace(/"/g, '')}) - {el.shares} {el.shares > 1 ? 'shares' : 'share' } shares @ {el.price}</li>
                )
            })
        )
    }else {
        return (
            <p className="transactions-list-item" >Transactions List</p>
        )
    }
    
}

export default TransactionsList