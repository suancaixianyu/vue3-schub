<template>
  <div style="padding: 0px 10px">
    <el-row :gutter="24" style="height:100% overflow-y: 'scroll'" class="row-bg" justify="center">
      <!-- 占位元素 -->
      <el-col :span="col.placeholder"></el-col>
      <el-col :span="col.postlist" style="padding: 4px 0px">
        <div class="window hide-scrollbar" :style="windowseype" ref="container">
          <!-- 头部搜索框 -->
          <div class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact" :style="postlistseype"
            style="height: 60px">
            <el-row :gutter="24">
              <el-col :span="24">
                <input v-model="searchinput" type="search" placeholder="搜索" class="input input-bordered input-sm"
                  style="margin-right: 12px" :style="inputstyle" />
                <button class="btn btn-sm" @click="search" style="margin: 0px" title="搜索">
                  <el-icon>
                    <Search />
                  </el-icon>
                  <el-text v-if="btn">搜索</el-text>
                </button>
                <samp style="margin: 6px"></samp>
                <button class="btn btn-sm" style="margin: 0px" title="发帖" @click="topublish">
                  <el-icon>
                    <Edit />
                  </el-icon>
                  <el-text v-if="btn">发帖</el-text>
                </button>
              </el-col>
              <el-col :span="24"></el-col>
            </el-row>
          </div>
          <!-- 列表 -->
          <div v-loading="isLoadingList" element-loading-text="加载中">
            <ul v-infinite-scroll="loadmore" :infinite-scroll-distance="20" :infinite-scroll-immediate="false"
              :infinite-scroll-disabled="disableloading">
              <li>
                <PostListPlate v-for="item in outcomeplate" :key="item.id" :item="item" :bbsid="chatid"
                  :st="{ postlistseype, shape }" />
              </li>
            </ul>
          </div>
          <!-- 底部分页 -->
          <div class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact hidden-xs-only"
            :style="postlistseype" style="height: 60px" v-if="showpagenum">
            <el-pagination :current-page="pagenum" :page-size="10" :pager-count="5" :total="total"
              @current-change="handleCurrentChange" style="justify-content: center"></el-pagination>
          </div>
          <div style="text-align: center; cursor: pointer" @click="loadmore" v-html="txt"
            class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact hidden-sm-and-up"></div>
        </div>
      </el-col>
      <!-- 占位元素 -->
      <el-col :span="col.placeholder"></el-col>
      <el-col :span="col.detail" :style="colstype">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, inject, provide, watch, onMounted, onUpdated } from "vue"
import type { Ref } from "vue"
import { CSSProperties } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import Method from "@/globalmethods"
import Cfg from "@/config/config"

import PostListPlate from "./bbs/list.vue"
/** 帖子列表 */
export default {
  name: "PostPage",
  components: {
    PostListPlate,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const data = reactive({
      txt: "加载更多",
      disableloading: true, // 禁用加载
      showpagenum: true, // 显示页码
      pagenum: 1, // 页码
      total: 125, // 总帖子数
      totalpages: 2, // 总页数
      chatid: route.params.chatid,
      isLoadingList: false,
      btn: true,
      searchinput: "",
      inputstyle: {
        width: "calc(100% - 176px)",
      } as CSSProperties,
      colstype: {
        padding: "0px",
      } as CSSProperties,
      shape: Cfg.config.homestyle.set.shape,
      postlistseype: {
        display: "flex",
        padding: "12px 18px",
        justifyContent: "center",
        margin: "10px auto",
        width: "90%",
        maxHeight: "200px",
        boxShadow: `var(--el-box-shadow-light)`,
      } as CSSProperties,
      windowseype: {
        padding: "10px",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
      } as CSSProperties,
      col: {
        /** 列表宽度 */
        postlist: 8,
        /** 详情页宽度 */
        detail: 8,
        /** 占位元素宽度 */
        placeholder: 8,
      },
      plate: <any>[],
    })

    let windowwidth = inject<Ref<number>>("windowwidth") as Ref<number>
    watch(windowwidth, (newValue) => {
      pageup(newValue)
    })

    /**指定页面加载 */
    function handleCurrentChange(page: any) {
      data.pagenum = page // 更新当前页码
      listup(route.params.chatid, page, "pc")
    }
    /**无限滚动加载 */
    function loadmore() {
      if (data.pagenum + 1 <= data.totalpages) {
        data.pagenum++
        listup(route.params.chatid, data.pagenum, "move")
        data.txt = "加载更多"
      } else {
        data.txt = "到底了~"
      }
    }

    function listup(id: any, page: any, type: string) {
      Method.api_get(`/bbs/list/${id}?page=${page}`)
        .then((response: any) => {
          data.isLoadingList = false
          let obj = response.data
          if (obj.code === 200) {
            // 其他处理
            data.total = obj.sum.total
            let a = Math.floor(obj.sum.total / 10)
            if (obj.sum.total % 10 > 0) ++a
            data.totalpages = a
            // 更新列表
            if (type === "pc") data.plate.length = 0
            obj.data.forEach((el: any) => {
              data.plate.push({
                /** 帖子id */
                id: el.id,
                /** 帖子标题 */
                title: el.title,
                /** 内容摘要，全部内容 */
                summary: el.summary,
                /** 用户信息 */
                author: el.author,
                /** 图片列表 */
                cover: el.cover,
                /** 发帖时间 */
                time: el.time,
                /** 点赞 */
                likes: el.likes,
                /** 评论 */
                comments: el.comments,
              })
            })
            if (type === "pc") {
              const scrollElement = ref<HTMLDivElement | null>(null);
              if (scrollElement.value) {
                scrollElement.value.scrollTop = 0;
              }
            }
          }
        })
        .catch((error) => {
          data.isLoadingList = false
          ElMessage({
            type: "error",
            message: "获取列表失败",
          })
          console.error(error)
        })
    }

    onMounted(() => {
      data.isLoadingList = true
      pageup(windowwidth.value)
      listup(route.params.chatid, 1, "pc")
    })

    onUpdated(() => {
      pageup(windowwidth.value)
    })

    /** 样式调整 */
    function pageup(width: number) {
      console.log(route.params)
      if (width <= 720) {
        Cfg.config.homestyle.maincontainer.height = "auto"
        data.windowseype.height = "auto"
        data.disableloading = false
      } else {
        Cfg.config.homestyle.maincontainer.height = "calc(100vh - 90px)"
        data.windowseype.height = "calc(100vh - 100px)"

        if (route.params.id) {
          data.disableloading = false
        } else {
          data.disableloading = true
        }
      }
      // 打开帖子
      if (route.params.id) {
        data.showpagenum = false

        if (width <= 720) {
          console.log("打开帖子，小于720")
          data.col = {
            postlist: 0,
            detail: 24,
            placeholder: 0,
          }
          data.btn = true
          data.inputstyle = {
            width: "calc(100% - 104px)",
          }
        } else if (width > 720 && width <= 900) {
          console.log("打开帖子，大于720，小于1200")
          data.col = {
            postlist: 10,
            detail: 14,
            placeholder: 0,
          }
          data.btn = false
          data.inputstyle = {
            width: "calc(100% - 104px)",
          }
        } else if (width > 900 && width <= 1200) {
          data.col = {
            postlist: 10,
            detail: 14,
            placeholder: 0,
          }
          data.btn = true
          data.inputstyle = {
            width: "calc(100% - 176px)",
          }
        } else if (width > 1200) {
          console.log("打开帖子，大于1200")
          data.col = {
            postlist: 10,
            detail: 14,
            placeholder: 0,
          }
          data.btn = true
          data.inputstyle = {
            width: "calc(100% - 176px)",
          }
        }
      } else {
        // 关闭帖子
        data.showpagenum = true
        if (width <= 720) {
          console.log("关闭帖子，小于720")
          data.col = {
            postlist: 24,
            detail: 0,
            placeholder: 0,
          }
          data.btn = false
          data.inputstyle = {
            width: "calc(100% - 104px)",
          }
        } else if (width > 720 && width <= 820) {
          console.log("关闭帖子，大于720，小于820")
          data.col = {
            postlist: 18,
            detail: 0,
            placeholder: 3,
          }
          data.btn = false
          data.inputstyle = {
            width: "calc(100% - 104px)",
          }
        } else if (width > 820 && width <= 1200) {
          console.log("关闭帖子，大于820，小于1200")
          data.col = {
            postlist: 18,
            detail: 0,
            placeholder: 3,
          }
          data.btn = true
          data.inputstyle = {
            width: "calc(100% - 176px)",
          }
        } else if (width > 1200) {
          console.log("关闭帖子，大于1200")
          data.col = {
            postlist: 12,
            detail: 0,
            placeholder: 6,
          }
          data.btn = true
          data.inputstyle = {
            width: "calc(100% - 176px)",
          }
        }
      }
    }

    /** 搜索结果 */
    let outcomeplate = <any>ref(data.plate);
    provide("outcomeplate", outcomeplate)

    /** 搜索（本地） */
    function search() {
      outcomeplate.value = data.plate.filter(function (object:any) {
        return object.title.includes(data.searchinput) || object.summary.includes(data.searchinput)
      })
    }

    /** 发帖 */
    function topublish() {
      router.push({
        path: `/publish/${data.chatid}`,
      })
    }

    return {
      outcomeplate,
      ...toRefs(data),
      search,
      topublish,
      handleCurrentChange,
      loadmore,
    }
  },
}
</script>

<style scoped>
.bbs-item{
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  margin: 10px auto;
  width: 90%;
  max-height: 200px;
  box-shadow: var(--el-box-shadow-light)
}
</style>