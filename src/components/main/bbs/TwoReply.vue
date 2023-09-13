<template>
  <div class="post-area">
    <user-icon
      :src="v.xx.author.headurl"
      :alt="v.xx.author.nickname"
      :style="{ width: `${v.size}px`, height: `${v.size}px` }"
    />
    <div class="area">
      <div class="user-label">
        <div>{{ v.xx.author.nickname }}</div>
        <div class="to-user" v-if="v.xx.to_author != null">
          <div class="to-user-label">回复</div>
          <a class="to-user-name"> {{ '@' + v.xx.to_author.nickname }}</a>
          <div>:</div>
        </div>
      </div>
      <!-- <div class="comments">{{ v.xx.content }}</div> -->
      <MdPreview
        :modelValue="v.xx.content"
        :editorId="`preview-tow-${previewid}`"
      />
      <div class="extra-line">
        <div class="time">{{ v.xx.time }}</div>
        <LikeIcon class="label" @click="doLike"></LikeIcon>
        <div class="label amount">{{ likes }}</div>
        <div class="label" @click="readyReply">回复</div>
      </div>
      <div v-if="isReadyReply">
        <el-row :gutter="24">
          <el-col :xs="13" :sm="15" :md="15" :lg="17" :xl="16">
            <el-input
              v-model="comments"
              autosize
              type="textarea"
              :placeholder="`回复${v.xx.author.nickname}`"
            />
          </el-col>
          <el-col :span="3">
            <el-button
              :loading="isReplying"
              @click="reply"
              :icon="set.ismobile ? '' : 'Edit'"
            >
              回复
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LikeIcon from '@comps/icons/Like.vue'
import { reactive, toRefs } from 'vue'
import { api } from '@/apitypes'
import { ElMessage } from 'element-plus'
import { MdPreview } from 'md-editor-v3'

/** md编辑器 */
import 'md-editor-v3/lib/preview.css'

import Method from '@/globalmethods.ts'
import Cfg from '@/config/config.ts'
import UserRole from '@comps/user/roleList.vue'
import UserIcon from '@comps/user/userIcon.vue'

export default {
  name: 'TowReply',
  components: {
    UserIcon,
    UserRole,
    LikeIcon,
    MdPreview,
  },
  props: {
    previewid: {
      type: Number,
      required: true,
    },
    v: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ...Cfg,
    }
  },
  methods: {
    reply() {
      this.doReply(() => {
        this.$emit('refreshEvent')
      })
    },
  },
  setup(props) {
    let data = reactive({
      isReadyReply: false,
      comments: '',
      likes: 0,
      isReplying: false,
      isDoGooding: false,
      isLoadingReply: false,
    })
    data.likes = parseInt(props.v.xx.likes)
    function readyReply() {
      data.isReadyReply = !data.isReadyReply
    }
    function doLike() {
      //评论点赞
      if (!data.isDoGooding) {
        data.isDoGooding = true
        Method.api_get(`/bbs/reply_good/${props.v.id}`).then((res: any) => {
          let obj = res.data as api
          data.isDoGooding = false
          data.likes += parseInt(obj.data)
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
      let rid = props.v.x.id
      let to_rid = props.v.xx.id
      Method.api_post(`/bbs/reply`, {
        content: data.comments,
        reply_id: rid,
        to_reply_id: to_rid,
      }).then((response) => {
        data.isReplying = false
        if (response.data.code == 200) {
          data.isLoadingReply = true
          data.comments = ''
          data.isReadyReply = false
          if (callback != null) callback()
          ElMessage('回复成功')
        } else {
          ElMessage({
            type: 'error',
            message: `回复失败：${response.data.msg}`,
          })
        }
      })
    }

    return {
      ...toRefs(data),
      readyReply,
      doLike,
      doReply,
    }
  },
}
</script>

<style scoped>
.to-user {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.to-user-name {
  color: #008ac5;
  padding: 0 5px;
  cursor: pointer;
}

.to-user-label {
  padding-left: 10px;
}
</style>
