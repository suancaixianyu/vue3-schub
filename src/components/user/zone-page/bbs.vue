<template>
  <div v-if="set.ismobile">
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      v-for="(x, index) in list"
      :key="index"
      :style="homestyle.postliststyle"
    >
      <el-container style="padding: 0">
        <el-aside width="45%" style="padding: 0; word-wrap: break-word">
          <router-link class="title" to="/postlist/1/71">
            {{ x.title }}
          </router-link>
        </el-aside>

        <el-main style="padding: 0; overflow-x: hidden">
          <el-row :gutter="5">
            <el-col :span="9">
              <el-text>
                <el-icon> <View /> </el-icon>{{ x.views }}
              </el-text>
            </el-col>

            <el-col :span="9">
              <el-text>
                <el-icon> <ChatRound /> </el-icon>{{ x.comments }}
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
                    <el-dropdown-item>复制链接</el-dropdown-item>
                    <el-dropdown-item>编辑</el-dropdown-item>
                    <el-dropdown-item disabled>发布</el-dropdown-item>
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

  <el-dialog
    v-model="isDialogVisible"
    title="提示"
    width="30%"
    :fullscreen="set.ismobile"
    align-center
  >
    <span
      >是否删除帖子[ID:{{ activeItem.id }}]
      <span style="color: #008ac5">{{ activeItem.title }}</span></span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteBbs" :loading="isDeleting">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import Method from '@/globalmethods.ts'
import { ElMessage } from 'element-plus'
import Cfg from '@/config/config'
import { watch } from 'vue'

export default {
  name: 'BbsPage',
  data() {
    return {
      ...Cfg.config,
      set: Cfg.set,
      isDeleting: false,
      isDialogVisible: false,
      isLoading: false,
      list: <any>[],
      activeItem: <any>null,
      page: 1,
      limit: 10,
      total: 0,
    }
  },
  methods: {
    handleDelete(index: number) {
      this.activeItem = this.list[index]
      this.isDialogVisible = true
    },
    deleteBbs() {
      let payLoad = {
        id: this.activeItem.id,
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
    watch(()=>this.page,()=>{
      this.refreshList();
    })
    this.refreshList();
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
