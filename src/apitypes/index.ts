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
