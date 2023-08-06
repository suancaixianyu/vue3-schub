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
      v-for="x in list"
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
            <el-text>{{ x.name }}</el-text
            ><br />
            <el-text>{{ x.create_time }}</el-text
            ><br />
          </router-link>

          <el-row :gutter="5">
            <el-col :span="10">
              <el-text>
                <el-icon> <View /> </el-icon>{{ x.views_num }}
              </el-text>
            </el-col>

            <el-col :span="10">
              <el-text>
                <el-icon>
                  <svg
                    t="1691048283076"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4474"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z"
                      fill="#5D5D5D"
                      p-id="4475"
                    ></path>
                    <path
                      d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z"
                      fill="#5D5D5D"
                      p-id="4476"
                    ></path>
                    <path
                      d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z"
                      fill="#5D5D5D"
                      p-id="4477"
                    ></path>
                  </svg> </el-icon
                >{{ x.likes_num }}
              </el-text>
            </el-col>

            <el-col :span="10">
              <el-text>
                <el-icon>
                  <svg
                    t="1691047896779"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3474"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M896 704c-17.695686 0-31.99914 14.303454-31.99914 31.99914l0 128L160.00086 863.99914l0-128c0-17.695686-14.336138-31.99914-32.00086-31.99914s-32.00086 14.303454-32.00086 31.99914l0 160.00086c0 17.695686 14.336138 31.99914 32.00086 31.99914l768 0c17.695686 0 32.00086-14.303454 32.00086-31.99914l0-160.00086C928.00086 718.303454 913.695686 704 896 704zM227.579 530.662l259.11 259.293c6.368 6.399 14.689 9.471 22.977 9.408 1.12 0.096 2.08 0.64 3.2 0.64 4.673 0 9.024-1.088 13.024-2.88 4.032-1.536 7.872-3.872 11.137-7.135l259.329-259.124c12.513-12.48 12.544-32.735 0.033-45.248-6.24-6.272-14.432-9.407-22.656-9.408-8.193 0-16.352 3.136-22.624 9.344l-206.24 206.162 0-563.713c0-17.696-14.336-31.999-32.001-31.999s-32.001 14.303-32.001 31.999l0 565.281-207.91-207.74c-6.241-6.272-14.496-9.44-22.688-9.44s-16.32 3.103-22.56 9.311c-12.575 12.449-12.607 32.737-0.127 45.248z"
                      fill="#272636"
                      p-id="3475"
                    ></path>
                  </svg> </el-icon
                >{{ x.downloads_num }}
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
                    <el-dropdown-item @click="copytext(x.id)"
                      >复制链接</el-dropdown-item
                    >
                    <el-dropdown-item @click="manageFileList(x.id, true)"
                      >文件列表</el-dropdown-item
                    >
                    <el-dropdown-item disabled>发布</el-dropdown-item>
                    <el-dropdown-item divided @click="handleDelete(x.id)"
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
      <el-button type="primary" plain @click="goPublish">添加模组</el-button>
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
        <el-table-column prop="create_time" label="上传日期" />
        <el-table-column prop="views_num" label="浏览" />
        <el-table-column prop="downloads_num" label="下载" />
        <el-table-column prop="likes_num" label="点赞" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              link
              @click="copytext(list[scope.$index].id)"
              >复制链接</el-button
            >
            <el-button
              size="small"
              link
              @click="manageFileList(scope.$index, false)"
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
    </el-main>
  </div>
  <el-dialog
    v-model="isDialogVisible"
    title="提示"
    width="30%"
    :fullscreen="set.ismobile"
    align-center
  >
    <span
      >是否删除Mod <span style="color: #008ac5">{{ modName }}</span></span
    >
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

export default {
  name: 'ModPage',
  data() {
    return {
      ...Cfg.config,
      isLoading: false,
      list: [] as any,
      modName: '',
      isDialogVisible: false,
      activeItemIndex: -1,
      isDeleting: false,
    }
  },
  methods: {
    copytext(id: any) {
      Method.copyText(`${window.location.origin}/ModDetail/${id}`)
    },
    deleteMod() {
      this.isDeleting = true
      let item = this.list[this.activeItemIndex]
      Method.api_get(`/mod/delete/${item.id}`).then((response) => {
        let res = response.data
        this.isDeleting = false
        this.isDialogVisible = false
        if (res.code == 200) {
          ElMessage('删除成功')
        } else {
          ElMessage('删除失败')
        }
      })
      this.refreshList()
    },
    manageFileList(index: number, isModId: boolean) {
      if (isModId) {
        this.$router.push(`/ModFiles/${index}`)
      } else {
        this.activeItemIndex = index
        let modId = this.list[index].id
        this.$router.push(`/ModFiles/${modId}`)
      }
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
      Method.api_get(`/user/my_mod_list/1`).then((response: any) => {
        let res = response.data
        this.isLoading = false
        if (res.code == 200) {
          res.data.forEach((x: any) => {
            x.create_time = Method.formatNormalTime(x.create_time)
            x.downloads_num = Method.getNumber(x.downloads)
            x.views_num = Method.getNumber(x.views)
            x.likes_num = Method.getNumber(x.likes)
          })
          this.list = res.data
        } else {
          ElMessage(res.msg)
        }
      })
    },
  },
  created() {
    this.refreshList()
  },
}
</script>
<style scoped>
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
