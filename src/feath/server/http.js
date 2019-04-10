import axios from 'axios'
console.log(process.env);
const devUrl = 'http://10.144.132.30:8005' // 测试地址
const proUrl = 'http://10.144.132.30:8005' // 线上地址
let domain = process.env.BRANCH !== 'production' ? devUrl : proUrl
// 设置baseURL
axios.defaults.baseURL = domain

export function get (url, params) {
  let token = localStorage.getItem('access_token')
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params, headers: { 'Authorization': token ? 'Bearer ' + token : '' } })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function post (url, params) {
  let token = localStorage.getItem('access_token')
  return new Promise((resolve, reject) => {
    axios.post(url, params, { headers: { 'Authorization': token ? 'Bearer ' + token : '' } })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function Delete (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url + '/' + params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}