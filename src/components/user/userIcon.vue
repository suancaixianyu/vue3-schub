<template>
  <el-avatar
    :shape="shape"
    :src="getUrl(src)"
    @error="errorHandler"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
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
  props: ['src', 'alt', 'size'],
  data() {
    return {
      shape: Cfg.set.shape,
    }
  },
  methods: {
    getUrl(v: string) {
      return Method.getHostUrl(v)
    },
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
