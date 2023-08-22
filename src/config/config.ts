import { CSSProperties, reactive } from 'vue'
import type { userInfoType, setType } from '@/apitypes'
const homestyle = reactive({
  /** 内容样式 */
  maincontainer: {
    padding: '0 1rem',
    height: 'calc(100vh - 6rem)',
    overflowY: 'hidden',
  },
  /** 卡片样式 */
  postliststyle: {
    display: 'flex',
    padding: '12px 18px',
    justifyContent: 'center',
    margin: '10px auto',
    width: '88%',
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
    /** 全局样式 */
    webstyle: { [key: string]: { [key: string]: string } }
  };
  /** 用户信息 */
  userInfo: userInfoType;
  /** 设置 */
  set: setType;

  constructor() {
    this.config = {
      /** 后端服务器地址 */
      server: "http://localhost:8081",
      // server: '/xyapi',
      //server: "http://suancaixianyu.cn:8000",
      //server: "https://schub.top",
      /** 主页样式 */
      homestyle,
      webstyle,
    }
    this.userInfo = userInfo;
    this.set = set;
  }
}

export default new Cfg
