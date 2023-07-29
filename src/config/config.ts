import { reactive } from "vue"
const homestyle = reactive({
  /** 内容样式 */
  maincontainer: {
    padding: "0px",
    height: "calc(100vh - 90px)",
    overflowY: "hidden",
  },
  /** 页面整体样式 */
  container: {
    padding: "0px",
  },

  cfg: {
    menu: true,
    isshow: true,
    shape: "square",
    headsize: reactive({
      post: 32,
      userindex: 32,
    }),
  },
})

const userInfo = reactive({
  isLogin: false,
  isLoginDialogVisible: false,
  data: {},
})

class Cfg {
  [config: string]: {
    /** 后端服务器地址 */
    server: string
    /** 主页样式 */
    homestyle: {
      maincontainer: {
        padding: string
        /** 内容样式 */
        height: string
        overflowY: string
      }
      container: { padding: string }
      cfg: {
        menu: boolean
        isshow: boolean
        shape: string
        headsize: {
          post: number
          userindex: number
        }
      }
    }
    /** 用户信息 */
    userInfo: {
      isLogin: boolean
      isLoginDialogVisible: boolean
      id?: string
      data: { headurl?: string; nickname?: string }
    }
  }

  constructor() {
    this.config = {
      /** 后端服务器地址 */
      server: "http://suancaixianyu.cn:8000",
      /** 主页样式 */
      homestyle,
      /** 用户信息 */
      userInfo,
    }
  }
}

export default new Cfg()
