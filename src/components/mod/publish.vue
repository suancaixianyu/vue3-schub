<template>
  <el-container class="el-container">
    <el-form class="el-form">
      <el-tabs type="border-card" v-model="activeTab" class="demo-tabs">
        <el-tab-pane label="基本信息" name="base">
          <el-form-item label="资源元素*">
            <mod-flag :flag="x.flag_name" :active="x.active" @click="x.active = !x.active" v-for="x in mod_flag_list" />
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
              <el-checkbox v-model="x.active" :key="x" :label="x.name" v-for="x in api_version_list" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="游戏主体*">
            <el-radio-group>
              <el-checkbox v-model="x.active" :key="x" :label="x.name" v-for="x in game_version_list" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="服务器版本*" v-if="mod_flag_list[9].active">
            <el-radio-group>
              <el-checkbox v-model="x.active" :key="x" :label="x.name" v-for="x in server_version_list" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="相关链接">
            <div class="flex v">
              <div class="flex" v-for="(x, i) in link" :key="x">
                <el-select v-model="x.type" placeholder="选择渠道">
                  <el-option :label="r.name" :value="r.id" v-for="r in mod_link_type" />
                </el-select>
                <el-input v-model="x.src" />
                <el-button type="primary" icon="Minus" text @click="deleteLink(i)" :data-index="i">删除</el-button>
              </div>
              <div>
                <el-button size="small" type="primary" text icon="Plus" @click="newLink">添加链接</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit" :loading="isCreating">创建</el-button>
            <el-button plain>取消</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="扩展信息" name="extra">
          <el-form-item label="资源包名*">
            <el-input v-model="package_id" />
          </el-form-item>
          <el-form-item label="资源封面*">
            <el-input disabled v-model="cover" class="el-input" />
            <el-upload :action="uploadServer" v-model="cover_list" :with-credentials="true" :show-file-list="false"
              :on-success="uploadCover">
              <el-button type="primary">上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="资源介绍*">
            <el-input v-model="desc" type="textarea" />
          </el-form-item>
          <el-form-item label="资源关系*">
            <div class="flex v">
              <el-card v-for="(x, i) in relation" :key="x">
                <template #header>
                  <el-form-item label="需要条件*">
                    <el-input v-model="x.condition" placeholder=">=API1.5" />
                    <el-button size="small" type="primary" text icon="Minus" @click="deleteRelation(i)">删除本组</el-button>
                  </el-form-item>
                </template>
                <div class="flex" v-for="(xx, ii) in x.list" :key="xx">
                  <el-select remote :loading="remoteLoading" :remote-method="getModList" v-model="xx.package_id"
                    filterable remote-show-suffix placeholder="选择资源ID">
                    <el-option :label="xxx.label" :key="xxx.value" :value="xxx.value"
                      v-for="xxx in relate_mod_list"></el-option>
                  </el-select>
                  <el-select v-model="xx.type" placeholder="选择关系">
                    <el-option :label="r.name" :value="r.id" v-for="r in relate_type_list" />
                  </el-select>
                  <el-button type="primary" icon="Minus" text @click="deleteRelationDetail(i, ii)"
                    :data-index="ii">删除</el-button>
                </div>
                <div>
                  <el-button size="small" type="primary" text icon="Plus" @click="newRelation(i)">添加关系</el-button>
                </div>
              </el-card>
              <div>
                <el-button size="small" type="primary" text icon="Plus" @click="newGroupRelation">添加一组</el-button>
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
interface modItem {
  label: string
  value: string
}
export default {
  name: 'ModPublish',
  components: {
    ModFlag,
  },
  data() {
    return {
      uploadServer: Method.getHostUrl(Cfg.config.uploadServer),
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
      this.cover = Method.getHostUrl(e.data.src)
    },
    newLink() {
      this.link.push({ src: '', type: '' })
    },
    deleteLink(e: number) {
      this.link.splice(e, 1)
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
    submit() {
      let activeFlagId = <any>[];
      let activeApiId = <any>[];
      let activeGameId = <any>[];
      let activeServerId = <any>[];
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
        flag: JSON.stringify(activeFlagId),
        package_id: this.package_id,
      }
      this.isCreating = true
      Method.api_post('/mod/add', payLoad).then((res) => {
        this.isCreating = false
        if (res.data.code == 200) {
          ElMessage('创建成功')
          this.$router.back()
        } else {
          ElMessage(res.data.data)
        }
      })
    },
  },
  created() {
    let {
      userInfo: {
        global_mod_data_list: {
          flag_list,
          link_type,
          relate_type,
          api_version,
          game_version,
          server_version_list
        },
      },
    } = Cfg
    this.api_version_list = api_version
    this.game_version_list = game_version
    this.relate_type_list = relate_type
    this.mod_link_type = link_type
    this.mod_flag_list = flag_list
    this.server_version_list = server_version_list
  },
  mounted() {
    Cfg.config.homestyle.maincontainer.overflowY = 'auto'
  },
  unmounted() {
    Cfg.config.homestyle.maincontainer.overflowY = 'hidden'
  },
}
</script>
<style scoped>
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
