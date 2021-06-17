import request from '@/utils/request'
import { IQcreateProduct } from '@/api/dto/product/list/createProduct'
import { IQupdateProduct } from '@/api/dto/product/list/updateProduct'
import { IQdeleteProduct } from '@/api/dto/product/list/deleteProduct'
import { IQcreateProdCategory } from '@/api/dto/product/prodCategory/createProdCategory'
import { IQupdateProdCategory } from '@/api/dto/product/prodCategory/updateProdCategory'
import { IQdeleteProdCategory } from '@/api/dto/product/prodCategory/deleteProdCategory'
import { IQcreateShipCategory } from '@/api/dto/product/shipCategory/createShipCategory'
import { IQupdateShipCategory } from '@/api/dto/product/shipCategory/updateShipCategory'
import { IQdeleteShipCategory } from '@/api/dto/product/shipCategory/deleteShipCategory'
import { IQgetProdcutDetail } from '@/api/dto/product/list/getProductDetail'
/* product */
export function getProducts() {
  return request({
    url: '/product',
    method: 'get'
  })
}
export function getProductDetail(data:IQgetProdcutDetail) {
  return request({
    url: '/product/detail',
    method: 'get',
    params: data
  })
}
export function createProducts(data:IQcreateProduct) {
  return request({
    url: '/product',
    method: 'post',
    data
  })
}
export function updateProducts(data:IQupdateProduct) {
  return request({
    url: '/product',
    method: 'put',
    data
  })
}
export function deleteProducts(data:IQdeleteProduct) {
  return request({
    url: '/product',
    method: 'delete',
    data
  })
}

export function uploadProductPicture(data:any) {
  return request({
    url: '/product/upload',
    method: 'post',
    data
  })
}
/* prod category */
export function getProdCategory() {
  return request({
    url: '/product/prodCategory',
    method: 'get'
  })
}
export function createProdCategory(data:IQcreateProdCategory) {
  return request({
    url: '/product/prodCategory',
    method: 'post',
    data
  })
}
export function updateProdCategory(data:IQupdateProdCategory) {
  return request({
    url: '/product/prodCategory',
    method: 'put',
    data
  })
}
export function deleteProdCategory(data:IQdeleteProdCategory) {
  return request({
    url: '/product/prodCategory',
    method: 'delete',
    data
  })
}

/* prod category select */
export function getProdCategorySelect() {
  return request({
    url: '/product/prodCategory/select',
    method: 'get'
  })
}
/* ship category */
export function getShipCategory() {
  return request({
    url: '/product/shipCategory',
    method: 'get'
  })
}
export function createShipCategory(data:IQcreateShipCategory) {
  return request({
    url: '/product/shipCategory',
    method: 'post',
    data
  })
}
export function updateShipCategory(data:IQupdateShipCategory) {
  return request({
    url: '/product/shipCategory',
    method: 'put',
    data
  })
}
export function deleteShipCategory(data:IQdeleteShipCategory) {
  return request({
    url: '/product/shipCategory',
    method: 'delete',
    data
  })
}
