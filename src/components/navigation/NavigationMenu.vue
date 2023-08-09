<template>
  <!-- 导航 -->
  <div class="navbar bg-base-100" style="padding: 0 8px; height: 64px">
    <!-- 宽屏logo -->
    <div class="flex-1 hidden-xs-only">
      <router-link v-if="isRootPath" class="btn btn-ghost normal-case text-xl" to="/">
        <ScLogo />
        <div class="site-title">SC中文社区</div>
      </router-link>
      <div v-else @click="goBack" class="btn btn-ghost normal-case text-xl">
        <el-icon><ArrowLeftBold /></el-icon>
        返回
      </div>
    </div>

    <!-- 窄屏折叠logo，菜单 -->
    <div class="hidden-sm-and-up" v-if="set.menu">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content" v-if="isRootPath">
        <label for="my-drawer" tabindex="0" class="btn btn-ghost btn-circle">
          <ScLogo />
        </label>
      </div>
      <div v-else @click="goBack" class="btn btn-ghost normal-case text-xl">
        <el-icon><ArrowLeftBold /></el-icon>
        返回
      </div>
      <!-- 抽屉菜单 -->
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content" style="height: 100%">
          <!-- Sidebar content here -->
          <li>
            <router-link to="/">
              <el-icon :size="28" style="padding: 0 2px">
                <House />
              </el-icon>
              <el-text>主页</el-text>
            </router-link>
          </li>
          <li @click="bailanle">
            <div>
              <el-icon :size="28" style="padding: 0 2px">
                <Message />
              </el-icon>
              <el-text>消息</el-text>
            </div>
          </li>

          <hr>
          <li @click="handleLiClick, bailanle">
            <div>
              <input ref="toggleInput" checked type="checkbox" class="toggle toggle-sm" data-toggle-theme="dark,light"
                data-act-class="ACTIVECLASS" v-model="iconid" />
              <el-text>
                <el-icon v-if="iconid">
                  <Moon />
                </el-icon>
                <el-icon v-else>
                  <Sunny />
                </el-icon>切换主题
              </el-text>
            </div>
          </li>
          <li>
            <router-link to="/setup">
              <el-icon :size="28" style="padding: 0 2px">
                <setting />
              </el-icon>
              <span>设置</span>
            </router-link>
          </li>
          <li>
            <details>
              <summary>扩展工具</summary>
              <ul>
                <li><a href="http://suancaixianyu.cn/sss">简谱转换</a></li>
                <li><a href="https://suancaixianyu.com/gpt">白嫖gpt</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>

    <!-- 弹窗菜单 -->
    <div class="dropdown hidden-sm-and-up bg-base-100" v-else>
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <ScLogo />
      </label>
      <el-menu default-active="2" class="el-menu-vertical-demo dropdown-content bg-base-100" style="
          border: none;
          z-index: 20;
          box-shadow: var(--el-box-shadow-light);
        " @open="true">
        <!-- 返回主页 -->
        <router-link to="/">
          <el-menu-item index="1">
            <div>
              <el-icon :size="28" style="padding: 0 2px">
                <House />
              </el-icon>
              <el-text>主页</el-text>
            </div>
          </el-menu-item>
        </router-link>
        <!-- 消息 -->
        <el-menu-item index="2" @click="bailanle">
          <div>
            <el-icon :size="28" style="padding: 0 2px">
              <Message />
            </el-icon>
            <el-text>消息</el-text>
          </div>
          <span class="indicator-item badge">5</span>
        </el-menu-item>
        <!-- 主题切换 -->
        <el-menu-item index="3" style="align-items: center" @click="handleLiClick, bailanle">
          <input ref="toggleInput" checked type="checkbox" class="toggle toggle-sm" data-toggle-theme="dark,light"
            data-act-class="ACTIVECLASS" v-model="iconid" />
          <el-text>
            <el-icon v-if="iconid">
              <Moon />
            </el-icon>
            <el-icon v-if="iconid === false">
              <Sunny />
            </el-icon>切换主题
          </el-text>
        </el-menu-item>
        <!-- 设置 -->
        <el-menu-item index="5">
          <router-link to="/setup">
            <el-icon :size="28" style="padding: 0 2px">
              <setting />
            </el-icon>
            <span>设置</span>
          </router-link>
        </el-menu-item>
        <!-- 工具 -->
        <el-menu-item-group title="外部工具" index="4" style="text-align: left">
          <el-menu-item index="4-1">
            <a href="http://suancaixianyu.cn/sss">简谱转换</a>
          </el-menu-item>
          <el-menu-item index="4-2">
            <a href="https://suancaixianyu.com/gpt">白嫖gpt</a>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>

    <!-- 分割元素 -->
    <div class="flex-grow" />
    <div class="flex-none">
      <!-- 右边选项卡 -->
      <ul class="menu menu-horizontal px-1" style="align-items: center; padding: 0 8px">
        <!-- mod -->
        <li>
          <router-link to="/ModList">
            <el-icon :size="25" style="padding: 0 2px">
              <ScMod />
            </el-icon>
          </router-link>
        </li>
        <!-- 消息 -->
        <li class="hidden-xs-only" @click="bailanle">
          <div class="indicator">
            <span class="indicator-item badge">5</span>
            <el-icon :size="28" style="padding: 0 2px">
              <Message />
            </el-icon>
          </div>
        </li>
        <!-- 工具 -->
        <li class="hidden-xs-only">
          <div class="dropdown dropdown-bottom dropdown-end dropdown-hover" style="z-index: 20">
            <label tabindex="0" style="display: flex; justify-items: center">
              <el-icon :size="26">
                <svg t="1691074075906" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="5561" width="200" height="200" style="margin: 0">
                  <path
                    d="M817.87 556.31h-63.58v-66.24A42.27 42.27 0 0 0 712 447.8h-84.81a42.27 42.27 0 0 0-42.27 42.27v66.24H436.57v-66.24a42.27 42.27 0 0 0-42.27-42.27h-84.83a42.27 42.27 0 0 0-42.27 42.27v66.24h-61.83A22.39 22.39 0 0 0 183 578.7a22.39 22.39 0 0 0 22.39 22.39h61.81v65.55a42.27 42.27 0 0 0 42.27 42.27h84.83a42.27 42.27 0 0 0 42.27-42.27v-65.55h148.36v65.55a42.27 42.27 0 0 0 42.27 42.27H712a42.27 42.27 0 0 0 42.27-42.27v-65.55h63.58a22.39 22.39 0 0 0 22.39-22.39 22.39 22.39 0 0 0-22.37-22.39z m-438.64 95.26h-54.69V505.14h54.69z m317.72 0h-54.69V505.14H697z"
                    p-id="5562"></path>
                  <path
                    d="M823 202.58h-90.81v-63.09a71.88 71.88 0 0 0-71.88-71.88H363.19a71.88 71.88 0 0 0-71.88 71.88v63.08h-90.12A137.17 137.17 0 0 0 64 339.75v479a137.17 137.17 0 0 0 137.19 137.14H823a137.17 137.17 0 0 0 137.19-137.17v-479A137.17 137.17 0 0 0 823 202.58z m-474.36-54.1A23.52 23.52 0 0 1 372.17 125h279.16a23.52 23.52 0 0 1 23.52 23.52v54.1h-326.2z m554.23 673.31a76.76 76.76 0 0 1-76.76 76.76h-628a76.76 76.76 0 0 1-76.76-76.76V336.67a76.76 76.76 0 0 1 76.76-76.76h628a76.76 76.76 0 0 1 76.76 76.76z"
                    p-id="5563"></path>
                </svg>
              </el-icon>
            </label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52" style="
                border: none;
                width: 10rem;
                box-shadow: var(--el-box-shadow-light);
              ">
              <li>
                <a href="http://suancaixianyu.cn/sss">简谱转换</a>
              </li>
              <li>
                <a href="https://suancaixianyu.com/gpt">白嫖gpt</a>
              </li>
              <li>
                <router-link to="/setup">
                  <el-icon :size="22">
                    <setting />
                  </el-icon>
                  <span>设置</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <!-- 主题切换 -->
        <li class="hidden-xs-only">
          <div class="indicator">
            <label class="swap swap-rotate">
              <input type="checkbox" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"
                style="width: 22px; height: 22px" @click="bailanle" />
              <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </li>
        <!-- 个人中心 -->
        <li>
          <div v-if="!userInfo.isLogin" @click="showLoginDialog">
            <el-icon :size="25" style="padding: 0 2px">
              <UserFilled />
            </el-icon>
          </div>
          <div class="dropdown dropdown-bottom dropdown-end dropdown-hover" v-else>
            <label tabindex="0">
              <el-avatar :src="userInfo.data.headurl" :shape="set.shape" :size="32" />
            </label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              style="width: 10rem; box-shadow: var(--el-box-shadow-light)">
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
    <el-dialog v-model="userInfo.isLoginDialogVisible" :draggable="true" :fullscreen="set.ismobile">
      <UserLogin />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Cfg from '@/config/config'
import Method from '@/globalmethods'
import ScLogo from '@comps/icons/ScLogo.vue'
import ScMod from '@comps/icons/ScMod.vue'
import UserLogin from '@comps/main/UserLogin.vue'
import { ElMessage } from 'element-plus'
import {ref, watch} from 'vue'
import type { Ref } from 'vue'
export default {
  name: 'NavigationMenu',
  components: {
    ScLogo,
    ScMod,
    UserLogin,
  },
  data() {
    return {
      ...Cfg,
      bailan: 0,
      iconid: false,
      menumode: 'horizontal',
      showtext: false,
      headsize: 38,
      iconsize: 55,
      ellipsis: false,
      isRootPath: true,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    }
  },
  methods: {
    goBack(){
      this.$router.back();
    },
    loginOut() {
      Method.api_get('/user/loginOut')
        .then((res: any) => {
          if (res.data.code == 200) {
            ElMessage({
              type: 'success',
              message: res.data.msg,
            })
            this.userInfo.isLogin = false
            this.$router.push({path:'/'});
          }
        })
        .catch((error) => {
          ElMessage({
            type: 'error',
            message: error,
          })
        })
    },
    showLoginDialog() {
      this.userInfo.isLoginDialogVisible = !this.userInfo.isLoginDialogVisible
    },
    /** 主题切换摆烂 */
    bailanle() {
      ++this.$data.bailan
      console.log(this.$data.bailan)
      if (this.$data.bailan >= 5) {
        let 摆烂语句 = [
          '别点了，还没做呢',
          '没完没了了是吧？',
          '你行你来？',
          '凑合看吧',
          '你是不是想看到底有多少条消息？',
          '这不是bug',
          '我写的东西怎么可能会有bug',
          '你觉得很对是吧？',
          '你再怎么点都没用',
          '怎么这么固执？',
        ]
        if (this.$data.bailan === 100) {
          ElMessage({
            type: 'success',
            message: '是男人就点一百次！！！',
          })
          let date = new Date
          Method.localSet('accomplishment', {
            真的很闲: {
              Completed: true,
              time: date.getDate(),
            },
          })
        } else {
          ElMessage(摆烂语句[Math.floor(Math.random() * 摆烂语句.length)])
        }
      }
    },
  },
  created() {
    //刷新页面重新获取用户信息
    Method.getInformation();
    watch(()=>this.$router.currentRoute.value.fullPath,(v)=>{
      if(v == '/' || v == '') this.isRootPath = true;
      else this.isRootPath = false;
    })
  },
  setup() {
    const toggleInput: Ref<HTMLElement | null> = ref(null)
    const handleLiClick = () => {
      toggleInput.value!.click()
    }

    return {
      toggleInput,
      handleLiClick,
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
</style>
