<template>
  <div v-if="set.ismobile">
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      :style="homestyle.postliststyle"
    >
      <el-button type="primary" plain @click="goPublish">添加模组</el-button>
    </div>
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      v-for="(x, index) in list"
      :key="x.id"
      :style="homestyle.postliststyle"
    >
      <el-container style="padding: 0">
        <el-aside
          width="30%"
          style="padding: 5px; word-wrap: break-word; overflow-y: hidden"
        >
          <router-link :to="`/ModDetail/${x.id}`">
            <el-image
              style="width: 100%; height: 100%"
              :src="x.cover_src"
              fit="cover"
            />
          </router-link>
        </el-aside>
        <el-main style="padding: 0 0 0 5px; overflow-x: hidden">
          <router-link :to="`/ModDetail/${x.id}`">
            <el-text>
              {{ x.name }}
            </el-text>
            <el-tag size="small" :type="x.stat_data.type">
              {{ x.stat_data.name }}
            </el-tag>
            <br />
            <el-text>
              {{ x.create_time }}
            </el-text>
            <br />
          </router-link>

          <el-row :gutter="5">
            <el-col :span="10">
              <el-text>
                <el-icon :size="16" class="icons">
                  <View />
                </el-icon>
                {{ x.views }}
              </el-text>
            </el-col>

            <el-col :span="10">
              <el-text>
                <el-icon :size="16" class="icons">
                  <Like />
                </el-icon>
                {{ x.likes }}
              </el-text>
            </el-col>

            <el-col :span="10">
              <el-text>
                <el-icon :size="16" class="icons">
                  <svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M896 704c-17.695686 0-31.99914 14.303454-31.99914 31.99914l0 128L160.00086 863.99914l0-128c0-17.695686-14.336138-31.99914-32.00086-31.99914s-32.00086 14.303454-32.00086 31.99914l0 160.00086c0 17.695686 14.336138 31.99914 32.00086 31.99914l768 0c17.695686 0 32.00086-14.303454 32.00086-31.99914l0-160.00086C928.00086 718.303454 913.695686 704 896 704zM227.579 530.662l259.11 259.293c6.368 6.399 14.689 9.471 22.977 9.408 1.12 0.096 2.08 0.64 3.2 0.64 4.673 0 9.024-1.088 13.024-2.88 4.032-1.536 7.872-3.872 11.137-7.135l259.329-259.124c12.513-12.48 12.544-32.735 0.033-45.248-6.24-6.272-14.432-9.407-22.656-9.408-8.193 0-16.352 3.136-22.624 9.344l-206.24 206.162 0-563.713c0-17.696-14.336-31.999-32.001-31.999s-32.001 14.303-32.001 31.999l0 565.281-207.91-207.74c-6.241-6.272-14.496-9.44-22.688-9.44s-16.32 3.103-22.56 9.311c-12.575 12.449-12.607 32.737-0.127 45.248z"
                      fill="#272636"
                    ></path>
                  </svg>
                </el-icon>
                {{ x.downloads }}
              </el-text>
            </el-col>

            <el-col :span="11"> </el-col>

            <el-col :span="2">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon class="numicon">
                    <MoreFilled />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="copyText(index)"
                      >复制链接</el-dropdown-item
                    >
                    <el-dropdown-item @click="manageFileList(index)"
                      >文件列表</el-dropdown-item
                    >
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
  <div class="tab-container" v-else>
    <el-header class="el-header">
      <el-button type="primary" plain @click="goPublish">添加资源</el-button>
    </el-header>
    <el-main style="padding: 0; width: 100%">
      <el-table :data="list" stripe style="width: 100%" v-loading="isLoading">
        <el-table-column prop="cover_src" label="封面" width="180">
          <template #default="scope">
            <el-avatar
              :src="scope.row.cover_src"
              shape="square"
              disable-transitions
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="create_time_str" label="上传日期" />
        <el-table-column prop="views" label="浏览" />
        <el-table-column prop="downloads" label="下载" />
        <el-table-column prop="likes" label="点赞" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag size="small" :type="list[scope.$index].stat_data.type">
              {{ list[scope.$index].stat_data.name }}
            </el-tag>
            <el-popover
              placement="top-start"
              title="原因"
              :width="200"
              trigger="hover"
              :content="list[scope.$index].reason"
            >
              <template #reference>
                <el-tag
                  size="small"
                  v-if="list[scope.$index].stat == 3"
                  type="danger"
                  >审核未通过</el-tag
                >
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" link @click="copyText(scope.$index)"
              >复制链接</el-button
            >
            <el-button
              size="small"
              type="success"
              link
              @click="manageFileList(scope.$index)"
              >文件列表</el-button
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
        class="el-pagination"
        v-model:current-page="page"
        background
        :page-size="limit"
        :pager-count="8"
        layout="prev, pager, next"
        :total="total"
      />
    </el-main>
  </div>
  <el-dialog
    v-model="isDialogVisible"
    title="提示"
    width="30%"
    :fullscreen="set.ismobile"
    align-center
  >
    <div>
      是否删除资源 <span style="color: #008ac5">{{ modName }}</span
      >?
    </div>
    <el-text type="danger">注意：其下所有文件也会被删除!!!!</el-text>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteMod" :loading="isDeleting">
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
import Like from '@comps/icons/Like.vue'
import { watch } from 'vue'
import '@/components/admin/index.ts'

export default {
  name: 'ModPage',
  components: {
    Like,
  },
  data() {
    return {
      ...Cfg.config,
      set: Cfg.set,
      isLoading: false,
      list: <modItem[]>[],
      modName: '',
      isDialogVisible: false,
      activeItemIndex: -1,
      isDeleting: false,
      page: 1,
      limit: 10,
      total: 0,
    }
  },
  methods: {
    copyText(index: number) {
      let item = this.list[index]
      Method.copyText(`${window.location.origin}/ModDetail/${item.id}`)
    },
    deleteMod() {
      this.isDeleting = true
      let item = this.list[this.activeItemIndex]
      console.log(item.id)
      Method.api_get(`/mod/delete/${item.id}`)
        .then((response) => {
          let res = <res>response.data
          this.isDeleting = false
          this.isDialogVisible = false
          if (res.code == 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
          } else {
            ElMessage({
              type: 'error',
              message: `删除失败：${res.msg}`,
            })
          }
        })
        .catch(() => {
          this.isDeleting = false
          ElMessage({
            type: 'error',
            message: `删除失败：请求错误`,
          })
        })
      this.refreshList()
    },
    manageFileList(index: number) {
      this.activeItemIndex = index
      let modId = this.list[index].id
      this.$router.push(`/ModFiles/${modId}`)
    },
    handleDelete(index: number) {
      this.activeItemIndex = index
      this.isDialogVisible = true
      this.modName = this.list[index].name
    },
    goPublish() {
      this.$router.push({ name: 'ModPublish' })
    },
    refreshList() {
      this.isLoading = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post(
        `/user/my_mod_list/${Cfg.userInfo.data.id}`,
        payLoad,
      ).then((response: any) => {
        let res = response.data
        this.isLoading = false
        if (res.code == 200) {
          if (this.page == 1) this.total = res.sum
          res.data.forEach((x: modItem) => {
            x.create_time_str = Method.formatNormalTime(<number>x.create_time)
            x.downloads = Method.getNumber(<number>x.downloads)
            x.views = Method.getNumber(<number>x.views)
            x.likes = Method.getNumber(<number>x.likes)
            x.cover_src = Method.getHostUrl(x.cover_src)
            x.stat_data = Method.getStat(<number>x.stat)
          })
          this.list = res.data
        } else {
          ElMessage(res.msg)
        }
      })
    },
  },
  mounted() {
    this.refreshList()
    watch(
      () => this.page,
      () => {
        this.refreshList()
      },
    )
  },
}
</script>
<style scoped>
.icons {
  display: inline-flex;
  align-items: center;
}
.el-header {
  padding-top: 20px;
  border-bottom: 1px solid #eee;
}
.el-icon {
  margin-right: 5px;
}
.numicon {
  padding: 12px 0;
}
</style>
