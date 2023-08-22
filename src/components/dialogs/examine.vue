<template>
  <el-dialog
      v-model="dialogShow"
      :title="title"
      width="30%"
      :fullscreen="set.ismobile"
      align-center
  >
    <el-form>
      <el-form-item label="原因">
        <el-input v-model="reason"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="warning" @click="doInject" :loading="loadingInject">
          拒绝
        </el-button>
        <el-button type="success" @click="doSuccess" :loading="loadingSuccess">
          通过
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import config from '@/config/config.ts'
import {watch} from "vue";
export default {
  name: 'dialogExamine',
  emits: ['update:visible'],
  props: {
    title: String,
    loading: Boolean,
    visible: Boolean,
    loadingSuccess:Boolean,
    loadingInject:Boolean
  },
  data() {
    return {
      reason:'',
      set: config.set,
      dialogShow: this.visible
    }
  },
  methods: {
    doInject() {
      this.$emit('submit',{reason:this.reason,result:false})
    },
    doSuccess() {
      this.$emit('submit',{reason:this.reason,result:true})
    }
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