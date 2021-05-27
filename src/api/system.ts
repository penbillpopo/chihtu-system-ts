import request from '@/utils/request'
import { IQlogin } from '@/api/dto/system/login'
import { IQcreateUsers } from '@/api/dto/system/createUsers'

/* login */
export function login(data:IQlogin) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
/* info */
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

/* user */
export function getUsers() {
  return request({
    url: '/user',
    method: 'get'
  })
}
export function createUsers(data:IQcreateUsers) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

/* role */
export function getRoles() {
  return request({
    url: '/authority/role',
    method: 'get'
  })
}
