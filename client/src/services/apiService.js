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
        return user
    } catch (error) {
        throw error
    }
}


export const signup = async ( data ) => {
    try {
        const response = await api.post('/auth/signup', data)
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
        const response = await api.get('/app/profile/')
        let { user } = response.data
        const id = user.id
        user.transactions.unshift(dataToSend)
        if(user.portfolio.some(el => el.symbol === dataToSend.symbol)){
            // console.log('stock found');
            await user.portfolio.map(el=>{
                if (el.symbol === dataToSend.symbol){
                    el.shares = parseInt(el.shares) + parseInt(dataToSend.shares)
                }
            })
        } else{
            user.portfolio.push({symbol: dataToSend.symbol, shares: parseInt(dataToSend.shares)})
        }
        const changeToWallet = parseInt(dataToSend.shares) * parseInt(dataToSend.price)
        user.money = parseInt(user.money) - parseInt(changeToWallet)
        await api.put(`/app/transactions/${id}`, user)
        return user
    } catch (error) {
        console.log('buying error')
       throw error
    }
}


export const depositMoney = async (money) => {
    try {
        const response = await api.get('/app/profile/')
        let { user } = response.data
        const id = user.id
        user.money = parseInt(user.money) + parseInt(money)
        await api.put(`/app/money/${id}`, user)
    } catch (error) {
        throw error
    }
}