<template>
  <div v-if="set.ismobile">
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      :style="postliststyle"
    >
      <el-button type="primary" plain @click="showAddFile">添加文件</el-button>
    </div>
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      v-for="x in list"
      :key="x.id"
      :style="postliststyle"
    >
      <el-container style="padding: 0">
        <el-aside
          width="30%"
          style="padding: 5px; word-wrap: break-word; overflow-y: hidden"
        >
          {{ x.name }}
        </el-aside>
        <el-main class="container">
          <el-text>{{ x.file_size }}</el-text>
          <el-text>{{ x.create_time }}</el-text>

          <el-row :gutter="5" style="flex: 2; align-items: flex-end">
            <el-col :span="10">
              <el-text>
                <el-icon>
                  <svg
                    t="1691047896779"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3474"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M896 704c-17.695686 0-31.99914 14.303454-31.99914 31.99914l0 128L160.00086 863.99914l0-128c0-17.695686-14.336138-31.99914-32.00086-31.99914s-32.00086 14.303454-32.00086 31.99914l0 160.00086c0 17.695686 14.336138 31.99914 32.00086 31.99914l768 0c17.695686 0 32.00086-14.303454 32.00086-31.99914l0-160.00086C928.00086 718.303454 913.695686 704 896 704zM227.579 530.662l259.11 259.293c6.368 6.399 14.689 9.471 22.977 9.408 1.12 0.096 2.08 0.64 3.2 0.64 4.673 0 9.024-1.088 13.024-2.88 4.032-1.536 7.872-3.872 11.137-7.135l259.329-259.124c12.513-12.48 12.544-32.735 0.033-45.248-6.24-6.272-14.432-9.407-22.656-9.408-8.193 0-16.352 3.136-22.624 9.344l-206.24 206.162 0-563.713c0-17.696-14.336-31.999-32.001-31.999s-32.001 14.303-32.001 31.999l0 565.281-207.91-207.74c-6.241-6.272-14.496-9.44-22.688-9.44s-16.32 3.103-22.56 9.311c-12.575 12.449-12.607 32.737-0.127 45.248z"
                      fill="#272636"
                      p-id="3475"
                    ></path>
                  </svg>
                </el-icon>
                {{ x.downloads_num }}
              </el-text>
            </el-col>

            <el-col :span="11"> </el-col>

            <el-col :span="2">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon class="numicon">
                    <MoreFilled />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="handleDelete(x.id, true)"
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
  </div>
  <div class="tab-container file-list" v-else>
    <el-header class="el-header">
      <el-button type="primary" plain @click="showAddFile">添加文件</el-button>
    </el-header>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="version" label="版本" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column prop="file_size" label="大小" width="180" />
      <el-table-column prop="downloads_num" label="下载" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
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
  <el-dialog
    v-model="isDialogVisible"
    width="60%"
    align-center
    :fullscreen="set.ismobile"
    :close-on-click-modal="false"
  >
    <template #title>
      <span
        >添加文件 <span style="color: #008ac5">{{ modName }}</span></span
      >
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addFile" :loading="isCreating">
          确认
        </el-button>
      </span>
    </template>
    <el-container class="el-container">
      <el-form class="el-form">
        <div class="tip">说明：游戏内置资源(材质皮肤等)请先在游戏内上传到社区后在此选择关联文件即可，只有这种方式才能在游戏内置社区搜索到资源!!!</div>
        <div class="tip">此处是二选一，选择关联文件或者上传文件</div>

        <el-form-item label="游戏资源" v-if="file_name == ''">
          <el-select v-model="inner_name" placeholder="选择类型">
            <el-option :label="r.name" :value="r.id" v-for="r in type_list" />
          </el-select>
          <el-select v-model="inner_file_name" placeholder="选择文件">
            <el-option
                :label="r.name"
                :value="r.file_id"
                v-for="r in world_list"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="文件选择" v-if="inner_file_name == ''">
          <el-input disabled v-model="file_name" class="el-input" />
          <el-upload
            v-model="file_name"
            :with-credentials="true"
            :show-file-list="false"
            :auto-upload="true"
            :multiple="false"
            :http-request="uploadBigFile"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="API 版本*">
          <el-radio-group v-model="api_type" class="ml-4">
            <el-radio :label="x.id" size="large" v-for="x in api_list">{{
              x.version
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="版 本 号*">
          <el-input v-model="version" />
        </el-form-item>
        <el-form-item label="更新内容*">
          <el-input v-model="desc" type="textarea" />
        </el-form-item>
      </el-form>
    </el-container>
  </el-dialog>
  <el-dialog :show-close="false"  v-model="isUploading" :title="uploadTitle" :close-on-click-modal="false" :align-center="true">
    <div v-text="uploadContent"></div>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="uploadChunkPercent"></el-progress>
    <div>总进度</div>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="uploadPercent"></el-progress>
  </el-dialog>
  <el-dialog
    v-model="isDeleteDialogVisible"
    title="提示"
    width="30%"
    align-center
    :fullscreen="set.ismobile"
  >
    <span
      >是否删除资源文件
      <span style="color: #008ac5">{{ modFileName }}</span></span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDeleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteModFile" :loading="isDeleting">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import Method from '@/globalmethods.ts'
import Cfg from '@/config/config.ts'
import { ElMessage } from 'element-plus'
import ModFlag from '@comps/mod/flag.vue'
import { watch } from 'vue'

export default {
  name: 'ModFiles',
  components: { ModFlag },
  data() {
    return {
      ...Cfg,
      type_list: <any>[
        { id: 1, name: '世界' },
        { id: 2, name: '方块材质' },
        { id: 3, name: '人物皮肤' },
        { id: 4, name: '家具包' },
      ],
      modName: '',
      isDeleteDialogVisible: false,
      api_type: 0,
      api_list: <any>[],
      isCreating: false,
      isDialogVisible: false,
      isLoading: false,
      list: <any>[],
      activeItemIndex: -1,
      modFileName: '',
      file_name: '',
      file_id: 0,
      uploadFileSrc: `${Cfg.config.server}/Upload/Upload`,
      world_list: <any>[],
      inner_name: '',
      inner_file_name: '',
      desc: '',
      version: '',
      isDeleting: false,
      progress: 0,
      page: 1,
      limit: 10,
      total: 0,

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
    }
  },
  methods: {
    uploadBigFile(option:any){
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
                this.file_id = r.data.file_id;
                this.file_name = r.data.file_name;
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
      this.uploadTaskId = window.setInterval(task,50);
    },
    showAddFile() {
      this.file_name = ''
      this.inner_file_name = ''
      this.file_id = 0
      this.isDialogVisible = true
      this.refreshDocList()
    },
    refreshDocList() {
      let id = this.inner_name
      let item = this.type_list.find((x: any) => {
        return x.id == id
      })
      if (item != null) {
        let payLoad = { type: item.id }
        Method.api_post(`/user/document_list`, payLoad).then((response) => {
          let res = response.data
          if (res.code == 200) {
            this.world_list = res.data
          }
        })
      }
    },
    addFile() {
      let modId = this.$route.params.id
      let fileId = this.file_id
      let docId = 0
      if (this.inner_file_name != '') {
        fileId = parseInt(this.inner_file_name)
        let item = this.world_list.find((x: any) => {
          return x.file_id == fileId
        })
        docId = item.id
      }
      let payLoad = {
        mod_id: modId,
        desc: this.desc,
        file_id: fileId,
        document_id: docId,
        version: this.version,
        api_type: this.api_type,
      }
      this.isCreating = true
      Method.api_post(`/mod/add_file`, payLoad)
        .then((response: any) => {
          let res = response.data
          this.isCreating = false
          ElMessage(res.msg)
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
    handleDelete(index: number, isfileid: boolean) {
      if (isfileid) {
        let item = this.list.findIndex((item: any) => item.id === index)
        this.activeItemIndex = item
        this.modFileName = this.list[item].name
        this.isDeleteDialogVisible = true
      } else {
        this.activeItemIndex = index
        this.isDeleteDialogVisible = true
        let item = this.list[this.activeItemIndex]
        this.modFileName = item.name
      }
    },
    deleteModFile() {
      let item = this.list[this.activeItemIndex]
      this.isDeleting = true
      Method.api_get(`/mod/delete_file/${item.id}`).then((response) => {
        let res = response.data
        this.isDeleting = false
        ElMessage(res.msg)
        if (res.code == 200) {
          this.isDeleteDialogVisible = false
          this.refreshList()
        }
      })
    },
    refreshList() {
      let modId = this.$route.params.id
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post(`/mod/file_list/${modId}`, payLoad).then(
        (response: any) => {
          let res = response.data
          this.isLoading = false
          if (res.code == 200) {
            if (this.page == 1) this.total = res.sum
            res.data.forEach((x: any) => {
              x.create_time = Method.formatNormalTime(x.create_time)
              x.file_size = Method.getFileSize(x.size)
              x.downloads_num = Method.getNumber(x.downloads)
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
    this.api_list = Cfg.userInfo.global_mod_data_list.api_version
    this.refreshList()
    watch(
      () => this.inner_name,
      () => {
        this.refreshDocList()
      },
    )
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

.my-progress {
  margin: 0 5px;
}

.el-input {
  flex: 1;
}

.numicon {
  padding: 12px 0;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: flex-start; */
  padding: 0 0 0 5px;
  overflow-x: hidden;
  text-align: left;
}

.el-text {
  align-self: flex-start;
}

.el-col {
  display: flex;
}
.tip{
  color: red;font-weight: bold
}
</style>
<style>
.el-form-item .el-form-item__label{
  width: 80px;
}
</style>