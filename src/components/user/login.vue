<template>
  <el-row :gutter="24" class="row-bg" justify="center" v-if="page">
    <el-col :span="col.body" :style="{ textAlign: 'center' }">
      <el-form
        label-position="top"
        label-width="100px"
        label="top"
        title="修改密码"
        :model="editPass"
        style="max-width: 460px; margin: 0 auto"
      >
        <el-form-item></el-form-item>

        <el-form-item>
          <el-input
            v-model="editPass.oldPass"
            type="password"
            show-password
            placeholder="输入密码"
          >
            <template #prepend>旧&ensp;密&ensp;码</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="editPass.newPass"
            type="password"
            show-password
            placeholder="输入密码"
          >
            <template #prepend>新&ensp;密&ensp;码</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="editPass.rePass"
            type="password"
            show-password
            placeholder="再次输入密码"
          >
            <template #prepend>确认密码</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="editPass.code">
            <template #prepend>验&ensp;证&ensp;码</template>
          </el-input>
          <img :src="codeSrc" @click="refreshCode" />
          <div
            class="h-captcha"
            data-sitekey="ebc1a1c0-79d5-4979-839f-c32e938f3629"
          ></div>
        </el-form-item>
        <el-form-item>
          <el-button plain :loading="loading" @click="edit"> 修改 </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

  <el-row :gutter="24" class="row-bg" justify="center" v-else>
    <el-col :span="col.body" :style="{ textAlign: 'center' }" v-if="isregister">
      <el-form
        label-position="top"
        label-width="100px"
        label="top"
        title="注册"
        :model="regitser"
        style="max-width: 460px; margin: 0 auto"
      >
        <el-form-item></el-form-item>

        <el-form-item>
          <el-input
            v-model="regitser.nickname"
            placeholder="昵称长度不能超过10"
            maxlength="10"
            show-word-limit
          >
            <template #prepend>昵&emsp;&emsp;称</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="regitser.email" placeholder="输入邮箱">
            <template #prepend>邮&emsp;&emsp;箱</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="regitser.pass"
            type="password"
            show-password
            placeholder="输入密码"
          >
            <template #prepend>密&emsp;&emsp;码</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="regitser.repass"
            type="password"
            show-password
            placeholder="再次输入密码"
          >
            <template #prepend>确认密码</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="regitser.captcha_code">
            <template #prepend>验&ensp;证&ensp;码</template>
          </el-input>
          <img :src="codeSrc" @click="refreshCode" />
          <div
            class="h-captcha"
            data-sitekey="ebc1a1c0-79d5-4979-839f-c32e938f3629"
          ></div>
        </el-form-item>
        <el-form-item>
          <el-button plain :loading="loading" @click="submitLogin('register')"
            >注册</el-button
          >
          <el-button plain @click="goLogin()">去登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="col.body" :style="{ textAlign: 'center' }" v-else>
      <el-form label="top">
        <el-form-item>
          <el-input v-model="loginconfig.user" placeholder="请输入邮箱">
            <template #prepend>邮&emsp;箱</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginconfig.pass"
            type="password"
            show-password
            placeholder="请输入密码"
          >
            <template #prepend>密&emsp;码</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginconfig.captcha_code">
            <template #prepend>验&ensp;证&ensp;码</template>
          </el-input>
          <img :src="codeSrc" @click="refreshCode" />
        </el-form-item>
        <el-form-item>
          <vue-hcaptcha
            sitekey="ebc1a1c0-79d5-4979-839f-c32e938f3629"
            @verify="addHcaptchaToken"
          ></vue-hcaptcha>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-checkbox v-model="remember" label="记住账号" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="loading" @click="submitLogin('login')"
          >登录</el-button
        >
        <el-button plain type="primary" @click="goRegister()">去注册</el-button>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts">
// 登录与注册（找回密码，更换邮箱等操作都 可以 在此页）
import { useRoute } from 'vue-router'
import Cfg from '@/config/config.ts'
import Method from '@/globalmethods.ts'

import { ElMessage } from 'element-plus'
import { api } from '@/apitypes'

import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'

export default {
  name: 'UserLogin',
  components: {
    VueHcaptcha,
  },
  props: {
    page: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let src = Method.getHostUrl('/captcha')
    return {
      baseCodeSrc: src,
      codeSrc: '',
      remember: false,
      loading: false,
      isregister: true,
      userInfo: Cfg.userInfo,
      regitser: {
        user: '',
        pass: '',
        repass: '',
        email: '',
        nickname: '',
        captcha_code: '',
        hcaptcha_code: '',
      },
      loginconfig: {
        user: '',
        pass: '',
        captcha_code: '',
        hcaptcha_code: '',
      },
      editPass: {
        uid: Cfg.userInfo.data.id,
        oldPass: '',
        newPass: '',
        rePass: '',
        code: '',
        hcaptcha_code: '',
      },
      windowseype: {
        display: 'flex',
        padding: '30px',
        justifyContent: 'center',
        flexWrap: 'wrap',
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
    addHcaptchaToken(token: any, eKey: any) {
      console.log('--' + token)
      console.log('--' + eKey)
    },
    edit() {
      Method.api_post('/user/editPass', this.editPass)
        .then((res) => {
          let obj = <api>res.data
          if (obj.code === 200) {
            ElMessage({
              type: 'success',
              message: '修改成功',
            })
            Method.getInformation()
            this.$emit('childEvent')
          } else {
            ElMessage({
              type: 'error',
              message: obj.msg,
            })
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage({
            type: 'error',
            message: '请求错误：' + err.message,
          })
        })
    },
    refreshCode() {
      this.codeSrc = this.baseCodeSrc + '?t=' + new Date().getTime()
    },
    submitLogin(type: string) {
      let userInfo = Cfg.userInfo

      if (this.loading) return

      let configdata: object, url: string
      let infourl: string = '/user/info'
      if (type === 'login') {
        configdata = this.loginconfig
        url = '/user/login'
      } else {
        configdata = this.regitser
        url = '/user/register'
      }
      this.loading = true
      Method.api_post(url, configdata)
        .then((response) => {
          this.loading = false
          if (response.data.code === 200) {
            if (type == 'login') {
              Method.api_get(infourl).then((response2: any) => {
                if (response2.data.code == 200) {
                  if (this.remember) {
                    Method.localSet('loginInfo', {
                      user: this.loginconfig.user,
                      pass: this.loginconfig.pass,
                      remember: this.remember,
                    })
                  }
                  userInfo.isLogin = true
                  userInfo.isLoginDialogVisible = false
                  response2.data.data.headurl = Method.getHostUrl(
                    response2.data.data.headurl,
                  )
                  userInfo.data = response2.data.data
                }
              })
            }
            ElMessage({
              message: response.data.msg,
              type: 'success',
            })
          } else {
            ElMessage({
              message: response.data.msg,
              type: 'error',
            })
            this.refreshCode()
          }
        })
        .catch((error) => {
          ElMessage({
            type: 'error',
            message: error,
          })
          this.loading = false
        })
    },
    goRegister() {
      this.$emit('childEvent')
      this.isregister = true
    },
    goLogin() {
      this.$emit('childEvent')
      this.isregister = false
    },
  },
  created() {
    const route = useRoute()
    const loginInfo = Method.localGet('loginInfo', {
      remember: false,
      user: '',
      pass: '',
    })
    this.refreshCode()
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
