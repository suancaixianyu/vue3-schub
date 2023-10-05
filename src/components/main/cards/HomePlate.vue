<template>
  <el-container v-if="set.ismobile">
    <el-col class="el-main v bg-base-100">
      <div class="cate-list mobile bg-base-100" v-if="!isBbsView">
        <el-button
          type="primary"
          icon="Plus"
          circle
          style="width: 1.5rem; height: 1.5rem"
          @click="topicPublish"
        />
        <div class="list bg-base-100 hide-scrollbar" v-loading="loadingCate">
          <router-link
            v-for="item in cate_list"
            :class="active_cate_id == item.id ? 'btnactive' : ''"
            class="bg-base-100"
            :to="`/postlist/${item.id}`"
            @click="active_cate_id = item.id"
          >
            <el-button
              link
              :type="active_cate_id == item.id ? 'primary' : ''"
              style="margin: 0 0.5rem"
            >
              <div class="name">{{ item.name }}</div>
            </el-button>
          </router-link>
        </div>
      </div>
      <!-- 帖子列表 -->
      <router-view />
    </el-col>
  </el-container>
  <el-container v-else>
    <el-main style="height: calc(100vh - 4rem); overflow-y: hidden">
      <!-- 板块列表 -->
      <div class="cate-list" :class="isBbsView ? '' : 'active'">
        <div class="cate-item">
          <el-button type="info" style="width: 100%" @click="topicPublish"
            >发布主题</el-button
          >
        </div>
        <div class="container" v-loading="loadingCate">
          <router-link
            class="cate-item"
            :class="item.id == active_cate_id ? 'active' : ''"
            v-for="item in cate_list"
            @click="active_cate_id = item.id"
            :to="`/postlist/${item.id}`"
          >
            <el-icon>
              <ChatDotSquare />
            </el-icon>
            <div class="name">{{ item.name }}</div>
          </router-link>
        </div>
      </div>
      <!-- 帖子列表 -->
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Cfg from '@/config/config'
import Method from '@/globalmethods.ts'
import LikeIcon from '@comps/icons/Like.vue'
import PostPage from '@comps/main/PostPage.vue'
import BbsItem from '@comps/main/bbs/item.vue'
import DetailPlate from '@comps/main/cards/DetailPlate.vue'
import type { api } from '@/apitypes'
import '@/components/admin/index.ts'
import { ElMessage } from 'element-plus'
export default {
  name: 'HomePlate',
  components: { DetailPlate, BbsItem, LikeIcon, PostPage },
  data() {
    return {
      set: Cfg.set,
      isBbsView: false,
      activeBbsItem: <any>null,
      headsize: Cfg.headsize.post,
      bbs_list: [] as any,
      cate_list: <cateItem[]>[],
      loadingCate: false,
      loadingBbs: false,
      /**当前板块id */
      active_cate_id: 0,
      page: 1,
    }
  },
  methods: {
    /** 发布帖子 */
    topicPublish() {
      this.$router.push(`/publish/${this.active_cate_id}`)
    },

    /** 初始化板块列表 */
    refreshCateList() {
      this.loadingCate = true
      Method.api_get('/cate/list')
        .then((response) => {
          let res: api = response.data
          this.loadingCate = false
          if (res.code != 200) {
            ElMessage({
              type: 'error',
              message: res.msg,
            })
          } else {
            let list = <cateItem[]>[]
            list.push(<cateItem>{ id: 0, name: '全部板块' })
            if (res.code == 200) {
              list = list.concat(res.data)
              this.cate_list = list
            }

            if (this.$route.params.cateid) {
              this.active_cate_id = Number(this.$route.params.cateid)
            } else {
              if (res.data.length > 0) {
                this.active_cate_id = list[0].id
              }
            }
          }
        })
        .catch(() => {
          this.loadingCate = false
          ElMessage({
            type: 'error',
            message: '请求出错',
          })
        })
    },
  },
  created() {
    this.refreshCateList()
  },
  mounted() {
    if (this.$route.params.cateid && this.$route.params.id) {
      this.isBbsView = true
    }
    if (!this.$route.params.cateid) {
      this.$router.replace('/postlist/0')
    }
  },
  updated() {
    if (this.$route.params.id) {
      this.isBbsView = true
    } else {
      this.isBbsView = false
    }
  },
}
</script>
<style scoped>
.el-main {
  display: flex;
  flex-direction: row;
}

.el-main.v {
  display: flex;
  flex-direction: column;
}

.el-col {
  transition: all 0.3s;
}

.cate-list,
.bbs-list,
.bbs-detail {
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.cate-list {
  width: 0%;
  padding: 0 10px;
  overflow: hidden;
}

.cate-list.mobile {
  width: auto;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 50px;
}

.cate-list.mobile .el-button {
  width: max-content;
}

.cate-list .el-button.active {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
  outline: 0;
}

.cate-list.mobile .list {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-left: 10px;
}

.cate-list.active {
  width: 230px;
}

.cate-list .container {
  min-width: 230px;
  overflow: hidden;
  padding: 0 10px;
}

.bbs-list {
  overflow: hidden;
}

.bbs-list.mobile {
  flex: 1;
}

.bbs-list.item-active {
  width: 50%;
}

.bbs-list.item-detach {
  width: 50%;
}

.bbs-detail {
  overflow: hidden;
  width: 0%;
}

.bbs-detail.active {
  width: 65%;
}

.cate-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0 10px 20px;
  margin: 10px;
  color: rgb(102, 127, 153);
  font-size: 18px;
}

.cate-item.active {
  color: #008ac5;
  border-radius: 0.5rem;
  box-shadow: var(--el-box-shadow-light);
}

.cate-item .name {
  padding-left: 10px;
}

.category-counts li {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}

.left {
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0 15px;
}

.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}

.bbs-item {
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  margin: 10px auto;
  width: 90%;
  max-height: 200px;
  border-radius: var(--rounded-box, 1rem);
  flex-direction: column;
  box-shadow: var(--el-box-shadow-light);
}

.el-container {
  height: inherit;
  overflow: hidden;
}

.el-main {
  padding: 0;
}
</style>
