import React from 'react';

function Portfolio(props) {
    
    
    
    
    // console.log('portfolioprops',props)

    // this was the issue for delay; could not get updated/latest prices 
    // for current stocks, to calculate a user's total value for their portfolio





    const withPrice = props.portfolio.map(el=>{
        return (
            <div>
                <p>{el.symbol.replace(/"/g, '')} - {el.shares} {el.shares > 1 ? 'shares' : 'share' } {el.price}</p>
            </div>
        )
    })
    const withPriceTwo = props.priceArray.map(el=>{
        return (
            <div>
                <p>{el.symbol.replace(/"/g, '')} - {el.shares} {el.shares > 1 ? 'shares' : 'share' } {el.price}</p>
            </div>
        )
    })
    return(
        // props.portfolioWithPrice.map(el=>{
        //     return (
        //         <div>
        //             <p>{el.symbol} - {el.shares} shares worth {el.price}</p>
        //         </div>
        //     )
        // })
        <div>
            {withPrice}
            {/* {withPriceTwo} */}
        </div>
    )
}

export default Portfolio
















// import React from 'react';

// class Portfolio extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         //   portfolio: null,
//         //   transactions: null,
//         //   price: null,
//         portfolioWithPrice: [],
//         updated: false

//       }
//     }

//     componentDidMount = async () =>{
//         await this.getStockPrices()
//         // await this.readState()
//     }

//     // readState = () => {
//     //     console.log(this.state.portfolioWithPrice)
//     // }

//     getStockPrices = () => {
//         const { getStock } = this.props
//         const newPortfolio = []
//         this.props.portfolio.map(async el=>{
//             // console.log(el)
//             const noString = el.symbol.replace(/"/g, '')
//             const stockPriceAPI = await getStock(noString)
//             const price = stockPriceAPI.latestPrice
//             newPortfolio.push({symbol: noString, shares: el.shares, price: price})
//             // console.log(price)
//         })
//         // console.log(newPortfolio)
//         this.setState({portfolioWithPrice: newPortfolio, updated: true})
//     }

//     // renderDivs = async () => {
//     //     this.state.portfolioWithPrice.map(el=>{
//     //         return (
//     //             <div>
//     //                 <p>{el.symbol} - {el.shares} shares worth {el.price} </p>
//     //             </div>
//     //         )
//     //     })
//     // }

//     render() {
//         // if (this.state.portfolioWithPrice[0]) {
//         //     const porto = this.state.portfolioWithPrice
//         //     porto.map(el=>{
//         //         return (
//         //             <div>
//         //                 <p>{el.symbol} - {el.shares} shares worth {el.price} </p>
//         //             </div>
//         //         )
//         //     })
//         // } else {
//         //     return(
//         //         // <p>porto?</p>
//         //         <div>
//         //             <p>portfoliolio</p>
//         //         </div>
//         //     )
//         // }
//         const updated = this.state.updated
//         const items = this.state.portfolioWithPrice.map(el=> {
//             return (<li>{el.symbol} - {el.shares} shares worth {el.price} </li>)
//         });
//         return(
//             <div>
//                 <p>portfoliolio</p>
//                 <ul>
//                     {updated ? items : <li>no stocks yet</li> }
//                 </ul>
                
//             </div>
//         )
//     }
// }

// export default Portfolio

























// import React from 'react';

// function Portfolio(props) {
//     console.log(props)
//     const { getStock } = props
//     let stockPrice
//     return(
//         // <p>porto?</p>
//         props.portfolio.map(async el=>{
//             const noString = el.symbol.replace(/"/g, '')
//             const stockPriceAPI = await getStock(noString)
//             stockPrice = stockPriceAPI.latestPrice
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