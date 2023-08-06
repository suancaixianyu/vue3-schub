import { CSSProperties, reactive } from 'vue'
const homestyle = reactive({
  /** 内容样式 */
  maincontainer: {
    padding: '0 18px',
    height: 'calc(100vh - 90px)',
    overflowY: 'hidden',
  },
  /** 卡片样式 */
  postliststyle: {
    display: 'flex',
    padding: '12px 18px',
    justifyContent: 'center',
    margin: '10px auto',
    width: '90%',
    maxHeight: '200px',
    boxShadow: 'var(--el-box-shadow-light)',
    borderRadius: 'var(--rounded-btn)',
  },
  /** 页面整体样式 */
  container: {
    padding: '0',
  },
  /** 头像大小 */
  headsize: {
    post: 32,
    userindex: 32,
  },
})

const set = reactive({
  menu: true,
  showfooter: true,
  shape: 'square',
  ismobile: false,
})

let webstyle = reactive({
  webkit: {
    // 滚动条样式
    'scrollbar-thumb-background':
      'url("./src/assets/icon/mifengup.svg") center top no-repeat, url("./src/assets/icon/mifengbottom.svg") center bottom no-repeat',
    'scrollbar-thumb-background-color': '',
    'scrollbar-thumb-border': 'none',
    'scrollbar-thumb-border-radius': '10px',
    'scrollbar-thumb-background-size': '100%',
    // 鼠标悬停效果
    'scrollbar-thumb-background-hover': 'var(--scrollbar-thumb-background)',
    'scrollbar-thumb-background-color-hover': '#F5F5F5',
    'scrollbar-thumb-border-hover': 'none',
    'scrollbar-thumb-border-radius-hover': '10px',
    'scrollbar-thumb-background-size-hover': '100%',
    // 滚动条框框样式
    'scrollbar-width': '12px',
  },
  card: {
    'rounded-card': 'var(--rounded-btn)',
  },
})

const userInfo = reactive({
  global_mod_data_list: {
    game_version: [],
    api_version: [],
    relate_type: [],
    link_type: [],
    flag_list: [],
  },
  role_list: [],
  isLogin: false,
  isLoginDialogVisible: false,
  data: { role: '', nickname: '', headurl: '' },
})

class Cfg {
  [config: string]: {
    /** 后端服务器地址 */
    server: string
    /** 上传图片接口 */
    uploadimg: string
    /** 主页样式 */
    homestyle: {
      /** 内容样式 */
      maincontainer: {
        padding: string
        height: string
        overflowY: string
      }
      /** 整体样式 */
      container: {
        padding: string
      }
      /** 卡片样式 */
      postliststyle: CSSProperties
      /** 头像大小 */
      headsize: {
        /** 在帖子中的大小 */
        post: number
        /** 在用户中心的大小 */
        userindex: number
      }
    }
    /** 设置 */
    set: {
      /** 是否显示抽屉菜单 */
      menu: boolean
      /** 是否显示底部栏 */
      showfooter: boolean
      /** 头像形状 */
      shape: string
      /** 是否为移动端 */
      ismobile: boolean
    }
    /** 全局样式 */
    webstyle: { [key: string]: { [key: string]: string } }
    /** 用户信息 */
    userInfo: {
      global_mod_data_list: {
        game_version: any //版本列表
        api_version: any //api列表
        relate_type: any //关系列表
        link_type: any //链接类型列表
        flag_list: any //标签列表
      } //全局标签列表
      role_list: any //全局角色列表
      isLogin: boolean //是否已登录
      isLoginDialogVisible: boolean //登陆窗口是否可见
      id?: string //用户ID
      data: { headurl?: string; nickname?: string; role: any } //用户信息
    }
  }

  constructor() {
    this.config = {
      /** 后端服务器地址 */
      //server: "http://localhost:8081",
      server: '/xyapi',
      // server: "http://suancaixianyu.cn:8000",
      // server: "https://schub.top",
      uploadimg: '/upload',
      /** 主页样式 */
      homestyle,
      set,
      userInfo,
      webstyle,
    }
  }
}

export default new Cfg
