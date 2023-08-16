<template>
  <div style="margin: 20px" />
  <el-row :gutter="24" style="margin: 0">
    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />

    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14">
      <el-form label-position="left" label-width="100px" @submit.prevent>
        <el-radio-group label="label position">
          <el-text>基础资料</el-text>
        </el-radio-group>
        <hr />
        <el-form-item label="昵称">
          小小怪
        </el-form-item>
        <el-form-item label="个性签名">
          噢噢噢噢噢
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />
  </el-row>
</template>

<script lang="ts">
export default {
  name: 'UserSetup'
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