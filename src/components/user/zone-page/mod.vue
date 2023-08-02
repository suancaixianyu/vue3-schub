<template>
  <div class="tab-container">
    <el-header class="el-header">
      <el-button type="primary" plain @click="goPublish">添加模组</el-button>
    </el-header>
    <el-table :data="list" stripe style="width: 100%" v-loading="isLoading">
      <el-table-column prop="cover_src" label="封面" width="180" >
        <template #default="scope">
          <el-avatar :src="scope.row.cover_src" shape="square" disable-transitions/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="create_time" label="上传日期" />
      <el-table-column prop="views" label="浏览" />
      <el-table-column prop="downloads" label="下载" />
      <el-table-column prop="likes" label="点赞" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button size="small" link  @click="manageFileList(scope.$index)">文件列表</el-button>
          <el-button size="small" link type="danger" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="isDialogVisible" title="提示" width="30%" align-center>
    <span>是否删除Mod <span style="color: #008ac5">{{modName}}</span></span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteMod" :loading="isDeleting">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import Method from "@/globalmethods.ts";
import {ElMessage} from "element-plus";

export default {
  name: "ModPage",
  data() {
    return {
      isLoading:false,
      list:[] as any,
      modName:'',
      isDialogVisible:false,
      activeItemIndex:-1,
      isDeleting:false
    }
  },
  methods: {
    deleteMod(){
      this.isDeleting = true;
      let item = this.list[this.activeItemIndex];
      Method.api_get(`/mod/delete/${item.id}`).then(response=>{
        let res = response.data;
        this.isDeleting = false;
        this.isDialogVisible=false;
        if(res.code==200){
          ElMessage('删除成功');
        }else{
          ElMessage('删除失败');
        }
      });
      this.refreshList()
    },
    manageFileList(index:number){
      this.activeItemIndex = index;
      let modId = this.list[index].id;
      this.$router.push(`/ModFiles/${modId}`);
    },
    handleDelete(index:number){
      this.activeItemIndex = index;
      this.isDialogVisible = true;
      this.modName = this.list[index].name;
    },
    goPublish() {
      this.$router.push({ name: "ModPublish" })
    },
    refreshList(){
      this.isLoading = true;
      Method.api_get(`/user/my_mod_list/1`).then((response: any) => {
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
  },
  created(){
    this.refreshList()
  }
}
</script>
<style scoped>
.el-header {
  padding-top: 20px;
  border-bottom: 1px solid #eee;
}
</style>
