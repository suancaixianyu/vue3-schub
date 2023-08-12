<template>
  <el-container style="height: 100%" v-loading="isLoading">
    <el-header class="zone-head-container">
      <img class="img" src="../../assets/image/headbj.png" />
      <img class="img2" src="../../assets/image/wenben.png" />
      <div class="head-area">
        <el-upload :action="uploadServer" v-model="userInfo.data.headurl" :with-credentials="true" :show-file-list="false"
          :on-success="uploadCover">
          <el-avatar :size="headsize" :src="userInfo.data.headurl" />
        </el-upload>
        <div class="nickname" v-html="userInfo.data.nickname"></div>
        <UserRole :role="userInfo.data.role" />
      </div>
    </el-header>
    <el-header class="zone-head-container btn-area">
      <el-tabs class="el-tabs" model-value="bbs" @tab-click="onTabChange">
        <!-- <el-tab-pane name="index">
          <template #label>
            <span class="custom-tabs-label"><el-icon>
                <House />
              </el-icon><span>主页</span></span>
          </template>
          <UserIndexPage :bbs="bbsList" :mod="modList" :world="worldList" v-if="activePages[0]" />
        </el-tab-pane> -->
        <el-tab-pane name="bbs">
          <template #label>
            <span class="custom-tabs-label"><el-icon>
                <ChatLineSquare />
              </el-icon><span>我的帖子</span></span>
          </template>
          <BbsPage v-if="activePages[0]" />
        </el-tab-pane>
        <el-tab-pane name="world">
          <template #label>
            <span class="custom-tabs-label"><el-icon>
                <UploadFilled />
              </el-icon><span>我的存档</span></span>
          </template>
          <WorldPage v-if="activePages[1]" />
        </el-tab-pane>
        <el-tab-pane name="mod">
          <template #label>
            <span class="custom-tabs-label"><el-icon>
                <Promotion />
              </el-icon><span>我的资源</span></span>
          </template>
          <ModPage v-if="activePages[2]" />
        </el-tab-pane>
      </el-tabs>
    </el-header>
  </el-container>
</template>

<script lang="ts">
// 用户主页
import {
  House,
  ChatLineSquare,
  UploadFilled,
  Promotion,
} from '@element-plus/icons-vue'
import ModPage from '@comps/user/zone-page/mod.vue'
import BbsPage from '@comps/user/zone-page/bbs.vue'
import WorldPage from '@comps/user/zone-page/world.vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import Cfg from '@/config/config'
import Method from '@/globalmethods'
import UserRole from '@comps/user/roleList.vue'

export default {
  name: 'UserIndex',
  components: {
    UserRole,
    Promotion,
    House,
    ChatLineSquare,
    UploadFilled,
    ModPage,
    WorldPage,
    BbsPage,
  },
  methods: {
    uploadCover(e: any) {
      Cfg.userInfo.data.headurl = Method.getHostUrl(e.data.src)
    },
    onTabChange(e: any) {
      this.activePages[e.index] = true
      this.activeTab = e.index
    },
  },
  data() {
    let { userInfo, config: { server, homestyle: { headsize: { post } } } } = Cfg;
    return {
      uploadServer: `${server}/Upload/Upload`,
      activeTab: 0,
      isSelf: false,
      isLoading: false,
      bbsList: <any>[],
      worldList: <any>[],
      modList: <any>[],
      activePages: <boolean[]>[true, false, false, false],
      headsize: post,
      userInfo: userInfo
    }
  },
  created() {
    let route = useRoute()
    let userInfo = this.userInfo
    this.isLoading = true
    this.isSelf = userInfo.id === route.params.id
    Method.api_get(`/user/zone/${this.userInfo.data.id}`)
      .then((response: any) => {
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
      .catch(() => {
        this.isLoading = false
      })
  },
  mounted() {
    Cfg.config.homestyle.maincontainer.padding = '0'
    Cfg.config.homestyle.maincontainer.overflowY = 'auto'
  },
  unmounted() {
    Cfg.config.homestyle.maincontainer.padding = '0 1rem'
    Cfg.config.homestyle.maincontainer.overflowY = 'hidden'
  },
}
</script>

<style scoped>
.el-tabs {
  flex: 1;
  padding: 0;
}

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
  object-fit: cover;
}

.zone-head-container .img2 {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  height: 35%;
  object-fit: cover;
}

.zone-head-container.btn-area {
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: auto;
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
</style>
