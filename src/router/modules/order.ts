/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'

const orderRouter = {
  path: '/order',
  component: Layout,
  name: 'order',
  meta: {
    title: 'orderManage',
    icon: 'documentation',
    alwaysShow: true
  },
  children: [
    {
      path: 'orderList',
      component: () => import('@/views/orderList/index.vue'),
      name: 'orderList',
      meta: { title: 'orderView' }
    },
    {
      path: 'orderList/edit',
      component: () => import('@/views/orderList/edit.vue'),
      name: 'orderList/edit',
      meta: { title: 'orderEdit', hidden: true }
    }
  ],
  singleHasMenu: true
}

export default orderRouter
