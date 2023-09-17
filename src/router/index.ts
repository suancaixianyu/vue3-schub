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
    meta: { title: '个人中心-SC中文社区', keepAlive: true },
    component: () => import('@comps/user/index.vue'),
  },
  {
    path: '/usersetup',
    name: 'UserSetup',
    meta: { title: '用户设置-SC中文社区' },
    component: () => import('@comps/user/setup.vue'),
  },
  {
    path: '/setup',
    name: 'WebSetup',
    meta: { title: '网页设置-SC中文社区' },
    component: () => import('@comps/main/WebSetup.vue'),
  },
  /** 登录和注册 */
  // {
  //   path: '/login/:register?',
  //   name: 'UserLogin',
  //   component: () => import('@comps/user/login.vue'),
  // },
  /** 发帖 */
  {
    path: '/publish/:chatid/:id?',
    name: 'publish',
    meta: { title: '发布帖子-SC中文社区' },
    component: () => import('@comps/main/PublishPost.vue'),
  },
  /**发模组*/
  {
    path: '/ModPublish/:id',
    name: 'ModPublish',
    meta: { title: '发布模组-SC中文社区' },
    component: () => import('@comps/mod/publish.vue'),
  },
  /**模组列表 or 资源大厅*/
  {
    path: '/ModList',
    name: 'ModList',
    meta: { title: '资源大厅-SC中文社区', keepAlive: true },
    component: () => import('@comps/mod/list.vue'),
  },
  /**模组详情**/
  {
    path: '/ModDetail/:id',
    name: 'ModDetail',
    meta: { title: '资源详情-SC中文社区' },
    component: () => import('@comps/mod/detail.vue'),
  },
  /**文件列表**/
  {
    path: '/ModFiles/:id',
    name: 'ModFiles',
    meta: { title: '文件列表-SC中文社区' },
    component: () => import('@comps/mod/fileList.vue'),
  },
  /**管理员**/
  {
    path: '/admin',
    name: 'Admin',
    meta: { title: '网页后台-SC中文社区', keepAlive: true },
    component: () => import('@comps/admin/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title! as string || 'SC中文社区'
  next();
});


export default router