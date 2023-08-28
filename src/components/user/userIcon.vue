<template>
  <el-image class="el-image" :class="shape=='circle'?'circle':''" :src="imgSrc" :style="'width:'+size+'px;height:'+size+'px;'">
    <template #error>
      <div class="image-slot" :style="'width:'+size+'px;height:'+size+'px'" v-html="alt?.substring(0,1)"></div>
    </template>
  </el-image>
</template>
<script lang="ts">
import {Picture} from "@element-plus/icons-vue";
import Cfg from "@/config/config.ts";
export default {
  name:"userIcon",
  components:{Picture},
  props:{
    src:String,
    size:Number,
    alt:String,
    shape:String
  },
  data(){
    return {
      imgSrc:this.src??'',
      shape:Cfg.set.shape//square circle
    }
  }
}
</script>
<style scoped>
.el-image.circle{
  border-radius: 50%;
}
.image-slot{
  border-radius: 20%;
  background: #777;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
}
</style>