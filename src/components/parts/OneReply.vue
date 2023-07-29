<template>
  <div class="post-area">
    <el-avatar :src="x.author.headurl" :shape="shape" :size="size" style="margin-right: 12px" />
    <div class="area">
      <div class="user-label">
        <div>{{ x.author.nickname }}</div>
        <el-tag size="small">{{ x.author.role }}</el-tag>
      </div>
      <div class="comments">{{ x.content }}</div>
      <div class="extra-line">
        <div class="time">{{ x.time }}</div>
        <LikeIcon @click="doGood" class="label"></LikeIcon>
        <div class="label amount">{{ likes }}</div>
        <LikeIcon @click="initClick" class="label"></LikeIcon>
        <div class="label" @click="readyReply">回复</div>
      </div>
      <!-- 二级评论 -->
      <TowReply
        v-for="xx in x.children"
        :key="xx"
        :v="{ x, xx, shape, size }"
        @refreshEvent="refreshList"
      />
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
import TowReply from "@comps/parts/TowReply.vue"
import { reactive, toRefs } from "vue"
import { api } from "@/apitypes"
import { ElMessage } from "element-plus"
import Method from "@/globalmethods"
import Cfg from "@/config/config"

export default {
  components: {
    TowReply,
    LikeIcon,
  },
  props: {
    x: {
      type: Object,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
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
    refreshList() {
      this.$emit("refreshEvent")
    },
    initClick() {
      this.$emit("refreshEvent")
    },
  },
  setup(props) {
    let data = reactive({
      comments: "",
      square: "square",
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
    function doGood() {
      //评论点赞
      data.isDoGooding = true
      Method.api_get(`/bbs/reply_good/${props.x.id}`).then((res: any) => {
        let obj = res.data as api
        if (obj.code === 200) data.likes += parseInt(obj.data)

        ElMessage({
          type: obj.code == 200 ? "success" : "error",
          message: obj.msg,
        })
      })
    }

    function doReply(callback: any) {
      if (data.comments === "") return ElMessage("评论内容不可为空")
      data.isReplying = true
      let rid = props.x.id
      Method.api_post(`/bbs/reply`, {
        content: data.comments,
        reply_id: rid,
      }).then((response) => {
        data.isReplying = false
        if (response.data.code == 200) {
          data.isLoadingReply = true
          data.comments = ""
          data.isReadyReply = false
          if (callback != null) callback()
          ElMessage("回复成功")
        } else {
          data.isReplying = false
          ElMessage("回复失败")
        }
      })
    }
    return {
      ...toRefs(data),
      readyReply,
      doReply,
      doGood,
    }
  },
}
</script>
