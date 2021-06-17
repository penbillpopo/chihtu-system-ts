import request from '@/utils/request'
import { IQlogin } from '@/api/dto/system/login'
import { IQcreateUsers } from '@/api/dto/system/users/createUsers'
import { IQupdateUsers } from '@/api/dto/system/users/updateUsers'
import { IQcreateRoles } from '@/api/dto/system/roles/createRoles'
import { IQupdateRoles } from '@/api/dto/system/roles/updateRoles'
import { IQid } from '@/api/dto/common/idQuery'

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
export function deleteUser(params:IQid) {
  return request({
    url: '/user',
    method: 'delete',
    params
  })
}
export function updateUser(data:IQupdateUsers,params:IQid) {
  return request({
    url: '/user',
    method: 'put',
    data,
    params
  })
}

/* authority */
export function getRoles() {
  return request({
    url: '/authority',
    method: 'get'
  })
}
export function createRoles(data:IQcreateRoles) {
  return request({
    url: '/authority',
    method: 'post',
    data
  })
}
export function deleteRoles(params:IQid) {
  return request({
    url: '/authority',
    method: 'delete',
    params
  })
}
export function updateRoles(data:IQupdateRoles,params:IQid) {
  return request({
    url: '/authority',
    method: 'put',
    data,
    params
  })
}
export function getRolesSelect() {
  return request({
    url: '/authority/select',
    method: 'get'
  })
}
