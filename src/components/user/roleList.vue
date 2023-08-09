<template>
  <el-tag
    size="small"
    :color="x.color"
    :type="x.type"
    :effect="x.effect"
    v-for="x in role_list"
    >{{ x.name }}</el-tag>
</template>

<script lang="ts">
import Method from '@/globalmethods.ts'
import './roleList.ts'
import {watch} from "vue";
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
      role_list: <roleItem[]>[]
    }
  },
  created(){
    this.role_list = Method.decodeRoleList(this.role);
    watch(()=>this.role,()=>{
      this.role_list = Method.decodeRoleList(this.role);
    });
  }
}
</script>
