<template>
  <div class="container">
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="网站管理" name="1">
        <el-row>
          <el-col :span="6">
            <el-statistic title="注册用户数" :value="serverInfo.member" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="帖子数" :value="serverInfo.bbs" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="总资源数" :value="serverInfo.mod" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="账号管理" name="2">
        <div v-loading="isLoadingData">
          <el-input
            v-model="searchUser"
            placeholder="搜索账号"
            class="input-with-select"
          >
            <template #prepend> 搜索用户 </template>
            <template #append>
              <el-button @click="refreshMemberList" icon="Search" />
            </template>
          </el-input>

          <el-table :data="member_list" stripe style="width: 100%">
            <el-table-column prop="id" width="60" label="ID" />
            <el-table-column prop="account" label="账号" width="120" />
            <el-table-column prop="nickname" label="昵称" width="120" />
            <el-table-column prop="reg_time" label="注册时间" width="180" />
            <el-table-column
              prop="last_login_time"
              label="最后登录时间"
              width="180"
            />
            <el-table-column
              prop="last_login_ip"
              label="最后登录IP"
              width="120"
            />
            <el-table-column prop="money" label="积分" width="80" />
            <el-table-column prop="email" label="邮箱" width="120" />
            <el-table-column label="操作" fixed="right">
              <template #default="scope">
                <el-button
                  size="small"
                  link
                  type="danger"
                  @click="showLockItem(1, scope.$index)"
                >
                  <div v-if="member_list[scope.$index].stat == 0">解锁</div>
                  <div v-else>锁定</div>
                </el-button>
                <el-button
                  size="small"
                  link
                  type="primary"
                  @click="showLockItem(6, scope.$index)"
                  >头衔设置</el-button
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
      </el-tab-pane>
      <el-tab-pane label="帖子管理" name="3">
        <div v-loading="isLoadingData">
          <el-table :data="bbs_list" stripe style="width: 100%">
            <el-table-column prop="id" width="80" label="ID" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="content" label="内容" width="180" />
            <el-table-column prop="uid" label="发布者ID" width="80" />
            <el-table-column prop="cate_id" label="板块ID" width="80" />
            <el-table-column prop="create_time" label="发布时间" width="180" />
            <el-table-column prop="stat" label="状态" width="80">
              <template #default="scope">
                <el-tag
                  size="small"
                  v-if="bbs_list[scope.$index].stat == 0"
                  type="danger"
                  >删除</el-tag
                >
                <el-tag size="small" v-if="bbs_list[scope.$index].stat == 1"
                  >正常</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template #default="scope">
                <el-button
                  size="small"
                  link
                  :type="
                    bbs_list[scope.$index].stat == 0 ? 'primary' : 'danger'
                  "
                  @click="showLockItem(2, scope.$index)"
                >
                  {{ bbs_list[scope.$index].stat == 0 ? '解锁' : '锁定' }}
                </el-button>
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
      </el-tab-pane>
      <el-tab-pane label="资源管理" name="4">
        <el-row>
          <el-button :plain="stat_filter==-1?'plain':''" @click="setModListFilter()">全部</el-button>
          <el-button :plain="stat_filter==4?'plain':''" @click="setModListFilter(4)" type="info">未发布</el-button>
          <el-button :plain="stat_filter==2?'plain':''" @click="setModListFilter(2)" type="info">申请发布</el-button>
          <el-button :plain="stat_filter==3?'plain':''" @click="setModListFilter(3)" type="warning">申请发布未通过</el-button>
          <el-button :plain="stat_filter==1?'plain':''" @click="setModListFilter(1)" type="primary">正常</el-button>
          <el-button :plain="stat_filter==0?'plain':''" @click="setModListFilter(0)" type="danger">已锁定</el-button>
        </el-row>
        <div v-loading="isLoadingData">
          <el-table :data="mod_list" stripe style="width: 100%">
            <el-table-column prop="id" width="80" label="ID" />
            <el-table-column prop="name" label="资源名称" width="180" />
            <el-table-column prop="description" label="资源简介" width="180" />
            <el-table-column prop="uid" label="发布者ID" width="180" />
            <el-table-column prop="create_time" label="发布时间" width="180" />
            <el-table-column prop="stat" label="状态" width="180">
              <template #default="scope">
                <el-tag
                  size="small"
                  :type="mod_list[scope.$index].stat_data.type"
                  v-if="mod_list[scope.$index].stat !== 3"
                >
                  {{ mod_list[scope.$index].stat_data.name }}
                </el-tag>
                <el-popover
                  v-if="mod_list[scope.$index].stat == 3"
                  placement="top-start"
                  title="原因"
                  :width="200"
                  trigger="hover"
                  :content="mod_list[scope.$index].reason"
                >
                  <template #reference>
                    <el-tag size="small" type="danger">审核未通过</el-tag>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template #default="scope">
                <el-button
                  size="small"
                  link
                  type="primary"
                  @click="toView(scope.$index)"
                  >查看</el-button
                >
                <el-button
                  size="small"
                  link
                  type="primary"
                  @click="showExamineMode(scope.$index)"
                  >审核</el-button
                >
                <el-button
                  size="small"
                  link
                  type="danger"
                  @click="showLockItem(3, scope.$index)"
                >
                  {{ mod_list[scope.$index].stat == 0 ? '解锁' : '锁定' }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            v-model:current-page="page"
            :page-size="limit"
            layout="prev, pager, next"
            :total="total"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="头衔列表管理" name="5">
        <div v-loading="isLoadingData">
          <el-button type="primary" plain @click="showAddRole"
            >添加头衔</el-button
          >
          <el-table :data="role_list" stripe style="width: 100%">
            <el-table-column prop="id" width="80" label="ID" />
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column label="预览" width="180">
              <template #default="scope">
                <el-tag
                  :color="role_list[scope.$index].color"
                  :type="role_list[scope.$index].type"
                  :effect="role_list[scope.$index].effect"
                >
                  {{ role_list[scope.$index].name }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template #default="scope">
                <el-button
                  size="small"
                  link
                  type="primary"
                  @click="showLockItem(7, scope.$index)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  link
                  type="danger"
                  @click="showLockItem(4, scope.$index)"
                >
                  <div v-if="role_list[scope.$index].stat == 0">启用</div>
                  <div v-else>停用</div>
                </el-button>
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
      </el-tab-pane>
      <el-tab-pane label="板块列表管理" name="6">
        <div v-loading="isLoadingData">
          <el-button type="primary" plain @click="showAddCate"
            >添加板块</el-button
          >
          <el-table :data="cate_list" stripe style="width: 100%">
            <el-table-column prop="id" width="80" label="ID" />
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column prop="introduce" label="介绍" width="180" />
            <el-table-column prop="postnum" label="帖子数" width="80" />
            <el-table-column prop="interaction" label="回复数" width="80" />
            <el-table-column label="操作" fixed="right">
              <template #default="scope">
                <el-button
                  size="small"
                  link
                  type="primary"
                  @click="showModifyCate(scope.$index)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  link
                  type="danger"
                  @click="showLockItem(5, scope.$index)"
                >
                  <div v-if="cate_list[scope.$index].stat == 0">解锁</div>
                  <div v-else>锁定</div>
                </el-button>
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
      </el-tab-pane>
      <el-tab-pane label="游戏内置内容管理" name="7">
        <el-form label-width="120px">
          <el-form-item :label="x.comments" v-for="x in site_config_list">
            <el-input rows="20" type="textarea" v-model="x.value" />
          </el-form-item>
          <el-form-item>
            <el-button @click="saveSiteConfig" :loading="isLocking"
              >保存配置</el-button
            > </el-form-item
          >s
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邀请码管理" name="8">
        <el-form :model="yqm">
          <el-form-item label="生成邀请码"></el-form-item>
          <el-form-item label="设置可使用次数">
            <el-input
              v-model="yqm.num"
              type="number"
              style="max-width: 10rem"
            />
          </el-form-item>
        </el-form>
        <el-button @click="yaoqingma">生成</el-button>
        <el-divider />

        <el-table
          :data="InvitationList"
          border
          style="width: 100%; max-height: 50rem; overflow-y: auto"
        >
          <el-table-column prop="iid" label="邀请码ID" />
          <el-table-column prop="invitation" label="邀请码" />
          <el-table-column prop="nickname" label="使用者昵称" />
          <el-table-column prop="account" label="使用者邮箱" />
          <el-table-column prop="time" label="注册时间" />
        </el-table>
        <el-pagination
          :current-page="page"
          background
          :page-size="50"
          layout="prev, pager, next, total"
          :total="invitationNum"
          @current-change="refreshInvitationList"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
  <!---添加/编辑板块弹窗-->
  <dialog-confirm
    :title="cateConfig.id > 0 ? '修改板块' : '添加板块'"
    v-model:visible="dialogShow.addCate"
    @submit="addCate(false)"
    :loading="isLocking"
  >
    <el-form>
      <el-form-item label="板块名称">
        <el-input v-model="cateConfig.name"></el-input>
      </el-form-item>
      <el-form-item label="板块简介">
        <el-input type="textarea" v-model="cateConfig.introduce"></el-input>
      </el-form-item>
    </el-form>
  </dialog-confirm>
  <!--头衔设置弹窗-->
  <dialog-confirm
    title="头衔设置"
    v-model:visible="dialogShow.setRole"
    @submit="setUserRole"
  >
    <el-form>
      <el-form-item label="头衔列表">
        <el-row>
          <el-tag
            @click="addUserRole(x)"
            v-for="x in role_list"
            :color="x.color"
            :type="x.type"
            :effect="x.effect"
          >
            {{ x.name }}
          </el-tag>
        </el-row>
      </el-form-item>
      <el-form-item label="已选择">
        <el-row>
          <el-tag
            @click="removeUserRole(x)"
            v-for="x in user_role_list"
            :color="x.color"
            :type="x.type"
            :effect="x.effect"
          >
            {{ x.name }}
          </el-tag>
        </el-row>
      </el-form-item>
    </el-form>
  </dialog-confirm>
  <!--锁定账号弹窗-->
  <dialog-confirm
    title="提示"
    v-model:visible="dialogShow.lockAccount"
    :loading="isLocking"
    @submit="lockItem(1)"
  >
    <span>
      <span>是否锁定账号[ID:{{ activeItem.member.id }}]</span>
      <span style="color: #008ac5">{{ activeItem.member.account }}</span>
    </span>
  </dialog-confirm>
  <!--锁定资源弹窗-->
  <dialog-confirm
    title="提示"
    v-model:visible="dialogShow.lockMod"
    :loading="isLocking"
    @submit="lockItem(3)"
  >
    <span>
      <span>是否锁定资源[ID:{{ activeItem.mod.id }}]</span>
      <span style="color: #008ac5">{{ activeItem.mod.name }}</span>
    </span>
  </dialog-confirm>
  <!--锁定帖子弹窗-->
  <dialog-confirm
    title="提示"
    v-model:visible="dialogShow.lockBbs"
    :loading="isLocking"
    @submit="lockItem(2)"
  >
    <span>
      <span>是否锁定帖子[ID:{{ activeItem.bbs.id }}]</span>
      <span style="color: #008ac5">{{ activeItem.bbs.title }}</span>
    </span>
  </dialog-confirm>
  <!--停用板块弹窗-->
  <dialog-confirm
    title="提示"
    v-model:visible="dialogShow.lockCate"
    :loading="isLocking"
    @submit="lockItem(5)"
  >
    <span>
      <span>是否停用板块[ID:{{ activeItem.cate.id }}]</span>
      <span style="color: #008ac5">{{ activeItem.cate.name }}</span>
    </span>
  </dialog-confirm>
  <!--停用头衔弹窗-->
  <dialog-confirm
    title="提示"
    v-model:visible="dialogShow.lockRole"
    :loading="isLocking"
    @submit="lockItem(4)"
  >
    <span>
      <span>是否停用头衔[ID:{{ activeItem.role.id }}]</span>
      <span style="color: #008ac5">{{ activeItem.role.name }}</span>
    </span>
  </dialog-confirm>
  <!--审核资源弹窗-->
  <dialog-examine
    title="审核"
    v-model:visible="dialogShow.examineMod"
    @submit="examineMod"
    :loading-inject="isInjecting"
    :loading-success="isPassing"
  ></dialog-examine>
  <!--添加/编辑头衔弹窗-->
  <dialog-confirm
    v-model:visible="dialogShow.addRole"
    :title="activeItem.role.id > 0 ? '修改头衔' : '添加头衔'"
    :loading="isLocking"
    @submit="addRole"
  >
    <el-form>
      <el-form-item label="预览">
        <el-tag
          :effect="roleConfig.effect"
          :type="roleConfig.type"
          :color="roleConfig.color"
        >
          {{ roleConfig.name }}
        </el-tag>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="roleConfig.name"></el-input>
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker v-model="roleConfig.color" show-alpha />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="roleConfig.type" placeholder="请选择">
          <el-option label="默认" value="" />
          <el-option label="success" value="success" />
          <el-option label="info" value="info" />
          <el-option label="warning" value="warning" />
          <el-option label="danger" value="danger" />
        </el-select>
      </el-form-item>
      <el-form-item label="效果">
        <el-select v-model="roleConfig.effect" placeholder="请选择">
          <el-option label="dark" value="dark" />
          <el-option label="light" value="light" />
          <el-option label="plain" value="plain" />
        </el-select>
      </el-form-item>
      <el-form-item label="权限(未实现)">
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
    </el-form>
  </dialog-confirm>
</template>

<script lang="ts">
import Cfg from '@/config/config.ts'
import Method from '@/globalmethods'
import './index.ts'
import { watch } from 'vue'
import UserRole from '@comps/user/roleList.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import DialogConfirm from '@comps/dialogs/confirm.vue'
import DialogExamine from '@comps/dialogs/examine.vue'

export default {
  name: 'Admin',
  components: { DialogExamine, DialogConfirm, UserRole },
  data() {
    return {
      set: Cfg.set,
      searchUser: '',
      yqm: {
        num: 1,
      },
      InvitationList: [],
      invitationNum: 0,
      dialogShow: {
        lockAccount: false,
        addRole: false,
        lockBbs: false,
        lockMod: false,
        lockRole: false,
        lockCate: false,
        examineMod: false,
        setRole: false,
        addCate: false,
      },
      cateConfig: <cateItem>{
        id: 0,
        name: '',
        introduce: '',
      },
      gameConfig: {
        name: '',
      },
      roleConfig: <roleItem>{
        id: 0,
        name: '预览',
        color: '',
        type: '',
        effect: 'plain',
      },
      activeTab: '1',
      taskTimerId: 0,
      page: 1,
      limit: 10,
      total: 0,
      stat_filter:-1,
      activeItem: {
        member: <memberItem>{},
        bbs: <bbsItem>{},
        mod: <modItem>{},
        cate: <cateItem>{},
        role: <roleItem>{},
      },
      isLoadingData: false,
      isLockAccountDialogVisible: false,
      isLocking: false,
      isInjecting: false,
      isPassing: false,
      member_list: <memberItem[]>[],
      mod_list: <modItem[]>[],
      bbs_list: <bbsItem[]>[],
      role_list: <roleItem[]>[],
      user_role_list: <roleItem[]>[],
      cate_list: <cateItem[]>[],
      site_config_list: <siteConfig[]>[],
      serverInfo: <serverInfo>{},
    }
  },
  methods: {
    yaoqingma() {
      // 设置请求参数
      const data = {
        avail_num: this.yqm.num,
      }

      // 发送POST请求
      Method.api_post('/user/generate_invitation', data)

        .then(async (res: any) => {
          const obj = res.data
          if (obj.code == 200) {
            ElMessageBox.alert(`邀请码如下：\n${obj.data}`, '生成邀请码', {
              confirmButtonText: '确定',
              callback: () => {
                Method.copyText(obj.data)
              },
            })
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    },
    toView(index: number) {
      let id = this.mod_list[index].id
      this.$router.push(`/ModDetail/${id}`)
    },

    refreshInvitationList(page: any) {
      console.log('调用获取列表')
      Method.api_post('/admin/getInviteCode', {
        page: page ?? this.page,
        limit: 50,
      })
        .then((res: any) => {
          let obj = res.data
          if (obj.code == 200) {
            for (const el of obj.data) {
              el.time = Method.formatNormalTime(el.time)
            }
            this.InvitationList = obj.data
            this.invitationNum =
              this.invitationNum == 0 ? obj.sum : this.invitationNum
            this.page = page ?? this.page
          }
        })
        .catch((error: any) => {
          console.log(error)
        })

      // Method.api_post('/user/my_invitation_code', {})
      //   .then((res: any) => {
      //     // 打印返回的JSON

      //     const obj = res.data
      //     console.log(obj)
      //   })
      //   .catch((err: any) => {
      //     console.log(err)
      //   })
    },
    showLockItem(type: number, index: number) {
      switch (type) {
        case 1:
          this.dialogShow.lockAccount = true
          this.activeItem.member = this.member_list[index]
          break
        case 2:
          this.dialogShow.lockBbs = true
          this.activeItem.bbs = this.bbs_list[index]
          break
        case 3:
          this.dialogShow.lockMod = true
          this.activeItem.mod = this.mod_list[index]
          break
        case 4:
          this.dialogShow.lockRole = true
          this.activeItem.role = this.role_list[index]
          break
        case 5:
          this.dialogShow.lockCate = true
          this.activeItem.cate = this.cate_list[index]
          break
        case 6:
          this.dialogShow.setRole = true
          this.activeItem.member = this.member_list[index]
          let list = Method.decodeRoleList(this.activeItem.member.role_list)
          this.user_role_list = Method.copyObject(list)
          this.refreshRoleList()
          break
        case 7:
          this.dialogShow.addRole = true
          this.activeItem.role = this.role_list[index]
          this.roleConfig = Method.copyObject(this.activeItem.role)
          break
      }
    },
    addUserRole(x: roleItem) {
      this.user_role_list.push(x)
    },
    removeUserRole(x: roleItem) {
      this.user_role_list.splice(this.user_role_list.indexOf(x), 1)
    },
    setUserRole() {
      let list = <number[]>[]
      this.user_role_list.forEach((x: any) => {
        list.push(x.id)
      })
      this.isLocking = true
      Method.api_post('/admin/set_user_role', {
        uid: this.activeItem.member.id,
        role_list: JSON.stringify(list),
      }).then((response) => {
        let res = <res>response.data
        if (res.code == 200) {
          ElMessage('设置成功')
          this.dialogShow.setRole = false
          this.refreshRoleList()
        } else ElMessage(res.msg)
      })
    },
    showAddRole() {
      this.dialogShow.addRole = true
      this.roleConfig = <roleItem>{
        id: 0,
        name: '预览',
        color: '',
        type: '',
        effect: 'plain',
      }
    },
    showAddCate() {
      this.dialogShow.addCate = true
      this.cateConfig = <cateItem>{
        id: 0,
        name: '',
        introduce: '',
      }
    },
    showExamineMode(index: number) {
      this.activeItem.mod = this.mod_list[index]
      this.dialogShow.examineMod = true
    },
    examineMod(e: any) {
      this.isInjecting = !e.result
      this.isPassing = e.result
      let stat = e.result ? 1 : 3
      Method.api_post('/admin/examine_mod', {
        id: this.activeItem.mod.id,
        stat: stat,
        reason: e.reason,
      }).then((response) => {
        this.isPassing = false
        this.isInjecting = false
        let res = <res>response.data
        if (res.code == 200) {
          this.dialogShow.examineMod = false
          if (e.result) {
            ElMessage('已审核通过')
          } else {
            ElMessage('已拒绝通过')
          }
          this.refreshModList()
        }
      })
    },
    addRole() {
      this.isLocking = true
      Method.api_post('/admin/add_role', this.roleConfig).then((response) => {
        let res = response.data
        this.isLocking = false
        if (res.code == 200) {
          this.roleConfig = {
            id: 0,
            name: '预览',
            color: '',
            type: '',
            effect: 'plain',
            stat: 1,
          }
          this.dialogShow.addRole = false
          this.refreshRoleList()
          ElMessage(this.roleConfig.id > 0 ? '修改成功' : '添加成功')
        } else {
          ElMessage(res.msg)
        }
      })
    },
    addCate(modify: boolean) {
      this.isLocking = true
      let payLoad = this.cateConfig
      if (modify) payLoad.id = this.activeItem.cate.id
      Method.api_post('/admin/add_cate', payLoad).then((response) => {
        let res = response.data
        this.isLocking = false
        if (res.code == 200) {
          this.dialogShow.addCate = false
          this.refreshCateList()
          ElMessage(modify ? '修改成功' : '添加成功')
        } else {
          ElMessage(res.msg)
        }
      })
    },
    showModifyCate(index: number) {
      this.dialogShow.addCate = true
      this.activeItem.cate = this.cate_list[index]
      this.cateConfig = Method.copyObject(this.activeItem.cate)
    },
    lockItem(type: number) {
      this.isLocking = true
      let id = 0
      let stat = 0
      switch (type) {
        case 1:
          id = this.activeItem.member.id
          stat = this.activeItem.member.stat == 1 ? 0 : 1
          break
        case 2:
          id = this.activeItem.bbs.id
          stat = this.activeItem.bbs.stat == 1 ? 0 : 1
          break
        case 3:
          id = this.activeItem.mod.id
          stat = this.activeItem.mod.stat == 1 ? 0 : 1
          break
        case 4:
          id = this.activeItem.role.id
          stat = this.activeItem.role.stat == 1 ? 0 : 1
          break
        case 5:
          id = this.activeItem.cate.id
          stat = this.activeItem.cate.stat == 1 ? 0 : 1
          break
      }
      Method.api_post('/admin/lock_item', {
        type: type,
        id: id,
        stat: stat,
      }).then((response) => {
        this.isLocking = false
        let res = <res>response.data
        if (res.code == 200) {
          switch (type) {
            case 1:
              this.activeItem.member.stat = res.data.stat
              this.dialogShow.lockAccount = false
              break
            case 2:
              this.activeItem.bbs.stat = res.data.stat
              this.dialogShow.lockBbs = false
              break
            case 3:
              this.activeItem.mod.stat = res.data.stat
              this.activeItem.mod.stat_data = Method.getStat(res.data.stat)
              this.dialogShow.lockMod = false
              break
            case 4:
              this.activeItem.role.stat = res.data.stat
              this.dialogShow.lockRole = false
              break
            case 5:
              this.activeItem.cate.stat = res.data.stat
              this.dialogShow.lockCate = false
              break
          }
          ElMessage(res.data.stat === 0 ? '锁定成功' : '解锁成功')
        }
      })
    },
    saveSiteConfig() {
      this.isLocking = true
      let config = <siteSaveConfig[]>[]
      this.site_config_list.forEach((x: siteConfig) => {
        config.push({ id: x.id, value: x.value })
      })
      let payLoad = {
        config: JSON.stringify(config),
      }
      Method.api_post('/admin/save_site_config', payLoad).then((response) => {
        this.isLocking = false
        let res = response.data
        if (res.code == 200) {
          ElMessage('保存成功')
          this.member_list = res.data
        } else ElMessage(res.msg)
      })
    },
    refreshMemberList() {
      this.isLoadingData = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
        search: this.searchUser,
        order: 0,
        role: 0,
        state: 0,
      }
      Method.api_post('/admin/member_list', payLoad).then((response) => {
        this.isLoadingData = false
        let res = response.data
        if (res.code == 200) {
          if (this.page == 1) this.total = res.sum
          res.data.forEach((x: any) => {
            x.last_login_time = Method.formatNormalTime(x.last_login_time)
            x.reg_time = Method.formatNormalTime(x.reg_time)
          })
          this.member_list = res.data
        }
      })
    },
    setModListFilter(stat_filter=-1){
      this.stat_filter = stat_filter;
      this.refreshModList();
    },
    /**
     * 资源列表刷新
     */
    refreshModList() {
      this.isLoadingData = true
      let payLoad = {
        page: this.page,
        limit: this.limit,
        stat: this.stat_filter
      }
      Method.api_post('/admin/mod_list', payLoad).then((response) => {
        this.isLoadingData = false
        let res = response.data as res
        if (res.code == 200) {
          if (this.page == 1) this.total = res.sum
          res.data.forEach((x: modItem) => {
            x.create_time = Method.formatNormalTime(<number>x.create_time)
            x.last_modify_time = Method.formatNormalTime(
              <number>x.last_modify_time,
            )
            x.likes = Method.getNumber(<number>x.likes)
            x.downloads = Method.getNumber(<number>x.downloads)
            x.stat_data = Method.getStat(x.stat)
          })
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
          if (this.page == 1) this.total = res.sum
          res.data.forEach((x: any) => {
            x.create_time = Method.formatNormalTime(x.create_time)
          })
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
          if (this.page == 1) this.total = res.sum
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
          if (this.page == 1) this.total = res.sum
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
          if (this.page == 1) this.total = res.sum
          this.site_config_list = res.data
        }
      })
    },
    refreshServerInfo() {
      this.isLoadingData = true
      Method.api_get('/admin/server_info').then((response) => {
        this.isLoadingData = false
        let res = <res>response.data
        if (res.code == 200) {
          this.serverInfo = res.data
        }
      })
    },
    refreshItem(activeTab: string) {
      let v = parseInt(activeTab)
      switch (v) {
        case 1:
          this.refreshServerInfo()
          break
        case 2:
          this.refreshMemberList()
          break
        case 3:
          this.refreshBbsList()
          break
        case 4:
          this.refreshModList()
          break
        case 5:
          this.refreshRoleList()
          break
        case 6:
          this.refreshCateList()
          break
        case 7:
          this.refreshConfigList()
          break
      }
    },
  },
  mounted() {
    this.refreshServerInfo()
    watch(
      () => this.activeTab,
      (v) => {
        this.page = 1
        this.refreshItem(v)
      },
    )
    watch(
      () => this.page,
      () => {
        this.refreshItem(this.activeTab)
      },
    )
  },
  created() {
    this.taskTimerId = 0
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
