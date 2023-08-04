<template>
  <el-tag
    size="small"
    :color="x.color"
    :type="x.type"
    :effect="x.effect"
    v-for="x in role_list"
    >{{ x.name }}</el-tag
  >
</template>

<script lang="ts">
import Method from '@/globalmethods.ts'
export default {
  name: 'UserRole',
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    let rl = Method.decodeRoleList(this.role)
    return {
      role_list: rl,
    }
  },
}
</script>
