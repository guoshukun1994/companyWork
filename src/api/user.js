import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/userMsgFromToken',
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

export function logout(token) {
  return request({
    url: '/api/exit',
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
