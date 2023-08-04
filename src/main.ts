import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/** daisy样式库 */
import 'tailwindcss/tailwind.css'
import 'daisyui/dist/full.css'

/** element样式库 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/** 自定义全局方法 */
import Method from './globalmethods'

let app = createApp(App)

// 导入各种插件
app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 初始化页面样式
Method.setwebstyle()
// 注入全局方法和变量
// app.provide('global', {
//   Method,
//   Cfg,
// })

// 指定容器
app.mount('#app')
