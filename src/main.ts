import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

/** daisy样式库 */
import "tailwindcss/tailwind.css"
import "daisyui/dist/full.css"

/** element样式库 */
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

/** md编辑器 */
import "md-editor-v3/lib/style.css"

/** 自定义全局方法 */
import Method from "./globalmethods"
import Cfg from "@/config/config"

let app = createApp(App)

// 导入各种插件
app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//刷新页面重新获取用户信息
Method.getInformation()

console.log(Method, "******", Cfg)

// 注入全局方法和变量
// app.provide('global', {
//   Method,
//   Cfg,
// })

// 指定容器
app.mount("#app")
