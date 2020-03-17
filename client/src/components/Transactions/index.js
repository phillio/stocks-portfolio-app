import React from 'react';

function Transactions(props) {
    if (props.transactions.length > 0) {
        return(
            props.transactions.map(el=>{
                
                return (
                    <div>
                        <p>BUY ({el.symbol.replace(/"/g, '')}) - {el.shares} shares @ {el.price}</p>
                    </div>
                )
            })
        )
    } else {
        return (
            <p>Transactions</p>
        )
    }
    
}

export default Transactions