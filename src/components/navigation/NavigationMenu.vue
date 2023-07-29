<template>
  <!-- 导航 -->
  <div class="navbar bg-base-100" style="padding: 0px 8px; height: 64px">
    <!-- 宽屏logo -->
    <div class="flex-1 hidden-xs-only">
      <router-link class="btn btn-ghost normal-case text-xl" to="/">
        <ScLogo />
        <div class="site-title">SC中文社区</div>
      </router-link>
    </div>

    <!-- 窄屏折叠logo，菜单 -->
    <div class="hidden-sm-and-up" v-if="cfg.menu">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <label for="my-drawer" tabindex="0" class="btn btn-ghost btn-circle">
          <ScLogo />
        </label>
      </div>
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content" style="height: 100%">
          <!-- Sidebar content here -->
          <li>
            <router-link to="/">
              <el-icon :size="28" style="padding: 0px 2px">
                <House />
              </el-icon>
              <el-text>主页</el-text>
            </router-link>
          </li>
          <li>
            <div>
              <el-icon :size="28" style="padding: 0px 2px">
                <Message />
              </el-icon>
              <el-text>消息</el-text>
            </div>
          </li>
          <li @click="handleLiClick">
            <div>
              <input
                ref="toggleInput"
                checked
                type="checkbox"
                class="toggle toggle-sm"
                data-toggle-theme="dark,light"
                data-act-class="ACTIVECLASS"
                v-model="iconid"
              />
              <el-text>
                <el-icon v-if="iconid">
                  <Moon />
                </el-icon>
                <el-icon v-else> <Sunny /> </el-icon>切换主题
              </el-text>
            </div>
          </li>
          <li>
            <router-link to="/setup">
              <el-icon :size="28" style="padding: 0px 2px">
                <setting />
              </el-icon>
              <span>设置</span>
            </router-link>
          </li>
          <li>
            <details>
              <summary>扩展工具</summary>
              <ul>
                <li><a href="https://suancaixianyu.cn/sss">简谱转换</a></li>
                <li><a href="https://suancaixianyu.com">白嫖gpt</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>

    <!-- 样式1 -->
    <div class="dropdown hidden-sm-and-up bg-base-100" v-else>
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <ScLogo />
      </label>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo dropdown-content bg-base-100"
        style="border: none; z-index: 20"
        @open="true"
      >
        <!-- 返回主页 -->
        <router-link to="/">
          <el-menu-item index="1">
            <div>
              <el-icon :size="28" style="padding: 0px 2px">
                <House />
              </el-icon>
              <el-text>主页</el-text>
            </div>
          </el-menu-item>
        </router-link>
        <!-- 消息 -->
        <el-menu-item index="2">
          <div>
            <el-icon :size="28" style="padding: 0px 2px">
              <Message />
            </el-icon>
            <el-text>消息</el-text>
          </div>
          <span class="indicator-item badge">5</span>
        </el-menu-item>
        <!-- 主题切换 -->
        <el-menu-item index="3" style="align-items: center" @click="handleLiClick">
          <input
            ref="toggleInput"
            checked
            type="checkbox"
            class="toggle toggle-sm"
            data-toggle-theme="dark,light"
            data-act-class="ACTIVECLASS"
            v-model="iconid"
          />
          <el-text>
            <el-icon v-if="iconid">
              <Moon />
            </el-icon>
            <el-icon v-if="iconid === false"> <Sunny /> </el-icon>切换主题
          </el-text>
        </el-menu-item>
        <!-- 设置 -->
        <el-menu-item index="5">
          <router-link to="/setup">
            <el-icon :size="28" style="padding: 0px 2px">
              <setting />
            </el-icon>
            <span>设置</span>
          </router-link>
        </el-menu-item>
        <!-- 工具 -->
        <el-menu-item-group title="外部工具" index="4" style="text-align: left">
          <el-menu-item index="4-1">
            <a href="https://suancaixianyu.cn/sss">简谱转换</a>
          </el-menu-item>
          <el-menu-item index="4-2">
            <a href="https://suancaixianyu.com">白嫖gpt</a>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>

    <!-- 分割元素 -->
    <div class="flex-grow" />
    <div class="flex-none">
      <!-- 右边选项卡 -->
      <ul class="menu menu-horizontal px-1" style="align-items: center; padding: 0px 8px">
        <!-- mod -->
        <li>
          <router-link to="/ModList">
            <el-icon :size="25" style="padding: 0px 2px">
              <ScMod />
            </el-icon>
          </router-link>
        </li>
        <!-- 消息 -->
        <li class="hidden-xs-only">
          <div class="indicator">
            <span class="indicator-item badge">5</span>
            <el-icon :size="28" style="padding: 0px 2px">
              <Message />
            </el-icon>
          </div>
        </li>
        <!-- 工具 -->
        <li class="hidden-xs-only">
          <details style="z-index: 20">
            <summary>工具</summary>
            <ul class="p-2 bg-base-100">
              <li>
                <a href="https://suancaixianyu.cn/sss">简谱转换</a>
              </li>
              <li>
                <a href="https://suancaixianyu.com">白嫖gpt</a>
              </li>
              <li>
                <!-- 设置 -->

                <div>
                  <router-link to="/setup">
                    <el-icon :size="28" style="padding: 0px 2px">
                      <setting />
                    </el-icon>
                    <span>设置</span>
                  </router-link>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <!-- 主题切换 -->
        <li class="hidden-xs-only">
          <div class="indicator">
            <label class="swap swap-rotate">
              <input
                type="checkbox"
                data-toggle-theme="dark,light"
                data-act-class="ACTIVECLASS"
                style="width: 22px; height: 22px"
              />
              <svg
                class="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                />
              </svg>
              <svg
                class="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                />
              </svg>
            </label>
          </div>
        </li>
        <!-- 个人中心 -->
        <li>
          <div v-if="!userInfo.isLogin" @click="showLoginDialog">
            <el-icon :size="25" style="padding: 0px 2px">
              <UserFilled />
            </el-icon>
          </div>
          <div class="dropdown dropdown-bottom dropdown-end dropdown-hover" v-else>
            <label tabindex="0">
              <el-avatar :src="userInfo.data.headurl" :shape="shape" :size="32" />
            </label>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <router-link to="/user">
                  <a href="javascript:;">个人中心</a>
                </router-link>
              </li>
              <li>
                <a @click="loginOut">退出登陆</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog :show-close="true" v-model="userInfo.isLoginDialogVisible">
      <UserLogin />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Cfg from "@/config/config"
import Method from "@/globalmethods"
import ScLogo from "@comps/icons/ScLogo.vue"
import ScMod from "@comps/icons/ScMod.vue"
import UserLogin from "@comps/main/UserLogin.vue"
import { ElMessage } from "element-plus"
import { ref } from "vue"
import type { Ref } from "vue"
export default {
  name: "NavigationMenu",
  components: {
    ScLogo,
    ScMod,
    UserLogin,
  },
  data() {
    return {
      userInfo: Cfg.config.userInfo,
      shape: Cfg.config.homestyle.cfg.shape,
      iconid: false,
      menumode: "horizontal",
      showtext: false,
      headsize: 38,
      iconsize: 55,
      ellipsis: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  methods: {
    loginOut() {
      Method.api_get("/user/loginOut")
        .then((res: any) => {
          if (res.data.code == 200) {
            ElMessage({
              type: "success",
              message: res.data.msg,
            })
            this.userInfo.isLogin = false
          }
        })
        .catch((error) => {
          ElMessage({
            type: "error",
            message: error,
          })
        })
    },
    showLoginDialog() {
      this.userInfo.isLoginDialogVisible = !this.userInfo.isLoginDialogVisible
    },
  },
  setup() {
    const toggleInput: Ref<HTMLElement | null> = ref(null)
    const handleLiClick = () => {
      toggleInput.value!.click()
    }

    return {
      toggleInput,
      handleLiClick,
      ...Cfg.config.homestyle,
    }
  },
}
</script>

<style scoped>
.site-title {
  font-weight: bold;
  font-size: 18px;
}

.flex-grow {
  flex-grow: 1;
}

.el-sub-menu__title {
  border: none;
}
</style>
