import axios from 'axios'

const api = axios.create({
  //baseURL: 'http://localhost:4000/',
  baseURL: 'https://app-produtos-backend.herokuapp.com',
})

export default api
