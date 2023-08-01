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
  /** 头像大小 */
  headsize: {
    post: 32,
    userindex: 32,
  },
  /** 配置信息 */
  set: {
    menu: true,
    showfooter: true,
    shape: "square",
    ismobile: false,
  },
})

const webkit = reactive({
  // 滚动条样式
  "webkit-scrollbar-thumb-background":
    'url("./src/assets/icon/mifengup.svg") center top no-repeat, url("./src/assets/icon/mifengbottom.svg") center bottom no-repeat',
  "webkit-scrollbar-thumb-background-color": "",
  "webkit-scrollbar-thumb-border": "none",
  "webkit-scrollbar-thumb-border-radius": "10px",
  "webkit-scrollbar-thumb-background-size": "100%",
  // 鼠标悬停效果
  "webkit-scrollbar-thumb-background-hover": "var(--webkit-scrollbar-thumb-background)",
  "webkit-scrollbar-thumb-background-color-hover": "#F5F5F5",
  "webkit-scrollbar-thumb-border-hover": "none",
  "webkit-scrollbar-thumb-border-radius-hover": "10px",
  "webkit-scrollbar-thumb-background-size-hover": "100%",
  // 滚动条框框样式
  "webkit-scrollbar-width": "12px",
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
      /** 头像大小 */
      headsize: {
        /** 在帖子中的大小 */
        post: number
        /** 在用户中心的大小 */
        userindex: number
      }
    }
    /** 滚动条样式 */
    webstyle: { [key: string]: { [key: string]: string } }
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
      userInfo,
      webstyle: {
        webkit,
      },
    }
  }
}

export default new Cfg()
