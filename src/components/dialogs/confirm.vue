<template>
  <el-dialog
    v-model="dialogShow"
    :title="title"
    width="30%"
    :fullscreen="set.ismobile"
    align-center
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow = false">取消</el-button>
        <el-button type="primary" @click="doSubmit" :loading="loading">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import config from '@/config/config.ts'
import {watch} from "vue";
export default {
  name: 'dialogConfirm',
  emits: ['update:visible','submit'],
  props: {
    title: String,
    loading: Boolean,
    visible: Boolean,
  },
  data() {
    return {
      set: config.set,
      dialogShow: this.visible
    }
  },
  methods: {
    doSubmit() {
      this.$emit("submit",{});
    },
  },
  mounted() {
    watch(()=>this.visible,(v)=>{
      this.dialogShow = v;
    })
   watch(()=>this.dialogShow,(v)=>{
     this.$emit("update:visible",v);
   })
  }
}
</script>