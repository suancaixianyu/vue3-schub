<template>
  <div v-if="set.ismobile">
    <div class="el-row">
      <el-button plain @click="refreshList">刷新</el-button>
      <el-text>&emsp;</el-text>
      <el-upload :show-close="false" :show-file-list="false" :http-request="uploadFile" :auto-upload="true" :multiple="false">
        <el-button type="primary" :loading="isUploading">上传存档文件(自动识别类型)</el-button>
      </el-upload>
    </div>
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      v-for="(x, index) in list"
      v-if="list.length > 0"
      :key="index"
      :style="postliststyle"
    >
      <el-container style="padding: 0">
        <el-aside width="30%" style="padding: 0; word-wrap: break-word">
          {{ x.type_name }}
        </el-aside>
        <el-main style="padding: 0; overflow-x: hidden">
          <el-text>{{ x.name }}</el-text
          ><br />
          <el-text>{{ x.create_time }}</el-text
          ><br />
          <el-row :gutter="5">
            <el-col :span="12">
              <el-text>
                <el-icon> <Document /> </el-icon>{{ x.file_size }}
              </el-text>
            </el-col>

            <el-col :span="8"> </el-col>

            <el-col :span="2">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon class="numicon">
                    <MoreFilled />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>复制链接</el-dropdown-item>
                    <el-dropdown-item>下架</el-dropdown-item>
                    <el-dropdown-item disabled>发布</el-dropdown-item>
                    <el-dropdown-item divided @click="confirmHandle(index)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <div v-else>什么也没有~</div>
  </div>
  <div class="tab-container" v-loading="isLoading" v-else>
    <div class="el-row">
      <el-button plain @click="refreshList">刷新</el-button>
      <el-text>&emsp;</el-text>
      <el-upload :show-close="false" :show-file-list="false" :http-request="uploadFile" :auto-upload="true" :multiple="false">
        <el-button type="primary" :loading="isUploading">上传存档文件(自动识别世界、材质、家具、皮肤)</el-button>
      </el-upload>
    </div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="type_name" label="类型" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="file_size" label="文件大小" />
      <el-table-column prop="create_time" label="上传日期" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            link
            type="danger"
            @click="confirmHandle(scope.$index)"
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
      layout="prev, pager, next"
      :total="total"
    />
  </div>
  <dialog-confirm title="提示" v-model:visible="showConfirm" @submit="handleDelete" :loading="isDeleting">
    <label>是否删除存档<label v-text="activeItem.name"></label>?</label>
  </dialog-confirm>
  <el-dialog :show-close="false"  v-model="isUploading" :title="uploadTitle" :close-on-click-modal="false" :align-center="true">
    <div v-text="uploadContent"></div>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="uploadChunkPercent"></el-progress>
    <div>总进度</div>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="uploadPercent"></el-progress>
  </el-dialog>
  <el-dialog :show-close="false"  v-model="isSubmitting" :title="submitTitle" :close-on-click-modal="false" :align-center="true">
    提交数据中
  </el-dialog>
</template>

<script lang="ts">
import Method from '@/globalmethods.ts'
import {ElMessage} from 'element-plus'
import Cfg from '@/config/config'
import { watch } from 'vue'
import { api } from '@/apitypes'
import DialogConfirm from "@comps/dialogs/confirm.vue";

export default {
  name: 'WorldPage',
  components: {DialogConfirm},
  data() {
    return {
      ...Cfg,
      isLoading: false,
      list: <any>[],
      page: 1,
      limit: 10,
      total: 0,
      showConfirm:false,
      isDeleting:false,
      activeItem:<any>null,
      xhr:null as unknown as XMLHttpRequest,
      isStartUpload:false,
      isUploading:false,
      currentUploadChunkIndex:0,
      totalUploadChunkCount:0,
      uploadTaskId:<number>0,
      uploadTitle:'',
      uploadContent:'',
      uploadChunkPercent:0,
      uploadPercent:0,
      document_type:'',
      submitTitle:'',
      isSubmitting:false
    }
  },
  methods: {
    uploadFile(option:any){
      if(this.uploadTaskId>0)return ElMessage('请等待上个文件上传完成');
      let task = () => {
        if(this.isStartUpload) return;
        this.xhr = new XMLHttpRequest();
        let file = option.file;
        let size = <number>file.size;
        let chunkSize = 1024 * 1024 * 2;//2MB
        this.totalUploadChunkCount = parseInt(Math.ceil(size / chunkSize)+'');
        this.xhr.onreadystatechange = (e:Event)=>{
          let target = <any>e.currentTarget;
          if(target.readyState==4){
            let r = JSON.parse(target.responseText);
            if(r.code==200){
              this.currentUploadChunkIndex+=1;
              if(this.currentUploadChunkIndex==this.totalUploadChunkCount){
                //整个文件上传完成
                clearInterval(this.uploadTaskId);
                this.isUploading = false;
                this.uploadTaskId=0;
                this.currentUploadChunkIndex=0;
                this.totalUploadChunkCount=0;
                this.addDocument(r.data.file_id,r.data.file_name);
              }
            }else{
              ElMessage(r.msg)
              //上传出错
              clearInterval(this.uploadTaskId);
              this.isUploading = false;
              this.uploadTaskId=0;
              this.currentUploadChunkIndex=0;
              this.totalUploadChunkCount=0;
            }
            this.isStartUpload=false;
          }
        };
        this.xhr.upload.addEventListener('progress',(e)=>{
          let percent = e.total > 0 ? (e.loaded / e.total) * 100 : 0;
          percent = parseFloat(percent.toFixed(2)+'');
          this.uploadChunkPercent = percent;
          this.uploadPercent = this.currentUploadChunkIndex / this.totalUploadChunkCount * 100;
          this.uploadPercent = parseFloat(this.uploadPercent.toFixed(2))
          this.uploadTitle = `上传【${file.name}】`;
          this.uploadContent = `分片 ${this.currentUploadChunkIndex}/${this.totalUploadChunkCount}，进度:${percent.toFixed(2)}%`;
        })
        let formData = new FormData();
        formData.append('file',file.slice(this.currentUploadChunkIndex*chunkSize,(this.currentUploadChunkIndex+1)*chunkSize),file.name);
        formData.append('which',this.currentUploadChunkIndex+'');
        formData.append('total',this.totalUploadChunkCount+'');
        formData.append('chunk_size',chunkSize+'');
        this.xhr.withCredentials = true;
        this.xhr.open("POST",Method.getHostUrl('/upload/bigUpload'),true);
        this.xhr.send(formData);
        this.isStartUpload = true;
        this.isUploading = true;
      }
      this.uploadTaskId = setInterval(task,50);
    },
    addDocument(file_id:number,file_name:string){
      this.isSubmitting=true;
      this.submitTitle = `提交文件【${file_name}】`;
      Method.api_post('/com/add_document',{file_id:file_id,file_name:file_name}).then(r=>{
        let res = <res>r.data;
        this.isSubmitting=false;
        if(res.code==200){
          ElMessage('添加成功');
          this.refreshList();
        }else ElMessage(res.msg);
      })
    },
    confirmHandle(index: number){
      this.activeItem = this.list[index];
      this.showConfirm=true;
    },
    handleDelete() {
      this.isDeleting=true;
      Method.api_post('/user/document_del', { id: this.activeItem.id }).then(res => {
        let obj = <api>res.data;
        this.showConfirm=false;
        this.isDeleting=false;
        if (obj.code == 200) {
          ElMessage({
            type: 'success',
            message: "删除成功"
          })
          this.refreshList()
        } else {
          ElMessage({
            type: 'error',
            message: obj.msg,
          })
        }
      })
    },
    refreshList() {
      this.isLoading = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post(
        `/user/my_world_list/${Cfg.userInfo.data.id}`,
        payLoad,
      ).then((response: any) => {
        let res = response.data
        this.isLoading = false
        if (res.code == 200) {
          res.data.forEach((x: any) => {
            x.create_time = Method.formatNormalTime(x.create_time)
            x.type_name = Method.getScTypeName(x.file_type)
            x.file_size = Method.getFileSize(x.size)
          })
          if (this.page == 1) this.total = res.sum
          this.list = res.data
        } else {
          ElMessage(res.msg)
        }
      })
    },
  },
  mounted() {
    this.page = 1
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
.el-icon {
  margin-right: 5px;
}

.numicon {
  padding: 12px 0;
}
</style>
