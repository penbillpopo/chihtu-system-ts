import request from '@/utils/request'
import { IQlogin } from '@/api/dto/system/login'
import { IQcreateUsers } from '@/api/dto/system/users/createUsers'
import { IQdeleteUsers } from '@/api/dto/system/users/deleteUsers'
import { IQupdateUsers } from '@/api/dto/system/users/updateUsers'
import { IQcreateRoles } from '@/api/dto/system/roles/createRoles'
import { IQupdateRoles } from '@/api/dto/system/roles/updateRoles'
import { IQdeleteRoles } from '@/api/dto/system/roles/deleteRoles'

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
export function deleteUser(data:IQdeleteUsers) {
  return request({
    url: '/user',
    method: 'delete',
    data
  })
}
export function updateUser(data:IQupdateUsers) {
  return request({
    url: '/user',
    method: 'put',
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
export function createRoles(data:IQcreateRoles) {
  return request({
    url: '/authority/role',
    method: 'post',
    data
  })
}
export function deleteRoles(data:IQdeleteRoles) {
  return request({
    url: '/authority/role',
    method: 'delete',
    data
  })
}
export function updateRoles(data:IQupdateRoles) {
  return request({
    url: '/authority/role',
    method: 'put',
    data
  })
}
export function getRolesSelect() {
  return request({
    url: '/authority/role/select',
    method: 'get'
  })
}
