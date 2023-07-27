<template>
  <div class="common-layout bg-base-200">
    <el-container :style="container">
      <el-header :style="container" style="z-index: 20">
        <el-affix :offset="0">
          <NavigationMenu />
        </el-affix>
      </el-header>

      <el-main :style="maincontainer">
        <router-view></router-view>
      </el-main>
      <el-footer v-if="cfg.isshow" :style="container" style="height: 30px">
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { provide, ref, onUpdated } from "vue";
import Cfg from "@/config/config";
/** 顶部导航栏 */
import NavigationMenu from "@comps/navigation/NavigationMenu.vue";

/** 页面主体框架 */
export default {
  name: "XyHome",
  components: {
    NavigationMenu,
  },
  setup() {
    let windowwidth = ref(document.body.clientWidth);

    let immediate = true;
    // 窗口变化监听
    window.onresize = () => {
      if (immediate) {
        immediate = false;
        setTimeout(() => {
          windowwidth.value = document.body.clientWidth;
          immediate = true;
        }, 200);
      }
    };

    onUpdated(() => {
      console.log("更新组件");
    });
    let theme = ref("cupcake");
    provide("windowwidth", windowwidth);
    provide("theme", theme);
    return {
      ...Cfg.config.homestyle,
    };
  },
};

// const body = document.querySelector("body");
// body.addEventListener("mouseenter", () => {
//   body.style.animationPlayState = "running";
// });

// body.addEventListener("mouseleave", () => {
//   body.style.animationPlayState = "paused";
// });
</script>

<style>
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

*::-webkit-scrollbar {
  /* 设置滚动条的宽度 */
  width: 12px;
}

*::-webkit-scrollbar-track {
  /* 设置滚动条的背景颜色 */
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  /* 设置滚动条的颜色 */
  background-image: url("../assets/icon/mifengup.svg"),
    url("../assets/icon/mifengbottom.svg");
  background-position:
    center top,
    center bottom;
  background-repeat: no-repeat, no-repeat;
  background-size: 100%, 100%;
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
  /* 设置滚动条悬停时的颜色 */
  background-color: #eee;
}

/** tag标签左右加空格 */
.el-tag {
  margin: 0px 5px;
}
</style>
