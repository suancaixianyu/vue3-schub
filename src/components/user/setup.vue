<template>
  <div style="margin: 20px" />
  <el-row :gutter="24" style="margin: 0">
    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />

    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14">
      <el-form label-position="left" label-width="100px" @submit.prevent>
        <el-radio-group label="label position">
          <el-text>基础资料</el-text>
        </el-radio-group>
        <el-divider style="margin: 0" />
        <el-form-item></el-form-item>
        <el-form-item label="使用QQ头像">
          <el-input
            v-model="config.avatar"
            placeholder="输入QQ账号"
            type="number"
          />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="config.nickname" placeholder="昵称" />
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="config.signature" placeholder="个性签名" />
        </el-form-item>

        <el-form-item label="背景图片">
          <el-input
            drag
            v-model="config.background"
            placeholder="输入图片地址或上传"
          />
          <el-upload
            :action="uploadFileSrc"
            v-model="config.background"
            :with-credentials="true"
            :show-file-list="false"
            :on-success="uploadCover"
            :on-progress="uploadProgress"
            :on-error="uploadError"
            accept="image/png, image/jpeg"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="">
          <el-button @click="edit"> 提交 </el-button>
        </el-form-item>
      </el-form>

      <el-form label-position="left" label-width="100px" @submit.prevent>
        <el-radio-group label="label position">
          <el-text>账号安全</el-text>
        </el-radio-group>
        <el-divider style="margin: 0" />
        <el-form-item></el-form-item>
        <el-form-item>
          <el-button @click="page = true">重置密码</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />
  </el-row>
  <el-dialog v-model="page" :draggable="true" :fullscreen="set.ismobile">
    <UserLogin :page="true" @childEvent="offdialog" />
  </el-dialog>
</template>

<script lang="ts">
import { api } from '@/apitypes'
import Cfg from '@/config/config.ts'
import Method from '@/globalmethods.ts'
import { ElMessage } from 'element-plus'
import UserLogin from '@comps/user/login.vue'
export default {
  name: 'UserSetup',
  components: {
    UserLogin,
  },
  data() {
    return {
      page: false,
      ...Cfg,
      config: {
        nickname: Cfg.userInfo.data.nickname,
        signature: Cfg.userInfo.data.signature,
        avatar: '',
        background: '',
      },
      uploadFileSrc: `${Cfg.config.server}/Upload/Upload`,
    }
  },
  methods: {
    uploadError() {
      ElMessage({
        type: 'error',
        message: '上传失败',
      })
    },
    uploadProgress() {
      ElMessage('上传中')
    },
    uploadCover(e: any) {
      this.config.background = e.data.src
      ElMessage({
        type: 'success',
        message: '上传成功',
      })
    },
    offdialog() {
      this.page = false
    },
    edit() {
      if (this.config.avatar) {
        this.config.avatar = `http://q.qlogo.cn/headimg_dl?dst_uin=${this.config.avatar}&spec=640`
      } else {
        this.config.avatar = Cfg.userInfo.data.headurl as string
      }
      Method.api_post('/user/edit', this.config)
        .then((res) => {
          let obj = res.data as api
          if (obj.code === 200) {
            ElMessage({
              type: 'success',
              message: '设置成功',
            })
            Method.getInformation()
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
  },
}
</script>

<style scoped>
.el-input {
  flex: 1;
}
.el-form {
  background-color: hsl(var(--b1));
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--rounded-card);
  padding: 10px;
  margin: 5px;
}
</style>
