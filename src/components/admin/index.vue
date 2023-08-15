<template>
  <div class="container">
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="网站管理" name="1">
        <el-row>
          <el-col :span="6">
            <el-statistic title="注册用户数" :value="1" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="帖子数" :value="1" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="总资源数" :value="1" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="磁盘空间占用" :value="1" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="CPU占用" value="10%" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="账号管理" name="2">
        <div>
          <el-table
              :data="member_list"
              stripe
              style="width: 100%"
              v-loading="isLoadingData"
          >
            <el-table-column prop="id" width="80" label="ID" />
            <el-table-column prop="account" label="账号" width="180" />
            <el-table-column prop="nickname" label="昵称" width="180" />
            <el-table-column prop="reg_time" label="注册时间" width="180" />
            <el-table-column
                prop="last_login_time"
                label="最后登陆时间"
                width="180"
            />
            <el-table-column
                prop="last_login_ip"
                label="最后登陆IP"
                width="180"
            />
            <el-table-column prop="money" label="积分" width="180" />
            <el-table-column prop="email" label="邮箱" width="180" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                    size="small"
                    link
                    type="danger"
                    @click="showLockAccount(scope.$index)"
                >锁定</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
              class="el-pagination"
              background
              :page-size="limit"
              :pager-count="8"
              layout="prev, pager, next"
              :total="1000"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="帖子管理" name="3">
        <div>
          <el-table
              :data="bbs_list"
              stripe
              style="width: 100%"
              v-loading="isLoadingData"
          >
            <el-table-column prop="id" width="80" label="ID" />
            <el-table-column prop="name" label="标题" width="180" />
            <el-table-column prop="content" label="内容" width="180" />
            <el-table-column prop="uid" label="发布者ID" width="180" />
            <el-table-column prop="cate_id" label="板块ID" width="180" />
            <el-table-column prop="create_time" label="发布时间" width="180" />
            <el-table-column prop="stat" label="状态" width="180">
              <template #default="scope">
                <el-tag size="small" v-if="bbs_list[scope.$index].stat == 0"
                >删除</el-tag
                >
                <el-tag size="small" v-if="bbs_list[scope.$index].stat == 1"
                >正常</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" link type="danger" @click="showLockBbs(scope.$index)">锁定</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
              class="el-pagination"
              background
              :page-size="limit"
              :pager-count="8"
              layout="prev, pager, next"
              :total="1000"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="资源管理" name="4">
        <div>
          <el-table
              :data="mod_list"
              stripe
              style="width: 100%"
              v-loading="isLoadingData"
          >
            <el-table-column prop="id" width="80" label="ID" />
            <el-table-column prop="name" label="资源名称" width="180" />
            <el-table-column prop="description" label="资源简介" width="180" />
            <el-table-column prop="uid" label="发布者ID" width="180" />
            <el-table-column prop="create_time" label="发布时间" width="180" />
            <el-table-column prop="stat" label="状态" width="180">
              <template #default="scope">
                <el-tag size="small" v-if="mod_list[scope.$index].stat == 0"
                >删除</el-tag
                >
                <el-tag size="small" v-if="mod_list[scope.$index].stat == 1"
                >正常</el-tag
                >
                <el-tag size="small" v-if="mod_list[scope.$index].stat == 2"
                >审核中</el-tag
                >
                <el-tag size="small" v-if="mod_list[scope.$index].stat == 3"
                >审核未通过</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" link type="danger" @click="showLockMod(scope.$index)">审核</el-button>
                <el-button size="small" link type="danger" @click="showLockMod(scope.$index)">锁定</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
              class="el-pagination"
              background
              :page-size="limit"
              :pager-count="8"
              layout="prev, pager, next"
              :total="1000"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="头衔列表管理" name="5">
        <div>
          <el-button type="primary" plain @click="showAddRole">添加头衔</el-button>
          <el-table
              :data="role_list"
              stripe
              style="width: 100%"
              v-loading="isLoadingData"
          >
            <el-table-column prop="id" width="80" label="ID" />
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column label="预览" width="180">
              <template #default="scope">
                <user-role :role="role_list[scope.$index].id + ''"></user-role>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" link type="danger" @click="showLockRole(scope.$index)">停用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="板块列表管理" name="6">
        <el-table
            :data="cate_list"
            stripe
            style="width: 100%"
            v-loading="isLoadingData"
        >
          <el-table-column prop="id" width="80" label="ID" />
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" link type="danger" @click="showLockCate(scope.$index)">停用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="游戏内置内容管理" name="7">
        <el-form label-width="120px">
          <el-form-item :label="x.comments" v-for="x in site_config_list">
            <el-input type="textarea" v-model="x.value" />
          </el-form-item>
          <el-form-item>
            <el-button @click="saveSiteConfig" :loading="isLocking">保存配置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>

  <!--锁定账号弹窗-->
  <el-dialog
      v-model="dialogShow.lockAccount"
      title="提示"
      width="30%"
      :fullscreen="set.ismobile"
      align-center
  >
    <span
    >是否锁定账号[ID:{{ activeItem.member.id }}]
      <span style="color: #008ac5">{{ activeItem.member.account }}</span></span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow.lockAccount = false">取消</el-button>
        <el-button type="primary" @click="lockAccount" :loading="isLocking">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!--锁定资源弹窗-->
  <el-dialog
      v-model="dialogShow.lockMod"
      title="提示"
      width="30%"
      :fullscreen="set.ismobile"
      align-center
  >
    <span
    >是否锁定资源[ID:{{ activeItem.mod.id }}]
      <span style="color: #008ac5">{{ activeItem.mod.name }}</span></span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow.lockMod = false">取消</el-button>
        <el-button type="primary" @click="lockMod" :loading="isLocking">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!--锁定帖子弹窗-->
  <el-dialog
      v-model="dialogShow.lockBbs"
      title="提示"
      width="30%"
      :fullscreen="set.ismobile"
      align-center
  >
    <span
    >是否锁定帖子[ID:{{ activeItem.bbs.id }}]
      <span style="color: #008ac5">{{ activeItem.bbs.title }}</span></span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow.lockBbs = false">取消</el-button>
        <el-button type="primary" @click="lockBbs" :loading="isLocking">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!--停用板块弹窗-->
  <el-dialog
      v-model="dialogShow.lockCate"
      title="提示"
      width="30%"
      :fullscreen="set.ismobile"
      align-center
  >
    <span
    >是否停用板块[ID:{{ activeItem.cate.id }}]
      <span style="color: #008ac5">{{ activeItem.cate.name }}</span></span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow.lockCate = false">取消</el-button>
        <el-button type="primary" @click="lockBbs" :loading="isLocking">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!--停用头衔弹窗-->
  <el-dialog
      v-model="dialogShow.lockRole"
      title="提示"
      width="30%"
      :fullscreen="set.ismobile"
      align-center
  >
    <span
    >是否停用头衔[ID:{{ activeItem.role.id }}]
      <span style="color: #008ac5">{{ activeItem.role.name }}</span></span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow.lockRole = false">取消</el-button>
        <el-button type="primary" @click="lockBbs" :loading="isLocking">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!--添加头衔弹窗-->
  <el-dialog
      v-model="dialogShow.addRole"
      title="添加头衔"
      width="30%"
      :fullscreen="set.ismobile"
      align-center
  >
    <el-form>
      <el-form-item  label="预览">
        <el-tag :effect="roleConfig.effect" :type="roleConfig.type" :color="roleConfig.color" v-html="roleConfig.name"></el-tag>
      </el-form-item>
      <el-form-item  label="名称">
        <el-input v-model="roleConfig.name"></el-input>
      </el-form-item>
      <el-form-item  label="颜色">
        <el-color-picker v-model="roleConfig.color" show-alpha />
      </el-form-item>
      <el-form-item  label="类型">
        <el-select v-model="roleConfig.type" placeholder="请选择">
          <el-option label="默认" value="" />
          <el-option label="success" value="success" />
          <el-option label="info" value="info" />
          <el-option label="warning" value="warning" />
          <el-option label="danger" value="danger" />
        </el-select>
      </el-form-item>
      <el-form-item  label="效果">
        <el-select v-model="roleConfig.effect" placeholder="请选择">
          <el-option label="dark" value="dark" />
          <el-option label="light" value="light" />
          <el-option label="plain" value="plain" />
        </el-select>
      </el-form-item>
      <el-form-item  label="权限(未实现)">
        <el-checkbox-group>
          <el-checkbox label="后台可见" name="type" />
          <el-checkbox label="网站配置" name="type" />
          <el-checkbox label="头衔修改" name="type" />
          <el-checkbox label="审核资源" name="type" />
          <el-checkbox label="重置账号密码" name="type" />
          <el-checkbox label="账号列表操作" name="type" />
          <el-checkbox label="资源列表操作" name="type" />
          <el-checkbox label="帖子列表操作" name="type" />
          <el-checkbox label="板块列表操作" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="addRole">添加头衔</el-button>
        <el-button @click="dialogShow.addRole = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import Cfg from '@/config/config.ts'
import Method from '@/globalmethods'
import './index.ts'
import { watch } from 'vue'
import UserRole from '@comps/user/roleList.vue'
import {ElMessage} from "element-plus";

export default {
  name: 'Admin',
  components: { UserRole },
  data() {
    return {
      set: Cfg.set,
      dialogShow:{
        lockAccount:false,
        addRole:false,
        lockBbs:false,
        lockMod:false,
        lockRole:false,
        lockCate:false
      },
      gameConfig: {
        name: '',
      },
      roleConfig:{
        name:'预览',
        color:'',
        type:'',
        effect:'plain'
      },
      activeTab: '1',
      page: 1,
      limit: 10,
      activeItem: {
        member:<memberItem>{},
        bbs:<bbsItem>{},
        mod:<modItem>{},
        cate:<cateItem>{},
        role:<roleItem>{}
      },
      isLoadingData: false,
      isLockAccountDialogVisible: false,
      isLocking: false,
      member_list: <memberItem[]>[],
      mod_list: <modItem[]>[],
      bbs_list: <bbsItem[]>[],
      role_list: <roleItem[]>[],
      cate_list: <cateItem[]>[],
      site_config_list: <siteConfig[]>[],
    }
  },
  methods: {
    showLockBbs(index: number){
      this.dialogShow.lockBbs = true;
      this.activeItem.bbs = this.bbs_list[index];
    },
    showLockAccount(index: number) {
      this.dialogShow.lockAccount = true;
      this.activeItem.member = this.member_list[index];
    },
    showLockMod(index: number) {
      this.dialogShow.lockMod = true;
      this.activeItem.mod = this.mod_list[index];
    },
    showAddRole(index: number){
      this.dialogShow.addRole = true;
      this.activeItem.role = this.role_list[index];
    },
    showLockRole(index: number){
      this.dialogShow.lockRole = true;
      this.activeItem.role = this.role_list[index];
    },
    showLockCate(index:number){
      this.dialogShow.lockCate = true;
      this.activeItem.cate = this.cate_list[index];
    },
    addRole(){

    },
    lockBbs(){

    },
    lockAccount(){

    },
    lockMod(){

    },
    lockCate(){

    },
    saveSiteConfig(){
      this.isLocking = true;
      let config = <siteSaveConfig[]>[];
      this.site_config_list.forEach((x:siteConfig)=>{
        config.push({id:x.id,value:x.value});
      });
      let payLoad = {
        config:JSON.stringify(config)
      }
      Method.api_post('/admin/save_site_config', payLoad).then((response) => {
        this.isLocking = false
        let res = response.data
        if (res.code == 200) {
          ElMessage('保存成功');
          this.member_list = res.data
        }else ElMessage(res.msg);
      })
    },
    refreshMemberList() {
      this.isLoadingData = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post('/admin/member_list', payLoad).then((response) => {
        this.isLoadingData = false
        let res = response.data
        if (res.code == 200) {
          this.member_list = res.data
        }
      })
    },
    /**
     * 资源列表刷新
     */
    refreshModList() {
      this.isLoadingData = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post('/admin/mod_list', payLoad).then((response) => {
        this.isLoadingData = false
        let res = response.data
        if (res.code == 200) {
          this.mod_list = res.data
        }
      })
    },
    /**
     * 资源列表刷新
     */
    refreshBbsList() {
      this.isLoadingData = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post('/admin/bbs_list', payLoad).then((response) => {
        this.isLoadingData = false
        let res = response.data
        if (res.code == 200) {
          this.bbs_list = res.data
        }
      })
    },
    /**
     * 头衔列表刷新
     */
    refreshRoleList() {
      this.isLoadingData = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post('/admin/role_list', payLoad).then((response) => {
        this.isLoadingData = false
        let res = response.data
        if (res.code == 200) {
          this.role_list = res.data as roleItem[]
        }
      })
    },
    /**
     * 板块列表刷新
     */
    refreshCateList() {
      this.isLoadingData = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post('/admin/cate_list', payLoad).then((response) => {
        this.isLoadingData = false
        let res = response.data
        if (res.code == 200) {
          this.cate_list = res.data
        }
      })
    },
    /**
     * 配置列表刷新
     */
    refreshConfigList() {
      this.isLoadingData = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
      }
      Method.api_post('/admin/get_site_config', payLoad).then((response) => {
        this.isLoadingData = false
        let res = response.data
        if (res.code == 200) {
          this.site_config_list = res.data
        }
      })
    },
  },
  created() {
    watch(
        () => this.activeTab,
        (x) => {
          let v = parseInt(x)
          switch (v) {
            case 2:
              this.page = 1
              this.refreshMemberList()
              break
            case 3:
              this.page = 1
              this.refreshBbsList()
              break
            case 4:
              this.page = 1
              this.refreshModList()
              break
            case 5:
              this.page = 1
              this.refreshRoleList()
              break
            case 6:
              this.page = 1
              this.refreshCateList()
              break
            case 7:
              this.refreshConfigList()
              break
          }
        },
    )
  },
}
</script>
<style scoped>
.container {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 10px;
}
</style>