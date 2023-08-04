<template>
  <el-container class="el-container">
    <el-form>
      <el-form-item>
        <template #label>
          <div>标&emsp;&emsp;题</div>
          <div class="font-red">*</div>
        </template>
        <div class="title-line">
          <el-input class="my-input" v-model="config.title" />
          <el-button
            :loading="isPublishing"
            class="btn btn-sm"
            title="发帖"
            @click="submit"
          >
            <el-icon>
              <Edit />
            </el-icon>
            <el-text>发帖</el-text>
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="封面链接">
        <el-input v-model="config.cover_src" />
      </el-form-item>
    </el-form>
    <input type="file" id="as" />
    <MdEditor
      :editorId="previewid"
      v-model="config.content"
      style="height: 72vh"
      @onUploadImg="UploadImage"
    />
  </el-container>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useRoute, useRouter } from 'vue-router'

/** md编辑器 */
import 'md-editor-v3/lib/style.css'

// import Cfg from "@/config/config"

import Method from '@/globalmethods'
import { api } from '@/apitypes'
export default {
  name: 'PublishPost',
  components: {
    MdEditor,
  },
  data() {
    return {
      previewid: 'preview-set',
      isPublishing: false,
      config: {
        title: '',
        content: '',
        cate_id: 1,
        cover_src: 'https://q.qlogo.cn/g?b=qq&nk=3501869534&s=160',
      },
    }
  },
  methods: {
    /**
     * 上传图片
     */
    UploadImage(file: any) {
      ElMessage('上传中...')
      // 执行图片上传的逻辑
      const formdata = new FormData()
      formdata.append('file', file[0], file[0].name)
      Method.api_post('/Upload/Upload', formdata)
        .then((response) => {
          let obj = response.data as api
          if (obj.code === 200) {
            this.$data.config.content += `![](${Method.getHostUrl(
              obj.data.src,
            )})`
            ElMessage({
              type: 'success',
              message: '上传成功',
            })
          }
        })
        .catch((error) => {
          ElMessage({
            type: 'error',
            message: '上传失败',
          })
          console.log('error', error)
        })
    },
    /**
     * 提交帖子
     */
    submit() {
      if (this.config.title === '') return ElMessage('请输入帖子标题')
      else if (this.config.content === '') return ElMessage('请输入帖子内容')
      this.isPublishing = true
      Method.api_post('/bbs/add', this.config)
        .then((response) => {
          this.isPublishing = false
          ElMessage({
            type: 'success',
            message: response.data.msg,
          })
          this.router.push({
            path: `/postlist/${this.route.params.chatid}`,
          })
        })
        .catch((error) => {
          this.isPublishing = false
          ElMessage({
            type: 'error',
            message: '发送失败',
          })
          console.log(error)
        })
    },
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    return {
      router,
      route,
    }
  },
}
</script>

<style scoped>
.el-container {
  flex-direction: column;
  background: #fff;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
}

.title-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
}

.title-line .my-input {
  flex: 1;
  padding-right: 20px;
}

.font-red {
  color: #f00;
}
</style>
