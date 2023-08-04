<template>
  <div v-if="set.ismobile">
    <div
      class="card w-96 bg-base-100 shadow-xl --el-box-shadow-lighter card-compact"
      v-for="(x, index) in list"
      :key="index"
      :style="homestyle.postliststyle"
    >
      <el-container style="padding: 0px">
        <el-aside width="45%" style="padding: 0px; word-wrap: break-word">
          {{ x.title }}
        </el-aside>
        <el-main style="padding: 0px; overflow-x: hidden">
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
  </div>
</template>
<script lang="ts">
import Method from '@/globalmethods.ts'
import { ElMessage } from 'element-plus'
import Cfg from '@/config/config'

export default {
  name: 'BbsPage',
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
    Method.api_get(`/user/my_bbs_list/1`).then((response: any) => {
      let res = response.data
      this.isLoading = false
      if (res.code == 200) {
        res.data.forEach((x: any) => {
          x.create_time = Method.formatNormalTime(x.create_time)
        })
        this.list = res.data
        ElMessage(`${this.set.ismobile}`)
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
