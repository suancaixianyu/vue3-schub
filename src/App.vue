<template>
  <XyHome v-if="isInitialized" class="bg-base-100" />
  <el-container
    class="el-container"
    v-else
    v-loading="true"
    element-loading-text="初始化数据"
  >
  </el-container>
</template>

<script lang="ts">
import XyHome from '@comps/XyHome.vue'
import Method from './globalmethods.ts'
export default {
  name: 'App',
  components: { XyHome },
  data() {
    return {
      isInitialized: false,
    }
  },
  mounted() {
    //数据加载完成后才显示XyHome
    Method.getInformation(() => {
      this.isInitialized = true
    })
  },
}
</script>
<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}
</style>
