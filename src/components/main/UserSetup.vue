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
        <el-form-item label="昵称">
          <el-input v-model="config.nickname" placeholder="昵称" />
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="config.signature" placeholder="个性签名" />
        </el-form-item>
        <el-form-item label="">
          <el-button @click="tj"> 提交 </el-button>
        </el-form-item>
      </el-form>

      <el-form label-position="left" label-width="100px" @submit.prevent>
        <el-radio-group label="label position">
          <el-text>账号安全</el-text>
        </el-radio-group>
        <el-divider style="margin: 0" />
        <el-form-item></el-form-item>
        <el-form-item label="重置密码"> </el-form-item>
      </el-form>
    </el-col>

    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />
  </el-row>
</template>

<script lang="ts">
import { api } from '@/apitypes'
import Cfg from '@/config/config'
import Method from '@/globalmethods'
import { ElMessage } from 'element-plus'
export default {
  name: 'UserSetup',
  data() {
    return {
      config: {
        nickname: Cfg.userInfo.data.nickname,
        signature: Cfg.userInfo.data.signature,
      },
    }
  },
  methods: {
    tj() {
      Method.api_post('/user/edit', this.config)
        .then((res) => {
          let obj = res.data as api
          if (obj.code === 200) {
            ElMessage({
              type: 'success',
              message: obj.msg,
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
.el-form {
  background-color: hsl(var(--b1));
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--rounded-card);
  padding: 10px;
  margin: 5px;
}
</style>
