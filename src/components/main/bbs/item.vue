<template>
  <div>
    <el-container>
      <el-aside width="100%">
        <router-link :to="`/postlist/${path}/${item.id}`" @click="onItemClick">
          <!-- 列表顶部栏 S -->
          <el-row style="align-items: center">
            <el-col :span="19" style="display: flex">
              <UserIcon
                class="item-top-title-list avatar"
                :src="item.author.headurl"
                :size="headsize.post"
                :alt="item.author.nickname"
              />
              <el-text
                class="item-top-title-list time title"
                size="large"
                tag="b"
                style="margin-left: 0.5rem"
              >
                {{ item.title }}
              </el-text>
            </el-col>
            <el-col :span="5" style="text-align: right">
              <el-text size="small">{{ item.time }}</el-text>
            </el-col>
          </el-row>

          <!-- 列表顶部栏 E -->
          <el-text class="mx-1 time item-content" style="text-align: left">
            {{ item.summary }}
          </el-text>
        </router-link>

        <ul class="category-counts">
          <li>
            <el-button link>
              <icon-view :size="18"></icon-view>{{ viewNum }}
            </el-button>
          </li>
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
          <li class="linkbtn">
            <el-button
              link
              class="linkbtn"
              v-if="
                (userInfo.isLogin && item.uid == userInfo.data.id) ||
                userInfo.data.isAdmin
              "
            >
              <el-dropdown class="linkbtn">
                <span class="el-dropdown-link linkbtn">
                  <el-icon class="numicon linkbtn">
                    <MoreFilled />
                  </el-icon>
                </span>
                <template #dropdown class="linkbtn">
                  <el-dropdown-menu class="linkbtn">
                    <el-dropdown-item
                      v-if="userInfo.isLogin && item.uid == userInfo.data.id"
                      @click="edit(item.id, item.cate_id)"
                      >编辑</el-dropdown-item
                    >
                    <el-dropdown-item
                      divided
                      @click="del(item.id)"
                      v-if="
                        userInfo.data.isAdmin || item.uid == userInfo.data.id
                      "
                    >
                      <el-text type="danger">删除</el-text>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-button>
          </li>
        </ul>
      </el-aside>
      <el-main style="padding: 0; text-align: right" v-if="item.cover">
        <el-image style="height: 80px" :src="item.cover" fit="cover" />
      </el-main>
    </el-container>
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
import { useRouter } from 'vue-router'
import IconHot from '@comps/icons/common/hot.vue'
import IconView from '@comps/icons/common/view.vue'

export default {
  name: 'BbsItem',
  components: {
    IconView,
    IconHot,
    LikeIcon,
    UserHead,
    MdPreview,
    UserIcon,
  },
  props: ['item', 'path'],
  data() {
    return {
      ...Cfg,
    }
  },

  setup(props, context) {
    let router = useRouter()
    let data = reactive({
      isDoGooding: false,
      isDoBading: false,
      goodNum: props.item.likes,
      like: props.item.like,
      viewNum: props.item.views,
    })
    function onItemClick() {
      context.emit('onItemClick', props.item.id)
    }
    function edit(id: number, cate_id: number) {
      router.push(`/publish/${cate_id}/${id}`)
    }
    function del(id: number) {
      let url = '/bbs/del'
      if (Cfg.userInfo.data.isAdmin) url = '/bbs/lock_item'
      Method.api_post(url, { id: id }).then((res: any) => {
        let obj = res.data as api
        if (obj.code == 200) {
          ElMessage({
            type: 'success',
            message: obj.msg,
          })
          context.emit('childEvent', true)
        } else {
          ElMessage({
            type: 'error',
            message: obj.msg,
          })
        }
      })
    }
    function doLike() {
      //帖子点赞
      data.isDoGooding = true
      Method.api_get(`/bbs/good/${props.item.id}`).then((res: any) => {
        let obj = res.data as api
        data.isDoGooding = false
        if (obj.code == 200) {
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
    return { ...toRefs(data), doLike, edit, del, onItemClick }
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

.linkbtn:active {
  border: none;
}
</style>
