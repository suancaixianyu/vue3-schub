<template>
  <div v-loading="isLoading">
    <!-- 移动端 -->
    <div v-if="set.ismobile" style="padding: 0 0.5rem">
      <!-- 顶部按钮 -->
      <el-row :gutter="24" style="padding: 0" v-if="content != null">
        <div class="detail-title-container">
          <el-col :span="16">
            <el-text class="mx-1 time title" size="large" tag="b">
              {{ content.title }}
            </el-text>
          </el-col>
          <el-col :span="8" style="display: flex; justify-content: flex-end">
            <el-icon @click="refresh_item" :size="24" title="刷新" class="icon">
              <Flushed />
            </el-icon>
            <el-icon @click="copyText" :size="25" title="复制链接" class="icon">
              <Link />
            </el-icon>
            <el-icon @click="close" :size="25" title="关闭" class="icon">
              <Close />
            </el-icon>
          </el-col>
        </div>
        <el-col :span="24">
          <UserHead :item="userInfo" style="padding-left: 10px" />
        </el-col>
        <el-col :span="24">
          <!-- 帖子内容展示 -->
          <MdPreview
            editorId="preview-mobile"
            :modelValue="content.summary"
            class="bg-base-200 md-editor-preview-wrapper-main"
          />

          <el-divider />

          <!-- 分割线 -->
          <div class="plate-label">
            <div class="large">评论</div>
            <div class="small">{{ sum }}</div>
            <div class="space"></div>
            <div
              class="filter"
              :class="{ active: sort == 0 }"
              @click="sortByTime"
            >
              最新
            </div>
            <div class="filter">|</div>
            <div
              class="filter"
              :class="{ active: sort == 1 }"
              @click="sortByHot"
            >
              最热
            </div>
          </div>
          <!-- 个人评论区 -->
          <div class="reply-body">
            <!-- 发表评论 -->
            <el-row :gutter="24" style="align-items: center">
              <el-col :span="3" style="padding: 0">
                <user-icon
                  :src="myUserInfo.data.headurl"
                  :alt="myUserInfo.data.nickname ?? '游客'"
                  :size="headsize"
                />
              </el-col>
              <el-col :span="16" style="padding: 0">
                <el-input
                  v-model="comments"
                  type="textarea"
                  autosize
                  :placeholder="
                    reply_list.length >= 1
                      ? '发表评论'
                      : '这里是评论区，不是无人区:-)'
                  "
                  v-on:dblclick="handleDoubleClick"
                />
              </el-col>
              <el-col :span="5" style="padding-left: 10px">
                <el-button :loading="isReplying" @click="doReply">
                  发表
                </el-button>
              </el-col>
            </el-row>
            <!-- 回复列表 -->
            <div
              style="margin-top: 15px"
              v-if="reply_list.length >= 1"
              v-loading="isLoadingReply"
            >
              <OneReply
                v-for="(x, index) in reply_list"
                :key="x"
                :x="{ ...x }"
                :shape="set.shape"
                :size="headsize"
                :previewid="index"
                @refreshEvent="refresh_reply_list"
              />
              <el-text type="primary" link @click="loadMore" class="text-btn">
                {{ txt }}
              </el-text>
            </div>
            <div
              style="margin-top: 15px; text-align: center; color: #9499a0"
              v-else
            >
              没有更多评论
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- pc页面 -->
    <div
      v-else
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact plate-body"
      style="box-shadow: var(--el-box-shadow-light); margin-right: 28px"
    >
      <div v-if="content != null" class="common-layout">
        <el-row :gutter="24" style="padding: 0" v-if="content != null">
          <div class="detail-title-container">
            <el-col :span="16">
              <el-text class="mx-1 time title" size="large" tag="b">
                {{ content.title }}
              </el-text>
            </el-col>
            <el-col :span="8" style="display: flex; justify-content: flex-end">
              <el-icon
                @click="refresh_item"
                :size="25"
                title="刷新"
                class="icon"
              >
                <Flushed />
              </el-icon>
              <el-icon
                @click="copyText"
                :size="25"
                title="复制链接"
                class="icon"
              >
                <Link />
              </el-icon>
              <el-icon @click="close" :size="25" title="关闭" class="icon">
                <Close />
              </el-icon>
            </el-col>
          </div>
          <el-col :span="24">
            <UserHead
              :size="headsize"
              :item="userInfo"
              style="padding-left: 10px"
            />
          </el-col>
          <el-col :span="24">
            <!-- 帖子内容展示 -->
            <MdPreview
              editorId="preview-mobile"
              :modelValue="content.summary"
              class="bg-base-200 md-editor-preview-wrapper-main"
            />

            <el-divider />

            <!-- 分割线 -->
            <div class="plate-label">
              <div class="large">评论</div>
              <div class="small">{{ sum }}</div>
              <div class="space"></div>
              <div
                class="filter"
                :class="{ active: sort == 0 }"
                @click="sortByTime"
              >
                最新
              </div>
              <div class="filter">|</div>
              <div
                class="filter"
                :class="{ active: sort == 1 }"
                @click="sortByHot"
              >
                最热
              </div>
            </div>
            <!-- 个人评论区 -->
            <div class="reply-body">
              <!-- 发表评论 -->
              <el-row :gutter="24" style="align-items: center">
                <el-col :xs="3" :sm="3" :md="2" :lg="2" :xl="1">
                  <user-icon
                    :src="myUserInfo.data.headurl"
                    :alt="myUserInfo.data.nickname ?? '游客'"
                    :size="32"
                  />
                </el-col>
                <el-col :xs="8" :sm="15" :md="15" :lg="17" :xl="16">
                  <el-input
                    v-model="comments"
                    type="textarea"
                    autosize
                    :placeholder="
                      reply_list.length >= 1
                        ? '发表评论'
                        : '这里是评论区，不是无人区:-)'
                    "
                    v-on:dblclick="handleDoubleClick"
                  />
                </el-col>
                <el-col :span="3">
                  <el-button
                    :icon="set.ismobile ? '' : 'Edit'"
                    :loading="isReplying"
                    @click="doReply"
                  >
                    发表
                  </el-button>
                </el-col>
              </el-row>
              <!-- 回复列表 -->
              <div
                style="margin-top: 15px"
                v-if="reply_list.length >= 1"
                v-loading="isLoadingReply"
              >
                <OneReply
                  v-for="(x, index) in reply_list"
                  :key="x"
                  :x="{ ...x }"
                  :shape="set.shape"
                  :size="headsize"
                  :previewid="index"
                  @refreshEvent="refresh_reply_list"
                />
                <el-text type="primary" link @click="loadMore" class="text-btn">
                  {{ txt }}
                </el-text>
              </div>
              <div
                style="margin-top: 15px; text-align: center; color: #9499a0"
                v-else
              >
                没有更多评论
              </div>
            </div>
          </el-col>
        </el-row>
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
// 帖子详情卡片
import { watch } from 'vue'
import { ElMessage } from 'element-plus'
import Flushed from '@comps/icons/Flushed.vue'
import UserHead from '@comps/main/bbs/UserHead.vue'
import OneReply from '@comps/main/bbs/OneReply.vue'
import Method from '@/globalmethods'
import Cfg from '@/config/config'

import { MdPreview, MdEditor } from 'md-editor-v3'
import UserIcon from '@comps/user/userIcon.vue'

export default {
  name: 'DetailPlate',
  components: {
    UserIcon,
    Flushed,
    UserHead,
    MdPreview,
    MdEditor,
    OneReply,
  },
  // props:{
  //   id: {type:Number}//帖子ID
  // },
  data() {
    return {
      mdEditor: false,
      myUserInfo: Cfg.userInfo, //登录的账号的信息
      userInfo: <any>{}, //发帖人的账号信息
      headsize: Cfg.headsize.post,
      set: Cfg.set,
      replyType: 0, //0对帖子1对评论
      comments: '',
      page: 1,
      limit: 10,
      sort: 0, //0最新1最热
      sum: 0,
      content: <any>null,
      reply_list: [] as any,
      txt: '加载更多',
      totalpages: 0, // 总评论页数
      isLoadingMore: false,
      isLoading: false,
      isLoadingReply: false,
      isReplying: false,
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
    loadMore() {
      if (this.isLoadingMore) return
      if (this.page + 1 <= this.totalpages) {
        this.isLoadingMore = true
        this.refresh_reply_list(true)
        this.page++
      } else {
        this.txt = '没有了...'
      }
    },
    /**
     * 刷新帖子详情
     */
    refresh_item() {
      this.isLoading = true
      Method.api_get(`/bbs/item/${this.$route.params.id}`)
        .then((res: any) => {
          this.isLoading = false
          if (res.data.code == 200) {
            let item = res.data.data
            item.time = Method.formatNormalTime(item.time)
            item.author.headurl = Method.getHostUrl(item.author.headurl)
            this.content = item
            this.userInfo = {
              headurl: item.author.headurl,
              nickname: item.author.nickname,
              time: item.time,
              role: item.author.role,
              shape: this.set.shape,
              headsize: this.headsize,
              style: {
                flexDirection: 'row',
                alignItems: 'center',
              },
            }
            this.totalpages = Math.ceil(item.comments / this.limit)
            if (this.totalpages == 1) {
              this.txt = ''
            } else {
              this.txt = '加载更多'
            }
            this.sum = item.comments
            this.refresh_reply_list()
          } else {
            ElMessage({
              type: 'error',
              message: res.data.msg,
            })
          }
        })
        .catch((error: any) => {
          this.isLoading = false
          ElMessage({
            type: 'error',
            message: '详情获取失败，请点击刷新按钮重试',
          })
          console.error(error)
        })
    },
    /**
     * 刷新回复列表
     */
    refresh_reply_list(appendMode: boolean = false) {
      let { page, limit, sort } = this
      this.isLoadingReply = true
      Method.api_get(
        `/bbs/reply_list/${this.$route.params.id}?page=${page}&limit=${limit}&sort=${sort}`,
      )
        .then((res: any) => {
          this.isLoading = false
          let list = res.data.data
          function formatList(l: any[]) {
            l.forEach(
              (xl: {
                time: any
                author: { headurl: string }
                children: any
              }) => {
                xl.time = Method.formatBbsTime(xl.time)
                xl.author.headurl = Method.getHostUrl(xl.author.headurl)
                formatList(xl.children)
              },
            )
          }
          formatList(list)
          if (appendMode) {
            for (const el of list) {
              this.reply_list.push(el)
            }
          } else {
            this.reply_list = list
          }
          this.isLoadingReply = false
          this.isLoadingMore = false
        })
        .catch((error: { message: any }) => {
          this.isLoading = false
          this.isLoadingReply = false
          ElMessage({
            type: 'error',
            message: '评论获取失败，请点击刷新按钮重试',
          })
          console.error(error)
        })
    },
    sortByTime() {
      this.sort = 0
      this.page = 1
      this.refresh_reply_list()
    },
    sortByHot() {
      this.sort = 1
      this.page = 1
      this.refresh_reply_list()
    },
    close() {
      this.$router.push('/postlist/0')
    },
    copyText() {
      Method.copyText(window.location.href)
    },
    /**
     * 回复帖子
     */
    doReply() {
      if (this.comments === '') return ElMessage('评论内容不可为空')
      this.isReplying = true
      Method.api_post(`/bbs/reply`, {
        content: this.comments,
        bid: this.$route.params.id,
      }).then((response: any) => {
        this.isReplying = false
        if (response.data.code == 200) {
          this.isLoadingReply = true
          this.comments = ''
          this.refresh_reply_list() //刷新评论
          ElMessage('评论成功')
        } else {
          ElMessage({
            type: 'error',
            message: `评论失败：${response.data.msg}`,
          })
        }
      })
    },
  },

  created() {
    watch(
      () => this.$route.params.id,
      () => {
        if (this.$route.params.id) {
          this.refresh_item()
        }
      },
    )
    this.refresh_item()
  },
}
</script>

<style>
.text-btn {
  display: flex;
  width: 100%;
  justify-content: center;
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.plate-label {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.plate-label .large {
  font-size: 1.5rem;
}

.plate-label .small {
  font-size: 0.5rem;
  padding-left: 0.5rem;
  color: #9499a0;
}

.plate-label .space {
  padding: 0 1rem;
}

.plate-label .filter {
  padding: 0.3rem;
  color: #9499a0;
  cursor: pointer;
}

.plate-label .filter.active {
  color: #333;
}

.plate-body {
  display: flex;
  padding: 12px 18px;
  justify-self: center;
  flex-direction: column;
  margin: 12px 5px;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  border-radius: var(--rounded-card);
}

.reply-body {
  display: flex;
  padding: 0.5rem;
  justify-self: center;
  flex-direction: column;
  margin: 0 5px;
}

.md-editor-preview-wrapper {
  padding: 0;
}

.md-editor-preview-wrapper-main {
  padding: 12px 10px 20px;
}

.post-area {
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
}

.post-area .user-label {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.post-area .area {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.post-area .comments {
  padding: 5px 0;
}

.post-area .extra-line {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #9499a0;
  align-items: center;
}

.post-area .extra-line .label {
  padding: 0 5px;
}

.post-area .extra-line .label.amount {
  padding: 0;
}

.icon {
  display: flex;
  margin-right: 5px;
  height: 26px;
  width: auto;
}

.detail-title-container {
  display: flex;
  width: 100%;
  margin: 10px 0 20px;
  justify-items: center;
  align-items: center;
}

.detail-title-container .title {
  font-size: 1.35rem;
}
</style>
