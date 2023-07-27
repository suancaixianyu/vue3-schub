<template>
  <div class="user">
    <!-- 头像 -->
    <el-avatar
      :src="item.headurl"
      :shape="item.shape"
      :size="item.size"
      style="margin-right: 12px"
    />
    <!-- 昵称，日期 -->
    <div class="time" :style="item.style">
      <div style="display: flex; justify-content: center">
        <div style="font-size: 15px">{{ item.nickname }}</div>
        <el-tag size="small" v-if="item.role">{{ item.role }}</el-tag>
      </div>
      <div>
        <el-text
          class="mx-1 time"
          size="small"
          style="display: flex; justify-content: flex-start"
          >{{ item.time }}</el-text
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserHead",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
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
