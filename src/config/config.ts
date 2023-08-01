import { reactive } from "vue"
const homestyle = reactive({
  /** 内容样式 */
  maincontainer: {
    padding: "0px 5px",
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
  global_mod_data_list:{
    game_version:[],
    api_version:[],
    relate_type:[],
    link_type:[],
    flag_list:[]
  },
  role_list:[],
  isLogin: false,
  isLoginDialogVisible: false,
  data: {},
})

class Cfg {
  [config: string]: {
    /** 后端服务器地址 */
    server: string
    /** 上传图片接口 */
    uploadimg: string
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
      global_mod_data_list:{
        game_version:any//版本列表
        api_version:any//api列表
        relate_type:any//关系列表
        link_type:any//链接类型列表
        flag_list:any//标签列表
      }//全局标签列表
      role_list: any//角色列表
      isLogin: boolean//是否已登录
      isLoginDialogVisible: boolean//登陆窗口是否可见
      id?: string//用户ID
      data: { headurl?: string; nickname?: string }//用户信息
    }
  }

  constructor() {
    this.config = {
      /** 后端服务器地址 */
      server: "http://localhost:8081",
      uploadimg: "/upload",
      /** 主页样式 */
      homestyle,
      /** 用户信息 */
      userInfo,
    }
  }
}

export default new Cfg()
