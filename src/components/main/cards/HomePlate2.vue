<template>
  <div
    class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
    :style="postlistseype"
  ></div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue"

export default {
  name: "HomePlate2",
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
  setup() {
    let data = reactive({
      postlistseype: {
        display: "flex",
        padding: "12px 18px",
        justifyContent: "center",
        margin: "10px",
        width: "90%",
        maxHeight: "200px",
        boxShadow: `var(--el-box-shadow-light)`,
      },
    })
    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped>
.homecard {
  margin: 10px;
  width: 50vh;
  height: 150px;
  background: #ffffff;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url("https://tse3-mm.cn.bing.net/th/id/OIP-C.5helr3rKyvKBZ4smxBLgdgHaNK?pid=ImgDet&rs=1");

  background-size: cover;
}

.card-content {
  padding: 20px;
}

.card-text {
  max-width: 70%;
}

.card-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.card-description {
  font-size: 16px;
}
</style>
