<template>
  <div class="common-layout">
    <el-container>
      <el-header v-if="showheader" class="hide-scrollbar"
        style="display: flex;height:2rem;margin-top:0.5rem;padding:0;overflow-x: auto;">
        <el-button type="primary">发布主题</el-button>
        <el-button v-for="item in cate_list" @click="active_cate_id = item.id">
          <el-icon>
            <ChatDotSquare />
          </el-icon>
          <div class="name">{{ item.name }}</div>
        </el-button>
      </el-header>
      <el-main style="overflow-x: hidden;">
        <el-row :gutter="24" style="height:100% overflow-y: 'scroll'" class="row-bg" justify="center">

          <el-col :span="col.left" style="padding: 4px 0px">
            <div class="cate-item">
              <el-button type="primary">发布主题</el-button>
            </div>
            <div class="cate-item" :class="item.id == active_cate_id ? 'active' : ''" v-for="item in cate_list"
              @click="refreshBbsList(item.id)">
              <el-icon>
                <ChatDotSquare />
              </el-icon>
              <div class="name">{{ item.name }}</div>
            </div>
          </el-col>

          <el-col :span="col.rigth" style="padding: 4px 0px">
            <PostPage :chatid="active_cate_id" />
          </el-col>

        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  inject,
  watch,
  onMounted,
  onUpdated,
  onUnmounted,
} from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import Cfg from '@/config/config'
import Method from '@/globalmethods.ts'
import LikeIcon from '@comps/icons/Like.vue'
import PostPage from '@comps/main/PostPage.vue'

//主页卡片，经典
export default {
  name: 'HomePlate',
  components: { LikeIcon, PostPage },

  setup() {
    const route = useRoute()
    const data = reactive({
      headsize: Cfg.config.homestyle.headsize.post,
      bbs_list: [] as any,
      cate_list: [] as any,
      loadingCate: false,
      loadingBbs: false,
      active_cate_id: 1,
      page: 1,
      col: {
        left: 5,
        rigth: 19,
      },
    })

    function refreshBbsList(id: number) {
      data.active_cate_id = id
      data.loadingBbs = true
      Method.api_get(`/bbs/list/${data.active_cate_id}?page=${data.page}`).then(
        (response2) => {
          data.loadingBbs = false
          let res2 = response2.data
          res2.data.forEach((xx: any) => {
            xx.url = `/left/${data.active_cate_id}/${xx.id}`
          })
          if (res2.code == 200) {
            data.bbs_list = res2.data
          }
        },
      )
    }
    let windowwidth = inject<Ref<number>>('windowwidth') as Ref<number>
    watch(windowwidth, (newValue) => {
      pageup(newValue)
    })
    onMounted(() => {
      Cfg.config.homestyle.maincontainer.padding = '0 0.5rem'
      console.log(Cfg.config.homestyle.maincontainer.padding);
      pageup(windowwidth.value)
      data.loadingCate = true
      Method.api_get('/cate/list').then((response) => {
        let res = response.data
        data.loadingCate = false
        res.data.forEach((x: any) => {
          x.url = `/left/${x.id}`
        })
        if (res.code == 200) {
          data.cate_list = res.data
        }
        if (res.data.length > 0) {
          data.active_cate_id = res.data[0].id
        }
      })
    })

    onUnmounted(() => {
      Cfg.config.homestyle.maincontainer.padding = '0 18px'
    })
    onUpdated(() => {
      pageup(windowwidth.value)
    })
    // 监听路由的变化
    watch(route, (to, from) => {
      console.log('路由发生了变化', to, from);
      pageup(windowwidth.value)
    });

    /** 样式调整 */
    function pageup(width: number) {
      console.log(route.params)
      // 打开帖子
      if (route.params.id) {
        if (width <= 720) {
          Cfg.set.showheader = false
          data.col = {
            left: 0,
            rigth: 24,
          }
        } else if (width > 720 && width <= 900) {
          Cfg.set.showheader = false
          data.col = {
            left: 0,
            rigth: 24,
          }
        } else if (width > 900 && width <= 1200) {
          Cfg.set.showheader = false
          data.col = {
            left: 10,
            rigth: 14,
          }
        } else if (width > 1200) {
          Cfg.set.showheader = false
          data.col = {
            left: 10,
            rigth: 14,
          }
        }
      } else {
        // 关闭帖子
        if (width <= 720) {
          Cfg.set.showheader = true
          data.col = {
            left: 0,
            rigth: 24,
          }
        } else if (width > 720 && width <= 820) {
          Cfg.set.showheader = false
          data.col = {
            left: 7,
            rigth: 16,
          }
        } else if (width > 820 && width <= 1200) {
          Cfg.set.showheader = false
          data.col = {
            left: 6,
            rigth: 17,
          }
        } else if (width > 1200) {
          Cfg.set.showheader = false
          data.col = {
            left: 5,
            rigth: 18,
          }
        }
      }
    }


    return {
      ...toRefs(data),
      ...Cfg.set,
      refreshBbsList
    }
  },
}
</script>
<style scoped>
.cate-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
  margin-top: 20px;
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
  padding: 0
}
</style>
