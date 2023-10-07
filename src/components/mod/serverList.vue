<template>
  <div class="tab-container">
    <el-header class="el-header">
      <el-button type="primary" plain @click="showAddDialog">添加服务器</el-button>
    </el-header>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="version" label="版本" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="ip_addr" label="IP地址" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              size="small"
              link
              type="warning"
              @click="handleModify(scope.$index)"
          >编辑</el-button
          >
          <el-button
              size="small"
              link
              type="danger"
              @click="handleDelete(scope.$index, false)"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="el-pagination"
        v-model:current-page="page"
        background
        :page-size="limit"
        :pager-count="8"
        layout="prev, pager, next"
        :total="total"
    />
  </div>
  <dialog-confirm v-model:visible="isDialogVisible" :title="activeItemIndex==-1?'添加服务器':'修改服务器【'+modFileName+'】'" :loading="isCreating" @submit="addFile">
    <el-container class="el-container">
      <el-form class="el-form">
        <el-form-item label="服务器版本*">
          <el-radio-group v-model="server_version" class="ml-4">
            <el-radio :label="x.id" size="large" v-for="x in server_version_list">{{x.version}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="服务器名称*">
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item label="IP地址*">
          <el-input v-model="ip_addr" />
        </el-form-item>
      </el-form>
    </el-container>
  </dialog-confirm>

  <dialog-confirm v-model:visible="isDeleteDialogVisible" title="提示" :loading="isDeleting" @submit="deleteModFile">
    <span>是否删除服务器<span style="color: #008ac5">{{ modFileName }}</span></span>
  </dialog-confirm>
</template>
<script lang="ts">
import Method from '@/globalmethods.ts'
import Cfg from '@/config/config.ts'
import { ElMessage } from 'element-plus'
import ModFlag from '@comps/mod/flag.vue'
import { watch } from 'vue'
import DialogConfirm from "@comps/dialogs/confirm.vue";

export default {
  name: 'ModFiles',
  components: {DialogConfirm, ModFlag },
  data() {
    return {
      ...Cfg,
      isDeleteDialogVisible: false,
      server_version: 0,
      server_version_list: <any>[],
      isCreating: false,
      isDialogVisible: false,
      isLoading: false,
      list: <any>[],
      activeItemIndex: -1,
      modFileName: '',
      name:'',
      desc: '',
      ip_addr: '',
      isDeleting: false,
      page: 1,
      limit: 10,
      total: 0,
      editMode:false
    }
  },
  methods: {
    showAddDialog(){
      this.activeItemIndex=-1;
      this.isDialogVisible=true;
      this.editMode=false;
    },
    /**
     * 添加服务器
     */
    addFile() {
      let id = 0;
      if(this.editMode){
        id = this.list[this.activeItemIndex].id;
      }
      this.activeItemIndex=-1;
      let modId = this.$route.params.id;
      if(this.server_version==0) return ElMessage('请选择游戏版本');
      let payLoad = {
        id:id,
        mod_id: modId,
        version_id: this.server_version,
        ip_addr: this.ip_addr,
        name:this.name
      }
      this.isCreating = true
      Method.api_post(`/mod/add_server`, payLoad)
          .then((response: any) => {
            let res = response.data
            this.isCreating = false;
            if(this.editMode){
              ElMessage("编辑成功")
            }else{
              ElMessage("添加成功")
            }
            if (res.code == 200) {
              this.isDialogVisible = false
              this.refreshList()
            }
          })
          .catch((r) => {
            this.isCreating = false
            ElMessage(r.message)
          })
    },
    handleModify(index: number) {
      this.activeItemIndex = index;
      this.isDialogVisible = true;
      this.editMode = true;
      let item = this.list[this.activeItemIndex];
      this.modFileName = item.ip_addr;
      this.server_version = item.version_id;
      this.ip_addr = item.ip_addr;
    },
    handleDelete(index: number, isfileid: boolean) {
      if (isfileid) {
        let item = this.list.findIndex((item: any) => item.id === index);
        this.activeItemIndex = item;
        this.modFileName = this.list[item].name;
        this.isDeleteDialogVisible = true;
      } else {
        this.activeItemIndex = index;
        this.isDeleteDialogVisible = true;
        let item = this.list[this.activeItemIndex];
        this.modFileName = item.name;
      }
    },
    deleteModFile() {
      let item = this.list[this.activeItemIndex]
      this.isDeleting = true
      Method.api_get(`/mod/delete_server/${item.id}`).then((response) => {
        let res = response.data
        this.isDeleting = false
        if (res.code == 200) {
          ElMessage('删除成功')
          this.isDeleteDialogVisible = false
          this.refreshList()
        }else ElMessage(res.msg);
      }).catch(reason => {
        ElMessage(reason)
      });
    },
    refreshList() {
      let modId = this.$route.params.id
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post(`/mod/server_list/${modId}`, payLoad).then(
          (response: any) => {
            let res = response.data
            this.isLoading = false
            if (res.code == 200) {
              if (this.page == 1) this.total = res.sum
              res.data.forEach((x: any) => {
                x.create_time = Method.formatNormalTime(x.create_time)
              })
              this.list = res.data
            } else {
              ElMessage(res.msg)
            }
          },
      )
    },
  },
  mounted() {
    this.isLoading = true
    this.server_version_list = Cfg.userInfo.global_mod_data_list.server_version_list
    this.refreshList()
    watch(
        () => this.page,
        () => {
          this.refreshList()
        },
    )
  },
}
</script>
<style scoped>
.el-header {
  padding-top: 20px;
}
</style>
