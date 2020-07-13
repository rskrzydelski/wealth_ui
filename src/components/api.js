import Axios from 'axios'

export const get = (url, callback) => {
  Axios.get(url, {
    headers: {
      authorization: 'JWT ' + localStorage.getItem('access')
    }
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data)
      } else {
        console.log(res.status)
      }
    })
}

export const post = (url, data, callback) => {
  Axios.post(url, data)
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        callback(res.data)
      } else {
        console.log(res.status)
      }
    })
}
