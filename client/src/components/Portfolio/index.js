

import React from 'react';

function Portfolio(props) {
    // console.log(props)
    const { getStock } = props
    return(
        props.portfolio.map(el=>{
            const noString = el.symbol.replace(/"/g, '')
            let stockPrice
            const stockPriceCheck = async () => { 
                const stockPriceAPI = await getStock(noString)
                stockPrice = stockPriceAPI.latestPrice
                console.log(stockPrice)
                return stockPrice
            }
            stockPriceCheck()
            console.log(stockPrice)
            return (
                <div>
                    <p>{noString} - {el.shares} shares worth {stockPrice} </p>
                </div>
            )
        })
    )
}

export default Portfolio










// import React from 'react';

// function Portfolio(props) {
//     return (
//         <div>
//             <p>- shares worth  </p>
//         </div>
//     )
// }

// export default Portfolio


// import React from 'react';

// function Portfolio(props) {
//     // console.log(props)
//     const { getStock } = props
//     console.log(props)
//     return(
//         props.portfolio.map(el=>{
//             const noString = el.symbol.replace(/"/g, '')
//             let stockPrice
//             getStock(noString).then(el=>{return stockPrice = el.latestPrice}).then(el=>{
//             return (
//                 <div>
//                     <p>{noString} -  shares worth {stockPrice} </p>
//                 </div>
//             )})
//         })
//     )
// }

// export default Portfolio




// import React from 'react';
// import { getStocks } from '../../services/apiService';

// function Portfolio(props) {
//     // console.log(props)
//     const { getStock } = props
//     return(
//         props.portfolio.map(el=>{
//             const noString = el.symbol.replace(/"/g, '')
//             let price
//             return (
//                 <div>
//                     <p>{el.symbol} - {el.shares} shares worth {getStock(noString).then(el=>{return el.latestPrice})} </p>
//                 </div>
//             )
//         })
//     )
// }

// export default Portfolio



// import React from 'react';

// function Portfolio(props) {
//     // console.log(props)
//     const { getStock } = props
//     return(
//         props.portfolio.map(el=>{
//             const noString = el.symbol.replace(/"/g, '')
//             let stockPrice
//             const stockPriceCheck = async () => { 
//                 const stockPriceAPI = await getStock(noString)
//                 stockPrice = stockPriceAPI.latestPrice
//                 console.log(stockPrice)
//                 return stockPrice
//             }
//             stockPriceCheck()
//             console.log(stockPrice)
//             return (
//                 <div>
//                     <p>{noString} - {el.shares} shares worth {stockPrice} </p>
//                 </div>
//             )
//         })
//     )
// }

// export default Portfolio