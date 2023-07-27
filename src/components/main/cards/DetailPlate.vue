<template>
  <div v-loading="isLoading">
    <div
      v-if="width === 'pc'"
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact plate-body"
    >
      <div class="common-layout">
        <el-container>
          <!-- 头部 -->
          <el-header style="padding: 0px">
            <!-- 顶部按钮 -->
            <el-row :gutter="24">
              <el-col
                :span="24"
                style="display: flex; justify-content: flex-end"
              >
                <el-icon @click="flushed" :size="25" title="刷新" class="icon">
                  <Flushed />
                </el-icon>
                <el-icon
                  @click="copytext"
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
            </el-row>
            <UserHead
              :item="{
                headurl: content.author.headurl,
                nickname: content.author.nickname,
                time: content.time,
                role: content.author.role,
                shape,
                size,
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              }"
              style="padding-left: 10px"
            />
          </el-header>
          <!-- 内容 -->
          <el-main>
            <!-- 帖子内容展示 -->
            <MdPreview :modelValue="content.content" class="bg-base-100" />
            <!-- 分割线 -->
            <label class="plate-label">
              <div class="large">评论</div>
              <div class="small">{{ sum.total }}</div>
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
            </label>
            <!-- 个人评论区 -->
            <div class="reply-body">
              <!-- 发表评论 -->
              <div class="post-area">
                <el-avatar
                  :src="content.author.headurl"
                  :shape="shape"
                  :size="size"
                  style="margin-right: 12px"
                />
                <el-input
                  v-model="comments"
                  autosize
                  type="textarea"
                  placeholder="发表评论"
                />
                <el-button icon="Edit" :loading="isReplying" @click="doReply"
                  >发表</el-button
                >
              </div>
              <!-- 回复列表 -->
              <div v-loading="isLoadingReply">
                <OneReply
                  v-for="x in reply_list"
                  :key="x."
                  :x="{ ...x, shape, size }"
                  @refreshEvent="refresh_reply_list"
                />
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>

    <!-- 移动端 -->
    <div v-if="width === 'mobile'">
      <el-container>
        <!-- 头部 -->
        <el-header style="padding: 0px">
          <!-- 顶部按钮 -->
          <el-row :gutter="24" style="padding: 0px">
            <el-col :span="24" style="display: flex; justify-content: flex-end">
              <el-icon @click="flushed" :size="25" title="刷新" class="icon">
                <Flushed />
              </el-icon>
              <el-icon
                @click="copytext"
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
          </el-row>
          <UserHead
            :item="{
              ...content.author,
              time: '发布于：' + formatTimestamp(content.time),
              shape,
              size,
              style: {
                flexDirection: 'row',
                alignItems: 'center',
              },
            }"
            style="padding-left: 10px"
          />
        </el-header>
        <!-- 内容 -->
        <el-main style="padding: 0px">
          <MdPreview :modelValue="markdown" class="bg-base-100" />
          <!-- <div v-html="markdown" class="markdown-body" style="background-color: transparent;"></div> -->
          <hr />
          <div class="reply-body">
            <!-- 功能键 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Your bio</span>
                <span class="label-text-alt">Alt label</span>
              </label>
              <el-input
                class="bg-base-200"
                v-model="comments"
                autosize
                type="textarea"
                placeholder="发表评论"
              />
              <label class="label">
                <span class="label-text-alt">Your bio</span>
                <span class="label-text-alt">Alt label</span>
              </label>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
// 帖子详情卡片
import { reactive, toRefs, onUpdated, onBeforeMount, inject, watch } from "vue";
import type { Ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import Flushed from "@/components/icons/Flushed.vue";
import UserHead from "@/components/parts/UserHead.vue";
import OneReply from "@/components/parts/OneReply.vue";

import Method from "@/globalmethods";
import Cfg from "@/config/config";

import { MdPreview } from "md-editor-v3";

export default {
  name: "DetailPlate",
  components: {
    Flushed,
    UserHead,
    MdPreview,
    OneReply,
  },
  setup() {
    // const md = new MarkdownIt();
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      isLoading: false,
      isReplying: false,
      replyType: 0, //0对帖子1对评论
      comments: "",
      width: "pc",
      markdown: '```js \n console.log("hello world!") \n```',
      shape: "square",
      size: 28,
      chatid: route.params.chatid,
      id: route.params.id,
      url: route.fullPath,
      isLoadingReply: false,
      page: 1,
      limit: 10,
      sort: 0, //0最新1最热
      sum: {
        total: 0,
      },
      content: {
        title: "标题",
        likes: 666,
        dislikes: 666,
        comments: 123,
        time: 1689087371,
        content: "帖子完整内容",
        author: {
          nickname: "酸菜咸鱼",
          headurl: "https://q.qlogo.cn/g?b=qq&nk=3501869534&s=160",
          role: "管理员",
        },
      },
      reply_list: [] as Array<object>,
    });

    function refresh_item() {
      data.isLoading = true;
      if (route.params.id == null) return;
      Method.axios
        .get(`${Cfg.config.server}/bbs/item/${route.params.id}`)
        .then((res: any) => {
          let item = res.data.data;
          item.time = Method.formatBbsTime(item.time);
          item.author.headurl = Method.getHostUrl(item.author.headurl);
          data.content = item;
          /** 获取帖子的评论 */
          refresh_reply_list();
        })
        .catch((error: any) => {
          ElMessage({
            type: "error",
            message: "详情获取失败，请点击刷新按钮重试",
          });
          console.error(error);
        });
    }
    /**
     * 获取帖子的回复列表
     */
    function refresh_reply_list() {
      let { page, limit, sort } = data;
      data.isLoadingReply = true;
      Method.axios
        .get(
          `${Cfg.config.server}/bbs/reply_list/${route.params.id}?page=${page}&limit=${limit}&sort=${sort}`,
        )
        .then((res: { data: { data: any; sum: { total: number } } }) => {
          data.isLoading = false;
          let list = res.data.data;
          function formatList(l: any[]) {
            l.forEach(
              (xl: {
                time: any;
                author: { headurl: string };
                children: any;
              }) => {
                xl.time = Method.formatBbsTime(xl.time);
                xl.author.headurl = Method.getHostUrl(xl.author.headurl);
                formatList(xl.children);
              },
            );
          }
          formatList(list);
          data.reply_list = list;
          if (data.page === 1) {
            data.sum.total = res.data.sum.total;
          }
          data.isLoadingReply = false;
        })
        .catch((error: { message: any }) => {
          ElMessage({
            type: "error",
            message: "评论获取失败，请点击刷新按钮重试",
          });
          console.error(error.message);
        });
    }

    function sortByTime() {
      data.sort = 0;
      data.page = 1;
      refresh_reply_list();
    }
    function sortByHot() {
      data.sort = 1;
      data.page = 1;
      refresh_reply_list();
    }
    let windowwidth = inject<Ref<number>>("windowwidth") as Ref<number>;

    watch(windowwidth, (newValue) => {
      pagewidth(newValue);
    });
    //监听路由数据变化
    watch(
      () => route.params,
      () => {
        refresh_item();
      },
      { immediate: true },
    );

    function pagewidth(width: number) {
      if (width <= 480) {
        data.width = "mobile";
      } else {
        data.width = "pc";
      }
    }
    onUpdated(() => {
      pagewidth(windowwidth.value);
    });

    onBeforeMount(() => {
      pagewidth(windowwidth.value);
    });
    function flushed() {
      router.replace({
        path: route.path,
        force: true,
      });
    }

    async function copytext() {
      try {
        await navigator.clipboard.writeText(window.location.href);
        ElMessage({
          message: "链接已复制",
          type: "success",
        });
      } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = window.location.href;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        ElMessage({
          message: "链接已复制",
          type: "success",
        });
      }
    }

    function message() {
      ElMessage("this is a message.");
    }

    function close() {
      router.push({ name: "PostPage", params: { id: data.id } });
    }

    function formatTimestamp(timestamp: number) {
      return Method.formatBbsTime(timestamp);
    }

    function doReply() {
      if (data.comments === "") return ElMessage("评论内容不可为空");
      data.isReplying = true;
      let bid = route.params.id;
      Method.axios
        .post(`${Cfg.config.server}/bbs/reply`, {
          content: data.comments,
          bid: bid,
        })
        .then((response: { data: { code: number } }) => {
          data.isReplying = false;
          if (response.data.code == 200) {
            data.isLoadingReply = true;
            data.comments = "";
            refresh_reply_list(); //刷新评论
            ElMessage("评论成功");
          } else {
            ElMessage("评论失败");
          }
        });
    }
    return {
      ...toRefs(data),
      message,
      close,
      copytext,
      flushed,
      sortByTime,
      sortByHot,
      doReply,
      formatTimestamp,
      refresh_reply_list,
    };
  },
};
</script>

<style>
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
  margin: 20px 5px;
  height: calc(100vh - 130px);
  overflow-y: auto;
}

.reply-body {
  display: flex;
  padding: 12px 18px;
  justify-self: center;
  flex-direction: column;
  margin: 20px 5px;
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
</style>
