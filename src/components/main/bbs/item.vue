<template>
  <div v-if="set.ismobile">
    <el-container>
      <el-aside width="100%">
        <router-link :to="`/postlist/${path}/${item.id}`">
          <!-- 列表顶部栏 S -->
          <div class="item-top-title">
            <!-- 头像 -->
            <UserIcon
              class="item-top-title-list avatar"
              :src="item.author.headurl"
              :size="headsize"
              :alt="item.author.nickname"
            />
            <!-- 标题 -->
            <el-text
              class="item-top-title-list mx-1 time title"
              size="large"
              tag="b"
              v-html="item.title"
            ></el-text>
            <!-- 发布时间 -->
            <el-text class="item-top-title-list release-time" size="small">{{
              item.time
            }}</el-text>
          </div>
          <!-- 列表顶部栏 E -->
          <el-text
            class="mx-1 time item-content"
            style="text-align: left"
            v-html="item.summary"
          ></el-text>
        </router-link>

        <ul class="category-counts">
          <li @click="doLike">
            <el-button link :style="{ color: like == 0 ? '' : '#FD70A1' }">
              <el-icon :size="22"> <LikeIcon /> </el-icon>{{ goodNum }}
            </el-button>
          </li>
          <router-link :to="`/postlist/${path}/${item.id}`">
            <li>
              <el-button link>
                <el-icon :size="18" style="margin-right: 5px">
                  <ChatDotSquare />
                </el-icon>
                {{ item.comments }}
              </el-button>
            </li>
          </router-link>
        </ul>
      </el-aside>
      <el-main style="padding: 0; text-align: right" v-if="item.cover">
        <el-image style="height: 80px" :src="item.cover" fit="cover" />
      </el-main>
    </el-container>
  </div>
  <div v-else>
    <!-- 头部 -->
    <el-header style="height: 46px; padding: 0">
      <UserHead :item="item" />
    </el-header>
    <!-- 中部 -->
    <router-link :to="`/postlist/${path}/${item.id}`">
      <el-container>
        <el-aside width="70%">
          <el-text
            class="mx-1 time title"
            size="large"
            tag="b"
            v-html="item.title"
          ></el-text>
          <el-text
            class="mx-1 time"
            style="text-align: left"
            v-html="item.summary"
          ></el-text>
        </el-aside>
        <el-main style="padding: 0; text-align: right" v-if="item.cover">
          <el-image style="height: 80px" :src="item.cover" fit="cover" />
        </el-main>
      </el-container>
    </router-link>
    <!-- 底部 -->
    <el-footer style="text-align: left; padding: 0; height: 25px">
      <ul class="category-counts">
        <li @click="doLike">
          <el-button link :style="{ color: like == 0 ? '' : '#FD70A1' }">
            <el-icon :size="22"> <LikeIcon /> </el-icon>{{ goodNum }}
          </el-button>
        </li>
        <router-link :to="`/postlist/${path}/${item.id}`">
          <li>
            <el-button link>
              <el-icon :size="18" style="margin-right: 5px">
                <ChatDotSquare />
              </el-icon>
              {{ item.comments }}
            </el-button>
          </li>
        </router-link>
      </ul>
    </el-footer>
  </div>
</template>

<script lang="ts">
import LikeIcon from '@comps/icons/Like.vue'
import UserHead from '@comps/main/bbs/UserHead.vue'
import { reactive, toRefs } from 'vue'
import { api } from '@/apitypes'
import { ElMessage } from 'element-plus'
import Cfg from '@/config/config'
import Method from '@/globalmethods'
import { MdPreview } from 'md-editor-v3'
import UserIcon from '@comps/user/userIcon.vue'

export default {
  name: 'BbsItem',
  components: {
    LikeIcon,
    UserHead,
    MdPreview,
    UserIcon,
  },
  props: ['item', 'path'],
  data() {
    return {
      set: Cfg.set,
      headsize: Cfg.headsize.post,
    }
  },
  setup(props) {
    let data = reactive({
      isDoGooding: false,
      isDoBading: false,
      goodNum: props.item.likes,
      like: props.item.like,
    })
    function doLike() {
      //帖子点赞
      data.isDoGooding = true
      Method.api_get(`/bbs/good/${props.item.id}`).then((res: any) => {
        let obj = res.data as api
        data.isDoGooding = false
        if (obj.code === 200) {
          data.goodNum += parseInt(obj.data)
          if (obj.data == 1) {
            data.like = 1
          } else {
            data.like = 0
          }
        }
        ElMessage({
          type: obj.code == 200 ? 'success' : 'error',
          message: obj.msg,
        })
      })
    }
    return { ...toRefs(data), doLike }
  },
}
</script>

<style scoped>
.time {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.title {
  display: block;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-counts {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: flex-end;
}

.item-top-title {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.item-top-title .item-top-title-list {
  flex: 1;
  margin-right: 10px;
  overflow: hidden;
}

.item-top-title .item-top-title-list.avatar {
  flex: 0.143;
}

.item-top-title .item-top-title-list.release-time {
  flex: 0.3;
  text-align: right;
}

.item-top-title .item-top-title-list:last-child {
  margin-right: 0;
}

.item-content {
  margin: 10px 0;
}
</style>
