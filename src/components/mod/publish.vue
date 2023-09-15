<template>
  <el-container class="el-container">
    <el-form class="el-form">
      <el-tabs type="border-card" v-model="activeTab" class="demo-tabs">
        <el-tab-pane label="基本信息" name="base">
          <el-form-item label="资源标签*">
            <mod-flag
              :flag="x.flag_name"
              :active="x.active"
              @click="x.active = !x.active"
              v-for="x in mod_flag_list"
            />
          </el-form-item>
          <el-form-item label="资源名称*">
            <el-input v-model="name" />
          </el-form-item>
          <el-form-item label="英文名称*">
            <el-input v-model="en_name" />
          </el-form-item>
          <el-form-item label="资源简称*">
            <el-input v-model="mini_name" />
          </el-form-item>
          <el-form-item label="游戏API*">
            <el-radio-group>
              <el-checkbox
                v-model="x.active"
                :key="x"
                :label="x.name"
                v-for="x in api_version_list"
              />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="游戏主体*">
            <el-radio-group>
              <el-checkbox
                v-model="x.active"
                :key="x"
                :label="x.name"
                v-for="x in game_version_list"
              />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="服务器版本*" v-if="mod_flag_list[9]?.active">
            <el-radio-group>
              <el-checkbox
                v-model="x.active"
                :key="x"
                :label="x.name"
                v-for="x in server_version_list"
              />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="作者/团队">
            <div v-for="x in mod_author" :key="x">
              <el-avatar :src="x.avatar" />
            </div>
            <el-button
              size="small"
              type="primary"
              text
              icon="Plus"
              @click="openDialog = true"
            >
              添加作者
            </el-button>

            <el-dialog
              v-model="openDialog"
              title="添加团队成员"
              :draggable="true"
              :fullscreen="set.ismobile"
            >
              <div v-for="(x, i) in mod_author" :key="x">
                <el-row :gutter="20">
                  <el-col :span="4">
                    <el-avatar :src="x.avatar" />
                  </el-col>
                  <el-col :span="10">
                    <el-select
                      :automatic-dropdown="true"
                      v-model="x.type"
                      :loading="isLoading"
                      placeholder="搜索昵称以选择作者"
                      @focus="authorFocus(x)"
                      remote
                      filterable
                      @change="authorChange"
                      :remote-method="searchUser"
                    >
                      <el-option
                        :label="r.nickname"
                        :value="r.id"
                        :key="r.id"
                        v-for="r in mod_author_list"
                      />
                    </el-select>
                  </el-col>

                  <el-col :span="10">
                    <el-input v-model="x.staff" placeholder="请输入职位名称" />
                  </el-col>

                  <el-col :span="6">
                    <el-button
                      type="primary"
                      icon="Minus"
                      text
                      @click="deleteAuthor(i)"
                      :data-index="i"
                      >删除</el-button
                    >
                  </el-col>
                </el-row>
              </div>

              <el-button
                size="small"
                type="primary"
                text
                icon="Plus"
                @click="newAuthor"
                >添加作者</el-button
              >
            </el-dialog>
          </el-form-item>

          <el-form-item label="相关链接">
            <el-button
              size="small"
              type="primary"
              text
              icon="Plus"
              @click="openDialogLink = true"
            >
              添加链接
            </el-button>
            <el-dialog
              v-model="openDialogLink"
              title="添加相关链接"
              :draggable="true"
              :fullscreen="set.ismobile"
            >
              <div v-for="(x, i) in link" :key="x">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-select v-model="x.type" placeholder="选择渠道">
                      <el-option
                        :label="r.name"
                        :value="r.id"
                        v-for="r in mod_link_type"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="16">
                    <el-input placeholder="请输入链接/url" v-model="x.src" />
                  </el-col>
                  <el-col :span="5">
                    <el-button
                      type="primary"
                      icon="Minus"
                      text
                      @click="deleteLink(i)"
                      :data-index="i"
                      >删除</el-button
                    >
                  </el-col>
                </el-row>
              </div>
              <el-button
                size="small"
                type="primary"
                text
                icon="Plus"
                @click="newLink"
                >添加链接</el-button
              >
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submit"
              :loading="isCreating"
              v-if="modId == 0"
              :disabled="!userInfo.isLogin"
              >创建</el-button
            >
            <el-button
              type="primary"
              @click="submit"
              :loading="isCreating"
              v-if="modId > 0"
              >修改</el-button
            >
            <el-button plain>取消</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="扩展信息" name="extra">
          <el-form-item label="资源包名*">
            <el-input v-model="package_id" />
          </el-form-item>
          <el-form-item label="资源封面*">
            <el-input disabled v-model="cover" class="el-input" />
            <el-upload
              :action="uploadServer"
              v-model="cover_list"
              :with-credentials="true"
              :show-file-list="false"
              :on-success="uploadCover"
              accept="image/png, image/jpeg"
            >
              <el-button type="primary" :disabled="!userInfo.isLogin"
                >上传</el-button
              >
            </el-upload>
          </el-form-item>
          <el-form-item label="资源介绍*">
            <MdEditor
              editorId="modEditor"
              :preview="!set.ismobile"
              v-model="desc"
              @onUploadImg="UploadImage"
            />
          </el-form-item>
          <el-form-item label="资源关系*" v-if="!set.ismobile">
            <div class="flex v">
              <el-card v-for="(x, i) in relation" :key="x">
                <template #header>
                  <el-form-item label="需要条件*">
                    <el-input v-model="x.condition" placeholder=">=API1.5" />
                    <el-button
                      size="small"
                      type="primary"
                      text
                      icon="Minus"
                      @click="deleteRelation(i)"
                      >删除本组</el-button
                    >
                  </el-form-item>
                </template>
                <div class="flex" v-for="(xx, ii) in x.list" :key="xx">
                  <el-select
                    remote
                    :loading="remoteLoading"
                    :remote-method="getModList"
                    v-model="xx.package_id"
                    filterable
                    remote-show-suffix
                    placeholder="选择资源ID"
                  >
                    <el-option
                      :label="xxx.label"
                      :key="xxx.value"
                      :value="xxx.value"
                      v-for="xxx in relate_mod_list"
                    ></el-option>
                  </el-select>
                  <el-select v-model="xx.type" placeholder="选择关系">
                    <el-option
                      :label="r.name"
                      :value="r.id"
                      v-for="r in relate_type_list"
                    />
                  </el-select>
                  <el-button
                    type="primary"
                    icon="Minus"
                    text
                    @click="deleteRelationDetail(i, ii)"
                    :data-index="ii"
                    >删除</el-button
                  >
                </div>
                <div>
                  <el-button
                    size="small"
                    type="primary"
                    text
                    icon="Plus"
                    @click="newRelation(i)"
                    >添加关系</el-button
                  >
                </div>
              </el-card>
              <div>
                <el-button
                  size="small"
                  type="primary"
                  text
                  icon="Plus"
                  @click="newGroupRelation"
                  >添加一组</el-button
                >
              </div>
            </div>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-container>
</template>

<script lang="ts">
import Method from '@/globalmethods'
import Cfg from '@/config/config'
import ModFlag from '@comps/mod/flag.vue'
import { ElMessage } from 'element-plus'
import { MdEditor } from 'md-editor-v3'
/** md编辑器 */
import 'md-editor-v3/lib/style.css'
import { api } from '@/apitypes'
interface modItem {
  label: string
  value: string
}
export default {
  name: 'ModPublish',
  components: {
    ModFlag,
    MdEditor,
  },
  data() {
    return {
      openDialogLink: false,
      openDialog: false,
      modId: 0,
      ...Cfg,
      uploadServer: `${Cfg.config.server}/Upload/Upload`,
      cover_list: [],
      en_name: '',
      mini_name: '',
      isCreating: false,
      cover: '',
      activeTab: 'base',
      name: '',
      packageName: '',
      desc: '',
      mod_flag_list: <any>[],
      mod_link_type: <any>[],
      mod_author: <any>[],
      isLoading: false,
      activeAuthor: <any>null,
      mod_author_list: <any>[],
      relate_type_list: <any>[],
      game_version_list: <any>[],
      api_version_list: <any>[],
      server_version_list: <any>[],
      relation: <any>[],
      link: <any>[],
      activeFlags: <boolean[]>[],
      package_id: '',
      remoteLoading: false,
      relate_mod_list: <modItem[]>[],
    }
  },
  methods: {
    getModList(query?: string) {
      let payLoad = {
        page: 1,
        limit: 10,
        search: query,
        flag_filter: 0,
      }
      this.remoteLoading = true
      Method.api_post(`/mod/list`, payLoad).then((response) => {
        this.remoteLoading = false
        let res = response.data
        if (res.code == 200) {
          this.relate_mod_list = []
          res.data.forEach((x: any) => {
            this.relate_mod_list.push({ label: x.name, value: x.id })
          })
        }
      })
    },
    uploadCover(e: any) {
      this.cover = e.data.src
    },
    newLink() {
      this.link.push({ src: '', type: '' })
    },
    deleteLink(e: number) {
      this.link.splice(e, 1)
    },
    newAuthor() {
      this.mod_author.push({ uid: '', staff: '', avatar: '' })
    },
    deleteAuthor(e: number) {
      this.mod_author.splice(e, 1)
    },
    newGroupRelation() {
      this.getModList()
      this.relation.push({ condition: '', list: [] })
    },
    newRelation(i: number) {
      this.relation[i].list.push({ package: '', type: '' })
    },
    deleteRelation(index: number) {
      this.relation.splice(index, 1)
    },
    deleteRelationDetail(index: number, index2: number) {
      this.relation[index].list.splice(index2, 1)
    },
    authorFocus(e: any) {
      this.activeAuthor = e
    },
    authorChange(e: any) {
      let id = e
      let item = this.mod_author_list.find((x: any) => {
        return x.id == id
      })
      if (item != null) {
        this.activeAuthor.avatar = item.avatar
        this.activeAuthor.uid = item.id
      }
    },
    searchUser(e: any) {
      this.isLoading = true
      Method.api_post('/mod/search_user', { key: e }).then((response) => {
        let res = <res>response.data
        this.isLoading = false
        if (res.code == 200) {
          this.mod_author_list = res.data
        }
      })
    },
    submit() {
      let activeFlagId = <any>[]
      let activeApiId = <any>[]
      let activeGameId = <any>[]
      let activeServerId = <any>[]
      this.mod_flag_list.forEach((x: any) => {
        if (x.active) activeFlagId.push(x.id)
      })
      this.game_version_list.forEach((x: any) => {
        if (x.active) activeGameId.push(x.id)
      })
      this.api_version_list.forEach((x: any) => {
        if (x.active) activeApiId.push(x.id)
      })
      this.server_version_list.forEach((x: any) => {
        if (x.active) activeServerId.push(x.id)
      })

      let payLoad = {
        name: this.name,
        en_name: this.en_name,
        mini_name: this.mini_name,
        cover: this.cover,
        link: JSON.stringify(this.link),
        desc: this.desc,
        relation: JSON.stringify(this.relation),
        api_version: JSON.stringify(activeApiId),
        game_version: JSON.stringify(activeGameId),
        server_version: JSON.stringify(activeServerId),
        mod_author: JSON.stringify(this.mod_author),
        flag: JSON.stringify(activeFlagId),
        package_id: this.package_id,
        id: this.modId,
      }
      this.isCreating = true
      Method.api_post('/mod/add', payLoad).then((res) => {
        this.isCreating = false
        if (res.data.code == 200) {
          ElMessage(this.modId > 0 ? '修改成功' : '创建成功')
          this.$router.back()
        } else {
          ElMessage(res.data.data)
        }
      })
    },
    async UploadImage(file: any) {
      let url = await Method.UploadImage(file)
      if (url) {
        this.desc += url
      }
    },
  },
  mounted() {
    this.searchUser('')
    let {
      userInfo: {
        global_mod_data_list: {
          flag_list,
          link_type,
          relate_type,
          api_version,
          game_version,
          server_version_list,
        },
      },
    } = Cfg
    this.api_version_list = Method.copyObject(api_version)
    this.game_version_list = Method.copyObject(game_version)
    this.relate_type_list = Method.copyObject(relate_type)
    this.mod_link_type = Method.copyObject(link_type)
    this.mod_flag_list = Method.copyObject(flag_list)
    this.server_version_list = Method.copyObject(server_version_list)
    Cfg.maincontainer.overflowY = 'auto'
    let p = <any>this.$route.params
    this.modId = p.id
    if (this.modId > 0) {
      this.isLoading = true
      Method.api_get(`/mod/item/${this.modId}`)
        .then((response) => {
          let res = response.data as api
          if (res.code == 200) {
            this.isLoading = false
            let modInfo = res.data.mod

            let authorList = res.data.author_list
            authorList.forEach((x: any) => {
              x.id = x.uid
            })
            this.mod_author_list = authorList
            this.mod_author = authorList

            this.cover = modInfo.cover_src
            this.desc = modInfo.description
            this.package_id = modInfo.package_id

            this.relation = Method.decodeRelationList(res.data.relation)
            this.relation.forEach((x: any) => {
              x.list.forEach((xp: any) => {
                let f = this.relate_mod_list.find((p: any) => {
                  return p.value == xp.package_id
                })
                if (f == null)
                  this.relate_mod_list.push({
                    label: xp.package_name,
                    value: xp.package_id,
                  })
              })
            })
            this.link = Method.decodeLinkList(modInfo.link_list)
            let flagList = Method.decodeFlagList(modInfo.flag_list)
            flagList.forEach((x: any) => {
              let d = this.mod_flag_list.find((xx: any) => {
                return xx.id == x.id
              })
              if (d != null) d.active = true
              else d.active = false
            })

            let apiList = Method.decodeApiVersionList(modInfo.api_list)
            apiList.forEach((x: any) => {
              let d = this.api_version_list.find((xx: any) => {
                return xx.id == x.id
              })
              if (d != null) d.active = true
              else d.active = false
            })

            let gameList = Method.decodeGameVersionList(modInfo.game_list)
            gameList.forEach((x: any) => {
              let d = this.game_version_list.find((xx: any) => {
                return xx.id == x.id
              })
              if (d != null) d.active = true
              else d.active = false
            })
            this.name = modInfo.name
            this.mini_name = modInfo.mini_name
            this.en_name = modInfo.en_name
          } else {
            ElMessage({
              type: 'error',
              message: res.msg,
            })
            this.isLoading = false
          }
        })
        .catch((err) => {
          ElMessage({
            type: 'error',
            message: `请求出错：${err.message}`,
          })
        })
    }
  },
  unmounted() {
    Cfg.maincontainer.overflowY = 'hidden'
  },
}
</script>
<style scoped>
.el-col {
  padding: 0 0.5rem;
}

.el-form {
  width: inherit;
}

.el-container {
  width: 100%;
  margin-top: 20px;
}

.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  padding: 5px 0;
}

.flex.v {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.el-input {
  flex: 1;
}
</style>
