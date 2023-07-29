<template>
  <div
    class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
    :style="st.postlistseype"
  >
    <router-link :to="`/postlist/${bbsid}/${item.id}`">
      <BbsItem :item="item"></BbsItem>
    </router-link>
  </div>
</template>

<script lang="ts">
// 帖子卡片
import BbsItem from "@comps/main/bbs/item.vue"
import Method from "@/globalmethods"
export default {
  name: "PostListPlate",
  components: {
    BbsItem,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    st: {
      type: Object,
      required: true,
    },
    shape: {
      type: String,
      default: "",
    },
    bbsid: {
      type: Array as () => string[] | string,
      default: () => [],
    },
  },
  setup(props) {
    let time = Method.formatBbsTime(props.item.time)
    return {
      time,
    }
  },
}
</script>

<style>
.category-counts li {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}

.user {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.time {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.category-counts {
  height: 30px;
  display: inline-flex;
  padding-left: 0;
  list-style-type: none;
}
</style>
