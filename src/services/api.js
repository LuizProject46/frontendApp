import axios from 'axios'

const api = axios.create({
  baseURL: "http://socialsociety-com-br.umbler.net/"//'http://192.168.0.30:3333'
})

export default api