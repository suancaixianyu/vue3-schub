<template>
  <el-config-provider :locale="locale" :button="button">
    <div class="common-layout bg-base-100">
      <el-container :style="container">
        <el-header :style="container" style="z-index: 20">
          <el-affix :offset="0">
            <NavigationMenu />
          </el-affix>
        </el-header>

        <el-main
          :style="maincontainer"
          class="bg-base-100"
          data-set-theme="dark"
        >
          <router-view v-slot="{ Component }">
            <keep-alive v-show="$route.meta.keepAlive">
              <component v-if="$route.meta.keepAlive" :is="Component" />
            </keep-alive>
            <component v-if="!$route.meta.keepAlive" :is="Component" />
          </router-view>
        </el-main>
      </el-container>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
import 'element-plus/theme-chalk/display.css'
import { provide, ref, reactive, onMounted, computed } from 'vue'
import Cfg from '@/config/config'
import NavigationMenu from '@comps/navigation/NavigationMenu.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import en from 'element-plus/dist/locale/en.mjs'

/** md编辑器 */
import 'md-editor-v3/lib/style.css'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const button = reactive({
  autoInsertSpace: true,
})

/** 页面主体框架 */
export default {
  name: 'XyHome',
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
        if (Cfg.set.ismobile) {
          Cfg.maincontainer.height = 'auto'
        } else {
          Cfg.maincontainer.height = 'calc(100vh - 4rem)'
        }
      }
    }

    /** 手机和pc切换 */
    function pagewidth(width: number) {
      if (width <= 480) {
        Cfg.set.ismobile = true
        Cfg.maincontainer.height = 'auto'
      } else {
        Cfg.set.ismobile = false
        Cfg.maincontainer.height = 'calc(100vh - 4rem)'
      }
    }

    onMounted(() => {
      pagewidth(document.body.clientWidth)
    })

    let theme = ref('cupcake')
    provide('windowwidth', windowwidth)
    provide('theme', theme)
    return {
      ...Cfg,
      set: Cfg.set,
      locale,
      button,
    }
  },
}
</script>

<style>
.home-footer {
  display: flex;
  justify-content: center;
}
.common-layout {
  height: 100%;
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
  content: '';
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
  width: var(--scrollbar-width);
}

*::-webkit-scrollbar-track {
  /* 设置滚动条的背景颜色 */
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  /* 设置滚动条的颜色 */
  background: var(--scrollbar-thumb-background);
  border: var(--scrollbar-thumb-border);
  border-radius: var(--scrollbar-thumb-border-radius);
  background-size: var(--scrollbar-thumb-background-size);
  background-color: var(--scrollbar-thumb-background-color);
}

*::-webkit-scrollbar-thumb:hover {
  /* 设置滚动条悬停时的颜色 */
  background: var(--scrollbar-thumb-background-hover);
  border: var(--scrollbar-thumb-border-hover);
  border-radius: var(--scrollbar-thumb-border-radius-hover);
  background-size: var(--scrollbar-thumb-background-size-hover);
  background-color: var(--scrollbar-thumb-background-color-hover);
}
</style>
