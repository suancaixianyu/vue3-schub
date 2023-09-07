<template>
  <div class="bbs-window">
    <!-- 头部搜索框 -->
    <div
      class="card w-96 bg-base-100 shadow-xl card-compact search-header"
      :class="set.ismobile ? 'mobile' : ''"
    >
      <div class="container">
        <input
          v-model="searchKey"
          type="search"
          placeholder="搜索"
          class="item input input-bordered input-sm"
        />
        <button class="btn btn-sm item" @click="search" title="搜索">
          <el-icon>
            <Search />
          </el-icon>
          <el-text v-if="btn">搜索</el-text>
        </button>
      </div>
    </div>
    <!-- 列表 -->
    <div
      style="overflow: auto"
      class="hide-scrollbar"
      v-loading="isLoadingList"
    >
      <div class="bbs-list" ref="container" element-loading-text="加载中">
        <div v-for="item in plate" v-if="plate.length > 0">
          <div
            class="card w-96 bg-base-100 shadow-xl card-compact item-header"
            :class="set.ismobile ? 'mobile' : ''"
            :style="{
              background: item.id == focus ? '#fff' : '#fff',
              paddingTop: item.id == focus ? '25px' : '20px',
              boxShadow:
                item.id == focus
                  ? 'inset 5px 5px 10px #f2f2f2,inset -5px -5px 10px #ffffff'
                  : 'var(--el-box-shadow-light)',
            }"
          >
            <BbsItem
              :item="item"
              :path="path"
              @click="onItemClick(item)"
            ></BbsItem>
          </div>
        </div>
        <el-empty v-else description="没有数据" :image-size="200" />
        <div class="load-more" v-if="set.ismobile">
          <el-button type="primary" @click="loadMore" v-loading="isLoadingMore">
            {{ txt }}
          </el-button>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div
      v-if="!set.ismobile && total > 10"
      class="card w-96 bg-base-100 shadow-xl search-header card-compact hidden-xs-only pagination-end"
    >
      <el-pagination
        v-if="pagination"
        :current-page="pagenum"
        :page-size="10"
        :pager-count="5"
        :total="total"
        @current-change="handleCurrentChange"
        style="justify-content: center"
      >
      </el-pagination>
      <el-pagination
        v-else
        layout="prev, pager, next"
        :total="total"
        :pager-count="5"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Method from '@/globalmethods'
import Cfg from '@/config/config'
import BbsItem from '@comps/main/bbs/item.vue'
import { watch } from 'vue'

/** 帖子列表 */
export default {
  name: 'PostPage',
  components: {
    BbsItem,
  },
  data() {
    return {
      set: Cfg.set,
      pagination: true,
      pagenum: 1, // 页码
      total: 0, // 总帖子数
      totalpages: 0, // 总页数
      isLoadingList: false,
      isLoadingMore: false,
      btn: true,
      searchKey: '',
      plate: <any[]>[],
      txt: '加载更多',
      path: '',
      focus: '',
    }
  },
  methods: {
    onItemClick(item: any) {
      this.$emit('itemClickEvent', item)
      this.focus = item.id
    },
    /**指定页面加载 */
    handleCurrentChange(page: any) {
      this.pagenum = page // 更新当前页码
      this.listUpdate()
    },
    /**无限滚动加载 */
    loadMore() {
      if (this.pagenum + 1 <= this.totalpages) {
        this.isLoadingMore = true
        this.pagenum++
        this.listUpdate(true)
      } else {
        this.txt = '到底了~'
      }
    },
    /**
     * 列表刷新
     * @param appendMode true 追加数据 false 刷新数据
     */
    listUpdate(appendMode: boolean = false) {
      this.txt = '加载更多'
      this.isLoadingList = true
      let payLoad = {
        page: this.pagenum,
        search: this.searchKey,
      }
      Method.api_post(`/bbs/list/${this.$route.params.cateid}`, payLoad)
        .then((response: any) => {
          let obj = response.data
          this.isLoadingMore = false
          this.isLoadingList = false
          if (obj.code === 200) {
            const scrollElement = <any>this.$refs.container
            // 获取总帖子数量
            this.total = obj.sum.total
            this.totalpages = Math.ceil(obj.sum.total / 10)

            // 格式化数据
            obj.data.forEach((el: any) => {
              el.cover = el.cover ? Method.getHostUrl(el.cover) : ''
              el.time = Method.formatBbsTime(el.time)
              el.likes = parseInt(el.likes)
            })

            // 更新列表
            if (appendMode) {
              obj.data.forEach((el: any) => {
                this.plate.push(el)
              })
              scrollElement.scrollTop = scrollElement.scrollHeight
            } else {
              this.plate = obj.data
              scrollElement.scrollTop = 0
            }
          }
        })
        .catch((error) => {
          this.isLoadingMore = false
          this.isLoadingList = false
          console.error(error)
        })
    },
    /** 搜索（本地） */
    search() {
      this.pagenum = 1
      this.listUpdate()
    },
  },
  mounted() {
    watch(
      () => this.$route.params.cateid,
      () => {
        this.pagenum = 1
        if (this.$route.params.cateid) this.listUpdate()
        this.path = <string>this.$route.params.cateid
      },
      { immediate: true },
    )
    watch(
      () => this.$route.params.id,
      () => {
        if (this.$route.params.id) this.pagination = false
        else this.pagination = true
        this.focus = <string>this.$route.params.id
      },
      { immediate: true },
    )
  },
}
</script>

<style scoped>
.pagination-end {
  justify-content: center;
}
.bbs-list {
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
  box-shadow: var(--el-box-shadow-light);
}

.bbs-window {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.item-header {
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  margin: 10px 50px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--rounded-btn);
}

.item-header.mobile {
  margin: 10px;
}

.search-header {
  height: 60px;
  display: flex;
  flex-direction: row;
  padding: 12px 18px;
  margin: 10px 50px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--rounded-btn);
}

.search-header.mobile {
  margin: 10px;
}

.search-header .container {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.search-header .container .input {
  overflow: hidden;
  flex: 1;
}

.search-header .container .item {
  margin: 0 6px;
}

.load-more {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}
</style>
