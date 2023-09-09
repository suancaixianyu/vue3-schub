<template>
  <el-avatar
    :size="size"
    :shape="shape"
    :src="Method.getHostUrl(src)"
    @error="errorHandler"
  >
    <el-text class="avatar-text" tag="b" size="large">
      {{ alt?.substring(0, 1) }}
    </el-text>
  </el-avatar>
</template>
<script lang="ts">
import { Picture } from '@element-plus/icons-vue'
import Cfg from '@/config/config.ts'
import Method from '@/globalmethods'

export default {
  name: 'userIcon',
  components: { Picture },
  props: ['src', 'size', 'alt'],
  data() {
    return {
      Method,
      shape: Cfg.set.shape, //square circle
    }
  },
  methods: {
    errorHandler() {
      return true
    },
  },
}
</script>

<style scoped>
.avatar-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
