<template>
  <div
    v-if="set.ismobile"
    class="bbs-list mobile"
    :style="{ display: showlist }"
  >
    <PostPage />
  </div>
  <div
    v-else
    class="bbs-list"
    :class="isBbsView ? 'item-active' : 'item-detach'"
  >
    <PostPage />
  </div>

  <!--帖子详情-->
  <div class="bbs-detail mobile" :class="isBbsView ? 'active' : ''">
    <router-view />
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import PostPage from '@comps/main/PostPage.vue'
import Cfg from '@/config/config'
export default {
  name: 'HomeLeft',
  data() {
    return {
      isBbsView: false,
      set: Cfg.set,
      showlist: '',
    }
  },
  components: {
    PostPage,
  },
  mounted() {
    watch(
      () => this.$route.params,
      () => {
        if (this.$route.params.id) {
          this.isBbsView = true
          this.showlist = 'none'
        } else {
          this.isBbsView = false
          this.showlist = ''
        }
      },
      { immediate: true },
    )
  },
}
</script>

<style scoped>
.cate-list,
.bbs-list,
.bbs-detail {
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.bbs-detail {
  overflow: hidden;
  width: 0%;
}

.bbs-detail.active {
  width: 65%;
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
  width: 80%;
}

.bbs-detail.active {
  width: 65%;
}

.bbs-detail.active.mobile {
  width: 100%;
  height: 100%;
}

.bbs-list.item-active {
  width: 50%;
}

.cate-list.active {
  width: 230px;
}

.cate-list .el-button.active {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
  outline: 0;
}
</style>
