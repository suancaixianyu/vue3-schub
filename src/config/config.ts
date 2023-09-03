import { reactive } from 'vue'
import type { userInfoType, setType } from '@/apitypes'


/** 内容样式 */
const maincontainer = reactive({
  padding: '0',
  height: 'calc(100vh - 6rem)',
  overflowY: 'hidden',
})

/** 卡片样式 */
const postliststyle = reactive({
  display: 'flex',
  padding: '12px 18px',
  justifyContent: 'center',
  margin: '10px auto',
  width: '88%',
  maxHeight: '200px',
  boxShadow: 'var(--el-box-shadow-light)',
  borderRadius: 'var(--rounded-btn)',
})
/** 页面整体样式 */
const container = reactive({
  padding: '0',
  margin: '0',
})
const headsize = reactive({
  post: 28,
  userindex: 48,
})

const set = reactive({
  menu: true,
  shape: 'square',
  ismobile: false,
  showheader: false
})

let webstyle = reactive({
  webkit: {
    // 滚动条样式
    "scrollbar-thumb-background": "url('/icon/mifengup.svg') center top no-repeat, url('/icon/mifengbottom.svg') center bottom no-repeat",
    "scrollbar-thumb-background-color": "#F2F2F2",
    "scrollbar-thumb-border": "none",
    "scrollbar-thumb-border-radius": "10px",
    "scrollbar-thumb-background-size": "100%",
    "scrollbar-thumb-background-hover": "var(--scrollbar-thumb-background)",
    "scrollbar-thumb-background-color-hover": "#BDBDBD",
    "scrollbar-thumb-border-hover": "none",
    "scrollbar-thumb-border-radius-hover": "10px",
    "scrollbar-thumb-background-size-hover": "100%",
    "scrollbar-width": "12px"
  },
  card: {
    'rounded-card': 'var(--rounded-btn)',
  },
})

const userInfo: userInfoType = reactive({
  global_mod_data_list: {
    game_version: [],
    api_version: [],
    relate_type: [],
    link_type: [],
    flag_list: [],
    server_version_list: []
  },
  role_list: [],
  isLogin: false,
  isLoginDialogVisible: false,
  data: { role: '', nickname: '', headurl: '', id: 0, signature: '' },
})

class Cfg {
  config: {
    /** 后端服务器地址 */
    server: string
    /** 前端地址 */
    view: string
    /** 后端验证地址 */
    captchaserver: string
  };
  /** 全局样式 */
  webstyle: { [key: string]: { [key: string]: string } }
  /** 用户信息 */
  userInfo: userInfoType
  /** 设置 */
  set: setType

  /** 用户头像大小 */
  headsize: {
    /** 帖子显示大小 */
    post: number
    /** 个人中心显示大小 */
    userindex: number
  }
  container: {
    padding: string,
    margin: string,
  }
  maincontainer: { [key: string]: string }
  postliststyle: { [key: string]: string }

  constructor() {
    this.config = {
      /** 后端服务器地址 */
      //  server: "http://localhost:8081",
      // server: '/xyapi',
      // server: "http://suancaixianyu.cn:8000",
      server: "https://api.schub.top",
      // view: 'http://localhost:4000',
      view: 'http://suancaixianyu.cn',
      captchaserver: 'https://schub.top'

    }
    this.webstyle = webstyle
    this.userInfo = userInfo
    this.set = set
    this.headsize = headsize
    this.container = container
    this.postliststyle = postliststyle
    this.maincontainer = maincontainer
  }
}

export default new Cfg
