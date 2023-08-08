<template>
  <el-container  v-if="set.ismobile">
    <el-col class="el-main v">
      <div class="cate-list mobile">
        <el-button type="info" @click="topicPublish">发布主题</el-button>
        <div class="list">
          <el-button v-for="item in cate_list" @click="active_cate_id = item.id">
            <el-icon>
              <ChatDotSquare />
            </el-icon>
            <div class="name">{{ item.name }}</div>
          </el-button>
        </div>
      </div>
      <!-- 帖子列表 -->
      <div class="bbs-list mobile">
        <PostPage @itemClickEvent="onBbsItemClick" :chatid="active_cate_id" />
      </div>
    </el-col>
  </el-container>
  <el-container v-else>
    <el-main>
      <!-- 板块列表 -->
      <div class="cate-list" :class="isBbsView?'':'active'">
        <div class="cate-item">
          <el-button type="info" @click="topicPublish">发布主题</el-button>
        </div>
        <div class="container">
          <div class="cate-item" :class="item.id == active_cate_id ? 'active' : ''" v-for="item in cate_list"
               @click="refreshBbsList(item.id)">
            <el-icon>
              <ChatDotSquare />
            </el-icon>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <!-- 帖子列表 -->
      <div class="bbs-list" :class="isBbsView?'item-active':'item-detach'">
        <PostPage @itemClickEvent="onBbsItemClick" :chatid="active_cate_id" />
      </div>
      <!--帖子详情-->
      <div class="bbs-detail" :class="isBbsView?'active':''">
        <DetailPlate v-if="isBbsView"  @closeEvent="onBbsItemClose" :id="activeBbsItem.id" :item="activeBbsItem" ></DetailPlate>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {
  inject,
  watch
} from 'vue'
import type { Ref } from 'vue'
import Cfg from '@/config/config'
import Method from '@/globalmethods.ts'
import LikeIcon from '@comps/icons/Like.vue'
import PostPage from '@comps/main/PostPage.vue'
import BbsItem from "@comps/main/bbs/item.vue";
import DetailPlate from "@comps/main/cards/DetailPlate.vue";

//主页卡片，经典
export default {
  name: 'HomePlate',
  components: {DetailPlate, BbsItem, LikeIcon, PostPage },
  data(){
    return {
      set:Cfg.set,
      isBbsView:false,
      activeBbsItem:<any>null,
      headsize: Cfg.config.homestyle.headsize.post,
      bbs_list: [] as any,
      cate_list: [] as any,
      loadingCate: false,
      loadingBbs: false,
      active_cate_id: 1,
      page: 1,
      col: {
        left: 5,
        rigth: 19,
      }
    }
  },
  methods:{
    topicPublish(){
      console.log(122)
      this.$router.push(`/publish/${this.active_cate_id}`)
    },
    onBbsItemClose(){
      this.isBbsView = false;
      this.activeBbsItem = null;
    },
    onBbsItemClick(item:any){
      this.isBbsView = true;
      this.activeBbsItem = item;
    },
    refreshBbsList(id: number) {
      this.active_cate_id = id
      this.loadingBbs = true
      Method.api_get(`/bbs/list/${this.active_cate_id}?page=${this.page}`).then(
          (response2) => {
            this.loadingBbs = false
            let res2 = response2.data
            res2.data.forEach((xx: any) => {
              xx.url = `/left/${this.active_cate_id}/${xx.id}`
            })
            if (res2.code == 200) {
              this.bbs_list = res2.data
            }
          },
      )
    },
    refreshCateList(){
      this.loadingCate = true
      Method.api_get('/cate/list').then((response) => {
        let res = response.data
        this.loadingCate = false
        res.data.forEach((x: any) => {
          x.url = `/left/${x.id}`
        })
        if (res.code == 200) {
          this.cate_list = res.data
        }
        if (res.data.length > 0) {
          this.active_cate_id = res.data[0].id
        }
      })
    },
    pageup(width: number) {
      let route = this.$route;
      // 打开帖子
      if (route.params.id) {
        if (width <= 720) {
          this.set.showheader = false
          this.col = {
            left: 0,
            rigth: 24,
          }
        } else if (width > 720 && width <= 900) {
          this.set.showheader = false
          this.col = {
            left: 0,
            rigth: 24,
          }
        } else if (width > 900 && width <= 1200) {
          this.set.showheader = false
          this.col = {
            left: 10,
            rigth: 14,
          }
        } else if (width > 1200) {
          this.set.showheader = false
          this.col = {
            left: 10,
            rigth: 14,
          }
        }
      } else {
        // 关闭帖子
        if (width <= 720) {
          this.set.showheader = true
          this.col = {
            left: 0,
            rigth: 24,
          }
        } else if (width > 720 && width <= 820) {
          this.set.showheader = false
          this.col = {
            left: 7,
            rigth: 16,
          }
        } else if (width > 820 && width <= 1200) {
          this.set.showheader = false
          this.col = {
            left: 6,
            rigth: 17,
          }
        } else if (width > 1200) {
          this.set.showheader = false
          this.col = {
            left: 5,
            rigth: 18,
          }
        }
      }
    }
  },
  created(){
    let windowwidth = inject<Ref<number>>('windowwidth') as Ref<number>
    watch(windowwidth, (newValue) => {
      this.pageup(newValue)
    })
    this.pageup(windowwidth.value)
    this.refreshCateList();
  },
  mounted(){
    Cfg.config.homestyle.maincontainer.padding = '0 0.5rem';
  },
  unmounted(){
    Cfg.config.homestyle.maincontainer.padding = '0 18px';
  }
}
</script>
<style scoped>
.el-main{
  display: flex;
  flex-direction: row;
}
.el-main.v{
  display: flex;
  flex-direction: column;
}
.el-col{transition: all .3s}
.cate-list,.bbs-list,.bbs-detail{
  transition: all .3s;
  display: flex;
  flex-direction: column;
}
.cate-list{
  width: 0%;
  padding: 0 10px;
  overflow: hidden;
}
.cate-list.mobile{
  width: auto;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  padding: 10px;
  height: 50px;
}
.cate-list.mobile .el-button{
  width: max-content;
}
.cate-list.mobile .list{
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  flex: 1;
  height: inherit;
  margin-left: 10px;
}
.cate-list.active{
  width: 230px;
}
.cate-list .container{
  min-width: 230px;
  overflow: hidden;
  padding: 0 10px;
}
.bbs-list{
  overflow: hidden;
}
.bbs-list.mobile{
  flex: 1;
}
.bbs-list.item-active{
  width: 35%;
}
.bbs-list.item-detach{
  width: 50%;
}
.bbs-detail{
  overflow: hidden;
  width: 0%;
}
.bbs-detail.active{
  width: 65%;
}

.cate-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0 10px 20px;
  margin: 10px;
  color: rgb(102, 127, 153);
  font-size: 18px;
}

.cate-item.active {
  color: #008ac5;
  border-radius: 0.5rem;
  box-shadow: var(--el-box-shadow-light);
}

.cate-item .name {
  padding-left: 10px;
}

.category-counts li {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}

.left {
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0 15px;
}

.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}

.bbs-item {
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  margin: 10px auto;
  width: 90%;
  max-height: 200px;
  border-radius: var(--rounded-box, 1rem);
  flex-direction: column;
  box-shadow: var(--el-box-shadow-light);
}

.el-container {
  height: inherit;
  overflow: hidden;
}

.el-main {
  padding: 0
}
</style>
