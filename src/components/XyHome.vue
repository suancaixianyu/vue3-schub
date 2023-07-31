<template>
  <div class="common-layout bg-base-100" data-theme="light">
    <el-container :style="container">
      <el-header :style="container" style="z-index: 20">
        <el-affix :offset="0">
          <NavigationMenu />
        </el-affix>
      </el-header>

      <el-main :style="maincontainer">
        <router-view></router-view>
      </el-main>
      <el-footer v-if="set.showfooter" :style="container" style="height: 30px"> </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import "element-plus/theme-chalk/display.css"
import { provide, ref, onUpdated, onMounted } from "vue"
import Cfg from "@/config/config"
/** 顶部导航栏 */
import NavigationMenu from "@comps/navigation/NavigationMenu.vue"

/** 页面主体框架 */
export default {
  name: "XyHome",
  components: {
    NavigationMenu,
  },
  setup() {
    let windowwidth = ref(document.body.clientWidth)

    let immediate = true
    // 窗口变化监听
    window.onresize = () => {
      if (immediate) {
        immediate = false
        setTimeout(() => {
          windowwidth.value = document.body.clientWidth
          immediate = true
          pagewidth(windowwidth.value)
        }, 200)
      }
    }

    function pagewidth(width: number) {
      if (width <= 480) {
        Cfg.config.homestyle.set.ismobile = true
      } else {
        Cfg.config.homestyle.set.ismobile = false
      }
    }

    onUpdated(() => {
      console.log("更新组件")
    })

    onMounted(() => {
      console.log("主页挂载")
    })

    let theme = ref("cupcake")
    provide("windowwidth", windowwidth)
    provide("theme", theme)
    return {
      ...Cfg.config.homestyle,
    }
  },
}
</script>

<style>
/** tag标签左右加空格 */
.el-tag {
  margin: 0px 5px;
}

/* 添加 class="hide-scrollbar" 使用 */
/* 隐藏滚动条样式 */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  /* 添加伪元素来覆盖滚动条 */
  position: relative;
  overflow: hidden;
}

.hide-scrollbar::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  background-color: #fff;
}

/** 滚动条样式 */
/** 所有自定义变量在此使用 */

*::-webkit-scrollbar {
  /* 设置滚动条的宽度 */
  width: var(--webkit-scrollbar-width);
}

*::-webkit-scrollbar-track {
  /* 设置滚动条的背景颜色 */
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  /* 设置滚动条的颜色 */
  background: var(--webkit-scrollbar-thumb-background);
  border: var(--webkit-scrollbar-thumb-border);
  border-radius: var(--webkit-scrollbar-thumb-border-radius);
  background-size: var(--webkit-scrollbar-thumb-background-size);
  background-color: var(--webkit-scrollbar-thumb-background-color);
}

*::-webkit-scrollbar-thumb:hover {
  /* 设置滚动条悬停时的颜色 */
  background: var(--webkit-scrollbar-thumb-background-hover);
  border: var(--webkit-scrollbar-thumb-border-hover);
  border-radius: var(--webkit-scrollbar-thumb-border-radius-hover);
  background-size: var(--webkit-scrollbar-thumb-background-size-hover);
  background-color: var(--webkit-scrollbar-thumb-background-color-hover);
}
</style>
