<template>
  <el-avatar :size="size" :shape="shape" :src="avatar" @error="errorHandler">
    <el-text class="avatar-text" tag="b" size="large">
      {{ alt?.substring(0, 1) }}
    </el-text>
  </el-avatar>
</template>
<script lang="ts">
import { Picture } from '@element-plus/icons-vue'
import Cfg from '@/config/config.ts'
import Method from '@/globalmethods'
import {watch} from "vue";

export default {
  name: 'userIcon',
  components: { Picture },
  props: ['src', 'size', 'alt'],
  data() {
    return {
      avatar: '',
      shape: Cfg.set.shape
    }
  },
  methods: {
    errorHandler() {
      return true
    },
  },
  created(){
    this.avatar = this.src;
    watch(()=>this.src,(v)=>{
      this.avatar = Method.getHostUrl(v);
    })
  }
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
