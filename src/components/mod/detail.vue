<template>
  <div v-if="set.ismobile">
    <div class="bj" :style="{ backgroundImage: `url(${cover_src})` }">
      <div class="ismobile-title">
        <div class="status-area">
          <div class="item left">活跃</div>
          <div class="item right">闭源</div>
        </div>
        <div class="name">[{{ mini_name }}]{{ name }}</div>
        <div class="en-name">{{ en_name }}</div>
        <div class="flag-area">
          <mod-flag class="flag" :flag="x.flag_name" active v-for="x in flag_list"></mod-flag>
        </div>
      </div>
    </div>

    <div class="extra-area" style="background-color: white; padding: 0 10px">
      <div class="item">
        <el-text>支持的游戏版本:<el-tag v-for="x in game_list" v-html="x.name"></el-tag></el-text>
      </div>
      <div class="item">
        <el-text>支持的API版本:
          <el-tag v-for="x in api_list" v-html="x.name"></el-tag></el-text>
      </div>
      <div class="item">最后编辑: {{ last_modify }}</div>
      <div class="item">
        <div>资源作者/开发团队:</div>
        <div>无</div>
      </div>
      <div class="item">相关链接:</div>
      <div class="item">
        <a class="link" :href="x.src" v-for="x in link_list">
          <icon-down></icon-down>
          <div v-html="x.name"></div>
        </a>
      </div>
      <el-tabs class="el-tabs" type="card">
        <el-tab-pane label="资源介绍" v-html="description"></el-tab-pane>
        <el-tab-pane label="资源关系">
          <el-collapse v-model="activeRelation">
            <el-collapse-item v-for="(x, i) in relation_list" :title="x.condition" :name="i">
              <div class="flex" v-for="xx in x.list">
                <el-tag class="ml-2" type="success" v-html="xx.type_name"></el-tag>
                <el-button type="primary" link @click="goModDetail(xx.package_id)" v-html="xx.package_name"></el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="资源下载">
          <el-table :data="version_list" stripe style="width: 100%">
            <el-table-column prop="name" label="文件名" />
            <el-table-column prop="create_time_str" label="创建时间" width="180" />
            <el-table-column prop="file_size" label="大小" width="180" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" link type="danger" @click="downLoad(scope.$index)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="update-area" style="padding: 0 10px">
      <div class="tab">更新日志</div>
      <el-timeline v-if="version_list.length != 0">
        <el-timeline-item v-for="(x, index) in version_list" :key="index" :timestamp="x.time" v-html="x.version"></el-timeline-item>
      </el-timeline>
      <div class="update-log" v-else>暂无更新日志</div>
    </div>
  </div>
  <el-container class="el-container" v-loading="isLoading" v-else>
    <div class="panel-left">
      <el-avatar class="img" :src="cover_src" />
      <div class="update-area">
        <div class="tab">更新日志</div>
        <div class="update-log" v-if="version_list.length != 0" v-for="x in version_list">
          <el-popover
              placement="top-start"
              :title="x.version"
              :width="512"
              trigger="click"
              :content="x.description"
          >
            <template #reference>
              <div class="version" v-html="x.version"></div>
            </template>
          </el-popover>
          <div class="date" v-html="x.time"></div>
        </div>
        <div class="update-log" v-if="version_list.length == 0">
          暂无更新日志
        </div>
      </div>
    </div>
    <div class="panel-center">
      <div class="title-line">
        <div class="status-area">
          <div class="item left">活跃</div>
          <div class="item right">闭源</div>
        </div>
        <div class="name">[{{ mini_name }}]{{ name }}</div>
        <div class="en-name">{{ en_name }}</div>
      </div>
      <div class="flag-area">
        <mod-flag class="flag" :flag="x.flag_name" active v-for="x in flag_list"></mod-flag>
      </div>
      <div class="extra-area">
        <div class="item">
          <div>支持的游戏版本:</div>
          <el-tag v-for="x in game_list" v-html="x.name"></el-tag>
        </div>
        <div class="item">
          <div>支持的API版本:</div>
          <el-tag v-for="x in api_list" v-html="x.name"></el-tag>
        </div>
        <div class="item">最后编辑: {{ last_modify }}</div>
        <div class="item">
          <div>Mod作者/开发团队:</div>
          <div>无</div>
        </div>
        <div class="item">相关链接:</div>
        <div class="item">
          <a class="link" :href="x.src" v-for="x in link_list">
            <icon-down v-if="x.id == 1"></icon-down>
            <icon-github v-if="x.id == 2"></icon-github>
            <icon-cloud-store fill="#f8574c" v-if="x.id == 3"></icon-cloud-store>
            <icon-cloud-store v-if="x.id == 4"></icon-cloud-store>
            <icon-server v-if="x.id == 5"></icon-server>
            <el-icon v-if="x.id == 6" size="26"><Share /></el-icon>
            <div v-html="x.name"></div>
          </a>
        </div>
        <el-tabs class="el-tabs"  type="card">
          <el-tab-pane label="资源介绍" v-html="description"></el-tab-pane>
          <el-tab-pane label="资源关系">
            <el-collapse v-model="activeRelation">
              <el-collapse-item v-for="(x, i) in relation_list" :title="x.condition" :name="i">
                <div class="flex" v-for="xx in x.list">
                  <el-tag class="ml-2" type="success" v-html="xx.type_name"></el-tag>
                  <el-button type="primary" link @click="goModDetail(xx.package_id)" v-html="xx.package_name"></el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="资源下载">
            <el-table :data="version_list" stripe style="width: 100%">
              <el-table-column prop="version" label="版本" />
              <el-table-column prop="name" label="文件名" />
              <el-table-column prop="create_time_str" label="创建时间" width="180" />
              <el-table-column prop="file_size" label="大小" width="180" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button size="small" link type="danger" @click="downLoad(scope.$index)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="panel-right">
      <div class="rate">
        <div class="rate-area">
          <div>5.0</div>
          <div>名扬天下</div>
        </div>
        <div class="rate-info">
          <el-rate v-model="modRate" disabled/>
          <div>总浏览:{{ views }}</div>
          <div>总点赞:{{ likes }}</div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script lang="ts">
import ModFlag from '@comps/mod/flag.vue'
import IconDown from '@comps/icons/common/down.vue'
import IconHot from '@comps/icons/common/hot.vue'
import Method from '@/globalmethods'
import Cfg from '@/config/config'
import { watch } from 'vue'
import IconGithub from "@comps/icons/common/github.vue";
import IconCloudStore from "@comps/icons/common/cloudStore.vue";
import IconServer from "@comps/icons/mod/server.vue";
export default {
  name: 'modDetail',
  components: {IconServer, IconCloudStore, IconGithub, IconHot, IconDown, ModFlag },
  data() {
    return {
      set: Cfg.set,
      activeRelation: <any>[0],
      modRate:5,
      isLoading: false,
      last_modify: '',
      cover_src: '',
      create_time: 0,
      description: '',
      downloads: 0,
      id: 1,
      last_modify_time: 0,
      likes: 0,
      version_list: <any>[],
      flag_list: <any>[],
      link_list: <any>[],
      game_list: <any>[],
      api_list: <any>[],
      relation_list: <any>[],
      name: '',
      views: 0,
      mini_name: '',
      en_name: '',
      activeIndex: 0,
    }
  },
  methods: {
    goModDetail(id: number) {
      this.$router.push(`/ModDetail/${id}`)
    },
    downLoad(index: number) {
      console.log(index)

      this.activeIndex = index
    },
    reloadPageData() {
      this.isLoading = true
      Method.api_get(`/mod/item/${this.$route.params.id}`).then((response) => {
        let res = response.data
        if (res.code == 200) {
          this.isLoading = false
          let modInfo = res.data.mod
          let version_list = res.data.version_list
          version_list.forEach((x: any) => {
            x.time = Method.formatNormalTime(x.create_time, 'Y-m-d')
            x.create_time_str = Method.formatBbsTime(x.create_time)
            x.file_size = Method.getFileSize(x.size)
          })
          this.relation_list = Method.decodeRelationList(res.data.relation)
          this.modRate = modInfo.rate;
          this.cover_src = modInfo.cover_src
          this.create_time = modInfo.create_time
          this.description = modInfo.description
          this.downloads = modInfo.downloads
          this.id = modInfo.id
          this.likes = modInfo.likes
          this.last_modify = Method.formatBbsTime(modInfo.last_modify_time)
          this.link_list = Method.decodeLinkList(modInfo.link_list)
          this.flag_list = Method.decodeFlagList(modInfo.flag_list)
          this.api_list = Method.decodeApiVersionList(modInfo.api_list)
          this.game_list = Method.decodeGameVersionList(modInfo.game_list)
          this.version_list = version_list
          this.name = modInfo.name
          this.views = modInfo.views
          this.mini_name = modInfo.mini_name
          this.en_name = modInfo.en_name
        }
      })
    },
  },
  mounted() {
    Cfg.config.homestyle.maincontainer.padding = '0'
    Cfg.config.homestyle.maincontainer.height = 'auto'
    Cfg.config.homestyle.maincontainer.overflowY = ''
  },
  unmounted() {
    Cfg.config.homestyle.maincontainer.padding = '0 1rem'
    Cfg.config.homestyle.maincontainer.height = 'calc(100vh - 90px)'
    Cfg.config.homestyle.maincontainer.overflowY = 'hidden'
  },
  created() {
    watch(
      () => this.$route.params.id,
      () => {
        this.reloadPageData()
      },
    )
    this.reloadPageData()
  },
}
</script>
<style scoped>
.ismobile-title {
  padding: 1rem;
  padding-top: 5rem;
  color: white;
  background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.8));
}

.bj {
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
}

.el-container {
  padding-top: 20px;
  height: inherit;
}

.el-tabs {
  flex: 1;
}

.panel-left {
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  padding: 5px 10px;
  background: #fff;
  border-radius: 5px;
}

.panel-left .tab {
  background: #eee;
}

.panel-left .update-area {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

.panel-left .update-log {
  display: flex;
  flex-direction: row;
  border-bottom: 1px dashed #aaa;
}

.panel-left .update-log .version {
  flex: 1;
  color: #008ac5;
}

.panel-center {
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
}

.panel-right {
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  padding: 5px 10px;
  background: #fff;
  border-radius: 5px;
}

.flag-area {
  display: flex;
  flex-direction: row;
}

.panel-center .title-line {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 5px 0;
  line-height: initial;
}

.panel-center .title-line .name {
  font-size: 20px;
  font-weight: bolder;
  padding: 0 10px;
}

.panel-center .title-line .en-name {
  color: gray;
  font-family: 'Microsoft YaHei', 微软雅黑, 宋体, sans-serif;
  font-size: 15px;
  padding-left: 10px;
}

.panel-left .img {
  width: 128px;
  height: 96px;
  border-radius: 5px;
  border: 1px solid gray;
}

.status-area {
  display: flex;
  flex-direction: row;
  font-size: 12px;
}

.status-area .item {
  background: #008ac5;
  color: #fff;
  padding: 2px 5px;
}

.status-area .item+.item {
  margin-left: 2px;
}

.status-area .item.left {
  background: #2cbe4e;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.status-area .item.right {
  background: #cb6431;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.extra-area {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding-top: 20px;
  color: gray;
  flex: 1;
}

.extra-area .item {
  padding: 5px 0;
  display: flex;
  flex-direction: row;
}

.extra-area .href {
  margin: 0 5px;
  text-decoration: underline;
}

.extra-area .href,
.extra-area .link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}

.rate-area {
  border-radius: 5px;
  background: #545b62;
  color: #fff;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  justify-content: space-around;
}

.rate-line {
  display: flex;
  flex-direction: row;
}

.rate {
  display: flex;
  flex-direction: row;
}

.rate .rate-info {
  display: flex;
  flex-direction: column;
  color: #545b62;
  padding-left: 10px;
  font-size: 12px;
}

.operate-list {
  display: flex;
  flex-direction: column;
}

.operate-list .line {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.operate-list .line .item {
  color: #212529;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: row;
}
</style>
