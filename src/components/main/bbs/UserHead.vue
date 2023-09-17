<template>
  <div class="user">
    <!-- 头像 -->
    <user-icon
      :src="item.headurl"
      :alt="item.nickname"
      style="margin-right: 12px"
      :size="size"
    />
    <!-- 昵称，日期 -->
    <div class="time" :style="item.style">
      <div style="display: flex; justify-content: center">
        <div style="font-size: 15px">
          <div>
            <el-text tag="b" size="large">
              {{ item.nickname }}
            </el-text>
            <UserRole :role="item.role" />
          </div>
          <div>
            <el-text
              size="small"
              style="display: flex; justify-content: flex-start"
            >
              {{ item.time }}
            </el-text>
          </div>
        </div>
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
  props: ['item', 'size'],
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
