<template>
  <el-container style="height: 100%" v-loading="isLoading">
    <el-header class="zone-head-container">
      <img class="img" src="@/assets/image/head_zone_bg.png" />
      <div class="head-area">
        <el-avatar :size="headsize" :src="userInfo.data.headurl" />
        <div class="nickname">{{ userInfo.data.nickname }}</div>
        <el-tag size="small">管理员</el-tag>
        <el-tag size="small" class="ml-2" type="warning">SVIP 6</el-tag>
      </div>
    </el-header>
    <el-header class="zone-head-container btn-area">
      <el-tabs model-value="index" @tab-click="onTabChange">
        <el-tab-pane name="index">
          <template #label
            ><span class="custom-tabs-label"
              ><el-icon> <House /> </el-icon><span>主页</span></span
            ></template
          >
        </el-tab-pane>
        <el-tab-pane name="bbs">
          <template #label
            ><span class="custom-tabs-label"
              ><el-icon> <ChatLineSquare /> </el-icon><span>我的帖子</span></span
            ></template
          >
        </el-tab-pane>
        <el-tab-pane name="world">
          <template #label
            ><span class="custom-tabs-label"
              ><el-icon> <UploadFilled /> </el-icon><span>我的存档</span></span
            ></template
          >
        </el-tab-pane>
        <el-tab-pane name="mod">
          <template #label
            ><span class="custom-tabs-label"
              ><el-icon> <Promotion /> </el-icon><span>我的模组</span></span
            ></template
          >
        </el-tab-pane>
      </el-tabs>
    </el-header>
    <div class="body-area">
      <UserIndexPage
        :bbs="bbsList"
        :mod="modList"
        :world="worldList"
        v-if="activeTab == 0"
      ></UserIndexPage>
      <BbsPage v-if="activeTab == 1"></BbsPage>
      <WorldPage v-if="activeTab == 2"></WorldPage>
      <ModPage v-if="activeTab == 3"></ModPage>
    </div>
  </el-container>
</template>

<script lang="ts">
// 用户主页
import { House, ChatLineSquare, UploadFilled, Promotion } from "@element-plus/icons-vue"
import UserIndexPage from "@comps/user/zone-page/index.vue"
import ModPage from "@comps/user/zone-page/mod.vue"
import BbsPage from "@comps/user/zone-page/bbs.vue"
import WorldPage from "@comps/user/zone-page/world.vue"
import { ElMessage } from "element-plus"
import { useRoute } from "vue-router"
import Cfg from "@/config/config"
import Method from "@/globalmethods"

export default {
  name: "UserIndex",
  components: {
    Promotion,
    House,
    UserIndexPage,
    ChatLineSquare,
    UploadFilled,
    ModPage,
    WorldPage,
    BbsPage,
  },
  methods: {
    onTabChange(e: any) {
      this.activeTab = e.index
    },
  },
  data() {
    return {
      activeTab: 0,
      isSelf: false,
      isLoading: false,
      bbsList: [],
      worldList: [],
      modList: [],
      headsize: Cfg.config.homestyle.headsize.post,
      userInfo: Cfg.config.userInfo,
    }
  },
  created() {
    let route = useRoute()
    let userInfo = this.userInfo
    this.isLoading = true
    this.isSelf = userInfo.id === route.params.id
    Method.api_get(`/user/zone/1`).then((response: any) => {
      let res = response.data
      this.isLoading = false
      if (res.code == 200) {
        res.data.bbs.forEach((x: any) => {
          x.create_time = Method.formatNormalTime(x.create_time)
        })
        this.bbsList = res.data.bbs
        this.modList = res.data.mod
        res.data.world.forEach((x: any) => {
          x.type_name = Method.getScTypeName(x.file_type)
          x.file_name = Method.getFileName(x.name)
          x.create_time = Method.formatNormalTime(x.create_time)
        })
        this.worldList = res.data.world
      } else {
        ElMessage(res.msg)
      }
    })
  },
}
</script>

<style scoped>
.custom-tabs-label {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.zone-head-container {
  padding-top: 20px;
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 140px;
}

.zone-head-container .img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.zone-head-container.btn-area {
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: auto;
}

.body-area {
  margin: 20px 0 0 0;
  flex: 1;
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0 10px;
  overflow-y: auto;
}

.head-area {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 20px;
  z-index: 1;
}

.head-area .nickname {
  margin: 0 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.tab-head {
  font-size: 20px;
  font-weight: 400;
  line-height: 33px;
  border-bottom: 1px solid #eee;
  margin: 10px 0;
  padding-bottom: 10px;
  color: #222;
}

.tab-head:hover {
  color: #008ac5;
  cursor: pointer;
}
</style>
