<template>
  <div v-if="set.ismobile">
    <router-link :to="`/postlist/${path}/${item.id}`">
      <el-container>
        <el-aside width="70%">
          <UserIcon
            :src="item.author.headurl"
            :size="<number>headsize"
            :alt="item.author.nickname"
            style="margin-right: 12px"
          />
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
          <ul class="category-counts">
            <li>
              <!--              <UserIcon-->
              <!--                :src="item.author.headurl"-->
              <!--                :size="headsize"-->
              <!--                :alt="item.author.nickname"-->
              <!--                style="margin-right: 12px"-->
              <!--              />-->
              <el-text size="small">{{ item.time }}</el-text>
            </li>

            <li @click="doLike">
              <el-button link>
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
    </router-link>
    <!-- <el-header style="height: auto; padding: 0">
      <UserHead
        :item="{
          headurl: item.author.headurl,
          shape,
          headsize,
          nickname: item.author.nickname,
          time: item.time,
          role: item.author.role,
          style: {
            flexDirection: 'row',
            alignItems: 'center',
          },
        }"
        style="padding-left: 10px"
      />
    </el-header> -->
  </div>
  <div v-else>
    <!-- 头部 -->
    <el-header style="height: 46px; padding: 0">
      <UserHead
        :item="{
          headurl: item.author.headurl,
          shape,
          headsize,
          nickname: item.author.nickname,
          time: item.time,
          role: item.author.role,
        }"
      />
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
          <el-icon :size="22">
            <LikeIcon />
          </el-icon>
          <p v-html="goodNum"></p>
        </li>
        <router-link :to="`/postlist/${path}/${item.id}`">
          <li>
            <el-icon :size="18" style="margin-right: 5px">
              <ChatDotSquare />
            </el-icon>
            <p v-html="item.comments"></p>
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
      shape: Cfg.set.shape,
      set: Cfg.set,
      headsize: Cfg.headsize.post,
    }
  },
  setup(props) {
    let data = reactive({
      isDoGooding: false,
      isDoBading: false,
      goodNum: 0,
    })
    function doLike() {
      //帖子点赞
      data.isDoGooding = true
      Method.api_get(`/bbs/good/${props.item.id}`).then((res: any) => {
        let obj = res.data as api
        data.isDoGooding = false
        if (obj.code === 200) data.goodNum += parseInt(obj.data)
        ElMessage({
          type: obj.code == 200 ? 'success' : 'error',
          message: obj.msg,
        })
      })
    }
    return { ...toRefs(data), doLike }
  },
  updated() {
    if (this.$props.item.author.role) {
      this.$props.item.author.role = this.$props.item.author.role.charAt(0)
    }
  },
  mounted() {
    if (this.$props.item.author.role) {
      this.$props.item.author.role = this.$props.item.author.role.charAt(0)
    }
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
}
</style>
