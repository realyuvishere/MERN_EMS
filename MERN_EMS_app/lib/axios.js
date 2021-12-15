import axios from 'axios'

const devUrl = 'http://192.168.1.6:8080'
const url = process.env.PUBLIC_URL || devUrl

const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: { 
        'Content-Type': 'application/json'
        
    },
})

export default instance