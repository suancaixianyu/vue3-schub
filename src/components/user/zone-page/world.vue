<template>
  <div v-if="set.ismobile">
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      v-for="(x, index) in list"
      :key="index"
      :style="homestyle.postliststyle"
    >
      <el-container style="padding: 0px">
        <el-aside width="30%" style="padding: 0px; word-wrap: break-word">
          {{ x.type_name }}
        </el-aside>
        <el-main style="padding: 0px; overflow-x: hidden">
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
  </div>
</template>

<script lang="ts">
import Method from '@/globalmethods.ts'
import { ElMessage } from 'element-plus'
import Cfg from '@/config/config'

export default {
  name: 'WorldPage',
  data() {
    return {
      ...Cfg.config,
      isLoading: false,
      list: [] as any[],
      activeItemIndex: -1,
    }
  },
  methods: {
    handleDelete(index: number) {
      this.activeItemIndex = index
      ElMessage('暂不支持')
    },
  },
  created() {
    this.isLoading = true
    Method.api_get(`/user/my_world_list/1`).then((response: any) => {
      let res = response.data
      this.isLoading = false
      if (res.code == 200) {
        res.data.forEach((x: any) => {
          x.create_time = Method.formatNormalTime(x.create_time)
          x.type_name = Method.getScTypeName(x.file_type)
          x.file_size = Method.getFileSize(x.size)
        })
        this.list = res.data
      } else {
        ElMessage(res.msg)
      }
    })
  },
}
</script>

<style scoped>
.el-icon {
  margin-right: 5px;
}

.numicon {
  padding: 12px 0px;
}
</style>
