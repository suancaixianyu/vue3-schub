<template>
  <div style="margin: 20px" />

  <el-form label-position="left" label-width="100px" style="max-width: 460px">
    <el-form-item label="内边距">
      <el-input v-model="homestyle.maincontainer.padding" clearable />
    </el-form-item>
    <el-form-item label="抽屉菜单">
      <input type="checkbox" class="toggle" checked v-model="homestyle.cfg.menu" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Cfg from "@/config/config"
export default {
  name: "UserSetup",
  setup() {
    return {
      ...Cfg.config,
    }
  },
}
</script>
