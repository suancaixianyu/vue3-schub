<template>
  <el-container style="height: 100%" v-loading="isLoading">
    <el-header
      class="zone-head-container bj"
      :style="{
        backgroundImage:
          // 'url(https://pic.imgdb.cn/item/64eb64df661c6c8e549e1ce8.png)',
          // 'url(/image/{2FB1489E-9572-4803-9114-850E04589092}.png)',
          userInfo.data.background == null || userInfo.data.background == ''
            ? 'url(/image/{2FB1489E-9572-4803-9114-850E04589092}.png)'
            : `url(${userInfo.data.background})`,
        padding: '0',
      }"
    >
      <img
        class="img2"
        src="https://pic.imgdb.cn/item/64e8cf5d661c6c8e5411e646.png"
      />
      <div class="head-area">
        <el-container>
          <el-aside :width="`${headsize * 1.2}px`">
            <el-upload
              :action="uploadServer"
              v-model="userInfo.data.headurl"
              :with-credentials="true"
              :show-file-list="false"
              :on-success="uploadCover"
              accept="image/png, image/jpeg"
            >
              <el-avatar :size="headsize" :src="userInfo.data.headurl" />
            </el-upload>
          </el-aside>
          <el-main class="padding-0" style="overflow-x: hidden">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-text class="nickname">{{ userInfo.data.nickname }}</el-text>
                <UserRole :role="userInfo.data.role" />
                <el-text>
                  <router-link to="/usersetup">
                    <el-icon :size="18" class="pointer" style="color: #fff">
                      <EditPen />
                    </el-icon>
                  </router-link>
                </el-text>
              </el-col>
              <el-col :span="20">
                <el-text class="signature">
                  <el-text class="uidtag">
                    UID: {{ userInfo.data.id }}
                  </el-text>
                  {{ userInfo.data.signature }}
                </el-text>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </div>
    </el-header>

    <el-header class="zone-head-container btn-area">
      <el-tabs class="el-tabs" model-value="bbs" @tab-click="onTabChange">
        <el-tab-pane name="bbs">
          <template #label>
            <span class="custom-tabs-label"
              ><el-icon> <ChatLineSquare /> </el-icon
              ><span> 我的帖子 </span></span
            >
          </template>
          <BbsPage v-if="activePages[0]" />
        </el-tab-pane>
        <el-tab-pane name="world">
          <template #label>
            <span class="custom-tabs-label"
              ><el-icon> <UploadFilled /> </el-icon><span>我的存档</span></span
            >
          </template>
          <WorldPage v-if="activePages[1]" />
        </el-tab-pane>
        <el-tab-pane name="mod">
          <template #label>
            <span class="custom-tabs-label"
              ><el-icon> <Promotion /> </el-icon><span>我的资源</span></span
            >
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
import Cfg from '@/config/config.ts'
import Method from '@/globalmethods.ts'
import UserRole from '@comps/user/roleList.vue'
import { api } from '@/apitypes'

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
      Method.api_post('/user/edit', { avatar: e.data.src })
        .then((res) => {
          let obj = res.data as api
          if (obj.code == 200) {
            ElMessage({
              type: 'success',
              message: obj.msg,
            })
            Method.getInformation()
          } else {
            ElMessage({
              type: 'error',
              message: obj.msg,
            })
          }
        })
        .catch((err) => {
          ElMessage({
            type: 'error',
            message: '请求错误：' + err.message,
          })
        })
    },
    onTabChange(e: any) {
      this.activePages[e.index] = true
      this.activeTab = e.index
    },
    getUserInfo() {
      this.isLoading = true
      Method.api_get(`/user/zone/${this.userInfo.id}`)
        .then((response: any) => {
          let res = response.data as api
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
  },
  data() {
    let {
      userInfo,
      config: { server },
      headsize: { userindex },
    } = Cfg
    return {
      uploadServer: `${server}/Upload/Upload`,
      activeTab: 0,
      isLoading: false,
      bbsList: <any>[],
      worldList: <any>[],
      modList: <any>[],
      activePages: <boolean[]>[true, false, false],
      headsize: userindex,
      userInfo: userInfo,
    }
  },
}
</script>

<style scoped>
.uidtag {
  color: deepskyblue;
  font-size: 12px;
  background-color: #fff;
  border-radius: 6px;
  padding: 0 4px;
  border: 1px solid deepskyblue;
}
.padding-0 {
  padding: 0;
}
.bj {
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
}
.signature {
  margin: 0 12px;
  color: #fff;
}

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
  padding: 0 1rem 0.5rem 1rem;
  z-index: 1;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.4)
  );
}

.nickname {
  margin: 0 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}
</style>
