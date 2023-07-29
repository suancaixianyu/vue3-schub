<template>
  <div style="margin: 20px" />
  <el-row :gutter="24" style="margin: 0px 2px">
    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />

    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14">
      <el-form label-position="top" label-width="100px">
        <el-radio-group label="label position">
          <el-text>样式</el-text>
        </el-radio-group>
        <hr />
        <el-form-item label="内边距">
          <el-input v-model="maincontainer.padding" clearable />
        </el-form-item>
        <el-form-item label="抽屉菜单">
          <input type="checkbox" class="toggle" checked v-model="cfg.menu" />
        </el-form-item>
      </el-form>
      <el-form label-position="top" label-width="100px">
        <el-radio-group>
          <el-text>头像</el-text>
        </el-radio-group>
        <hr />
        <el-form-item label="预览">
          帖子&emsp;<el-avatar :shape="cfg.shape" :size="cfg.headsize.post" :src="userhead" />
          &emsp;&emsp; 用户中心&emsp;<el-avatar
            shape="circle"
            :size="cfg.headsize.userindex"
            :src="userhead"
          />
        </el-form-item>

        <el-form-item label="头像形状">
          <el-radio-group v-model="cfg.shape" size="small">
            <el-radio-button label="square" />
            <el-radio-button label="circle" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="帖子头像大小">
          <el-input type="number" v-model="cfg.headsize.post" @blur="sizepost" />
        </el-form-item>
        <el-form-item label="用户主头像页大小">
          <el-input type="number" v-model="cfg.headsize.userindex" @blur="sizeuser" />
        </el-form-item>
      </el-form>

      <el-form label-position="top" label-width="100px">
        <el-radio-group>
          <el-text>头像</el-text>
        </el-radio-group>
        <hr />
        <el-form-item label="预览">
          帖子&emsp;<el-avatar :shape="cfg.shape" :size="cfg.headsize.post" :src="userhead" />
          &emsp;&emsp; 用户中心&emsp;<el-avatar
            shape="circle"
            :size="cfg.headsize.userindex"
            :src="userhead"
          />
        </el-form-item>

        <el-form-item label="头像形状">
          <el-radio-group v-model="cfg.shape" size="small">
            <el-radio-button label="square" />
            <el-radio-button label="circle" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="帖子头像大小">
          <el-input type="number" v-model="cfg.headsize.post" @blur="sizepost" />
        </el-form-item>
        <el-form-item label="用户主头像页大小">
          <el-input type="number" v-model="cfg.headsize.userindex" @blur="sizeuser" />
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />
  </el-row>
</template>

<script lang="ts">
import Cfg from "@/config/config"
import { onMounted, onUnmounted } from "vue"
export default {
  name: "UserSetup",
  setup() {
    onMounted(() => {
      console.log("挂载")
      Cfg.config.homestyle.maincontainer.overflowY = "visible"
    })
    onUnmounted(() => {
      console.log("卸载")
      Cfg.config.homestyle.maincontainer.overflowY = "hidden"
    })
    return {
      userhead: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      ...Cfg.config.homestyle,
    }
  },
  methods: {
    sizepost() {
      this.cfg.headsize.post = Number(this.cfg.headsize.post)
    },
    sizeuser() {
      this.cfg.headsize.userindex = Number(this.cfg.headsize.userindex)
    },
  },
}
</script>

<style scoped>
.el-form {
  background-color: hsl(var(--b1));
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--rounded-box, 1rem);
  padding: 10px;
  margin: 5px;
}
</style>
