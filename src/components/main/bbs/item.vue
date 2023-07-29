<template>
  <div>
    <!-- 头部 -->
    <el-header style="height: 46px; padding: 0px">
      <UserHead
        :item="{
          headurl: headUrl,
          shape: 'square',
          size: 36,
          nickname: item.author.nickname,
          time: time,
          role: item.author.role,
        }"
      />
    </el-header>
    <!-- 中部 -->
    <el-container>
      <el-aside width="70%">
        <el-text class="mx-1 time" size="large" tag="b">{{ item.title }}</el-text>
        <el-text class="mx-1 time" style="text-align: left">{{ item.summary }}</el-text>
      </el-aside>
      <el-main style="padding: 0px; text-align: right">
        <el-image v-if="item.cover" style="height: 80px" :src="item.cover" fit="cover" />
      </el-main>
    </el-container>
    <!-- 底部 -->
    <el-footer style="text-align: left; padding: 0px; height: 25px">
      <ul class="category-counts">
        <li @click="doGood" v-loading="isDoGooding">
          <el-icon :size="22">
            <LikeIcon />
          </el-icon>
          <p>{{ goodNum }}</p>
        </li>
        <li>
          <el-icon :size="18" style="margin-right: 5px">
            <ChatDotSquare />
          </el-icon>
          <p>{{ item.comments }}</p>
        </li>
      </ul>
    </el-footer>
  </div>
</template>

<script lang="ts">
import LikeIcon from "@comps/icons/Like.vue"
import UserHead from "@comps/parts/UserHead.vue"
import { reactive, toRefs } from "vue"
import { api } from "@/apitypes"
import { ElMessage } from "element-plus"

import Method from "@/globalmethods"
// import Cfg from "@/config/config";

export default {
  name: "BbsItem",
  components: {
    LikeIcon,
    UserHead,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let data = reactive({
      time: "",
      headUrl: "",
      isDoGooding: false,
      isDoBading: false,
      goodNum: 0,
    })
    data.headUrl = Method.getHostUrl(props.item.author.headurl)
    data.time = Method.formatBbsTime(props.item.time)
    data.goodNum = parseInt(props.item.likes)
    function doGood() {
      //帖子点赞
      data.isDoGooding = true
      Method.api_get(`/bbs/good/${props.item.id}`).then((res: any) => {
        let obj = res.data as api
        data.isDoGooding = false
        if (obj.code === 200) data.goodNum += parseInt(obj.data)
        ElMessage({
          type: obj.code == 200 ? "success" : "error",
          message: obj.msg,
        })
      })
    }
    return { ...toRefs(data), doGood }
  },
}
</script>

<style scoped>
.time {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
