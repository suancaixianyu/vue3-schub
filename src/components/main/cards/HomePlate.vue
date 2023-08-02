<template>
  <el-container class="el-container">
    <div class="left">
      <div class="cate-item">
        <el-button type="primary">发布主题</el-button>
      </div>
      <div class="cate-item" :class="item.id == active_cate_id?'active':''"  v-for="item in cate_list" @click="refreshBbsList(item.id)">
        <el-icon><ChatDotSquare /></el-icon>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <div class="right">
      <div class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact">
        <router-link :to="item.url" v-for="item in bbs_list">
          <BbsItem class="bbs-item" :item="item"></BbsItem>
        </router-link>
      </div>
    </div>
  </el-container>
</template>

<script lang="ts">
import Cfg from "@/config/config"

import Method from "@/globalmethods.ts"
import BbsItem from "@comps/main/bbs/item.vue";
import LikeIcon from "@comps/icons/Like.vue";

//主页卡片，经典
export default {
  name: "HomePlate",
  components: {LikeIcon, BbsItem},
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
  data() {
    return {
      headsize: Cfg.config.homestyle.headsize.post,
      bbs_list:[] as any,
      cate_list:[] as any,
      loadingCate:false,
      loadingBbs:false,
      active_cate_id:0,
      page:1
    }
  },
  methods:{
    refreshBbsList(id:number){
      this.active_cate_id = id;
      this.loadingBbs = true;
      Method.api_get(`/bbs/list/${this.active_cate_id}?page=${this.page}`).then(response2=>{
        this.loadingBbs = false;
        let res2 = response2.data;
        res2.data.forEach((xx:any)=>{
          xx.url = `/postlist/${this.active_cate_id}/${xx.id}`;
        });
        if(res2.code==200){
          this.bbs_list = res2.data;
        }
      });
    }
  },
  created() {
    this.loadingCate = true;
    Method.api_get('/cate/list').then(response=>{
      let res = response.data;
      this.loadingCate = false;
      res.data.forEach((x:any)=>{
        x.url = `/postlist/${x.id}`;
      });
      if(res.code==200){
        this.cate_list = res.data;
      }
      if(res.data.length > 0){
        this.refreshBbsList(res.data[0].id)
      }
    });
  }
}
</script>
<style scoped>
.cate-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding:5px 15px;
  margin-top: 20px;
  color: rgb(102,127,153);
  font-size: 18px;
}
.cate-item.active{
  color: #008ac5;
  border-radius: 0.5rem;
  box-shadow: var(--el-box-shadow-light)
}
.cate-item .name{
  padding-left: 10px;
}
.category-counts li {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}
.left{
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0 15px;
}
.right{
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}
.bbs-item{
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  margin: 10px auto;
  width: 90%;
  max-height: 200px;
  border-radius: var(--rounded-box, 1rem);
  flex-direction: column;
  box-shadow: var(--el-box-shadow-light)
}
.el-container{
  height: inherit;
  overflow: hidden;
}
</style>
