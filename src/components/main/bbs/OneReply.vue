<template>
  <div class="post-area">
    <user-icon
      :src="x.author.headurl"
      :size="size"
      :alt="x.author.nickname"
      style="margin-right: 0.5rem"
    />
    <div class="area">
      <div class="user-label">
        <div>{{ x.author.nickname }}</div>
        <UserRole :role="x.author.role" />
      </div>
      <!-- <div class="comments">{{ x.content }}</div> -->
      <MdPreview
        :editorId="`preview-one-${previewid}`"
        :modelValue="x.content"
        class="bg-base-100"
        style="padding: 2px 0"
      />
      <div class="extra-line">
        <div class="time">{{ x.time }}</div>

        <el-button
          class="label amount"
          size="small"
          link
          :style="{ color: x.like == 0 ? '' : '#FD70A1' }"
        >
          <el-icon :size="22">
            <LikeIcon @click="doLike" />
          </el-icon>
          <el-text>
            {{ likes }}
          </el-text>
        </el-button>
        <el-button class="label" @click="readyReply" size="small" link>
          回复
        </el-button>
        <el-button
          class="label"
          @click="delReply(x.id)"
          size="small"
          link
          v-if="
            (userInfo.state.isLogin && x.uid == userInfo.id) ||
            userInfo.data.isAdmin
          "
        >
          删除
        </el-button>
      </div>

      <div v-if="isReadyReply">
        <el-row :gutter="24">
          <el-col :xs="17" :sm="15" :md="15" :lg="17" :xl="17">
            <el-input
              v-model="comments"
              autosize
              type="textarea"
              :placeholder="`回复${x.author.nickname}`"
              v-on:dblclick="handleDoubleClick"
            />
          </el-col>
          <el-col :span="3" style="display: flex">
            <el-button @click="readyReply" plain v-if="!set.ismobile">
              取消
            </el-button>
            <el-button
              :icon="set.ismobile ? '' : 'Edit'"
              :loading="isReplying"
              @click="reply"
              type="primary"
              plain
            >
              回复
            </el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 二级评论 -->
      <div
        v-if="x.children.length > 0"
        style="
          border: 1px solid rgba(204, 204, 204, 0.5);
          border-radius: 0.5rem;
          padding: 0.5rem;
        "
      >
        <TowReply
          v-for="(xx, index) in x.children"
          :key="xx"
          :v="{ x, xx, shape: set.shape }"
          :size="size"
          :previewid="index"
          @refreshEvent="refreshList"
        />
      </div>
    </div>
    <el-dialog
      v-model="mdEditor"
      title="全屏输入"
      :draggable="true"
      :fullscreen="true"
    >
      <MdEditor
        editorId="previewOne"
        :preview="!set.ismobile"
        v-model="comments"
        style="height: 72vh"
        @onUploadImg="UploadImage"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import LikeIcon from '@comps/icons/Like.vue'
import TowReply from '@comps/main/bbs/TwoReply.vue'
import { reactive, toRefs } from 'vue'
import { api } from '@/apitypes'
import { ElMessage } from 'element-plus'
import { MdPreview, MdEditor } from 'md-editor-v3'

/** md编辑器 */
import 'md-editor-v3/lib/preview.css'

import Method from '@/globalmethods.ts'
import Cfg from '@/config/config.ts'
import UserRole from '@comps/user/roleList.vue'
import UserIcon from '@comps/user/userIcon.vue'

export default {
  components: {
    UserIcon,
    UserRole,
    TowReply,
    LikeIcon,
    MdPreview,
    MdEditor,
  },
  props: ['previewid', 'x', 'size'],

  data() {
    return {
      ...Cfg,
    }
  },
  methods: {
    async UploadImage(file: any) {
      let url = await Method.UploadImage(file, false)
      this.comments += url
    },
    handleDoubleClick() {
      this.mdEditor = true
    },
    delReply(id: number) {
      Method.api_get(`bbs/del_reply/${id}`)
        .then((res: any) => {
          let obj = res.data as api
          if (obj.code == 200) {
            ElMessage({
              type: 'success',
              message: obj.msg,
            })
            this.$emit('refreshEvent')
          } else {
            ElMessage({
              type: 'error',
              message: obj.msg,
            })
          }
        })
        .catch(() =>
          ElMessage({
            type: 'error',
            message: '删除失败，可能没做',
          }),
        )
    },
    reply() {
      this.doReply(() => {
        this.$emit('refreshEvent')
      })
    },
    refreshList() {
      this.$emit('refreshEvent')
    },
    initClick() {
      this.$emit('refreshEvent')
    },
  },
  setup(props) {
    let data = reactive({
      mdEditor: false,
      comments: '',
      isReadyReply: false,
      likes: 0,
      isReplying: false,
      isDoGooding: false,
      isLoadingReply: false,
    })

    data.likes = parseInt(props.x.likes)
    function readyReply() {
      data.isReadyReply = !data.isReadyReply
    }
    function doLike() {
      //评论点赞
      if (!data.isDoGooding) {
        data.isDoGooding = true
        Method.api_get(`/bbs/reply_good/${props.x.id}`).then((res: any) => {
          let obj = res.data as api
          if (obj.code == 200) data.likes += parseInt(obj.data)

          ElMessage({
            type: obj.code == 200 ? 'success' : 'error',
            message: obj.msg,
          })
        })
      }
    }

    function doReply(callback: any) {
      if (data.comments === '') return ElMessage('评论内容不可为空')
      data.isReplying = true
      let rid = props.x.id
      Method.api_post(`/bbs/reply`, {
        content: data.comments,
        reply_id: rid,
      }).then((response) => {
        data.isReplying = false
        let res = response.data as api
        if (res.code == 200) {
          data.isLoadingReply = true
          data.comments = ''
          data.isReadyReply = false
          if (callback != null) callback()
          ElMessage('回复成功')
        } else {
          data.isReplying = false
          ElMessage({
            type: 'error',
            message: `回复失败：${res.msg}`,
          })
        }
      })
    }
    return {
      ...toRefs(data),
      readyReply,
      doReply,
      doLike,
    }
  },
}
</script>

<style scoped>
.to-user-name {
  color: #008ac5;
  padding: 0 5px;
  cursor: pointer;
}
.md-editor-preview-wrapper {
  padding: 0.5rem 0;
}
</style>
