import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  /** 主页 */
  {
    path: '/',
    name: 'PlateBox',
    component: () => import('@comps/main/cards/HomePlate.vue'),
    children: [
      {
        path: 'postlist/:cateid',
        name: 'PostPage',
        component: () => import('@comps/main/cards/HomeLeft.vue'),
        children: [
          {
            path: ':id',
            name: 'DetailPlate',
            component: () => import('@comps/main/cards/DetailPlate.vue'),
          },
        ]
      },
    ]
  },

  /** 用户主页 */
  {
    path: '/user',
    name: 'UserIndex',
    component: () => import('@comps/main/UserIndex.vue'),
  },

  {
    path: '/setup',
    name: 'UserSetup',
    component: () => import('@comps/main/UserSetup.vue'),
  },
  /** 登录和注册 */
  {
    path: '/login/:register?',
    name: 'UserLogin',
    component: () => import('@comps/main/UserLogin.vue'),
  },
  /** 发帖 */
  {
    path: '/publish/:chatid',
    name: 'publish',
    component: () => import('@comps/main/PublishPost.vue'),
  },
  /**发模组*/
  {
    path: '/ModPublish',
    name: 'ModPublish',
    component: () => import('@comps/mod/publish.vue'),
  },
  /**模组列表 or 资源大厅*/
  {
    path: '/ModList',
    name: 'ModList',
    component: () => import('@comps/mod/list.vue'),
  },
  /**模组详情**/
  {
    path: '/ModDetail/:id',
    name: 'ModDetail',
    component: () => import('@comps/mod/detail.vue'),
  },
  /**文件列表**/
  {
    path: '/ModFiles/:id',
    name: 'ModFiles',
    component: () => import('@comps/mod/fileList.vue'),
  },
  /**文件列表**/
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('@comps/admin/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
