import request from '@/utils/request'
import { IQcreateProduct } from '@/api/dto/product/list/createProduct'
import { IQupdateProduct } from '@/api/dto/product/list/updateProduct'
import { IQcreateProdCategory } from '@/api/dto/product/prodCategory/createProdCategory'
import { IQupdateProdCategory } from '@/api/dto/product/prodCategory/updateProdCategory'
import { IQcreateShipCategory } from '@/api/dto/product/shipCategory/createShipCategory'
import { IQupdateShipCategory } from '@/api/dto/product/shipCategory/updateShipCategory'
import { IQgetProdcutDetail } from '@/api/dto/product/list/getProductDetail'
import { IQid } from '@/api/dto/common/idQuery'

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
export function updateProducts(data:IQupdateProduct, params:IQid) {
  return request({
    url: '/product',
    method: 'put',
    data,
    params
  })
}
export function deleteProducts(params:IQid) {
  return request({
    url: '/product',
    method: 'delete',
    params
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
export function updateProdCategory(data:IQupdateProdCategory, params:IQid) {
  return request({
    url: '/product/prodCategory',
    method: 'put',
    data,
    params
  })
}
export function deleteProdCategory(params:IQid) {
  return request({
    url: '/product/prodCategory',
    method: 'delete',
    params
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
export function updateShipCategory(data:IQupdateShipCategory, params:IQid) {
  return request({
    url: '/product/shipCategory',
    method: 'put',
    data,
    params
  })
}
export function deleteShipCategory(params:IQid) {
  return request({
    url: '/product/shipCategory',
    method: 'delete',
    params
  })
}
