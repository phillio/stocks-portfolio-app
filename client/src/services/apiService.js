import axios from 'axios'
import symbols from '../components/Symbols'
require('dotenv').config()
const BASE_URL = 'http://localhost:8001'
const secret = process.env.REACT_APP_API_KEY
const JWT_TOKEN = localStorage.getItem('token')

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
    }
})


export const login = async (data) => {
    try {
        const response = await api.post('/auth/login', data)
        // const { token, user } = response.data
        const { token } = response.data

        localStorage.setItem('token', token)
    } catch (error) {
        throw error
    }
}


export const getProfile = async () => {
    try {
        const response = await api.get('/app/profile')
        const { user } = response.data
        // console.log(user)
        return user
    } catch (error) {
        throw error
    }
}


export const signup = async ( data ) => {
    try {
        const response = await api.post('/auth/signup', data)
        // const { token, user } = response.data
        const { token } = response.data
        
        localStorage.setItem('token', token)
    } catch (error) {
        throw error
    }
}


export const getStock = async (symbol) => {
    try {
        let response = await fetch(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote&token=${secret}`)
        let data = await response.json()
        const stockQuote = data[symbol].quote
        return stockQuote
    } catch (error) {
        throw error
    }
}


export const getStocks = () => {
    try {
        console.log('might not need this')        
    } catch (error) {
        throw error
    }
}


export const buyStock = async (dataToSend) => {
    try {
        // console.log(dataToSend)
        // console.log('getting user id')
        const response = await api.get('/app/profile/')
        let { user } = response.data
        // console.log(response)
        // console.log('1st time gettin user id',user)
        
        // console.log('buying stock')
        const id = user.id
        user.transactions.unshift(dataToSend)


        // console.log(user.portfolio.filter(el=>{return el.symbol === dataToSend.symbol}))
        // if (!user.portfolio.filter(el=>{return el.symbol === dataToSend.symbol})) {
        //     console.log('YEEHAW')
        // } else {
        //     console.log('NONONONONONO')
        // }

        // if (user.portfolio.length > 0) {
        //     await user.portfolio.map(el=>{
        //         if (el.symbol === dataToSend.symbol){
        //             el.shares = parseInt(el.shares) + parseInt(dataToSend.shares)
        //         }
        //     })
        // } else {
        //     user.portfolio.push({symbol: dataToSend.symbol, shares: parseInt(dataToSend.shares)})
        // }


        // if (user.portfolio.length > 0) {
        //     if (user.portfolio.includes(dataToSend.symbol)) {
        //         await user.portfolio.map(el=>{
        //             if (el.symbol === dataToSend.symbol){
        //                 el.shares = parseInt(el.shares) + parseInt(dataToSend.shares)
        //             }
        //         })
        //     } else if (!user.portfolio.includes({symbol: dataToSend.symbol})) {
        //         user.portfolio.push({symbol: dataToSend.symbol, shares: parseInt(dataToSend.shares)})
        //     }
        // } else {
        //     user.portfolio.push({symbol: dataToSend.symbol, shares: parseInt(dataToSend.shares)})
        // }




        
        // if (user.portfolio.length > 0) {
        //     await user.portfolio.map(el=>{
        //         if (el.symbol === dataToSend.symbol){
        //             el.shares = parseInt(el.shares) + parseInt(dataToSend.shares)
        //         }
        //     })
        // } else {
        //     user.portfolio.push({symbol: dataToSend.symbol, shares: parseInt(dataToSend.shares)})
        // }
        


        // if (user.portfolio.some(el=>{el.symbol === dataToSend.symbol}) === true) {
        //     await user.portfolio.map(el=>{
        //         if (el.symbol === dataToSend.symbol){
        //             el.shares = parseInt(el.shares) + parseInt(dataToSend.shares)
        //         }
        //     })
        // } else if (user.portfolio.some(el=>{el.symbol === dataToSend.symbol}) === false) {
        //     user.portfolio.push({symbol: dataToSend.symbol, shares: parseInt(dataToSend.shares)})
        // }


        if(user.portfolio.some(el => el.symbol === dataToSend.symbol)){
            // console.log('stock found');
            await user.portfolio.map(el=>{
                if (el.symbol === dataToSend.symbol){
                    el.shares = parseInt(el.shares) + parseInt(dataToSend.shares)
                }
            })
        } else{
            // console.log('stock not found');
            user.portfolio.push({symbol: dataToSend.symbol, shares: parseInt(dataToSend.shares)})
        }




        // if (user.portfolio.length > 0) {
        //     await user.portfolio.filter( el=>{
        //         if (el.symbol == dataToSend.symbol) {
        //             console.log('stock in porto found')
        //             return el.shares = parseInt(el.shares) + parseInt(dataToSend.shares)
        //         } else if (el.symbol !== dataToSend.symbol) {
        //             console.log('stock in porto NOT found')
        //             return user.portfolio.push({symbol: dataToSend.symbol, shares: dataToSend.shares})
        //         } else {
        //             console.log('porto prob empty')
        //         }
        //     })
        // } else if (user.portfolio.length === 0) {
        //     console.log('porto NOT found')
        //     user.portfolio.push({symbol: dataToSend.symbol, shares: dataToSend.shares})
        // }


        const changeToWallet = parseInt(dataToSend.shares) * parseInt(dataToSend.price)
        user.money = parseInt(user.money) - parseInt(changeToWallet)
        // console.log(changeToWallet, user.money)
        const update = await api.put(`/app/transactions/${id}`, user)
        console.log('after update', dataToSend.symbol, update.data.user.portfolio)
        // console.log('TX', update.transactions)

        return user
    } catch (error) {
        console.log('buying error')
       throw error
    }
}


// export const buyStockAgain = async () => {
//     try {
//         // console.log('getting user id')
//         const response = await api.get('/app/profile/')
//         let { user } = response.data
//         console.log('1st time gettin user id', user)
        
//         // console.log('buying stock')
//         const id = user.id
//         user.transactions.push({"symbol": "NFLX", "shares": "10", "price": 100})
//         const secondResponse = await api.put(`/app/transactions/${id}`, user)
//         console.log('after update', secondResponse)

//         return user
//     } catch (error) {
//        throw error
//     }
// }

// export const logout = async (data) => {
//     try {
//         const response = await apiClient.post('/auth/login', data)
//         const { token, user } = response.data

//         localStorage.setItem('token', token)
//     } catch (error) {
//         throw error
//     }
// }





// export const login

// const somethingelse

// export const logout

// // are equal to

// export default { login }















// import axios from 'axios'
// import symbols from '../components/Symbols'
// require('dotenv').config()
// const BASE_URL = 'http://localhost:8001'
// const secret = process.env.REACT_APP_API_KEY
// const JWT_TOKEN = localStorage.getItem('token')

// const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Authorization': `Bearer ${JWT_TOKEN}`
//     }
// })


// export const login = async (data) => {
//     try {
//         const response = await api.post('/auth/login', data)
//         // const { token, user } = response.data
//         const { token } = response.data

//         localStorage.setItem('token', token)
//     } catch (error) {
//         throw error
//     }
// }


// export const getProfile = async () => {
//     try {
//         const response = await api.get('/app/profile')
//         const { user } = response.data
//         // console.log('user',user)
//         return user
//     } catch (error) {
//         throw error
//     }
// }


// export const signup = async ( data ) => {
//     try {
//         const response = await api.post('/auth/signup', data)
//         // const { token, user } = response.data
//         const { token } = response.data
        
//         localStorage.setItem('token', token)
//     } catch (error) {
//         throw error
//     }
// }


// export const getStock = async (token) => {
//     try {
//         let response = await fetch(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${token}&types=quote&token=${secret}`)
//         let data = await response.json()
//         return data
//     } catch (error) {
//         throw error
//     }
// }


// export const getStocks = () => {
//     try {
//         return symbols        
//     } catch (error) {
//         throw error
//     }
// }


// export const buyStock = async (dataToSend) => {
//     try {
//         // console.log('getting user id')
//         const response = await api.get('/app/profile/')
//         let { user } = response.data
//         // console.log(response)
//         // console.log('1st time gettin user id',user)
        
//         // console.log('buying stock')
//         const id = user.id
//         await user.transactions.push(dataToSend)
//         // if (user.portfolio.length > 0) {
//         //     await user.portfolio.filter( el=>{
//         //         if (el.symbol == dataToSend.symbol) {
//         //             console.log('porto found')
//         //             el.shares += dataToSend.shares
//         //         } else if (el.symbol !== dataToSend.symbol) {
//         //             console.log('porto NOT found')
//         //             user.portfolio.push({symbol: dataToSend.symbol, shares: dataToSend.shares})
//         //         } else {
//         //             console.log('porto prob empty')
//         //         }
//         //     })
//         // }
//         // console.log('sendingupdate')
//         const update = await api.put(`/app/transactions/${id}`, user)
//         // console.log('after update', update)
//         // console.log('TX', update.transactions)
//         const recheck = await api.get('/app/profile')
//         console.log(recheck.data)

//         return user
//     } catch (error) {
//        throw error
//     }
// }


// // export const buyStockAgain = async () => {
// //     try {
// //         // console.log('getting user id')
// //         const response = await api.get('/app/profile/')
// //         let { user } = response.data
// //         console.log('1st time gettin user id', user)
        
// //         // console.log('buying stock')
// //         const id = user.id
// //         user.transactions.push({"symbol": "NFLX", "shares": "10", "price": 100})
// //         const secondResponse = await api.put(`/app/transactions/${id}`, user)
// //         console.log('after update', secondResponse)

// //         return user
// //     } catch (error) {
// //        throw error
// //     }
// // }

// // export const logout = async (data) => {
// //     try {
// //         const response = await apiClient.post('/auth/login', data)
// //         const { token, user } = response.data

// //         localStorage.setItem('token', token)
// //     } catch (error) {
// //         throw error
// //     }
// // }





// // export const login

// // const somethingelse

// // export const logout

// // // are equal to

// // export default { login }