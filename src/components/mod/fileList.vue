<template>
  <div class="tab-container">
    <el-header class="el-header">
      <el-button type="primary" plain @click="showAddFile">添加文件</el-button>
    </el-header>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column prop="size" label="大小" width="180" />
      <el-table-column prop="downloads" label="下载" width="180" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button size="small" link type="danger" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="isDialogVisible" width="60%" align-center>
    <template #title>
      <span>添加文件 <span style="color: #008ac5">{{ modName }}</span></span>
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
        <el-form-item label="文件选择*" v-if="inner_file_name==''">
          <el-input disabled v-model="file_name" class="el-input" />
          <el-progress class="my-progress" v-if="progress!=0" :percentage="progress" type="circle" :show-text="false" width="28"/>
          <el-upload :action="uploadFileSrc" v-model="file_name" :on-progress="onProgress" :with-credentials="true" :show-file-list="false" :on-success="uploadFile">
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="游戏资源*" v-if="file_name==''">
          <el-select v-model="inner_name" placeholder="选择类型">
            <el-option :label="r.name" :value="r.id" v-for="r in type_list" />
          </el-select>
          <el-select v-model="inner_file_name" placeholder="选择文件">
            <el-option :label="r.name" :value="r.file_id" v-for="r in world_list" />
          </el-select>
        </el-form-item>
        <el-form-item label="API版本*">
          <el-radio-group v-model="api_type" class="ml-4">
            <el-radio :label="x.id" size="large" v-for="x in api_list">{{x.version}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="版本&emsp;号*">
          <el-input v-model="version" />
        </el-form-item>
        <el-form-item label="更新内容*">
          <el-input v-model="desc" type="textarea" />
        </el-form-item>
      </el-form>
    </el-container>
  </el-dialog>
  <el-dialog v-model="isDeleteDialogVisible" title="提示" width="30%" align-center>
    <span>是否删除Mod文件 <span style="color: #008ac5">{{ modFileName }}</span></span>
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
import Method from "@/globalmethods.ts";
import Cfg from "@/config/config.ts";
import {ElMessage} from "element-plus";
import ModFlag from "@comps/mod/flag.vue";
import {watch} from "vue";

export default {
  name: "ModFiles",
  components: {ModFlag},
  data() {
    let uploadServer = Method.getHostUrl("/Upload/Upload");
    return {
      type_list:[{id:1,name:'世界'},{id:2,name:'方块材质'},{id:3,name:'人物皮肤'},{id:4,name:'家具包'}],
      modName:'',
      isDeleteDialogVisible:false,
      api_type:0,
      api_list:[] as any,
      isCreating:false,
      isDialogVisible:false,
      isLoading:false,
      list:[],
      activeItemIndex:-1,
      modFileName:'',
      file_name:'',
      file_id:0,
      uploadFileSrc:uploadServer,
      world_list:[] as any,
      inner_name:'',
      inner_file_name:'',
      desc:'',
      version:'',
      isDeleting:false,
      progress:''
    }
  },
  methods:{
    onProgress(event){
      this.progress = event.percent;
      if(this.progress==100){
        ElMessage('上传成功');
        setTimeout(()=>{
          this.progress = 0;
        },1000)
      }
    },
    uploadFile(e){
      if(e.code==200){
        this.file_name = e.data.file_name;
        this.file_id = e.data.file_id;
      }else{
        ElMessage(e.msg);
      }
    },
    showAddFile(){
      this.file_name = '';
      this.inner_file_name = '';
      this.file_id =0;
      this.isDialogVisible = true;
      this.refreshDocList();
    },
    refreshDocList(){
      let id = this.inner_name;
      let item = this.type_list.find(x=>{return x.id == id});
      if(item != null){
        let payLoad = {type:item.id};
        Method.api_post(`/user/document_list`,payLoad).then(response=>{
          let res = response.data;
          if(res.code==200){
            this.world_list = res.data;
          }
        });
      }
    },
    addFile(){
      let modId = this.$route.params.id;
      let fileId = this.file_id;
      let docId=0;
      if(this.inner_file_name != ''){
        fileId = parseInt(this.inner_file_name);
        let item = this.world_list.find(x=>{return x.file_id == fileId});
        docId = item.id;
      }
      let payLoad = {
        mod_id:modId,
        desc:this.desc,
        file_id:fileId,
        document_id:docId,
        version:this.version,
        api_type:this.api_type
      };
      this.isCreating=true;
      Method.api_post(`/mod/add_file`,payLoad).then((response: any) => {
        let res = response.data
        this.isCreating=false;
        ElMessage(res.msg);
        if(res.code==200){
          this.isDialogVisible = false;
          this.refreshList();
        }
      }).catch(r=>{
        this.isCreating=false;
        ElMessage(r.message);
      })
    },
    handleDelete(index:number){
      this.activeItemIndex = index;
      this.isDeleteDialogVisible=true;
      let item = this.list[this.activeItemIndex];
      this.modFileName = item.name;
    },
    deleteModFile(){
      let item = this.list[this.activeItemIndex];
      this.isDeleting = true;
      Method.api_get(`/mod/delete_file/${item.id}`).then(response=>{
        let res = response.data;
        this.isDeleting = false;
        ElMessage(res.msg);
        if(res.code==200){
          this.isDeleteDialogVisible=false;
          this.refreshList();
        }
      });
    },
    refreshList(){
      let modId = this.$route.params.id;
      Method.api_get(`/mod/file_list/${modId}`).then((response: any) => {
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
    this.isLoading = true;
    this.api_list = Cfg.config.userInfo.global_mod_data_list.api_version;
    this.refreshList();
    watch(()=>this.inner_name,()=>{
      this.refreshDocList();
    })
  }
}
</script>
<style scoped>
.el-header{
  padding-top: 20px;
}
.my-progress{margin: 0 5px}
.el-input{flex: 1}
</style>