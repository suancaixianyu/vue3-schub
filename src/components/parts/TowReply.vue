<template>
  <div class="post-area">
    <el-avatar :src="v.xx.author.headurl" :shape="v.shape" :size="26" style="margin-right: 12px" />
    <div class="area">
      <div class="user-label">
        <div>{{ v.xx.author.nickname }}</div>
        <el-tag size="small">{{ v.xx.author.role }}</el-tag>
        <div class="to-user" v-if="v.xx.to_author != null">
          回复<a class="to-user-name">@{{ v.xx.to_author.nickname }}</a
          >:
        </div>
      </div>
      <div class="comments">{{ v.xx.content }}</div>
      <div class="extra-line">
        <div class="time">{{ v.xx.time }}</div>
        <LikeIcon class="label"></LikeIcon>
        <div class="label amount">{{ likes }}</div>
        <div class="label" @click="readyReply">回复</div>
      </div>
      <div class="post-area" v-if="isReadyReply">
        <el-avatar
          :src="userInfo.data.headurl"
          :shape="square"
          :size="26"
          style="margin-right: 12px"
        />
        <el-input v-model="comments" autosize type="textarea" placeholder="发表评论" />
        <el-button icon="Edit" @click="reply" :loading="isReplying">回复</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LikeIcon from "@comps/icons/Like.vue"
import { reactive, toRefs } from "vue"
import { api } from "@/apitypes"
import { ElMessage } from "element-plus"

import Method from "@/globalmethods"
import Cfg from "@/config/config"

export default {
  name: "TowReply",
  components: {
    LikeIcon,
  },
  props: {
    v: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userInfo: Cfg.config.userInfo,
    }
  },
  methods: {
    reply() {
      this.doReply(() => {
        this.$emit("refreshEvent")
      })
    },
  },
  setup(props) {
    let data = reactive({
      isReadyReply: false,
      comments: "",
      likes: 0,
      isReplying: false,
      square: "square",
      isDoGooding: false,
      isLoadingReply: false,
    })
    data.likes = parseInt(props.v.xx.likes)
    function readyReply() {
      data.isReadyReply = !data.isReadyReply
    }
    function doGood() {
      //评论点赞
      data.isDoGooding = true
      Method.api_get(`/bbs/reply_good/${props.v.id}`).then((res: any) => {
        let obj = res.data as api
        data.isDoGooding = false
        data.likes += parseInt(obj.data)
        ElMessage({
          type: obj.code == 200 ? "success" : "error",
          message: obj.msg,
        })
      })
    }

    function doReply(callback: any) {
      if (data.comments === "") return ElMessage("评论内容不可为空")
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
          data.comments = ""
          data.isReadyReply = false
          if (callback != null) callback()
          ElMessage("回复成功")
        } else {
          ElMessage("回复失败")
        }
      })
    }

    return {
      ...toRefs(data),
      readyReply,
      doGood,
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
</style>
