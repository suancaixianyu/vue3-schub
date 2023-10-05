<template>
  <el-container class="el-container">
    <el-form>
      <el-form-item label="发布板块">
        <el-select v-model="config.cate_id" placeholder="请选择发布的板块">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item.label"
            :value="item.id"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <template #label>
          <div>标&emsp;&emsp;题</div>
        </template>
        <div class="title-line">
          <el-input
            class="my-input"
            v-model="config.title"
            maxlength="30"
            show-word-limit
          />
          <el-button
            :loading="isPublishing"
            :disabled="!userInfo.state.isLogin"
            class="btn btn-sm"
            title="发帖"
            @click="submit"
          >
            <el-icon>
              <Edit />
            </el-icon>
            <el-text v-if="config.id > 0">确认编辑</el-text>
            <el-text v-else>发布</el-text>
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="封面链接">
        <div class="title-line">
          <el-input disabled class="my-input" v-model="config.cover_src" />
          <el-upload
            :action="uploadServer"
            v-model="config.cover_src"
            :with-credentials="true"
            :show-file-list="false"
            :on-success="uploadCover"
            accept="image/png, image/jpeg"
          >
            <el-button type="primary" :disabled="!userInfo.state.isLogin"
              >上传</el-button
            >
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
    <MdEditor
      :editorId="previewid"
      :preview="!set.ismobile"
      v-model="config.content"
      style="height: 72vh"
      @onUploadImg="UploadImage"
    />
  </el-container>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { MdEditor } from 'md-editor-v3'

import Cfg from '@/config/config'
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
      uploadServer: `${Cfg.config.server}/Upload/Upload`,
      isPublishing: false,
      ...Cfg,
      config: {
        id: 0,
        title: '',
        content: '',
        cate_id: '',
        cover_src: '',
      },
      options: <any>[],
    }
  },
  methods: {
    uploadCover(e: any) {
      this.config.cover_src = e.data.src
    },
    /**
     * 上传图片
     */
    UploadImage(file: any) {
      Method.UploadImage(file, false, (url: string) => {
        this.config.content += url
      })
    },
    /**
     * 提交帖子
     */
    submit() {
      if (this.config.title === '') return ElMessage('请输入帖子标题')
      if (this.config.content === '') return ElMessage('请输入帖子内容')
      if (this.config.cate_id === '') return ElMessage('请选择一个板块')
      this.isPublishing = true
      Method.api_post('/bbs/add', this.config)
        .then((res) => {
          let obj = res.data
          this.isPublishing = false
          if (obj.code == 200) {
            ElMessage({
              type: 'success',
              message: obj.msg,
            })
            this.$router.back()
          } else {
            ElMessage({
              type: 'error',
              message: obj.msg,
            })
          }
        })
        .catch((error) => {
          this.isPublishing = false
          ElMessage({
            type: 'error',
            message: '发送失败：' + error.message,
          })
          console.log(error)
        })
    },
  },
  mounted() {
    let p = <any>this.$route.params
    this.config.id = <number>p.id

    Method.api_get('/cate/list')
      .then((response) => {
        let res: api = response.data
        if (res.code == 200) {
          for (const v of res.data) {
            if (v.id == this.$route.params.chatid) {
              this.config.cate_id = v.name
            }
            this.options.push({
              label: v.name,
              id: v.id,
              disabled:
                (this.userInfo.state.isLogin && v.id != 5) ||
                (v.id == 5 &&
                  this.userInfo.state.isLogin &&
                  this.userInfo.data.isAdmin)
                  ? false
                  : true,
            })
          }
        } else {
          ElMessage({
            type: 'error',
            message: res.msg,
          })
        }
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: '请求出错',
        })
      })

    if (this.config.id > 0) {
      Method.api_get(`/bbs/item/${this.$route.params.id}`).then((res: any) => {
        let obj = res.data as api
        if (obj.code == 200) {
          this.config.content = obj.data.summary
          this.config.title = obj.data.title
          this.config.cover_src = obj.data.cover
        }
      })
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
