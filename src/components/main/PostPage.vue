<template>
  <div class="bbs-window">
    <!-- 头部搜索框 -->
    <div class="card w-96 bg-base-100 shadow-xl card-compact search-header" :class="set.ismobile?'mobile':''">
      <div class="container">
        <input v-model="searchinput" type="search" placeholder="搜索" class="item input input-bordered input-sm"/>
        <button class="btn btn-sm item" @click="search" title="搜索">
          <el-icon>
            <Search />
          </el-icon>
          <el-text v-if="btn">搜索</el-text>
        </button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="bbs-list hide-scrollbar" ref="container" v-loading="isLoadingList" element-loading-text="加载中">
      <div v-infinite-scroll="loadMore" :infinite-scroll-distance="20" :infinite-scroll-immediate="false" :infinite-scroll-disabled="disableloading">
        <div v-for="item in plate">
          <div class="card w-96 bg-base-100 shadow-xl card-compact item-header"  :class="set.ismobile?'mobile':''">
            <BbsItem :item="item" @click="onItemClick(item)"></BbsItem>
          </div>
        </div>
        <div class="load-more" v-if="set.ismobile">
          <el-button :loading="isLoadingList" type="primary" @click="loadMore" v-html="txt"></el-button>
        </div>
      </div>
    </div>
    <div v-if="!set.ismobile" class="card w-96 bg-base-100 shadow-xl search-header card-compact hidden-xs-only">
      <el-pagination :current-page="pagenum" :page-size="10" :pager-count="5" :total="total"
                     @current-change="handleCurrentChange" style="justify-content: center">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  watch
} from 'vue'
import { CSSProperties } from 'vue'
import { ElMessage } from 'element-plus'
import Method from '@/globalmethods'
import Cfg from '@/config/config'
import PostListPlate from './bbs/list.vue'
import BbsItem from "@comps/main/bbs/item.vue";
/** 帖子列表 */
export default {
  name: 'PostPage',
  components: {
    BbsItem,
    PostListPlate,
  },
  props: ['chatid'],
  data(){
    return {
      set:Cfg.set,
      disableloading: true, // 禁用加载
      pagenum: 1, // 页码
      total: 125, // 总帖子数
      totalpages: 2, // 总页数
      isLoadingList: false,
      btn: true,
      searchinput: '',
      inputstyle: {
        width: 'calc(100% - 176px)',
      } as CSSProperties,
      colstype: {
        padding: '0',
      } as CSSProperties,
      shape: Cfg.set.shape,
      postliststyle: Cfg.config.homestyle.postliststyle,
      windowseype: {
        padding: '10px',
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
      } as CSSProperties,
      col: {
        /** 列表宽度 */
        postlist: 24,
        /** 详情页宽度 */
        detail: 8,
      },
      plate: <any[]>[],
      txt:'加载更多'
    }
  },
  methods:{
    onItemClick(item:any){
      this.$emit('itemClickEvent',item);
    },
    /**指定页面加载 */
    handleCurrentChange(page: any) {
      this.pagenum = page // 更新当前页码
      this.listUpdate(this.chatid, page)
    },
    /**无限滚动加载 */
    loadMore() {
      if (this.pagenum + 1 <= this.totalpages) {
        this.pagenum++
        this.listUpdate(this.chatid, this.pagenum, true)
        this.txt = '加载更多'
      } else {
        this.txt = '到底了~'
      }
    },
    /**
     * 列表刷新
     * @param id
     * @param page
     * @param appendMode true 追加数据 false 刷新数据
     */
    listUpdate(id: any, page: any, appendMode: boolean = false) {
      Method.api_get(`/bbs/list/${id}?page=${page}`)
          .then((response: any) => {
            this.isLoadingList = false
            let obj = response.data
            if (obj.code === 200) {
              const scrollElement = <any>this.$refs.container;
              // 获取总帖子数量
              this.total = obj.sum.total
              let a = Math.ceil(obj.sum.total / 10)
              this.totalpages = a
              // 更新列表
              if (appendMode){
                let list = this.plate;
                obj.data.forEach((el: any) => {
                  list.push(el)
                });
                scrollElement.scrollTop = scrollElement.scrollHeight
              }else{
                let list = <any>[];
                obj.data.forEach((el: any) => {
                  list.push(el)
                });
                this.plate = list;
                scrollElement.scrollTop = 0
              }
            }
          })
          .catch((error) => {
            this.isLoadingList = false
            ElMessage({
              type: 'error',
              message: '获取列表失败',
            })
            console.error(error)
          })
    },
    /** 样式调整 */
    pageup() {

    },
    /** 搜索（本地） */
    search() {
    }
  },
  created(){
    watch(()=>this.chatid,()=>{
      this.listUpdate(this.chatid, this.pagenum);
    })
    this.listUpdate(this.chatid, this.pagenum);
  }
}
</script>

<style scoped>
.bbs-list{
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
  box-shadow: var(--el-box-shadow-light);
}
.bbs-window{
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
.item-header{
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  margin: 10px 50px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--rounded-btn);
}
.item-header.mobile{
  margin: 10px;
}
.search-header{
  height: 60px;
  display: flex;
  flex-direction: row;
  padding: 12px 18px;
  margin: 10px 50px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--rounded-btn);
}
.search-header.mobile{
  margin: 10px;
}
.search-header .container{
  display: flex;
  flex-direction: row;
  flex: 1;
}
.search-header .container .input{
  overflow: hidden;
  flex: 1;
}
.search-header .container .item{
  margin: 0 6px;
}
.load-more{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}
</style>
