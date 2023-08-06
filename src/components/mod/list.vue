<template>
  <div class="tab-container">
    <el-header class="el-header" style="flex-wrap: wrap">
      <div class="filter-item">
        <mod-flag
            :flag="x.flag_name"
            :active="x.id == activeFlagId"
            :count="x.count"
            v-for="x in mod_flag_list"
            @click="activeFlagId = x.id"
        />
      </div>
    </el-header>
    <el-container class="el-container" v-loading="isLoading">
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
              <div>[{{x.mini_name}}]{{ x.name }}({{x.en_name}})</div>
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
import Cfg from "@/config/config.ts";
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
      activeFlagId:0,
      total: 0,
      page: 1,
      limit: 10,
      list: <any>[],
      mod_flag_list:<any>[],
      search: '',
      isLoading: false,
    }
  },
  methods: {
    pullList() {
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
          this.total = res.sum.total
          let flagSum = <any>res.flag_sum;
          flagSum.forEach((x:any)=>{
            let f = this.mod_flag_list.find((xx:any)=>{return xx.id == x.flag_id;});
            if(f!=null){
              f.count = x.count;
            }
          });
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
    let {
      userInfo: {
        global_mod_data_list: {
          flag_list
        }
      }
    } = Cfg.config
    let mod_flag_list = <any>[{flag_name:'all',count:0,id:0}];
    flag_list.forEach((x:any)=>{
      mod_flag_list.push({flag_name:x.flag_name,count:0,id:x.id});
    });
    this.mod_flag_list = mod_flag_list;
    this.pullList()
    watch(
      () => this.page,
      () => {
        this.pullList()
      },
    );
    watch(()=>this.activeFlagId,()=>{
      this.pullList();
    })
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
