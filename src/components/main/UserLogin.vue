<template>
  <el-row :gutter="24" class="row-bg" justify="center">
    <el-col :span="col.body" :style="{ textAlign: 'center' }" v-if="isregister">
      <el-form
        label-position="top"
        label-width="100px"
        :model="regitser"
        style="max-width: 460px; margin: 0px auto"
      >
        <el-form-item></el-form-item>

        <el-form-item label="用户名">
          <input
            v-model="regitser.user"
            type="text"
            placeholder="用户名由英文字母与数字组成"
            class="input input-bordered input-sm"
            style="margin-right: 12px; width: 100%"
          />
        </el-form-item>

        <el-form-item label="密码">
          <input
            v-model="regitser.pass"
            type="password"
            placeholder="输入密码"
            class="input input-bordered input-sm"
            style="margin-right: 12px; width: 100%"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码">
          <input
            v-model="regitser.repass"
            type="password"
            placeholder="再次输入密码"
            class="input input-bordered input-sm"
            style="margin-right: 12px; width: 100%"
            show-password
          />
        </el-form-item>

        <el-form-item label="邮箱">
          <input
            v-model="regitser.email"
            type="text"
            placeholder="输入邮箱"
            class="input input-bordered input-sm logininput"
          />
        </el-form-item>

        <el-form-item label="昵称">
          <input
            v-model="regitser.nickname"
            maxlength="10"
            type="text"
            placeholder="昵称长度不能超过10"
            class="input input-bordered input-sm logininput"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain v-loading="loading" @click="submitLogin('register')">注册</el-button>
          <el-button plain @click="goLogin()">去登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="col.body" :style="{ textAlign: 'center' }" v-if="isregister === false">
      <el-form>
        <el-form-item>
          <el-input v-model="loginconfig.user" placeholder="请输入用户名">
            <template #prepend>用户名</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginconfig.pass" placeholder="请输入密码">
            <template #prepend>密&emsp;码</template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-checkbox v-model="remember" label="记账账号" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="loading" @click="submitLogin('login')">登录</el-button>
        <el-button plain type="primary" @click="goRegister()">去注册</el-button>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts">
// 登录与注册（找回密码，更换邮箱等操作都 可以 在此页）
import { useRoute } from "vue-router"
import Cfg from "@/config/config"
import Method from "@/globalmethods"

import { ElMessage } from "element-plus"

export default {
  name: "UserLogin",
  data() {
    return {
      remember: false,
      loading: false,
      isregister: true,
      regitser: {
        user: "",
        pass: "",
        repass: "",
        email: "",
        nickname: "",
      },
      loginconfig: {
        user: "",
        pass: "",
      },
      windowseype: {
        display: "flex",
        padding: "30px",
        justifyContent: "center",
        flexWrap: "wrap",
      },
      col: {
        /** 表单宽度 */
        body: 22,
        /** 占位元素宽度 */
        placeholder: 0,
      },
    }
  },
  methods: {
    submitLogin(type: string) {
      let userInfo = Cfg.config.userInfo

      if (this.loading) return

      let configdata: object, url: string
      let infourl: string = "/user/info"
      if (type === "login") {
        configdata = this.loginconfig
        url = "/user/login"
      } else {
        configdata = this.regitser
        url = "/user/register"
      }
      this.loading = true
      Method.api_post(url, configdata)
        .then((response) => {
          if (response.data.code === 200) {
            if (type == "login") {
              Method.api_get(infourl).then((response2: any) => {
                if (response2.data.code == 200) {
                  this.loading = false
                  if (this.remember) {
                    Method.localSet("loginInfo", {
                      user: this.loginconfig.user,
                      pass: this.loginconfig.pass,
                      remember: this.remember,
                    })
                  }
                  userInfo.isLogin = true
                  userInfo.isLoginDialogVisible = false
                  response2.data.data.headurl = Method.getHostUrl(response2.data.data.headurl)
                  userInfo.data = response2.data.data
                }
              })
            }
            ElMessage({
              message: response.data.msg,
              type: "success",
            })
          } else {
            ElMessage({
              message: response.data.msg,
              type: "error",
            })
          }
        })
        .catch((error) => {
          ElMessage({
            type: "error",
            message: error,
          })
          this.loading = false
        })
    },
    goRegister() {
      this.isregister = true
    },
    goLogin() {
      this.isregister = false
    },
  },
  created() {
    const route = useRoute()
    const loginInfo = Method.localGet("loginInfo", {
      remember: false,
      user: "",
      pass: "",
    })
    if (loginInfo.remember) {
      this.loginconfig.user = loginInfo.user
      this.loginconfig.pass = loginInfo.pass
      this.remember = loginInfo.remember
    }

    if (route.params.register) {
      this.isregister = true
    } else {
      this.isregister = false
    }
  },
}
</script>

<style scoped>
.logininput {
  width: 100%;
}

.row-bg {
  height: 100%;
  overflow: hidden;
}
</style>
