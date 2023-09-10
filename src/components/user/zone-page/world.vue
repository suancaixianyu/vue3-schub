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
        <el-aside width="30%" style="padding: 0; word-wrap: break-word">
          {{ x.type_name }}
        </el-aside>
        <el-main style="padding: 0; overflow-x: hidden">
          <el-text>{{ x.name }}</el-text
          ><br />
          <el-text>{{ x.create_time }}</el-text
          ><br />
          <el-row :gutter="5">
            <el-col :span="12">
              <el-text>
                <el-icon> <Document /> </el-icon>{{ x.file_size }}
              </el-text>
            </el-col>

            <el-col :span="8"> </el-col>

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
                    <el-dropdown-item>下架</el-dropdown-item>
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
    <div v-else>什么也没有~</div>
  </div>
  <div class="tab-container" v-loading="isLoading" v-else>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="type_name" label="类型" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="file_size" label="文件大小" />
      <el-table-column prop="create_time" label="上传日期" />
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
      class="el-pagination"
      v-model:current-page="page"
      background
      :page-size="limit"
      layout="prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script lang="ts">
import Method from '@/globalmethods.ts'
import { ElMessage } from 'element-plus'
import Cfg from '@/config/config'
import { watch } from 'vue'
import { api } from '@/apitypes'

export default {
  name: 'WorldPage',
  data() {
    return {
      ...Cfg,
      isLoading: false,
      list: [] as any[],
      page: 1,
      limit: 10,
      total: 0,
    }
  },
  methods: {
    handleDelete(index: number) {
      Method.api_post('/bbs/del', { id: index }).then((res: any) => {
        let obj = res.data as api
        if (obj.code == 200) {
          ElMessage({
            type: 'success',
            message: obj.msg,
          })
          this.refreshList()
        } else {
          ElMessage({
            type: 'error',
            message: obj.msg,
          })
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
        `/user/my_world_list/${Cfg.userInfo.data.id}`,
        payLoad,
      ).then((response: any) => {
        let res = response.data
        this.isLoading = false
        if (res.code == 200) {
          res.data.forEach((x: any) => {
            x.create_time = Method.formatNormalTime(x.create_time)
            x.type_name = Method.getScTypeName(x.file_type)
            x.file_size = Method.getFileSize(x.size)
          })
          if (this.page == 1) this.total = res.sum
          this.list = res.data
        } else {
          ElMessage(res.msg)
        }
      })
    },
  },
  mounted() {
    this.page = 1
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
.el-icon {
  margin-right: 5px;
}

.numicon {
  padding: 12px 0;
}
</style>
