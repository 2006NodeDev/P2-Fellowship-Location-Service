 import axios from 'axios'
 

//an optional env for host address or localhost default
let baseURL = process.env['P2_USER_SERVICE_HOST'] || 'http://localhost:2007'


export const userServiceBaseClient = axios.create({
    baseURL,
    headers:{
        'Content-Type': 'application/json',
    },
})