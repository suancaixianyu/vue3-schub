<template>
  <div class="tab-container" v-loading="isLoading">
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column prop="views" label="浏览" width="180" />
      <el-table-column prop="comments" label="评论" width="180" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button size="small" link type="danger" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import Method from "@/globalmethods.ts";
import {ElMessage} from "element-plus";

export default {
  name: "BbsPage",
  data() {
    return {
      isLoading:false,
      list:[],
      activeItemIndex:-1
    }
  },
  methods:{
    handleDelete(index:number){
      this.activeItemIndex = index;
      ElMessage('暂不支持');
    }
  },
  created(){
    this.isLoading = true;
    Method.api_get(`/user/my_bbs_list/1`).then((response: any) => {
      let res = response.data
      this.isLoading = false
      if (res.code == 200) {
        res.data.forEach((x: any) => {
          x.create_time = Method.formatNormalTime(x.create_time)
        })
        this.list = res.data;
      } else {
        ElMessage(res.msg)
      }
    })

  }
}
</script>
