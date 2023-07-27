<template>
  <div style="padding: 0px 10px">
    <el-row
      :gutter="24"
      style="height:100% overflow-y: 'scroll'"
      class="row-bg"
      justify="center"
    >
      <!-- 占位元素 -->
      <el-col :span="col.placeholder"></el-col>
      <el-col :span="col.postlist" style="padding: 4px 0px">
        <div class="window hide-scrollbar" :style="windowseype">
          <div
            class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
            :style="postlistseype"
            style="height: 60px"
          >
            <el-row :gutter="24">
              <el-col :span="24">
                <input
                  v-model="searchinput"
                  type="search"
                  placeholder="搜索"
                  class="input input-bordered input-sm"
                  style="margin-right: 12px"
                  :style="inputstyle"
                />
                <button
                  class="btn btn-sm"
                  @click="search"
                  style="margin: 0px"
                  title="搜索"
                >
                  <el-icon>
                    <Search />
                  </el-icon>
                  <el-text v-if="btn">搜索</el-text>
                </button>
                <samp style="margin: 6px"></samp>
                <button
                  class="btn btn-sm"
                  style="margin: 0px"
                  title="发帖"
                  @click="topublish"
                >
                  <el-icon>
                    <Edit />
                  </el-icon>
                  <el-text v-if="btn">发帖</el-text>
                </button>
              </el-col>
              <el-col :span="24"></el-col>
            </el-row>
          </div>
          <div v-loading="isLoadingList" element-loading-text="加载中">
            <PostListPlate
              v-for="item in outcomeplate"
              :key="item.id"
              :item="item"
              :bbsid="chatid"
              :st="{ postlistseype, shape }"
            />
          </div>
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
import {
  ref,
  toRefs,
  reactive,
  inject,
  watch,
  onMounted,
  onUpdated,
} from "vue";
import type { Ref } from "vue";
import { CSSProperties } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import Method from "@/globalmethods";

import PostListPlate from "./cards/PostListPlate.vue";
/** 帖子列表 */
export default {
  name: "PostPage",

  components: {
    PostListPlate,
  },
  cateId: 0,
  setup() {
    const route = useRoute();
    const router = useRouter();

    const data = reactive({
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
      shape: "square",
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
      plate: [
        {
          /** 帖子id */
          id: 1,
          /** 帖子标题 */
          title: "标题",
          /** 内容摘要 */
          summary: "哈哈哈，这是这个帖子41654616545616856156中的内容66666",
          /** 所有的图片 */
          cover:
            "https://pic1.zhimg.com/v2-11bf3df5dc5706c812a2b71e6ed255b2_r.jpg",
          /** 发帖时间 */
          time: 1688918819,
          /** 点赞 */
          likes: 120,
          /** 评论 */
          comments: 50,
          author: {
            nickname: "酸菜咸鱼",
            headurl: "https://q.qlogo.cn/g?b=qq&nk=3501869534&s=160",
            role: "管理员",
          },
        },
      ],
    });

    let windowwidth = inject<Ref<number>>("windowwidth") as Ref<number>;
    watch(windowwidth, (newValue) => {
      pageup(newValue);
    });

    onMounted(() => {
      data.isLoadingList = true;
      pageup(windowwidth.value);
      Method.api_get(`/bbs/list/${route.params.chatid}`)
        .then((response: any) => {
          data.isLoadingList = false;
          let obj = response.data;
          if (obj.code === 200) {
            obj.data.forEach((el: any) => {
              data.plate.push({
                /** 帖子id */
                id: el.id,
                /** 帖子标题 */
                title: el.title,
                /** 内容摘要 */
                summary: el.summary,
                author: el.author,
                cover: el.cover,
                /** 发帖时间 */
                time: el.time,
                /** 点赞 */
                likes: el.likes,
                /** 评论 */
                comments: el.comments,
              });
            });
          }
        })
        .catch((error) => {
          ElMessage({
            type: "error",
            message: "获取列表失败",
          });
          console.error(error);
        });
    });

    onUpdated(() => {
      console.log("更新组件");
      pageup(windowwidth.value);
    });

    /** 样式调整 */
    function pageup(width: number) {
      console.log(route.params);
      // 打开帖子
      if (route.params.id) {
        if (width <= 720) {
          console.log("打开帖子，小于720");
          data.col = {
            postlist: 0,
            detail: 24,
            placeholder: 0,
          };
          data.btn = true;
          data.inputstyle = {
            width: "calc(100% - 104px)",
          };
        } else if (width > 720 && width <= 900) {
          console.log("打开帖子，大于720，小于1200");
          data.col = {
            postlist: 10,
            detail: 14,
            placeholder: 0,
          };
          data.btn = false;
          data.inputstyle = {
            width: "calc(100% - 104px)",
          };
        } else if (width > 900 && width <= 1200) {
          data.col = {
            postlist: 10,
            detail: 14,
            placeholder: 0,
          };
          data.btn = true;
          data.inputstyle = {
            width: "calc(100% - 176px)",
          };
        } else if (width > 1200) {
          console.log("打开帖子，大于1200");
          data.col = {
            postlist: 10,
            detail: 14,
            placeholder: 0,
          };
          data.btn = true;
          data.inputstyle = {
            width: "calc(100% - 176px)",
          };
        }
      } else {
        // 关闭帖子
        if (width <= 720) {
          console.log("关闭帖子，小于720");
          data.col = {
            postlist: 24,
            detail: 0,
            placeholder: 0,
          };
          data.btn = false;
          data.inputstyle = {
            width: "calc(100% - 104px)",
          };
        } else if (width > 720 && width <= 820) {
          console.log("关闭帖子，大于720，小于820");
          data.col = {
            postlist: 18,
            detail: 0,
            placeholder: 3,
          };
          data.btn = false;
          data.inputstyle = {
            width: "calc(100% - 104px)",
          };
        } else if (width > 820 && width <= 1200) {
          console.log("关闭帖子，大于820，小于1200");
          data.col = {
            postlist: 18,
            detail: 0,
            placeholder: 3,
          };
          data.btn = true;
          data.inputstyle = {
            width: "calc(100% - 176px)",
          };
        } else if (width > 1200) {
          console.log("关闭帖子，大于1200");
          data.col = {
            postlist: 12,
            detail: 0,
            placeholder: 6,
          };
          data.btn = true;
          data.inputstyle = {
            width: "calc(100% - 176px)",
          };
        }
      }
    }

    /** 搜索结果 */
    let outcomeplate = ref(data.plate);

    /** 搜索（本地） */
    function search() {
      console.log(outcomeplate.value);
      outcomeplate.value = data.plate.filter(function (object) {
        return (
          object.title.includes(data.searchinput) ||
          object.summary.includes(data.searchinput)
        );
      });
    }

    /** 发帖 */
    function topublish() {
      router.push({
        path: `/publish/${data.chatid}`,
      });
    }

    return {
      outcomeplate,
      ...toRefs(data),
      search,
      topublish,
    };
  },
};
</script>
