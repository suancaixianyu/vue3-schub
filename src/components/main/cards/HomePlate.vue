<template>
  <div class="category-card" :style="st.boxstype">
    <el-container>
      <router-link :underline="false" :to="item.url">
        <!-- 头部，帖子数量 -->
        <el-header :style="st.headerstyle">
          <ul class="category-counts">
            <li>
              <el-text class="mx-1" title="帖子数量">
                <el-icon>
                  <Edit />
                </el-icon>
                {{ item.postnum }}
              </el-text>
            </li>
            <li>
              <el-text class="mx-1" title="发言数">
                <el-icon>
                  <EditPen />
                </el-icon>
                {{ item.interaction }}
              </el-text>
            </li>
          </ul>
        </el-header>
        <!-- 中部，板块标题，介绍 -->
        <el-main :style="st.mainstyle">
          <el-text :style="`font-size: var(--el-font-size-large)`">{{
            item.title
          }}</el-text>
          <br />
          <el-text :style="`font-size: var(--el-font-size-base)`">{{
            item.introduce
          }}</el-text>
        </el-main>
      </router-link>
      <!-- 底部，头像，最新帖子 -->
      <el-footer :style="st.footerstyle">
        <div class="topic-title">
          <el-avatar
            :src="item.userhead"
            :size="28"
            style="margin: 5px 5px 5px 0px"
          />
          <el-link :underline="false" :href="item.posturl">{{
            item.toptitle
          }}</el-link>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
//主页卡片，经典
export default {
  name: "HomePlate",
  props: {
    item: {
      type: Object,
      required: true,
    },
    st: {
      type: Object,
      required: true,
    },
  },
};
</script>
