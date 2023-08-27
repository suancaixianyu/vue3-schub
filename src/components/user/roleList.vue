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
import '../admin/index.ts'
import { watch } from 'vue'
export default {
  name: 'UserRole',
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      role_list: <roleItem[]>[],
    }
  },
  created() {
    console.log(Method.decodeRoleList(this.role))
    console.log(this.role)

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
