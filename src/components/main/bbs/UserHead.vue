<template>
  <div class="user">
    <!-- 头像 -->
    <el-avatar :src="item.headurl" :shape="item.shape" :size="item.headsize" style="margin-right: 12px" />
    <!-- 昵称，日期 -->
    <div class="time" :style="item.style">
      <div style="display: flex; justify-content: center">
        <div style="font-size: 15px">{{ item.nickname }}</div>
        <UserRole :role="item.role"/>
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
import UserRole from "@comps/user/roleList.vue";
export default {
  name: "UserHead",
  components: {UserRole},
  props: {
    item: {
      type: Object,
      required: true,
    },
  }
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
