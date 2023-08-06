import { CSSProperties, reactive } from 'vue'
import type { userInfoType, setType } from '@/apitypes'
const homestyle = reactive({
  /** 内容样式 */
  maincontainer: {
<<<<<<< HEAD
    padding: '0 1rem',
=======
    padding: '0 18px',
>>>>>>> b1ae9c8a3d9fe9fbc1a8e32c0b3c96dbfe45b935
    height: 'calc(100vh - 90px)',
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
    "webkit-scrollbar-thumb-background": "url('./src/assets/icon/mifengup.svg') center top no-repeat, url('./src/assets/icon/mifengbottom.svg') center bottom no-repeat",
    "webkit-scrollbar-thumb-background-color": "",
    "webkit-scrollbar-thumb-border": "none",
    "webkit-scrollbar-thumb-border-radius": "10px",
    "webkit-scrollbar-thumb-background-size": "100%",
    "webkit-scrollbar-thumb-background-hover": "var(--webkit-scrollbar-thumb-background)",
    "webkit-scrollbar-thumb-background-color-hover": "#F5F5F5",
    "webkit-scrollbar-thumb-border-hover": "none",
    "webkit-scrollbar-thumb-border-radius-hover": "10px",
    "webkit-scrollbar-thumb-background-size-hover": "100%",
    "webkit-scrollbar-width": "12px"
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
  },
  role_list: [],
  isLogin: false,
  isLoginDialogVisible: false,
  data: { role: '', nickname: '', headurl: '' },
})

class Cfg {
  config: {
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
      //server: "http://localhost:8081",
      server: '/xyapi',
      // server: "http://suancaixianyu.cn:8000",
      // server: "https://schub.top",
      uploadimg: '/upload',
      /** 主页样式 */
      homestyle,
      webstyle,
    }
    this.userInfo = {
      ...userInfo
    }
    this.set = {
      ...set
    }
  }
}

export default new Cfg
