import '@/components/admin/index.ts'

/** 板块类型 */
export interface catelist {
  /** 板块id */
  id: number
  /** 板块名称 */
  name: string
  /** 发表数量 */
  interaction: number
  /** 板块介绍 */
  introduce: string
  /** 帖子数量 */
  postnum: number
}

/** api返回标准 */
export interface api {
  /** 状态码 */
  code: number
  /** 返回消息 */
  msg: string
  /** 返回数据 */
  data: any
}

export interface userInfoType {

  /** mod列表 */
  global_mod_data_list: {
    /** 版本列表 */
    game_version: any
    /** api列表 */
    api_version: any
    /** 关系列表 */
    relate_type: any
    /** 链接类型列表 */
    link_type: any
    /** 标签列表 */
    flag_list: any
    /** 服务器版本列表 */
    server_version_list: any
  }
  /** 全局角色列表 */
  role_list: any[]
  /** 板块列表 */
  cate_list: cateItem[]
  /** 用户ID */
  id?: string
  /** 状态 */
  state: {
    /** 未读消息数 */
    unreadMessage: number
    /** 是否已登录 */
    isLogin: boolean
    /** 登录窗口是否可见 */
    isLoginDialogVisible: boolean
  }
  /** 用户信息 */
  data: {
    headurl?: string
    nickname?: string
    role: any
    id: number
    signature: string
    isAdmin: boolean
    background?: string
  }
}

export interface setType {
  /** 是否显示抽屉菜单 */
  menu: boolean
  /** 头像形状 */
  shape: string
  /** 是否为移动端 */
  ismobile: boolean
  /** 是否显示顶部导航栏 */
  showheader: boolean
}
