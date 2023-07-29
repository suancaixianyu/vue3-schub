import { reactive } from "vue"
const homestyle = reactive({
  /** 内容样式 */
  maincontainer: {
    padding: "0px 20px",
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
      cfg: { menu: boolean; isshow: boolean }
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
      server: "http://suancaixianyu.cn:11451",
      /** 主页样式 */
      homestyle,
      /** 用户信息 */
      userInfo,
    }
  }
}

export default new Cfg()
