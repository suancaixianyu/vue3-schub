/**
 * 发帖者信息
 */
interface Author{
    headurl:string//头像地址
    nickname:string//昵称
    role:string//角色列表
}
/**
 * 帖子列表单项
 */
interface BbsItem{
    id: number//帖子id
    title: string//帖子标题
    summary: string//全部帖子内容
    author: Author//用户信息
    cover: string//帖子封面
    time: number//发帖时间戳
    likes: number//点赞数
    comments: number//评论数
}