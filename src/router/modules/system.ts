/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'

const systemRouter = {
  path: '/system',
  component: Layout,
  name: 'System',
  meta: {
    title: 'systemSetting',
    icon_element: 'setting',
    alwaysShow: true
  },
  children: [
    {
      path: 'account',
      component: () => import('@/views/system/account/index.vue'),
      name: 'account',
      meta: { title: 'accountManage', role: 'checkAccount' }
    },
    {
      path: 'authority',
      component: () => import('@/views/system/authority/index.vue'),
      name: 'authority',
      meta: { title: 'roleManage', role: 'checkAuthority' }
    },
    {
      path: 'logs',
      component: () => import('@/views/system/logs/index.vue'),
      name: 'logs',
      meta: { title: 'loginRecord', role: 'checkLogs' }
    },
    {
      path: 'blacklist',
      component: () => import('@/views/system/blacklist/index.vue'),
      name: 'blacklist',
      meta: { title: 'blackList', role: 'checkBlacklist' }
    }

  ]
}

export default systemRouter
