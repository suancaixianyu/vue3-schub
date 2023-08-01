<template>
  <div class="user">
    <!-- 头像 -->
    <el-avatar :src="headurl" :shape="shape" :size="headsize" style="margin-right: 12px" />
    <!-- 昵称，日期 -->
    <div class="time" :style="style">
      <div style="display: flex; justify-content: center">
        <div style="font-size: 15px">{{ nickname }}</div>
        <el-tag size="small" :color="x.color" v-for="x in role_list">{{ x.name }}</el-tag>
      </div>
      <div>
        <el-text
          class="mx-1 time"
          size="small"
          style="display: flex; justify-content: flex-start"
          >{{ time }}</el-text
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Cfg from "@/config/config"
export default {
  name: "UserHead",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    let item = this.item
    let rl = []
    let grl = Cfg.config.userInfo.role_list
    if (item.role instanceof Array) {
      item.role.forEach((x: any) => {
        let f = grl.find((xx: any) => {
          return xx.id == x
        })
        if (f != null) rl.push(f)
      })
    }
    return {
      headurl: item.headurl,
      time: item.time,
      nickname: item.nickname,
      shape: item.shape,
      headsize: item.headsize,
      style: item.style,
      role_list: grl,
    }
  },
}
</script>

<style scoped>
.user {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.time {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
