<template>
  <div class="user">
    <!-- 头像 -->
    <user-icon
      :src="item.headurl"
      :size="item.headsize"
      :alt="item.nickname"
      style="margin-right: 12px"
    />
    <!-- 昵称，日期 -->
    <div class="time" :style="item.style">
      <div style="display: flex; justify-content: center">
        <div style="font-size: 15px" v-html="item.nickname"></div>
        <UserRole :role="item.role" />
      </div>
      <div>
        <el-text
          size="small"
          style="display: flex; justify-content: flex-start"
          v-html="item.time + '发表了帖子'"
        >
        </el-text>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserRole from '@comps/user/roleList.vue'
import UserIcon from '@comps/user/userIcon.vue'
export default {
  name: 'UserHead',
  components: { UserIcon, UserRole },
  props: ['item'],
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
