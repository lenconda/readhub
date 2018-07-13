import axios from 'axios'

export default api = axios.create({
  baseURL: 'https://api.readhub.me',
  timeout: 5000
})