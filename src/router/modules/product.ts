/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'

const productRouter = {
  path: '/product',
  component: Layout,
  name: 'product',
  meta: {
    title: 'productManage',
    icon: 'component',
    alwaysShow: true
  },
  children: [
    {
      path: 'productList',
      component: () => import('@/views/product/productList/index.vue'),
      name: 'productList',
      meta: { title: 'productView', role: 'checkProductList' }
    },
    {
      path: 'productList/edit',
      component: () => import('@/views/product/productList/edit.vue'),
      name: 'productList/edit',
      meta: { title: 'productEdit', role: 'checkProductList', hidden: true }
    },
    {
      path: 'category',
      component: () => import('@/views/product/category/index.vue'),
      name: 'category',
      meta: { title: 'categoryManage', alwaysShow: true },
      children: [
        {
          path: 'product',
          component: () => import('@/views/product/category/menu/product/index.vue'),
          name: 'product',
          meta: { title: 'productCategory', role: 'checkProductCategory' }
        },
        {
          path: 'shipment',
          component: () => import('@/views/product/category/menu/shipment/index.vue'),
          name: 'shipment',
          meta: { title: 'shipCategory', role: 'checkShipCategory' }
        }
      ]
    }

  ]
}

export default productRouter
