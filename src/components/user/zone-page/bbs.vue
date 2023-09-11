<template>
  <div v-if="set.ismobile">
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      v-for="(x, index) in list"
      v-if="list.length > 0"
      :key="index"
      :style="postliststyle"
    >
      <el-container style="padding: 0">
        <el-aside width="45%" style="padding: 0; word-wrap: break-word">
          <router-link class="title" :to="`/postlist/${x.cate_id}/${x.id}`">
            {{ x.title }}
          </router-link>
        </el-aside>

        <el-main style="padding: 0; overflow-x: hidden">
          <el-row :gutter="5">
            <el-col :span="9">
              <el-text>
                <el-icon> <View /> </el-icon>
                <div>{{ x.views }}</div>
              </el-text>
            </el-col>

            <el-col :span="9">
              <el-text>
                <el-icon> <ChatRound /> </el-icon>
                <div>{{ x.comments }}</div>
              </el-text>
            </el-col>
            <el-col :span="2"> </el-col>

            <el-col :span="2">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon class="numicon">
                    <MoreFilled />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="copyUrl(`/postlist/${x.cate_id}/${x.id}`)"
                      >复制链接</el-dropdown-item
                    >
                    <el-dropdown-item @click="handleModify(x.cate_id, x.id)"
                      >编辑</el-dropdown-item
                    >
                    <el-button
                        size="small"
                        link
                        type="danger"
                        @click="handleLock(index)"
                    >锁定</el-button
                    >
                    <el-dropdown-item divided @click="handleDelete(index)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <div v-else>什么也没有~</div>
  </div>
  <div class="tab-container" v-loading="isLoading" v-else>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column prop="views" label="浏览" width="180" />
      <el-table-column prop="comments" label="评论" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            link
            type="primary"
            @click="
              $router.push(
                '/postlist/' +
                  list[scope.$index].cate_id +
                  '/' +
                  list[scope.$index].id,
              )
            "
            >查看</el-button
          >
          <el-button
            size="small"
            link
            type="primary"
            @click="
              handleModify(list[scope.$index].cate_id, list[scope.$index].id)
            "
            >编辑</el-button
          >
          <el-button
            size="small"
            link
            type="primary"
            @click="
              copyUrl(
                `/postlist/${list[scope.$index].cate_id}/${
                  list[scope.$index].id
                }`,
              )
            "
            >复制链接</el-button
          >
          <el-button
              size="small"
              link
              type="danger"
              @click="handleLock(scope.$index)"
          >锁定</el-button
          >
          <el-button
            size="small"
            link
            type="danger"
            @click="handleDelete(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page"
      background
      :page-size="limit"
      layout="prev, pager, next"
      :total="total"
    />
  </div>
  <dialog-confirm title="提示" @submit="deleteBbs(1)" v-model:visible="isDialogVisible" v-if="operate_type==2" :loading="isDeleting">
        <span>是否删除帖子[ID:{{ activeItem.id }}]
          <span style="color: #008ac5">{{ activeItem.title }}</span>
        </span>
  </dialog-confirm>
  <dialog-confirm title="提示" @submit="deleteBbs(0)" v-model:visible="isDialogVisible" v-if="operate_type==1" :loading="isDeleting">
        <span>是否锁定帖子[ID:{{ activeItem.id }}]
          <span style="color: #008ac5">{{ activeItem.title }}</span>
        </span>
  </dialog-confirm>

</template>
<script lang="ts">
import Method from '@/globalmethods.ts'
import { ElMessage } from 'element-plus'
import Cfg from '@/config/config'
import { watch } from 'vue'
import DialogConfirm from "@comps/dialogs/confirm.vue";

export default {
  name: 'BbsPage',
  components: {DialogConfirm},
  data() {
    return {
      ...Cfg,
      isDeleting: false,
      isDialogVisible: false,
      operate_type:0,
      isLoading: false,
      list: <any>[],
      activeItem: <any>null,
      page: 1,
      limit: 10,
      total: 0,
    }
  },
  methods: {
    copyUrl(url: string) {
      Method.copyText(url)
    },
    handleModify(cate_id: number, id: number) {
      this.$router.push(`/publish/${cate_id}/${id}`)
    },
    handleLock(index: number) {
      this.activeItem = this.list[index];
      this.isDialogVisible = true;
      this.operate_type = 1;
    },
    handleDelete(index: number) {
      this.activeItem = this.list[index];
      this.isDialogVisible = true;
      this.operate_type = 2;
    },
    deleteBbs(type:number) {
      let payLoad = {
        id: this.activeItem.id,
        type:type
      }
      this.isDeleting = true
      Method.api_post(`/bbs/del`, payLoad).then((response: any) => {
        let res = response.data
        this.isDeleting = false
        ElMessage(res.msg)
        if (res.code == 200) {
          this.isDialogVisible = false
          this.refreshList()
        }
      })
    },
    refreshList() {
      this.isLoading = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post(
        `/user/my_bbs_list/${Cfg.userInfo.data.id}`,
        payLoad,
      ).then((response: any) => {
        let res = <res>response.data
        this.isLoading = false
        if (res.code == 200) {
          if (this.page == 1) this.total = res.sum
          res.data.forEach((x: any) => {
            x.create_time = Method.formatNormalTime(x.create_time)
            x.title =
              x.title.length > 20 ? `${x.title.substring(0, 15)}...` : x.title
          })
          this.list = res.data
        } else {
          ElMessage(res.msg)
        }
      })
    },
  },
  mounted() {
    watch(
      () => this.page,
      () => {
        this.refreshList()
      },
    )
    this.refreshList()
  },
}
</script>

<style scoped>
.title {
  display: block;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-icon {
  margin-right: 5px;
}

.numicon {
  padding: 12px 0;
}
</style>
