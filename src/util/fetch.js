import axios from 'axios'

export default function fetch(method, url, params) {
  return new Promise((resolve, reject) => {
    // get和post要传的参数格式不一样
    var data = method === 'get' ? { params: params } : params

    if (method === 'get') {
      axios.get(url, data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    } else {
      axios.post(url, data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
};