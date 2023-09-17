<template>
  <el-tag
    v-for="x in role_list"
    :key="x"
    size="small"
    :color="x.color"
    :type="x.type"
    :effect="x.effect"
    >{{ x.name }}</el-tag
  >
</template>

<script lang="ts">
import Method from '@/globalmethods.ts'
import '../admin/index.ts'
import { watch } from 'vue'
export default {
  name: 'UserRole',
  props: ['role'],
  data() {
    return {
      role_list: <roleItem[]>[],
    }
  },
  created() {
    this.role_list = Method.decodeRoleList(this.role)
    watch(
      () => this.role,
      () => {
        this.role_list = Method.decodeRoleList(this.role)
      },
    )
  },
}
</script>
