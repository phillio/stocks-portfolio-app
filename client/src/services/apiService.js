import axios from 'axios'
const BASE_URL = 'http://localhost:8001'

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