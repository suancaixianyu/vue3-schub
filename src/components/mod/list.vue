<template>
  <div class="tab-container">
    <el-header class="el-header" style="flex-wrap: wrap">
      <div class="filter-item hide-scrollbar" ref="flagContainer">
        <router-link to="/ModPublish/0" style="margin-left: 0.5rem">
          <el-button
            type="primary"
            icon="Plus"
            circle
            style="width: 1.5rem; height: 1.5rem"
          />
        </router-link>
        <mod-flag
          :flag="x.flag_name"
          :active="x.id == activeFlagId"
          :count="x.count"
          v-for="x in mod_flag_list"
          @click="onFlagClick(x.id)"
        />
      </div>
      <el-input
        v-model="search"
        placeholder="搜索资源"
        class="input-with-select"
      >
        <template #append>
          <el-button icon="Search" @click="pullList" />
        </template>
      </el-input>
    </el-header>
    <el-container class="el-container" v-loading="isLoading">
      <div v-if="set.ismobile" v-for="x in list" style="margin: 0.5rem">
        <div class="res-item">
          <router-link :to="x.to_link">
            <div class="right" v-if="x.cover_src">
              <el-image
                style="width: 128px; height: 96px"
                :src="x.cover_src"
                fit="contain"
              />
            </div>
          </router-link>

          <div class="left">
            <router-link :to="x.to_link">
              <div class="flag-area hide-scrollbar">
                <!-- <mod-flag
                  class="flag"
                  :flag="xx.flag_name"
                  active
                  v-for="xx in x.flag_list"
                /> -->
              </div>
              <div class="name-line">
                <div>
                  {{ x.mini_name ? `[${x.mini_name}]` : '' }}{{ x.name
                  }}{{ x.en_name ? `(${x.en_name})` : '' }}
                </div>
              </div>
              <div class="description-line">{{ x.description }}</div>
            </router-link>
            <div style="height: 100%"></div>

            <div class="btn-line">
              <div class="item">
                <icon-hot :size="18"></icon-hot>
                <div class="hot">{{ x.views }}</div>
              </div>
              <div class="item">
                <el-button
                  link
                  :style="{ color: like == 0 ? '' : '#FD70A1' }"
                  @click="doLike"
                >
                  <like-icon :size="24"></like-icon>
                  {{ x.likes }}
                </el-button>
              </div>
              <div class="item">
                <icon-down :size="18"></icon-down>
                <div class="down">{{ x.downloads }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-link
        v-else
        :to="x.to_link"
        v-for="x in list"
        style="margin: 0.5rem"
      >
        <div class="res-item">
          <div class="right" v-if="x.cover_src">
            <el-image
              style="width: 128px; height: 96px"
              :src="x.cover_src"
              fit="contain"
            />
          </div>
          <div class="left">
            <div class="name-line">
              <!-- <mod-flag
                class="flag"
                :flag="xx.flag_name"
                active
                v-for="xx in x.flag_list"
              /> -->
              {{ x.mini_name ? `[${x.mini_name}]` : '' }}{{ x.name
              }}{{ x.en_name ? `(${x.en_name})` : '' }}
            </div>
            <div class="description-line">{{ x.description }}</div>
            <div style="height: 100%"></div>
            <div class="btn-line">
              <el-button link>
                <icon-hot :size="18"></icon-hot>
                <div class="hot">{{ x.views }}</div>
              </el-button>
              <div class="item">
                <el-button
                  link
                  :style="{ color: like == 0 ? '' : '#FD70A1' }"
                  @click="doLike"
                >
                  <like-icon :size="24"></like-icon>
                  {{ x.likes }}
                </el-button>
              </div>
              <div class="item">
                <icon-down :size="18"></icon-down>
                <div class="down">{{ x.downloads }}</div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </el-container>

    <el-pagination
      v-if="set.ismobile"
      layout="prev, pager, next"
      :current-page="page"
      :page-size="10"
      :pager-count="5"
      :total="total"
      @current-change="handleCurrentChange"
      style="justify-content: center; margin: 0.5rem 0"
    />
    <el-pagination
      v-else
      :current-page="page"
      :page-size="10"
      :pager-count="5"
      :total="total"
      @current-change="handleCurrentChange"
      style="justify-content: center; margin: 0.5rem 0"
    />
  </div>
</template>

<script lang="ts">
import { Grid } from '@element-plus/icons-vue'
import IconTechnology from '@comps/icons/mod/technology.vue'
import IconMagic from '@comps/icons/mod/magic.vue'
import IconAdventure from '@comps/icons/mod/adventure.vue'
import IconAgriculture from '@comps/icons/mod/agriculture.vue'
import IconLibrary from '@comps/icons/mod/library.vue'
import ScLogo from '@comps/icons/ScLogo.vue'
import IconServer from '@comps/icons/mod/server.vue'
import ModFlag from '@comps/mod/flag.vue'
import IconHot from '@comps/icons/common/hot.vue'
import LikeIcon from '@comps/icons/Like.vue'
import IconDown from '@comps/icons/common/down.vue'
import Method from '@/globalmethods'
import { watch } from 'vue'
import Cfg from '@/config/config.ts'
export default {
  name: 'ModList',
  components: {
    IconDown,
    LikeIcon,
    IconHot,
    ModFlag,
    IconServer,
    ScLogo,
    IconLibrary,
    IconAgriculture,
    IconAdventure,
    IconMagic,
    IconTechnology,
    Grid,
  },
  data() {
    return {
      set: Cfg.set,
      activeFlagId: 0,
      total: 0,
      page: 1,
      limit: 10,
      list: <any>[],
      animateTimerId: <any>0,
      mod_flag_list: <any>[],
      search: '',
      isLoading: false,
      like: 0,
    }
  },
  methods: {
    doLike() {},
    /**指定页面加载 */
    handleCurrentChange(page: any) {
      this.page = page // 更新当前页码
      this.pullList(true)
    },
    onFlagClick(id: any) {
      let c = <HTMLDivElement>this.$refs.flagContainer
      this.activeFlagId = id
      let f = this.mod_flag_list.find((x: any) => {
        return x.id == id
      })
      if (f != null) {
        let index = this.mod_flag_list.indexOf(f)
        let e = c.children[index]
        let cb = c.getBoundingClientRect()
        let b = e.getBoundingClientRect()
        let w = cb.right - cb.left //滚动容器宽度
        let wc = cb.left + w / 2 //中心点位置
        let w2 = b.right - b.left //单项的宽度
        let w2c = b.left + w2 / 2 //中心点位置
        let start = c.scrollLeft
        let end = c.scrollLeft + (w2c - wc)
        let frameCount = 50 //0.1s
        if (end > 0) {
          let each = (end - start) / frameCount
          let position = start
          let times = 0
          //逐渐滚动到这个位置实现
          if (this.animateTimerId > 0) {
            clearInterval(this.animateTimerId)
          }
          this.animateTimerId = setInterval(() => {
            c.scrollLeft = position
            position += each
            times++
            if (times > frameCount) {
              clearInterval(this.animateTimerId)
            }
          }, 1)
        } else {
          c.scrollLeft = 0
        }
      }
    },
    /**
     * 加载列表
     * @param isNext 是否为翻页
     */
    pullList(isNext: boolean = false) {
      let payLoad = {
        page: this.page,
        limit: this.limit,
        search: this.search,
        flag_filter: this.activeFlagId,
      }
      this.isLoading = true
      Method.api_post('/mod/list', payLoad).then((response) => {
        let res = response.data
        this.isLoading = false
        if (res.code == 200) {
          if (!isNext) this.total = res.sum.total
          let flagSum = <any>res.flag_sum
          flagSum.forEach((x: any) => {
            let f = this.mod_flag_list.find((xx: any) => {
              return xx.id == x.flag_id
            })
            if (f != null) {
              f.count = x.count
            }
          })
          // 显示全部tag时屏蔽服务器
          let shield = (x: any) => /10/.test(x.flag_list) == false
          if (this.activeFlagId == 0) res.data = res.data.filter(shield)

          res.data.forEach((x: any) => {
            x.likes = Method.getNumber(<number>x.likes)
            x.downloads = Method.getNumber(<number>x.downloads)
            x.views = Method.getNumber(<number>x.views)
            x.to_link = `/ModDetail/${x.id}`
            x.flag_list = Method.decodeFlagList(x.flag_list)
            x.description =
              x.description.length > 80
                ? x.description.substring(0, 80) + '...'
                : x.description
            if (x.cover_src) x.cover_src = Method.getHostUrl(x.cover_src)
          })
          this.list = res.data
        }
      })
    },
  },
  created() {
    let {
      userInfo: {
        global_mod_data_list: { flag_list },
      },
    } = Cfg
    let mod_flag_list = <any>[{ flag_name: 'all', count: 0, id: 0 }]
    flag_list.forEach((x: any) => {
      mod_flag_list.push({ flag_name: x.flag_name, count: 0, id: x.id })
    })
    this.mod_flag_list = mod_flag_list
    watch(
      () => this.activeFlagId,
      () => {
        this.pullList()
      },
    )
  },
  unmounted() {
    if (this.animateTimerId > 0) {
      clearInterval(this.animateTimerId)
    }
  },
  mounted() {
    this.pullList()
  },
}
</script>
<style scoped>
.tab-container {
  height: inherit;
  display: flex;
  flex-direction: column;
}

.filter-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px 0;
  overflow: auto;
}

.filter-item.active {
  font-weight: bold;
}

.el-header {
  background: #fff;
  margin: 10px 0;
  border-radius: 5px;
  border-bottom: 1px solid #eee;
  align-items: center;
  display: flex;
  height: auto;
  padding: 0;
}
.input-with-select {
  margin: 0 0.5rem;
}

.el-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.res-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 0.5rem;
}

.res-item .name-line {
  display: flex;
  flex-direction: row;
  color: #008ac5;
}

.res-item .name-line:hover {
  color: #333;
}

.res-item .description-line {
  font-size: 12px;
}

.res-item .btn-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
  color: #98a0aa;
  align-items: center;
  font-size: 12px;
}

.res-item .left {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.res-item .right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.res-item .right .img {
  width: 128px;
  height: 96px;
}

.res-item .btn-line .hot {
  color: #e85353;
}

.res-item .btn-line .like {
  color: #98a0aa;
}

.res-item .btn-line .down {
  color: #008ac5;
}

.res-item .btn-line .item {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 5px;
}

.res-item .flag-area {
  display: flex;
  flex-direction: row;
  overflow: auto;
}
</style>
