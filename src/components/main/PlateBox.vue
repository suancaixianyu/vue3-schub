<template>
  <div class="categorybox">
    <HomePlate
      v-loading="isLoading"
      v-for="item in plate"
      :key="item.url"
      :item="item"
      :st="{ boxstype, headerstyle, mainstyle, footerstyle }"
    />
    <!-- <HomePlate2 v-for="item in plate" :key="item.url" :item="item"
      :st="{ boxstype, headerstyle, mainstyle, footerstyle }" /> -->
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, onBeforeMount, onBeforeUnmount, watch, inject } from "vue"
import type { Ref } from "vue"
import { catelist, api } from "@/apitypes"
import HomePlate from "./cards/HomePlate.vue"
// import HomePlate2 from "./cards/HomePlate2.vue";
import Cfg from "@/config/config"
import Method from "@/globalmethods"

import { ElMessage } from "element-plus"

/** 首页 */
export default {
  name: "PlateBox",
  components: {
    HomePlate,
    // HomePlate2,
  },
  setup() {
    const data = reactive({
      boxstype: {
        padding: "0px",
        width: "210px",
        overflow: "hidden",
      },
      headerstyle: {
        textAlign: "right",
        height: "20px",
        padding: "0px 12px",
      },
      mainstyle: {
        textAlign: "left",
        minHeight: "130px",
        margin: "5px",
      },
      footerstyle: {
        textAlign: "left",
        backgroundColor: "#ccc",
        padding: "2px 12px",
        height: "40px",
      },
      isLoading: false,
      plate: [
        {
          /** 板块url */
          url: "/postlist/1",
          /** 最新帖子url */
          posturl: "#",
          /** 帖子数量 */
          postnum: 60,
          /** 发表数量 */
          interaction: 150,
          /** 板块标题 */
          title: "板块标题板块标题",
          /** 板块介绍 */
          introduce: "介绍1",
        },
      ],
    })

    let windowwidth = inject<Ref<number>>("windowwidth") as Ref<number>
    let immediate = true

    watch(windowwidth, (newValue, oldValue) => {
      if (immediate) {
        console.log(newValue, oldValue)
        immediate = false
        setTimeout(() => {
          pageWidth(newValue)
          immediate = true
        }, 200)
      }
    })

    // 窗口变化调用
    function pageWidth(clientWidth: number) {
      if (clientWidth <= 480) {
        data.boxstype = {
          padding: "0px",
          width: "40vh",
          overflow: "hidden",
        }
        data.mainstyle = {
          textAlign: "left",
          minHeight: "80px",
          margin: "5px",
        }
      } else {
        data.boxstype = {
          padding: "0px",
          width: "210px",
          overflow: "hidden",
        }
        data.mainstyle = {
          textAlign: "left",
          minHeight: "130px",
          margin: "5px",
        }
      }
    }
    pageWidth(document.body.clientWidth)

    onBeforeUnmount(() => {
      console.log("销毁组件")
    })

    onBeforeMount(() => {
      data.isLoading = true
      // 获取列表
      Method.api_get(`${Cfg.config.server}/cate/list`)
        .then((response: any) => {
          let obj = response.data as api

          data.isLoading = false
          if (obj.code === 200) {
            obj.data.forEach((el: catelist) => {
              data.plate.push({
                url: `/postlist/${el.id}`,
                posturl: "#",
                postnum: el.postnum,
                interaction: el.interaction,
                title: el.name,
                introduce: el.introduce,
              })
            })
          }
        })
        .catch((error: any) => {
          data.isLoading = false
          ElMessage({
            type: "error",
            message: "获取板块列表请求错误",
          })
          console.error(error)
        })
    })

    return {
      data,
      ...toRefs(data),
    }
  },
}
</script>

<style coped>
.category-card {
  margin: 5px;
  background-color: #91cbc9;
}

.category-counts {
  height: 30px;
  display: inline-flex;
  padding-left: 0;
  list-style-type: none;
}

.category-counts li {
  margin: 0px 3px;
}

.categorybox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.topic-title {
  display: inline-flex;
  align-items: center;
}

a {
  text-decoration: none;
}

a:focus {
  outline: none;
}
</style>
