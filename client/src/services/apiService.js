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
        // console.log('user',user)
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


export const getStock = async (token) => {
    try {
        let response = await fetch(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${token}&types=quote&token=${secret}`)
        let data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}


export const getStocks = () => {
    try {
        return symbols        
    } catch (error) {
        throw error
    }
}


export const buyStock = async (dataToSend) => {
    try {
        // console.log('getting user id')
        const response = await api.get('/app/profile/')
        let { user } = response.data
        // console.log(response)
        // console.log('1st time gettin user id',user)
        
        // console.log('buying stock')
        const id = user.id
        await user.transactions.push(dataToSend)
        // if (user.portfolio.length > 0) {
        //     await user.portfolio.filter( el=>{
        //         if (el.symbol == dataToSend.symbol) {
        //             console.log('porto found')
        //             el.shares += dataToSend.shares
        //         } else if (el.symbol !== dataToSend.symbol) {
        //             console.log('porto NOT found')
        //             user.portfolio.push({symbol: dataToSend.symbol, shares: dataToSend.shares})
        //         } else {
        //             console.log('porto prob empty')
        //         }
        //     })
        // }
        // console.log('sendingupdate')
        const update = await api.put(`/app/transactions/${id}`, user)
        // console.log('after update', update)
        // console.log('TX', update.transactions)
        const recheck = await api.get('/app/profile')
        console.log(recheck.data)

        return user
    } catch (error) {
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