<template>
  <div class="user">
    <!-- 头像 -->
    <el-avatar :src="item.headurl" :shape="item.shape" :size="item.headsize" style="margin-right: 12px" />
    <!-- 昵称，日期 -->
    <div class="time" :style="item.style">
      <div style="display: flex; justify-content: center">
        <div style="font-size: 15px">{{ item.nickname }}</div>
        <el-tag size="small" :color="x.color" v-for="x in role_list">{{ x.name }}</el-tag>
      </div>
      <div>
        <el-text class="mx-1 time" size="small" style="display: flex; justify-content: flex-start">
          {{ item.time }}
        </el-text>
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
  setup(props) {
    let rl = []
    let grl = Cfg.config.userInfo.role_list
    if (props.item.role instanceof Array) {
      props.item.role.forEach((x: any) => {
        let f = grl.find((xx: any) => {
          return xx.id == x
        })
        if (f != null) rl.push(f)
      })
    }
    return {
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
