<template>
  <div class="tab-container">
    <el-header class="el-header" style="flex-wrap: wrap">
      <div class="filter-item active">
        <el-icon>
          <Grid />
        </el-icon>
        <div>全部(0)</div>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <icon-technology></icon-technology>
            </el-icon>
            科技(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <icon-magic></icon-magic>
            </el-icon>
            魔法(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <icon-adventure></icon-adventure>
            </el-icon>
            冒险(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <icon-agriculture></icon-agriculture>
            </el-icon>
            农业(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <icon-library></icon-library>
            </el-icon>
            Lib(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <sc-logo></sc-logo>
            </el-icon>
            世界(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <sc-logo></sc-logo>
            </el-icon>
            方块材质(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <sc-logo></sc-logo>
            </el-icon>
            皮肤(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <sc-logo></sc-logo>
            </el-icon>
            家具包(0)
          </el-text>
        </el-tag>
      </div>
      <div class="filter-item">
        <el-tag>
          <el-text type="primary">
            <el-icon>
              <sc-logo></sc-logo>
            </el-icon>
            服务器(0)
          </el-text>
        </el-tag>
      </div>
    </el-header>
    <el-container class="el-container">
      <router-link :to="x.to_link" v-for="x in list">
        <div class="res-item">
          <div class="right">
            <img class="img" :src="x.cover_src" />
          </div>
          <div class="left">
            <div class="name-line">
              <div class="flag-area">
                <mod-flag
                  class="flag"
                  :flag="xx.flag_name"
                  active
                  v-for="xx in x.flag_list"
                />
              </div>
              <div>[工业2]{{ x.name }}(Industrial II)</div>
            </div>
            <div class="description-line">{{ x.description }}</div>
            <div class="btn-line">
              <div class="item">
                <icon-hot :size="18"></icon-hot>
                <div class="hot">{{ x.views }}</div>
              </div>
              <div class="item">
                <like-icon :size="24"></like-icon>
                <div class="like">{{ x.likes }}</div>
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
      layout="prev, pager, next, total"
      :total="total"
      v-model="page"
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
      total: 0,
      page: 1,
      limit: 10,
      list: [] as any[],
      search: '',
      flag_filter: 0,
      isLoading: false,
    }
  },
  methods: {
    pullList() {
      let payLoad = {
        page: this.page,
        limit: this.limit,
        search: this.search,
        flag_filter: this.flag_filter,
      }
      this.isLoading = true
      Method.api_post('/mod/list', payLoad).then((response) => {
        let res = response.data
        this.isLoading = false
        if (res.code == 200) {
          this.total = res.sum.total
          res.data.forEach((x: any) => {
            x.to_link = `/ModDetail/${x.id}`
            x.flag_list = Method.decodeFlagList(x.flag_list)
          })
          if (this.page == 1) this.list = res.data
          else this.list = this.list.concat(res.data)
        }
      })
    },
  },
  created() {
    this.pullList()
    watch(
      () => this.page,
      () => {
        this.pullList()
      },
    )
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
  margin: 4px 0px;
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
  margin: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
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
  font-size: 10px;
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
}
</style>
