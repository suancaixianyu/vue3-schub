<template>
  <div style="margin: 20px" />
  <el-row :gutter="24" style="margin: 0px">
    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />

    <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14">
      <el-form label-position="top" label-width="100px" @submit.prevent>
        <el-radio-group label="label position">
          <el-text>样式</el-text>
        </el-radio-group>
        <hr />
        <el-form-item label="抽屉菜单">
          <input type="checkbox" class="toggle" checked v-model="set.menu" />
        </el-form-item>
      </el-form>

      <el-form label-position="top" label-width="100px" @submit.prevent>
        <el-radio-group>
          <el-text>头像</el-text>
        </el-radio-group>
        <hr />
        <el-form-item label="预览">
          帖子&emsp;<el-avatar :shape="set.shape" :size="headsize.post" :src="userhead" />
          &emsp;&emsp; 用户中心&emsp;<el-avatar :shape="set.shape" :size="headsize.userindex" :src="userhead" />
        </el-form-item>

        <el-form-item label="头像形状">
          <el-radio-group v-model="set.shape" size="small">
            <el-radio-button label="square" />
            <el-radio-button label="circle" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="帖子头像大小">
          <el-input type="number" v-model="headsize.post" @blur="sizepost" />
        </el-form-item>
        <el-form-item label="用户主头像页大小">
          <el-input type="number" v-model="headsize.userindex" @blur="sizeuser" @keyup.enter="setstyle" />
        </el-form-item>
      </el-form>

      <el-form label-position="top" label-width="100px" @submit.prevent>
        <el-radio-group>
          <el-text>滚动条：css样式</el-text>
        </el-radio-group>
        <hr />

        <el-form-item label="::-scrollbar-thumb">
          <el-text>背景: var(--scrollbar-thumb-background)</el-text>
          <textarea class="textarea bg-base-200" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.webkit['scrollbar-thumb-background']" />
          <el-text>悬停背景: var(--scrollbar-thumb-background-hover)</el-text>
          <textarea class="textarea bg-base-200" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.webkit['scrollbar-thumb-background-hover']" />
          <el-text>背景颜色: var(--scrollbar-thumb-background-color)</el-text>
          <el-color-picker v-model="webstyle.webkit['scrollbar-thumb-background-color']" size="small" />
          <el-input class="bg-base-200" type="text" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.webkit['scrollbar-thumb-background-color']" />
          <el-text>悬停背景颜色:
            var(--scrollbar-thumb-background-color-hover)</el-text>
          <el-color-picker v-model="webstyle.webkit['scrollbar-thumb-background-color-hover']" size="small" />
          <el-input class="bg-base-200" type="text" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.webkit['scrollbar-thumb-background-color-hover']" />

          <el-text>背景大小: var(--scrollbar-thumb-background-size)</el-text>
          <el-input class="bg-base-200" type="text" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.webkit['scrollbar-thumb-background-size']" />
          <el-text>边框: var(--scrollbar-thumb-border)</el-text>
          <textarea class="textarea bg-base-200" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.webkit['scrollbar-thumb-border']" />
          <el-text>圆角: var(--scrollbar-thumb-border-radius)</el-text>
          <el-input class="bg-base-200" type="text" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.webkit['scrollbar-thumb-border-radius']" />
        </el-form-item>
        <hr />
        <el-form-item label="::-scrollbar">
          <el-text>宽度: var(--scrollbar-width)</el-text>&ensp;
          <el-text>手机端一般看不见滚动条，请将此项设置为0</el-text>
          <el-input class="bg-base-200" type="text" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.webkit['scrollbar-width']" @keyup.enter="setstyle" />
        </el-form-item>
      </el-form>

      <el-form label-position="top" label-width="100px" @submit.prevent>
        <el-radio-group>
          <el-text>卡片样式</el-text>
        </el-radio-group>
        <hr />
        <el-form-item label="圆角">
          <el-text>圆角: var(--rounded-card)</el-text>
          <el-input class="bg-base-200" type="text" placeholder="输入文本" style="width: 100%"
            v-model="webstyle.card['rounded-card']" @keyup.enter="setstyle" />
        </el-form-item>
      </el-form>

      <el-form label-position="top" label-width="100px">
        <el-form-item></el-form-item>
        <el-form-item>
          <el-button @click="setstyle">应用</el-button>
          <el-button text @click="dialogFormVisible = true">导入配置</el-button>
          <el-button text @click="getconfiguration">导出配置</el-button>
          <el-button text @click="restart">重置配置</el-button>
          <el-dialog v-model="dialogFormVisible" title="样式设置" :fullscreen="set.ismobile">
            <el-text>此配置不包括头像设置</el-text>
            <textarea class="textarea bg-base-200" placeholder="输入文本" style="width: 100%" v-model="configuration" />
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关闭</el-button>
                <el-button @click="setconfiguration">设置</el-button>
                <el-button @click="copy">复制配置</el-button>
              </span>
            </template>
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :xs="0" :sm="2" :md="3" :lg="5" :xl="5" />
  </el-row>
</template>

<script lang="ts">
import Cfg from '@/config/config'
import { onMounted, onUnmounted } from 'vue'
import Method from '@/globalmethods'
import { ElMessage } from 'element-plus'
export default {
  name: 'UserSetup',
  data() {
    return {
      dialogFormVisible: false,
      configuration: '',
      webstyle: Cfg.config.webstyle,
      set: Cfg.set,
      ...Cfg.config.homestyle
    }
  },
  setup() {
    onMounted(() => {
      Cfg.config.homestyle.maincontainer.overflowY = 'visible'
      Cfg.config.homestyle.maincontainer.height = 'auto'
      Cfg.set.showfooter = false
    })
    onUnmounted(() => {
      Cfg.config.homestyle.maincontainer.overflowY = 'hidden'
      Cfg.config.homestyle.maincontainer.height = 'auto'
      Cfg.set.showfooter = true
    })
    return {
      userhead:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    }
  },
  methods: {
    copy() {
      Method.copyText(this.configuration)
    },
    restart() {
      Method.localSet('webstyle', {})
      Method.setwebstyle()
      ElMessage('重置成功')
    },
    sizepost() {
      this.headsize.post = Number(this.headsize.post)
    },
    sizeuser() {
      this.headsize.userindex = Number(this.headsize.userindex)
    },
    setstyle() {
      Method.localSet('webstyle', Cfg.config.webstyle)
      Method.setwebstyle()
      ElMessage('设置成功成功')
    },
    setconfiguration() {
      this.dialogFormVisible = false
      Method.localSet('webstyle', this.configuration)
      Method.setwebstyle()
      ElMessage('导入成功')
    },
    getconfiguration() {
      this.dialogFormVisible = true
      this.configuration = JSON.stringify(Method.localGet('webstyle', {}))
    },
  },
}
</script>

<style scoped>
.el-form {
  background-color: hsl(var(--b1));
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--rounded-card);
  padding: 10px;
  margin: 5px;
}
</style>
