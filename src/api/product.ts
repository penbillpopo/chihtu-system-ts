import request from '@/utils/request'
import { IQproduct } from '@/api/dto/product/product'


/* product */
export function getProducts() {
  return request({
    url: '/product',
    method: 'get'
  })
}
export function createProducts(data:IQproduct) {
  return request({
    url: '/product',
    method: 'post',
    data
  })
}